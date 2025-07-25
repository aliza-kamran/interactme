import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
})

export const plans = [
  {
    name: 'Free',
    description: 'Perfect for trying out our service',
    price: 0,
    interval: 'month',
    features: [
      '5 flyers per month',
      'Basic templates',
      'Standard QR codes',
      'Email support',
    ],
    flyerLimit: 5,
    stripePriceId: null,
  },
  {
    name: 'Pro',
    description: 'Great for small businesses',
    price: 9.99,
    interval: 'month',
    features: [
      '50 flyers per month',
      'All templates',
      'Custom QR codes',
      'Priority support',
      'Analytics dashboard',
      'Custom branding',
    ],
    flyerLimit: 50,
    stripePriceId: 'price_1QVxyzABC123', // Replace with actual Stripe price ID
  },
  {
    name: 'Enterprise',
    description: 'For growing businesses',
    price: 29.99,
    interval: 'month',
    features: [
      'Unlimited flyers',
      'All templates',
      'Custom domains',
      'API access',
      'Advanced analytics',
      'Custom branding',
      'Priority support',
      'Bulk upload',
    ],
    flyerLimit: -1,
    stripePriceId: 'price_1QVxyzDEF456', // Replace with actual Stripe price ID
  },
]

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}