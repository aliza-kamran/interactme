# FlyerWeb - Transform Flyers into Interactive Web Pages

A modern SaaS application that uses AI to transform flyers into mobile-responsive web pages with QR codes. Built with Next.js 14, Prisma, MySQL, NextAuth, Stripe, and Gemini AI.

## 🚀 Features

- **AI-Powered Processing**: Gemini AI extracts text, dates, locations, and contact information from flyers
- **Smart Categorization**: Automatically classifies content as Event, Promo, Job, or Newsletter
- **Mobile-First Design**: Responsive templates that work perfectly on all devices
- **QR Code Generation**: Create custom QR codes for easy sharing
- **User Authentication**: Secure Google OAuth integration
- **Subscription Management**: Stripe-powered billing with multiple plans
- **Real-time Processing**: Upload and process flyers instantly
- **Template Library**: Professional templates for different use cases
- **Analytics Dashboard**: Track engagement and performance metrics

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: MySQL
- **Authentication**: NextAuth.js with Google OAuth
- **Payments**: Stripe for subscription management
- **AI**: Google Gemini for flyer data extraction
- **UI Components**: Shadcn/ui with custom styling
- **Notifications**: Sonner for toast messages
- **File Upload**: Custom upload handling with validation

## 📋 Prerequisites

- Node.js 18+
- MySQL database
- Google OAuth credentials
- Stripe account
- Gemini AI API key

## 🔧 Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/flyerweb.git
cd flyerweb
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Fill in your environment variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
DATABASE_URL="mysql://username:password@localhost:3306/flyer_saas"
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
GEMINI_API_KEY=your-gemini-api-key
```

4. **Set up the database**

```bash
npx prisma db push
npx prisma generate
```

5. **Seed the database**

```bash
npx prisma db seed
```

6. **Start the development server**

```bash
npm run dev
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Deploy to Vercel**

```bash
vercel --prod
```

2. **Set up environment variables in Vercel dashboard**

3. **Configure Stripe webhooks**
   - Add webhook endpoint: `https://your-domain.com/api/stripe/webhook`
   - Select events: `checkout.session.completed`, `invoice.payment_succeeded`, etc.

### Manual Deployment

1. **Build the application**

```bash
npm run build
```

2. **Start the production server**

```bash
npm start
```

## 📊 Pricing Plans

- **Free**: 5 flyers/month, basic templates, standard QR codes
- **Pro**: $9.99/month, 50 flyers/month, all templates, custom QR codes, analytics
- **Enterprise**: $29.99/month, unlimited flyers, custom domains, API access

## 🔐 Authentication

The app uses NextAuth.js with Google OAuth. Users are automatically assigned to the Free plan on signup.

## 💳 Payment Integration

Stripe handles all subscription management:

- Checkout sessions for plan upgrades
- Webhook handling for subscription events
- Customer portal for plan management

## 🤖 AI Integration

Gemini AI processes uploaded flyers to extract:

- Title and description
- Date and time information
- Location and address
- Contact information
- Automatic categorization
- Suggested call-to-action buttons

## 📁 Project Structure

```
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── pricing/           # Pricing page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # Shadcn/ui components
│   └── layout/           # Layout components
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   ├── stripe.ts         # Stripe configuration
│   └── gemini.ts         # Gemini AI integration
├── prisma/               # Database schema and migrations
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests (when implemented)
npm test
```

## 🔄 Database Management

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# View database
npx prisma studio

# Reset database
npx prisma db reset
```

## 🚀 Features in Development

- [ ] Advanced analytics dashboard
- [ ] Custom template builder
- [ ] API for external integrations
- [ ] Multi-language support
- [ ] Advanced QR code customization
- [ ] Bulk upload functionality
- [ ] Email notifications
- [ ] Social media integration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

For support, email support@flyerweb.com or join our [Discord server](https://discord.gg/flyerweb).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Prisma](https://prisma.io/) for database management
- [Stripe](https://stripe.com/) for payment processing
- [Gemini AI](https://ai.google.dev/) for AI-powered extraction
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for styling
