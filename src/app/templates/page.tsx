'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Eye, Crown, Sparkles } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface Template {
  id: string
  name: string
  description: string
  category: string
  previewImage: string
  htmlContent: string
  cssContent: string
  isPremium: boolean
  isActive: boolean
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const { data: session } = useSession()
  const router = useRouter()

  const categories = ['All', 'Event', 'Promo', 'Job', 'Newsletter']

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates')
      if (response.ok) {
        const data = await response.json()
        setTemplates(data)
      }
    } catch (error) {
      console.error('Error fetching templates:', error)
      toast.error('Failed to load templates')
    } finally {
      setLoading(false)
    }
  }

  const filteredTemplates = templates.filter(template => 
    selectedCategory === 'All' || template.category === selectedCategory
  )

  const handleSelectTemplate = (template: Template) => {
    if (!session) {
      toast.error('Please sign in to use templates')
      router.push('/auth/signin')
      return
    }

    // Store selected template in localStorage for the upload page
    localStorage.setItem('selectedTemplate', JSON.stringify(template))
    router.push('/dashboard/upload')
  }

  const renderPreview = (template: Template) => {
    // Sample data for preview
    const sampleData = {
      title: template.category === 'Event' ? 'Summer Music Festival' :
             template.category === 'Promo' ? '50% Off Sale' :
             template.category === 'Job' ? 'Software Developer' :
             'Monthly Newsletter',
      description: template.category === 'Event' ? 'Join us for an amazing night of music and entertainment' :
                   template.category === 'Promo' ? 'Limited time offer on all products' :
                   template.category === 'Job' ? 'We are looking for a talented developer to join our team' :
                   'Stay updated with our latest news and updates',
      date: template.category === 'Event' ? 'July 15, 2024' :
            template.category === 'Promo' ? 'Valid until July 31' :
            template.category === 'Job' ? 'Apply by July 20' :
            'July 2024',
      time: '7:00 PM',
      location: template.category === 'Event' ? 'Central Park' :
                template.category === 'Job' ? 'Tech Corp Inc.' :
                'Downtown Office',
      address: '123 Main Street, City',
      phone: '+1 (555) 123-4567',
      email: 'contact@example.com',
      website: 'www.example.com',
      buttonText: template.category === 'Event' ? 'Get Tickets' :
                  template.category === 'Promo' ? 'Shop Now' :
                  template.category === 'Job' ? 'Apply Now' :
                  'Read More',
      buttonUrl: '#'
    }

    let htmlContent = template.htmlContent
    let cssContent = template.cssContent

    // Replace placeholders with sample data
    Object.entries(sampleData).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`
      htmlContent = htmlContent.replace(new RegExp(placeholder, 'g'), value)
    })

    return (
      <div className="w-full h-96 overflow-auto border rounded-lg">
        <style dangerouslySetInnerHTML={{ __html: cssContent }} />
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading templates...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Template</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select from our collection of professionally designed templates to transform your flyer into an interactive web page.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="mb-2"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="mb-2">
                  {template.category}
                </Badge>
                {template.isPremium && (
                  <Crown className="h-4 w-4 text-yellow-500" />
                )}
              </div>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <CardDescription className="text-sm">
                {template.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                <img
                  src={template.previewImage}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        {template.name} Preview
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      {selectedTemplate && renderPreview(selectedTemplate)}
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleSelectTemplate(template)}
                  disabled={template.isPremium && !session?.user}
                >
                  Select Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No templates found for the selected category.</p>
        </div>
      )}
    </div>
  )
}