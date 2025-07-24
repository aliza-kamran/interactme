import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Users,
  Target,
  Heart,
  Award,
  Globe,
  Zap,
  Shield,
  Sparkles,
  ArrowRight,
  Mail,
  MapPin,
  Phone
} from 'lucide-react'

export default function AboutPage() {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former product manager at Google with 10+ years in document automation.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "AI researcher and full-stack developer passionate about making technology accessible.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      bio: "UX designer focused on creating intuitive experiences for complex workflows.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "David Kim",
      role: "Lead Developer",
      bio: "Full-stack engineer with expertise in AI integration and scalable systems.",
      image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ]

  const values = [
    {
      icon: Users,
      title: "User-Centric",
      description: "Every feature we build starts with understanding our users' real needs and challenges."
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "We leverage cutting-edge AI to solve problems that seemed impossible just years ago."
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Your documents and data are protected with enterprise-grade security measures."
    },
    {
      icon: Heart,
      title: "Accessibility",
      description: "We believe powerful tools should be accessible to everyone, regardless of technical skill."
    }
  ]

  const stats = [
    { number: "50K+", label: "Documents Transformed" },
    { number: "10K+", label: "Happy Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="container relative z-10 px-4 py-20 mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              About
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                InteractMe
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              We're on a mission to make every document interactive, engaging, and accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              In a world where attention spans are shrinking and digital engagement is crucial, 
              static documents just don't cut it anymore. We founded InteractMe to bridge the gap 
              between traditional documents and modern digital experiences.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A world where every document is interactive, engaging, and drives meaningful connections.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To democratize document interaction by making powerful tools accessible to everyone.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Our Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Helping thousands of users worldwide create more engaging digital experiences.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-lg text-muted-foreground">
              See how we're making a difference
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="text-center feature-card">
                  <CardHeader>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind InteractMe
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center feature-card">
                <CardHeader>
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Story</h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                InteractMe was born from a simple frustration: why do we still share static PDFs 
                when we live in an interactive digital world? Our founder, Sarah, was organizing 
                a community event and realized that her beautiful event flyer was just sitting 
                there as a static image on social media.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                "What if people could RSVP directly from the flyer? What if they could add the 
                event to their calendar with one click? What if we could track engagement and 
                see who was actually interested?" These questions led to the first prototype 
                of InteractMe.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                Today, we're proud to serve thousands of users worldwide - from small business 
                owners creating interactive product catalogs to event organizers building 
                engaging registration pages. Every document tells a story, and we're here to 
                help you tell yours in the most engaging way possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground">
              We'd love to hear from you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Email Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Have questions? We're here to help.
                </p>
                <a href="mailto:hello@interactme.com" className="text-primary hover:underline">
                  hello@interactme.com
                </a>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Visit Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Come say hello at our office.
                </p>
                <p className="text-sm">
                  123 Innovation Street<br />
                  San Francisco, CA 94105
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Speak with our team directly.
                </p>
                <a href="tel:+1-555-123-4567" className="text-primary hover:underline">
                  +1 (555) 123-4567
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Documents?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users who are already creating interactive experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/try-now">
                <Button size="lg" className="px-8 py-6 text-lg font-semibold">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg font-semibold">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}