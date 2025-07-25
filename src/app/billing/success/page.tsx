'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, ArrowRight, Home, CreditCard } from 'lucide-react'

export default function BillingSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [sessionData, setSessionData] = useState<any>(null)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    
    if (sessionId) {
      // In a real app, you might want to verify the session with your backend
      setSessionData({ sessionId })
    }
    
    setLoading(false)
  }, [searchParams])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Processing your subscription...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-green-100 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-green-600">
          Subscription Successful!
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          Thank you for subscribing! Your account has been upgraded and you can now access all premium features.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
          <CardDescription>
            Here are some things you can do now with your upgraded account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
            <div>
              <h3 className="font-medium">Create Interactive Flyers</h3>
              <p className="text-sm text-muted-foreground">
                Use our premium templates to create stunning interactive flyers
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
            <div>
              <h3 className="font-medium">Access Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Track views, engagement, and performance of your flyers
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
            <div>
              <h3 className="font-medium">Custom QR Codes</h3>
              <p className="text-sm text-muted-foreground">
                Generate custom QR codes for easy sharing
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={() => router.push('/templates')}
          className="flex items-center gap-2"
        >
          Start Creating
          <ArrowRight className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="outline"
          onClick={() => router.push('/billing')}
          className="flex items-center gap-2"
        >
          <CreditCard className="h-4 w-4" />
          View Billing
        </Button>
        
        <Button 
          variant="outline"
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Button>
      </div>
    </div>
  )
}