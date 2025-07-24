import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import QRCode from 'qrcode'
import { createCanvas, loadImage } from 'canvas'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const flyer = await prisma.flyer.findUnique({
      where: {
        id: params.id,
        userId: session.user.id
      },
      include: {
        template: true
      }
    })

    if (!flyer) {
      return NextResponse.json({ error: 'Flyer not found' }, { status: 404 })
    }

    // Generate QR code
    const flyerUrl = `${process.env.NEXTAUTH_URL}/f/${flyer.id}`
    const qrCodeDataUrl = await QRCode.toDataURL(flyerUrl, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })

    // Create canvas for the flyer with QR code
    const canvas = createCanvas(800, 1200)
    const ctx = canvas.getContext('2d')

    // Set background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, 800, 1200)

    // Load and draw the original flyer image if available
    try {
      if (flyer.filePath) {
        // In a real implementation, you would load the actual flyer image
        // For now, we'll create a text-based representation
        const extractedData = flyer.extractedData as any
        
        // Draw title
        ctx.fillStyle = '#000000'
        ctx.font = 'bold 48px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(extractedData.title || 'Untitled', 400, 100)

        // Draw description
        ctx.font = '24px Arial'
        ctx.fillStyle = '#333333'
        const description = extractedData.description || ''
        const words = description.split(' ')
        let line = ''
        let y = 200
        
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' '
          const metrics = ctx.measureText(testLine)
          const testWidth = metrics.width
          
          if (testWidth > 700 && n > 0) {
            ctx.fillText(line, 400, y)
            line = words[n] + ' '
            y += 40
          } else {
            line = testLine
          }
        }
        ctx.fillText(line, 400, y)

        // Draw other details
        y += 80
        ctx.font = '20px Arial'
        if (extractedData.date) {
          ctx.fillText(`Date: ${extractedData.date}`, 400, y)
          y += 40
        }
        if (extractedData.time) {
          ctx.fillText(`Time: ${extractedData.time}`, 400, y)
          y += 40
        }
        if (extractedData.location) {
          ctx.fillText(`Location: ${extractedData.location}`, 400, y)
          y += 40
        }
        if (extractedData.phone) {
          ctx.fillText(`Phone: ${extractedData.phone}`, 400, y)
          y += 40
        }
        if (extractedData.email) {
          ctx.fillText(`Email: ${extractedData.email}`, 400, y)
          y += 40
        }
      }
    } catch (error) {
      console.error('Error loading flyer image:', error)
    }

    // Load and draw QR code
    const qrImage = await loadImage(qrCodeDataUrl)
    ctx.drawImage(qrImage, 550, 950, 200, 200)

    // Add QR code label
    ctx.fillStyle = '#000000'
    ctx.font = '16px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('Scan to view online', 650, 1180)

    // Convert canvas to buffer
    const buffer = canvas.toBuffer('image/png')

    // Return the image
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="${flyer.title || 'flyer'}-with-qr.png"`
      }
    })

  } catch (error) {
    console.error('Error generating download:', error)
    return NextResponse.json(
      { error: 'Failed to generate download' },
      { status: 500 }
    )
  }
}