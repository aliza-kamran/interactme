import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'

interface FlyerPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: FlyerPageProps): Promise<Metadata> {
  const flyer = await prisma.flyer.findUnique({
    where: { id: params.id }
  })

  if (!flyer) {
    return {
      title: 'Flyer Not Found'
    }
  }

  const extractedData = flyer.extractedData as any

  return {
    title: extractedData.title || 'Interactive Flyer',
    description: extractedData.description || 'View this interactive flyer',
    openGraph: {
      title: extractedData.title || 'Interactive Flyer',
      description: extractedData.description || 'View this interactive flyer',
      type: 'website',
    }
  }
}

export default async function FlyerPage({ params }: FlyerPageProps) {
  const flyer = await prisma.flyer.findUnique({
    where: { 
      id: params.id,
      isPublic: true
    },
    include: {
      template: true
    }
  })

  if (!flyer || !flyer.template) {
    notFound()
  }

  // Increment view count
  await prisma.flyer.update({
    where: { id: params.id },
    data: { viewCount: { increment: 1 } }
  })

  const extractedData = flyer.extractedData as any
  let htmlContent = flyer.template.htmlContent
  let cssContent = flyer.template.cssContent

  // Replace placeholders with actual data
  const replacements = {
    title: extractedData.title || 'Untitled',
    description: extractedData.description || '',
    date: extractedData.date || '',
    time: extractedData.time || '',
    location: extractedData.location || '',
    address: extractedData.address || '',
    phone: extractedData.phone || '',
    email: extractedData.email || '',
    website: extractedData.website || '',
    buttonText: extractedData.buttonText || 'Learn More',
    buttonUrl: extractedData.buttonUrl || '#'
  }

  Object.entries(replacements).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`
    htmlContent = htmlContent.replace(new RegExp(placeholder, 'g'), value)
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <style dangerouslySetInnerHTML={{ __html: cssContent }} />
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      
      {/* Footer */}
      <div className="text-center py-8 text-sm text-gray-500">
        <p>Created with <a href="/" className="text-primary hover:underline">InteractMe</a></p>
      </div>
    </div>
  )
}