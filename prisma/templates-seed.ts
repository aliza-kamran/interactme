import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sampleTemplates = [
  {
    name: "Modern Event Card",
    description: "Clean and modern design perfect for events and conferences",
    category: "Event",
    isPremium: false,
    previewImage: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400",
    htmlContent: `
      <div class="event-card">
        <div class="header">
          <h1 class="title">{{title}}</h1>
          <div class="date-time">
            <div class="date">{{date}}</div>
            <div class="time">{{time}}</div>
          </div>
        </div>
        <div class="content">
          <p class="description">{{description}}</p>
          <div class="location">
            <div class="location-name">{{location}}</div>
            <div class="address">{{address}}</div>
          </div>
        </div>
        <div class="footer">
          <a href="{{buttonUrl}}" class="cta-button">{{buttonText}}</a>
          <div class="contact">
            <div class="phone">{{phone}}</div>
            <div class="email">{{email}}</div>
          </div>
        </div>
      </div>
    `,
    cssContent: `
      .event-card {
        max-width: 400px;
        margin: 0 auto;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 20px;
        padding: 2rem;
        color: white;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      }
      
      .header {
        text-align: center;
        margin-bottom: 2rem;
      }
      
      .title {
        font-size: 1.8rem;
        font-weight: 700;
        margin: 0 0 1rem 0;
        line-height: 1.2;
      }
      
      .date-time {
        display: flex;
        justify-content: center;
        gap: 1rem;
        font-size: 0.9rem;
        opacity: 0.9;
      }
      
      .content {
        margin-bottom: 2rem;
      }
      
      .description {
        font-size: 1rem;
        line-height: 1.6;
        margin: 0 0 1.5rem 0;
        opacity: 0.95;
      }
      
      .location {
        background: rgba(255,255,255,0.1);
        padding: 1rem;
        border-radius: 12px;
        backdrop-filter: blur(10px);
      }
      
      .location-name {
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      
      .address {
        font-size: 0.9rem;
        opacity: 0.9;
      }
      
      .footer {
        text-align: center;
      }
      
      .cta-button {
        display: inline-block;
        background: rgba(255,255,255,0.2);
        color: white;
        text-decoration: none;
        padding: 0.8rem 2rem;
        border-radius: 25px;
        font-weight: 600;
        margin-bottom: 1rem;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.3);
        transition: all 0.3s ease;
      }
      
      .cta-button:hover {
        background: rgba(255,255,255,0.3);
        transform: translateY(-2px);
      }
      
      .contact {
        font-size: 0.8rem;
        opacity: 0.8;
      }
      
      .contact div {
        margin: 0.25rem 0;
      }
    `,
  },
  {
    name: "Vibrant Promotion",
    description: "Eye-catching design for sales and promotional content",
    category: "Promo",
    isPremium: false,
    previewImage: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400",
    htmlContent: `
      <div class="promo-card">
        <div class="badge">SPECIAL OFFER</div>
        <h1 class="title">{{title}}</h1>
        <p class="description">{{description}}</p>
        <div class="offer-details">
          <div class="date">Valid until {{date}}</div>
        </div>
        <a href="{{buttonUrl}}" class="cta-button">{{buttonText}}</a>
        <div class="contact-info">
          <div>{{phone}}</div>
          <div>{{website}}</div>
        </div>
      </div>
    `,
    cssContent: `
      .promo-card {
        max-width: 400px;
        margin: 0 auto;
        background: linear-gradient(45deg, #ff6b6b, #ffa500);
        border-radius: 20px;
        padding: 2rem;
        color: white;
        text-align: center;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        position: relative;
        overflow: hidden;
      }
      
      .promo-card::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
        animation: shimmer 3s ease-in-out infinite;
      }
      
      @keyframes shimmer {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(180deg); }
      }
      
      .badge {
        background: rgba(255,255,255,0.2);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 1rem;
        display: inline-block;
        backdrop-filter: blur(10px);
      }
      
      .title {
        font-size: 2rem;
        font-weight: 800;
        margin: 0 0 1rem 0;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      }
      
      .description {
        font-size: 1.1rem;
        line-height: 1.6;
        margin: 0 0 1.5rem 0;
        opacity: 0.95;
      }
      
      .offer-details {
        background: rgba(0,0,0,0.2);
        padding: 1rem;
        border-radius: 12px;
        margin-bottom: 2rem;
      }
      
      .date {
        font-weight: 600;
      }
      
      .cta-button {
        display: inline-block;
        background: white;
        color: #ff6b6b;
        text-decoration: none;
        padding: 1rem 2.5rem;
        border-radius: 30px;
        font-weight: 700;
        font-size: 1.1rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
      }
      
      .cta-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.3);
      }
      
      .contact-info {
        font-size: 0.9rem;
        opacity: 0.9;
      }
      
      .contact-info div {
        margin: 0.25rem 0;
      }
    `,
  },
  {
    name: "Professional Job Listing",
    description: "Clean and professional template for job postings",
    category: "Job",
    isPremium: false,
    previewImage: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
    htmlContent: `
      <div class="job-card">
        <div class="header">
          <h1 class="title">{{title}}</h1>
          <div class="company">{{location}}</div>
        </div>
        <div class="content">
          <p class="description">{{description}}</p>
          <div class="details">
            <div class="detail-item">
              <strong>Location:</strong> {{address}}
            </div>
            <div class="detail-item">
              <strong>Contact:</strong> {{email}}
            </div>
            <div class="detail-item">
              <strong>Phone:</strong> {{phone}}
            </div>
          </div>
        </div>
        <div class="footer">
          <a href="{{buttonUrl}}" class="apply-button">{{buttonText}}</a>
        </div>
      </div>
    `,
    cssContent: `
      .job-card {
        max-width: 500px;
        margin: 0 auto;
        background: white;
        border-radius: 12px;
        padding: 2.5rem;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1);
        border: 1px solid #e5e7eb;
      }
      
      .header {
        text-align: center;
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 2px solid #f3f4f6;
      }
      
      .title {
        font-size: 1.8rem;
        font-weight: 700;
        color: #1f2937;
        margin: 0 0 0.5rem 0;
      }
      
      .company {
        font-size: 1.1rem;
        color: #6b7280;
        font-weight: 500;
      }
      
      .content {
        margin-bottom: 2rem;
      }
      
      .description {
        font-size: 1rem;
        line-height: 1.7;
        color: #374151;
        margin: 0 0 1.5rem 0;
      }
      
      .details {
        background: #f9fafb;
        padding: 1.5rem;
        border-radius: 8px;
        border-left: 4px solid #3b82f6;
      }
      
      .detail-item {
        margin-bottom: 0.75rem;
        color: #374151;
      }
      
      .detail-item:last-child {
        margin-bottom: 0;
      }
      
      .detail-item strong {
        color: #1f2937;
      }
      
      .footer {
        text-align: center;
      }
      
      .apply-button {
        display: inline-block;
        background: #3b82f6;
        color: white;
        text-decoration: none;
        padding: 0.875rem 2rem;
        border-radius: 8px;
        font-weight: 600;
        font-size: 1rem;
        transition: all 0.2s ease;
      }
      
      .apply-button:hover {
        background: #2563eb;
        transform: translateY(-1px);
      }
    `,
  },
  {
    name: "Newsletter Digest",
    description: "Clean layout perfect for newsletters and announcements",
    category: "Newsletter",
    isPremium: false,
    previewImage: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
    htmlContent: `
      <div class="newsletter">
        <div class="header">
          <h1 class="title">{{title}}</h1>
          <div class="date">{{date}}</div>
        </div>
        <div class="content">
          <p class="description">{{description}}</p>
        </div>
        <div class="footer">
          <a href="{{buttonUrl}}" class="read-more">{{buttonText}}</a>
          <div class="contact">
            <div>{{email}}</div>
            <div>{{website}}</div>
          </div>
        </div>
      </div>
    `,
    cssContent: `
      .newsletter {
        max-width: 600px;
        margin: 0 auto;
        background: white;
        font-family: Georgia, 'Times New Roman', serif;
        line-height: 1.6;
        color: #333;
      }
      
      .header {
        text-align: center;
        padding: 2rem 2rem 1rem;
        border-bottom: 3px solid #2c3e50;
        margin-bottom: 2rem;
      }
      
      .title {
        font-size: 2.2rem;
        font-weight: 700;
        color: #2c3e50;
        margin: 0 0 0.5rem 0;
        letter-spacing: -0.5px;
      }
      
      .date {
        font-size: 0.9rem;
        color: #7f8c8d;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .content {
        padding: 0 2rem;
        margin-bottom: 2rem;
      }
      
      .description {
        font-size: 1.1rem;
        line-height: 1.8;
        margin: 0;
        text-align: justify;
      }
      
      .footer {
        padding: 1.5rem 2rem 2rem;
        text-align: center;
        border-top: 1px solid #ecf0f1;
        background: #f8f9fa;
      }
      
      .read-more {
        display: inline-block;
        background: #2c3e50;
        color: white;
        text-decoration: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        font-weight: 600;
        margin-bottom: 1rem;
        transition: background 0.2s ease;
      }
      
      .read-more:hover {
        background: #34495e;
      }
      
      .contact {
        font-size: 0.85rem;
        color: #7f8c8d;
      }
      
      .contact div {
        margin: 0.25rem 0;
      }
    `,
  },
  {
    name: "Luxury Event",
    description: "Premium template with elegant design for upscale events",
    category: "Event",
    isPremium: true,
    previewImage: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=400",
    htmlContent: `
      <div class="luxury-event">
        <div class="background-pattern"></div>
        <div class="content">
          <div class="header">
            <div class="ornament">✦</div>
            <h1 class="title">{{title}}</h1>
            <div class="ornament">✦</div>
          </div>
          <div class="event-details">
            <div class="detail">
              <div class="label">Date</div>
              <div class="value">{{date}}</div>
            </div>
            <div class="detail">
              <div class="label">Time</div>
              <div class="value">{{time}}</div>
            </div>
            <div class="detail">
              <div class="label">Venue</div>
              <div class="value">{{location}}</div>
            </div>
          </div>
          <p class="description">{{description}}</p>
          <a href="{{buttonUrl}}" class="rsvp-button">{{buttonText}}</a>
          <div class="contact">{{phone}} • {{email}}</div>
        </div>
      </div>
    `,
    cssContent: `
      .luxury-event {
        max-width: 400px;
        margin: 0 auto;
        background: linear-gradient(45deg, #2c1810, #8b4513);
        color: #f5f5dc;
        font-family: 'Playfair Display', Georgia, serif;
        position: relative;
        overflow: hidden;
        border-radius: 0;
        min-height: 600px;
      }
      
      .background-pattern {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
          radial-gradient(circle at 20% 20%, rgba(255,215,0,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255,215,0,0.1) 0%, transparent 50%);
      }
      
      .content {
        position: relative;
        z-index: 2;
        padding: 3rem 2rem;
        text-align: center;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      
      .header {
        margin-bottom: 2rem;
      }
      
      .ornament {
        font-size: 1.5rem;
        color: #ffd700;
        margin: 0.5rem 0;
      }
      
      .title {
        font-size: 2.2rem;
        font-weight: 400;
        margin: 1rem 0;
        letter-spacing: 2px;
        text-transform: uppercase;
      }
      
      .event-details {
        margin-bottom: 2rem;
        background: rgba(0,0,0,0.2);
        padding: 1.5rem;
        border: 1px solid rgba(255,215,0,0.3);
      }
      
      .detail {
        margin-bottom: 1rem;
      }
      
      .detail:last-child {
        margin-bottom: 0;
      }
      
      .label {
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #ffd700;
        margin-bottom: 0.25rem;
      }
      
      .value {
        font-size: 1.1rem;
        font-weight: 300;
      }
      
      .description {
        font-size: 1rem;
        line-height: 1.6;
        margin: 0 0 2rem 0;
        font-style: italic;
      }
      
      .rsvp-button {
        display: inline-block;
        border: 2px solid #ffd700;
        color: #ffd700;
        text-decoration: none;
        padding: 1rem 2rem;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
        margin-bottom: 2rem;
        transition: all 0.3s ease;
        background: transparent;
      }
      
      .rsvp-button:hover {
        background: #ffd700;
        color: #2c1810;
      }
      
      .contact {
        font-size: 0.8rem;
        opacity: 0.8;
      }
    `,
  },
  {
    name: "Corporate Meeting",
    description: "Professional template for business meetings and conferences",
    category: "Event",
    isPremium: false,
    previewImage: "https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=400",
    htmlContent: `
      <div class="corporate-meeting">
        <div class="header">
          <h1 class="title">{{title}}</h1>
          <div class="subtitle">{{description}}</div>
        </div>
        <div class="meeting-details">
          <div class="detail-row">
            <span class="label">Date:</span>
            <span class="value">{{date}}</span>
          </div>
          <div class="detail-row">
            <span class="label">Time:</span>
            <span class="value">{{time}}</span>
          </div>
          <div class="detail-row">
            <span class="label">Location:</span>
            <span class="value">{{location}}</span>
          </div>
        </div>
        <div class="action-section">
          <a href="{{buttonUrl}}" class="join-button">{{buttonText}}</a>
        </div>
        <div class="contact-info">
          <div>{{email}}</div>
          <div>{{phone}}</div>
        </div>
      </div>
    `,
    cssContent: `
      .corporate-meeting {
        max-width: 500px;
        margin: 0 auto;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        font-family: 'Arial', sans-serif;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      }
      
      .header {
        padding: 2rem;
        text-align: center;
        background: rgba(255,255,255,0.1);
      }
      
      .title {
        font-size: 2rem;
        font-weight: bold;
        margin: 0 0 1rem 0;
      }
      
      .subtitle {
        font-size: 1.1rem;
        opacity: 0.9;
      }
      
      .meeting-details {
        padding: 2rem;
        background: rgba(0,0,0,0.1);
      }
      
      .detail-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(255,255,255,0.2);
      }
      
      .label {
        font-weight: bold;
      }
      
      .action-section {
        padding: 2rem;
        text-align: center;
      }
      
      .join-button {
        background: white;
        color: #667eea;
        padding: 1rem 2rem;
        border-radius: 25px;
        text-decoration: none;
        font-weight: bold;
        display: inline-block;
        transition: transform 0.2s;
      }
      
      .join-button:hover {
        transform: translateY(-2px);
      }
      
      .contact-info {
        padding: 1rem 2rem 2rem;
        text-align: center;
        font-size: 0.9rem;
        opacity: 0.8;
      }
      
      .contact-info div {
        margin: 0.25rem 0;
      }
    `,
  },
];

export async function seedTemplates() {
  console.log("Seeding templates...");

  for (const template of sampleTemplates) {
    await prisma.template.upsert({
      where: { name: template.name },
      update: template,
      create: template,
    });
  }

  console.log("Templates seeded successfully!");
}

// Run this if called directly
if (require.main === module) {
  seedTemplates()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
