'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  CreditCard, 
  Calendar, 
  TrendingUp, 
  Settings, 
  Download,
  ExternalLink,
  Crown,
  Zap,
  Star
} from 'lucide-react'
import { toast } from 'sonner'
import { formatPrice } from '@/lib/stripe'

interface UserData {
  plan: {
    name: string
    description: string
    price: number
    flyerLimit: number
    features: string[]
  }
  flyersUsed: number
  subscriptionStatus: string | null
  currentPeriodEnd: string | null
  stripeCustomerId: string | null
}

export default function BillingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [portalLoading, setPortalLoading] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (status === 'authenticated') {
      fetchUserData()
    }
  }, [status, router])

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/billing')
      if (response.ok) {
        const data = await response.json()
        setUserData(data)
      } else {
        toast.error('Failed to load billing information')
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      toast.error('Failed to load billing information')
    } finally {
      setLoading(false)
    }
  }

  const handleManageSubscription = async () => {
    setPortalLoading(true)
    try {
      const response = await fetch('/api/stripe/customer-portal', {
        method: 'POST',
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Failed to open customer portal')
      }
    } catch (error) {
      console.error('Portal error:', error)
      toast.error('Failed to open customer portal')
    } finally {
      setPortalLoading(false)
    }
  }

  const getPlanIcon = (planName: string) => {
    switch (planName) {
      case 'Free':
        return <Star className="h-5 w-5" />
      case 'Pro':
        return <Zap className="h-5 w-5" />
      case 'Enterprise':
        return <Crown className="h-5 w-5" />
      default:
        return <Star className="h-5 w-5" />
    }
  }

  const getPlanColor = (planName: string) => {
    switch (planName) {
      case 'Free':
        return 'bg-gray-100 text-gray-800'
      case 'Pro':
        return 'bg-blue-100 text-blue-800'
      case 'Enterprise':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getUsagePercentage = () => {
    if (!userData) return 0
    if (userData.plan.flyerLimit === -1) return 0 // Unlimited
    return (userData.flyersUsed / userData.plan.flyerLimit) * 100
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading billing information...</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Failed to load billing information</p>
          <Button onClick={fetchUserData} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>

      <div className="grid gap-6">
        {/* Current Plan */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${getPlanColor(userData.plan.name)}`}>
                  {getPlanIcon(userData.plan.name)}
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Current Plan: {userData.plan.name}
                    <Badge className={getPlanColor(userData.plan.name)}>
                      {userData.subscriptionStatus === 'active' ? 'Active' : 
                       userData.subscriptionStatus === 'past_due' ? 'Past Due' :
                       userData.subscriptionStatus === 'canceled' ? 'Canceled' :
                       'Free'}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{userData.plan.description}</CardDescription>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {formatPrice(userData.plan.price)}
                </div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Usage */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Flyers Used</span>
                  <span className="text-sm text-muted-foreground">
                    {userData.flyersUsed} / {userData.plan.flyerLimit === -1 ? '∞' : userData.plan.flyerLimit}
                  </span>
                </div>
                {userData.plan.flyerLimit !== -1 && (
                  <Progress value={getUsagePercentage()} className="h-2" />
                )}
              </div>

              {/* Next Billing Date */}
              {userData.currentPeriodEnd && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Next billing date: {new Date(userData.currentPeriodEnd).toLocaleDateString()}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                {userData.plan.name !== 'Free' && userData.stripeCustomerId && (
                  <Button 
                    onClick={handleManageSubscription}
                    disabled={portalLoading}
                    className="flex items-center gap-2"
                  >
                    {portalLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Settings className="h-4 w-4" />
                    )}
                    Manage Subscription
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/pricing')}
                  className="flex items-center gap-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  {userData.plan.name === 'Free' ? 'Upgrade Plan' : 'Change Plan'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Features */}
        <Card>
          <CardHeader>
            <CardTitle>Plan Features</CardTitle>
            <CardDescription>
              What's included in your {userData.plan.name} plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {userData.plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common billing and account actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 h-auto p-4"
                onClick={() => router.push('/dashboard')}
              >
                <TrendingUp className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">View Dashboard</div>
                  <div className="text-sm text-muted-foreground">
                    See your flyers and analytics
                  </div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="flex items-center gap-2 h-auto p-4"
                onClick={() => router.push('/templates')}
              >
                <Download className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Create New Flyer</div>
                  <div className="text-sm text-muted-foreground">
                    Start with a template
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        {userData.stripeCustomerId && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Billing History
              </CardTitle>
              <CardDescription>
                View and download your invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                onClick={handleManageSubscription}
                disabled={portalLoading}
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                View Billing History
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}