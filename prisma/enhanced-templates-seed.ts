import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const enhancedTemplates = [
  // Existing templates (keeping the good ones)
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
      body { margin: 0; padding: 20px; background: #f5f5f5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
      .event-card {
        max-width: 400px;
        margin: 0 auto;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 20px;
        padding: 2rem;
        color: white;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      }
      .header { text-align: center; margin-bottom: 2rem; }
      .title { font-size: 1.8rem; font-weight: 700; margin: 0 0 1rem 0; line-height: 1.2; }
      .date-time { display: flex; justify-content: center; gap: 1rem; font-size: 0.9rem; opacity: 0.9; }
      .content { margin-bottom: 2rem; }
      .description { font-size: 1rem; line-height: 1.6; margin: 0 0 1.5rem 0; opacity: 0.95; }
      .location { background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 12px; backdrop-filter: blur(10px); }
      .location-name { font-weight: 600; margin-bottom: 0.5rem; }
      .address { font-size: 0.9rem; opacity: 0.9; }
      .footer { text-align: center; }
      .cta-button {
        display: inline-block; background: rgba(255,255,255,0.2); color: white; text-decoration: none;
        padding: 0.8rem 2rem; border-radius: 25px; font-weight: 600; margin-bottom: 1rem;
        backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.3); transition: all 0.3s ease;
      }
      .cta-button:hover { background: rgba(255,255,255,0.3); transform: translateY(-2px); }
      .contact { font-size: 0.8rem; opacity: 0.8; }
      .contact div { margin: 0.25rem 0; }
    `,
  },

  // New Enhanced Templates
  {
    name: "Neon Night Event",
    description: "Vibrant neon-style template perfect for nightlife and entertainment events",
    category: "Event",
    isPremium: true,
    previewImage: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400",
    htmlContent: `
      <div class="neon-event">
        <div class="neon-bg"></div>
        <div class="content">
          <h1 class="neon-title">{{title}}</h1>
          <div class="event-info">
            <div class="info-item">
              <span class="label">DATE</span>
              <span class="value">{{date}}</span>
            </div>
            <div class="info-item">
              <span class="label">TIME</span>
              <span class="value">{{time}}</span>
            </div>
            <div class="info-item">
              <span class="label">VENUE</span>
              <span class="value">{{location}}</span>
            </div>
          </div>
          <p class="description">{{description}}</p>
          <a href="{{buttonUrl}}" class="neon-button">{{buttonText}}</a>
          <div class="contact-info">
            <div>{{phone}}</div>
            <div>{{email}}</div>
          </div>
        </div>
      </div>
    `,
    cssContent: `
      body { margin: 0; padding: 0; background: #000; font-family: 'Orbitron', monospace; overflow-x: hidden; }
      .neon-event {
        min-height: 100vh; background: radial-gradient(circle at center, #1a0033 0%, #000 100%);
        position: relative; display: flex; align-items: center; justify-content: center; padding: 2rem;
      }
      .neon-bg {
        position: absolute; top: 0; left: 0; right: 0; bottom: 0;
        background: 
          linear-gradient(45deg, transparent 30%, rgba(255,0,255,0.1) 50%, transparent 70%),
          linear-gradient(-45deg, transparent 30%, rgba(0,255,255,0.1) 50%, transparent 70%);
        animation: pulse 4s ease-in-out infinite;
      }
      @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
      .content { position: relative; z-index: 2; text-align: center; max-width: 500px; }
      .neon-title {
        font-size: 3rem; font-weight: 900; margin-bottom: 2rem; text-transform: uppercase;
        color: #fff; text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff;
        animation: flicker 2s infinite alternate;
      }
      @keyframes flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
      .event-info { margin-bottom: 2rem; }
      .info-item {
        display: flex; justify-content: space-between; align-items: center;
        padding: 1rem; margin-bottom: 0.5rem; border: 1px solid #00ffff;
        background: rgba(0,255,255,0.1); backdrop-filter: blur(10px);
      }
      .label { color: #00ffff; font-weight: bold; font-size: 0.8rem; }
      .value { color: #fff; font-size: 1rem; }
      .description { color: #ccc; font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; }
      .neon-button {
        display: inline-block; padding: 1rem 3rem; background: transparent;
        border: 2px solid #ff00ff; color: #ff00ff; text-decoration: none;
        font-weight: bold; text-transform: uppercase; letter-spacing: 2px;
        transition: all 0.3s ease; margin-bottom: 2rem;
        box-shadow: 0 0 20px rgba(255,0,255,0.3);
      }
      .neon-button:hover {
        background: #ff00ff; color: #000; box-shadow: 0 0 30px #ff00ff;
        text-shadow: none;
      }
      .contact-info { color: #888; font-size: 0.9rem; }
      .contact-info div { margin: 0.5rem 0; }
    `,
  },

  {
    name: "Minimalist Professional",
    description: "Clean, minimal design perfect for corporate events and professional gatherings",
    category: "Event",
    isPremium: false,
    previewImage: "https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=400",
    htmlContent: `
      <div class="minimal-event">
        <div class="header-section">
          <div class="date-badge">{{date}}</div>
          <h1 class="event-title">{{title}}</h1>
          <p class="event-subtitle">{{description}}</p>
        </div>
        <div class="details-section">
          <div class="detail-grid">
            <div class="detail-item">
              <h3>Time</h3>
              <p>{{time}}</p>
            </div>
            <div class="detail-item">
              <h3>Location</h3>
              <p>{{location}}</p>
            </div>
            <div class="detail-item">
              <h3>Address</h3>
              <p>{{address}}</p>
            </div>
            <div class="detail-item">
              <h3>Contact</h3>
              <p>{{phone}}</p>
            </div>
          </div>
        </div>
        <div class="action-section">
          <a href="{{buttonUrl}}" class="action-button">{{buttonText}}</a>
        </div>
      </div>
    `,
    cssContent: `
      body { margin: 0; padding: 20px; background: #f8f9fa; font-family: 'Inter', sans-serif; }
      .minimal-event {
        max-width: 600px; margin: 0 auto; background: white;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-radius: 12px; overflow: hidden;
      }
      .header-section { padding: 3rem 2rem; text-align: center; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); }
      .date-badge {
        display: inline-block; background: #007bff; color: white; padding: 0.5rem 1rem;
        border-radius: 20px; font-size: 0.9rem; font-weight: 600; margin-bottom: 1rem;
      }
      .event-title { font-size: 2.5rem; font-weight: 700; color: #212529; margin: 0 0 1rem 0; line-height: 1.2; }
      .event-subtitle { font-size: 1.2rem; color: #6c757d; margin: 0; line-height: 1.5; }
      .details-section { padding: 2rem; }
      .detail-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
      .detail-item { padding: 1.5rem; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #007bff; }
      .detail-item h3 { margin: 0 0 0.5rem 0; font-size: 0.9rem; font-weight: 600; color: #007bff; text-transform: uppercase; }
      .detail-item p { margin: 0; font-size: 1rem; color: #212529; }
      .action-section { padding: 2rem; text-align: center; background: #f8f9fa; }
      .action-button {
        display: inline-block; background: #007bff; color: white; text-decoration: none;
        padding: 1rem 2.5rem; border-radius: 6px; font-weight: 600; font-size: 1.1rem;
        transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,123,255,0.2);
      }
      .action-button:hover { background: #0056b3; transform: translateY(-1px); box-shadow: 0 4px 8px rgba(0,123,255,0.3); }
    `,
  },

  {
    name: "Flash Sale Promo",
    description: "High-energy design perfect for flash sales and urgent promotions",
    category: "Promo",
    isPremium: false,
    previewImage: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400",
    htmlContent: `
      <div class="flash-sale">
        <div class="flash-header">
          <div class="flash-badge">FLASH SALE</div>
          <h1 class="sale-title">{{title}}</h1>
          <div class="countdown">Limited Time Only!</div>
        </div>
        <div class="sale-content">
          <p class="sale-description">{{description}}</p>
          <div class="offer-highlight">
            <div class="offer-text">Valid until {{date}}</div>
          </div>
        </div>
        <div class="action-zone">
          <a href="{{buttonUrl}}" class="flash-button">{{buttonText}}</a>
          <div class="contact-details">
            <div>📞 {{phone}}</div>
            <div>🌐 {{website}}</div>
          </div>
        </div>
      </div>
    `,
    cssContent: `
      body { margin: 0; padding: 20px; background: linear-gradient(45deg, #ff6b6b, #ffa500); font-family: 'Arial Black', Arial, sans-serif; }
      .flash-sale {
        max-width: 400px; margin: 0 auto; background: white; border-radius: 20px;
        overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.2); position: relative;
      }
      .flash-sale::before {
        content: ''; position: absolute; top: -2px; left: -2px; right: -2px; bottom: -2px;
        background: linear-gradient(45deg, #ff6b6b, #ffa500, #ff6b6b); z-index: -1; border-radius: 22px;
        animation: rotate 3s linear infinite;
      }
      @keyframes rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      .flash-header { background: linear-gradient(135deg, #ff6b6b, #ffa500); color: white; padding: 2rem; text-align: center; }
      .flash-badge {
        background: rgba(255,255,255,0.2); padding: 0.5rem 1rem; border-radius: 20px;
        font-size: 0.8rem; font-weight: bold; margin-bottom: 1rem; display: inline-block;
        animation: pulse 2s infinite;
      }
      @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      .sale-title { font-size: 2.2rem; font-weight: 900; margin: 0 0 1rem 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
      .countdown { font-size: 1rem; font-weight: bold; opacity: 0.9; }
      .sale-content { padding: 2rem; text-align: center; }
      .sale-description { font-size: 1.1rem; line-height: 1.6; color: #333; margin-bottom: 1.5rem; }
      .offer-highlight {
        background: linear-gradient(135deg, #ff6b6b, #ffa500); color: white; padding: 1rem;
        border-radius: 12px; margin-bottom: 1.5rem;
      }
      .offer-text { font-weight: bold; font-size: 1.1rem; }
      .action-zone { padding: 0 2rem 2rem; text-align: center; }
      .flash-button {
        display: inline-block; background: linear-gradient(135deg, #ff6b6b, #ffa500);
        color: white; text-decoration: none; padding: 1rem 2.5rem; border-radius: 30px;
        font-weight: bold; font-size: 1.2rem; margin-bottom: 1.5rem;
        box-shadow: 0 10px 20px rgba(255,107,107,0.3); transition: all 0.3s ease;
        animation: bounce 2s infinite;
      }
      @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
      .flash-button:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(255,107,107,0.4); }
      .contact-details { font-size: 0.9rem; color: #666; }
      .contact-details div { margin: 0.25rem 0; }
    `,
  },

  {
    name: "Tech Job Opening",
    description: "Modern tech-focused design for software and IT job postings",
    category: "Job",
    isPremium: false,
    previewImage: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
    htmlContent: `
      <div class="tech-job">
        <div class="job-header">
          <div class="company-info">
            <h2 class="company-name">{{location}}</h2>
            <div class="job-type">Full-time Position</div>
          </div>
          <h1 class="job-title">{{title}}</h1>
        </div>
        <div class="job-details">
          <div class="description-section">
            <h3>About the Role</h3>
            <p class="job-description">{{description}}</p>
          </div>
          <div class="info-grid">
            <div class="info-card">
              <h4>📍 Location</h4>
              <p>{{address}}</p>
            </div>
            <div class="info-card">
              <h4>📧 Contact</h4>
              <p>{{email}}</p>
            </div>
            <div class="info-card">
              <h4>📞 Phone</h4>
              <p>{{phone}}</p>
            </div>
            <div class="info-card">
              <h4>⏰ Apply By</h4>
              <p>{{date}}</p>
            </div>
          </div>
        </div>
        <div class="apply-section">
          <a href="{{buttonUrl}}" class="apply-button">{{buttonText}}</a>
          <p class="apply-note">Join our innovative team and shape the future of technology</p>
        </div>
      </div>
    `,
    cssContent: `
      body { margin: 0; padding: 20px; background: #f0f2f5; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif; }
      .tech-job {
        max-width: 700px; margin: 0 auto; background: white; border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.1); overflow: hidden;
      }
      .job-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 3rem 2rem;
      }
      .company-info { margin-bottom: 1rem; }
      .company-name { font-size: 1.2rem; font-weight: 600; margin: 0; opacity: 0.9; }
      .job-type {
        background: rgba(255,255,255,0.2); padding: 0.3rem 0.8rem; border-radius: 12px;
        font-size: 0.8rem; display: inline-block; margin-top: 0.5rem;
      }
      .job-title { font-size: 2.5rem; font-weight: 700; margin: 1rem 0 0 0; line-height: 1.2; }
      .job-details { padding: 2.5rem 2rem; }
      .description-section { margin-bottom: 2rem; }
      .description-section h3 { color: #333; font-size: 1.3rem; margin-bottom: 1rem; }
      .job-description { color: #555; font-size: 1.1rem; line-height: 1.7; }
      .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; }
      .info-card {
        background: #f8f9fa; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #667eea;
      }
      .info-card h4 { margin: 0 0 0.5rem 0; color: #333; font-size: 1rem; }
      .info-card p { margin: 0; color: #555; font-size: 0.95rem; }
      .apply-section { padding: 2rem; text-align: center; background: #f8f9fa; }
      .apply-button {
        display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white; text-decoration: none; padding: 1rem 3rem; border-radius: 30px;
        font-weight: 600; font-size: 1.1rem; margin-bottom: 1rem;
        box-shadow: 0 4px 15px rgba(102,126,234,0.3); transition: all 0.3s ease;
      }
      .apply-button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(102,126,234,0.4); }
      .apply-note { color: #666; font-size: 0.9rem; margin: 0; font-style: italic; }
    `,
  },

  {
    name: "Creative Newsletter",
    description: "Artistic and engaging design for creative newsletters and announcements",
    category: "Newsletter",
    isPremium: true,
    previewImage: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
    htmlContent: `
      <div class="creative-newsletter">
        <div class="newsletter-header">
          <div class="header-decoration"></div>
          <h1 class="newsletter-title">{{title}}</h1>
          <div class="issue-date">{{date}}</div>
          <div class="header-decoration"></div>
        </div>
        <div class="newsletter-content">
          <div class="content-wrapper">
            <p class="newsletter-description">{{description}}</p>
            <div class="highlight-section">
              <div class="highlight-text">Stay connected with our latest updates and insights</div>
            </div>
          </div>
        </div>
        <div class="newsletter-footer">
          <a href="{{buttonUrl}}" class="read-more-button">{{buttonText}}</a>
          <div class="contact-section">
            <div class="contact-item">✉️ {{email}}</div>
            <div class="contact-item">🌐 {{website}}</div>
          </div>
        </div>
      </div>
    `,
    cssContent: `
      body { margin: 0; padding: 20px; background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%); font-family: 'Playfair Display', Georgia, serif; }
      .creative-newsletter {
        max-width: 600px; margin: 0 auto; background: white; border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.1); overflow: hidden; position: relative;
      }
      .creative-newsletter::before {
        content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px;
        background: linear-gradient(90deg, #e17055, #fdcb6e, #6c5ce7, #a29bfe);
      }
      .newsletter-header { padding: 3rem 2rem 2rem; text-align: center; background: #ffeaa7; }
      .header-decoration {
        width: 60px; height: 3px; background: linear-gradient(90deg, #e17055, #fdcb6e);
        margin: 1rem auto; border-radius: 2px;
      }
      .newsletter-title {
        font-size: 2.8rem; font-weight: 700; color: #2d3436; margin: 0; line-height: 1.2;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
      }
      .issue-date {
        font-size: 1rem; color: #636e72; margin-top: 0.5rem; font-style: italic;
        text-transform: uppercase; letter-spacing: 1px;
      }
      .newsletter-content { padding: 3rem 2rem; }
      .content-wrapper { max-width: 500px; margin: 0 auto; }
      .newsletter-description {
        font-size: 1.2rem; line-height: 1.8; color: #2d3436; text-align: justify; margin-bottom: 2rem;
      }
      .highlight-section {
        background: linear-gradient(135deg, #6c5ce7, #a29bfe); color: white; padding: 2rem;
        border-radius: 15px; text-align: center; margin-bottom: 2rem;
        box-shadow: 0 10px 30px rgba(108,92,231,0.2);
      }
      .highlight-text { font-size: 1.1rem; font-weight: 600; font-style: italic; }
      .newsletter-footer { padding: 2rem; background: #f8f9fa; text-align: center; }
      .read-more-button {
        display: inline-block; background: linear-gradient(135deg, #e17055, #fdcb6e);
        color: white; text-decoration: none; padding: 1rem 2.5rem; border-radius: 25px;
        font-weight: 600; font-size: 1.1rem; margin-bottom: 2rem;
        box-shadow: 0 8px 20px rgba(225,112,85,0.3); transition: all 0.3s ease;
      }
      .read-more-button:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(225,112,85,0.4); }
      .contact-section { font-size: 0.9rem; color: #636e72; }
      .contact-item { margin: 0.5rem 0; }
    `,
  },

  {
    name: "Luxury Brand Promo",
    description: "Elegant and sophisticated design for premium brand promotions",
    category: "Promo",
    isPremium: true,
    previewImage: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=400",
    htmlContent: `
      <div class="luxury-promo">
        <div class="luxury-header">
          <div class="brand-ornament">◆</div>
          <h1 class="luxury-title">{{title}}</h1>
          <div class="brand-ornament">◆</div>
        </div>
        <div class="luxury-content">
          <p class="luxury-description">{{description}}</p>
          <div class="offer-details">
            <div class="offer-label">Exclusive Offer</div>
            <div class="offer-validity">Valid until {{date}}</div>
          </div>
        </div>
        <div class="luxury-action">
          <a href="{{buttonUrl}}" class="luxury-button">{{buttonText}}</a>
          <div class="luxury-contact">
            <div class="contact-line">{{phone}}</div>
            <div class="contact-line">{{website}}</div>
          </div>
        </div>
      </div>
    `,
    cssContent: `
      body { margin: 0; padding: 20px; background: #1a1a1a; font-family: 'Cormorant Garamond', serif; }
      .luxury-promo {
        max-width: 450px; margin: 0 auto; background: linear-gradient(135deg, #2c1810, #8b4513);
        color: #f5f5dc; border-radius: 0; position: relative; overflow: hidden;
        box-shadow: 0 30px 60px rgba(0,0,0,0.5);
      }
      .luxury-promo::before {
        content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
        background: radial-gradient(circle at 30% 30%, rgba(255,215,0,0.1) 0%, transparent 50%),
                    radial-gradient(circle at 70% 70%, rgba(255,215,0,0.1) 0%, transparent 50%);
      }
      .luxury-header { padding: 3rem 2rem; text-align: center; position: relative; z-index: 2; }
      .brand-ornament { font-size: 2rem; color: #ffd700; margin: 1rem 0; }
      .luxury-title {
        font-size: 2.5rem; font-weight: 400; margin: 1rem 0; letter-spacing: 3px;
        text-transform: uppercase; line-height: 1.2;
      }
      .luxury-content { padding: 2rem; position: relative; z-index: 2; }
      .luxury-description {
        font-size: 1.2rem; line-height: 1.8; text-align: center; margin-bottom: 2rem;
        font-style: italic;
      }
      .offer-details {
        background: rgba(0,0,0,0.3); padding: 2rem; border: 1px solid rgba(255,215,0,0.3);
        text-align: center; margin-bottom: 2rem;
      }
      .offer-label {
        font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; color: #ffd700;
        margin-bottom: 0.5rem;
      }
      .offer-validity { font-size: 1.1rem; font-weight: 300; }
      .luxury-action { padding: 2rem; text-align: center; position: relative; z-index: 2; }
      .luxury-button {
        display: inline-block; border: 2px solid #ffd700; color: #ffd700; text-decoration: none;
        padding: 1.2rem 3rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
        margin-bottom: 2rem; transition: all 0.4s ease; background: transparent;
      }
      .luxury-button:hover { background: #ffd700; color: #2c1810; }
      .luxury-contact { font-size: 0.9rem; opacity: 0.8; }
      .contact-line { margin: 0.5rem 0; }
    `,
  }
];

export async function seedEnhancedTemplates() {
  console.log("Seeding enhanced templates...");

  for (const template of enhancedTemplates) {
    await prisma.template.upsert({
      where: { name: template.name },
      update: template,
      create: template,
    });
  }

  console.log("Enhanced templates seeded successfully!");
}

// Run this if called directly
if (require.main === module) {
  seedEnhancedTemplates()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}