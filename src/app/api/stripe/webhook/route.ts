import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId
  const planName = session.metadata?.planName

  if (!userId || !planName) {
    console.error('Missing metadata in checkout session')
    return
  }

  try {
    // Get the subscription
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
    
    // Get the plan from database
    const plan = await prisma.plan.findFirst({
      where: { name: planName }
    })

    if (!plan) {
      console.error(`Plan not found: ${planName}`)
      return
    }

    // Update user subscription
    await prisma.user.update({
      where: { id: userId },
      data: {
        planId: plan.id,
        stripeCustomerId: session.customer as string,
        subscriptionId: subscription.id,
        subscriptionStatus: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      }
    })

    console.log(`Subscription created for user ${userId}`)
  } catch (error) {
    console.error('Error handling checkout completed:', error)
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string
  
  if (!subscriptionId) return

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    
    await prisma.user.updateMany({
      where: { subscriptionId },
      data: {
        subscriptionStatus: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      }
    })

    console.log(`Payment succeeded for subscription ${subscriptionId}`)
  } catch (error) {
    console.error('Error handling payment succeeded:', error)
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string
  
  if (!subscriptionId) return

  try {
    await prisma.user.updateMany({
      where: { subscriptionId },
      data: {
        subscriptionStatus: 'past_due',
      }
    })

    console.log(`Payment failed for subscription ${subscriptionId}`)
  } catch (error) {
    console.error('Error handling payment failed:', error)
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    await prisma.user.updateMany({
      where: { subscriptionId: subscription.id },
      data: {
        subscriptionStatus: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      }
    })

    console.log(`Subscription updated: ${subscription.id}`)
  } catch (error) {
    console.error('Error handling subscription updated:', error)
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    // Get free plan
    const freePlan = await prisma.plan.findFirst({
      where: { name: 'Free' }
    })

    if (!freePlan) {
      console.error('Free plan not found')
      return
    }

    await prisma.user.updateMany({
      where: { subscriptionId: subscription.id },
      data: {
        planId: freePlan.id,
        subscriptionId: null,
        subscriptionStatus: null,
        currentPeriodEnd: null,
      }
    })

    console.log(`Subscription cancelled: ${subscription.id}`)
  } catch (error) {
    console.error('Error handling subscription deleted:', error)
  }
}