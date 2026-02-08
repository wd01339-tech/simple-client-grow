# WordPress Migration Guide

**Complete documentation for recreating Simple Client Grow in WordPress**

Generated: February 2026

---

## 📁 Recommended Theme Structure

```
simple-client-grow/
├── front-page.php           # Home page template
├── header.php               # Global header
├── footer.php               # Global footer
├── functions.php            # Theme setup & includes
├── style.css                # Theme metadata + base styles
├── index.php                # Fallback template
├── screenshot.png           # Theme preview (1200×900)
│
├── template-parts/          # Modular sections
│   ├── hero.php
│   ├── client-logos.php
│   ├── services.php
│   ├── packages.php
│   ├── portfolio.php
│   ├── about.php
│   ├── lead-magnet.php
│   ├── testimonials.php
│   └── cta.php
│
├── assets/
│   ├── css/
│   │   ├── main.css         # Primary styles
│   │   ├── variables.css    # CSS custom properties
│   │   └── utilities.css    # Helper classes
│   ├── js/
│   │   ├── main.js          # Core functionality
│   │   ├── animations.js    # Scroll animations
│   │   └── whatsapp.js      # WhatsApp click-to-chat
│   └── images/              # Theme images (copy from src/assets/)
│
├── inc/
│   ├── customizer.php       # WordPress Customizer controls
│   ├── forms.php            # Contact form handling
│   ├── crm.php              # Lead pipeline logic
│   ├── payments.php         # Payment gateway links
│   ├── utm-tracking.php     # UTM cookie persistence
│   └── seo.php              # Schema markup
│
└── page-templates/
    ├── page-about.php
    ├── page-services.php
    ├── page-pricing.php
    ├── page-portfolio.php
    ├── page-contact.php
    ├── page-free-audit.php
    └── page-blog.php
```

---

## 🎨 Design System (CSS Variables)

### `assets/css/variables.css`

```css
:root {
  /* === COLORS (HSL format) === */
  
  /* Primary: Blue */
  --primary: 217 91% 60%;
  --primary-foreground: 0 0% 100%;
  
  /* Secondary: Purple */
  --secondary: 263 70% 50%;
  --secondary-foreground: 0 0% 100%;
  
  /* Accent: Red/Pink */
  --accent: 347 77% 50%;
  --accent-foreground: 0 0% 100%;
  
  /* Backgrounds */
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  
  /* Cards */
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;
  
  /* Muted */
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;
  
  /* Borders */
  --border: 214 32% 91%;
  --input: 214 32% 91%;
  --ring: 217 91% 60%;
  
  /* Destructive */
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  
  /* Gradients */
  --gradient-start: 217 91% 60%;
  --gradient-mid: 263 70% 50%;
  --gradient-end: 347 77% 50%;
  
  /* Radius */
  --radius: 0.75rem;
}

/* === DARK MODE === */
.dark,
[data-theme="dark"] {
  --background: 222 47% 5%;
  --foreground: 210 40% 98%;
  --card: 222 47% 8%;
  --card-foreground: 210 40% 98%;
  --muted: 217 33% 17%;
  --muted-foreground: 215 20% 65%;
  --border: 217 33% 17%;
  --input: 217 33% 17%;
}
```

### `assets/css/main.css`

```css
/* === FONTS === */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

/* === BASE === */
* {
  box-sizing: border-box;
  border-color: hsl(var(--border));
}

body {
  font-family: 'Inter', sans-serif;
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* === UTILITY CLASSES === */
.gradient-text {
  background: linear-gradient(90deg, 
    hsl(var(--primary)), 
    hsl(var(--secondary)), 
    hsl(var(--accent))
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-bg {
  background: linear-gradient(135deg, 
    hsl(var(--primary)), 
    hsl(var(--secondary)), 
    hsl(var(--accent))
  );
}

.gradient-bg-subtle {
  background: linear-gradient(135deg, 
    hsl(var(--primary) / 0.1), 
    hsl(var(--secondary) / 0.1), 
    hsl(var(--accent) / 0.1)
  );
}

.glass {
  background: hsl(var(--background) / 0.8);
  backdrop-filter: blur(24px);
  border: 1px solid hsl(var(--border) / 0.5);
}

/* === BUTTONS === */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: var(--radius);
  transition: all 0.2s;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.btn-primary:hover {
  background: hsl(var(--primary) / 0.9);
  transform: translateY(-1px);
}

.btn-gradient {
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)));
  color: white;
}

.btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -10px hsl(var(--primary) / 0.5);
}

.btn-whatsapp {
  background: #25D366;
  color: white;
}

.btn-whatsapp:hover {
  background: #20bd5a;
}

.btn-hero {
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)));
  color: white;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: calc(var(--radius) + 0.25rem);
  box-shadow: 0 10px 30px -10px hsl(var(--primary) / 0.4);
}

.btn-animated-gradient {
  background: linear-gradient(90deg,
    hsl(263 70% 50%),
    hsl(45 100% 55%),
    hsl(280 70% 55%),
    hsl(263 70% 50%)
  );
  background-size: 300% 100%;
  animation: gradient-shift 3s ease infinite, pulse-glow 2s ease-in-out infinite;
  color: white;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 15px 2px hsl(263 70% 50% / 0.4); }
  50% { box-shadow: 0 0 25px 5px hsl(263 70% 50% / 0.6); }
}

/* === CARDS === */
.card {
  background: hsl(var(--card));
  color: hsl(var(--card-foreground));
  border-radius: calc(var(--radius) * 1.5);
  border: 1px solid hsl(var(--border) / 0.5);
  box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.1);
}

/* === CONTAINER === */
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container { padding: 0 1.5rem; }
}

@media (min-width: 1024px) {
  .container { padding: 0 2rem; }
}

/* === SECTIONS === */
.section {
  padding: 6rem 0;
}

.section-muted {
  background: hsl(var(--muted) / 0.3);
}
```

---

## 📄 Section Content & Templates

### HERO SECTION

**File:** `template-parts/hero.php`

```php
<?php
$hero_title = get_theme_mod('hero_title', 'Helping Small Businesses <span class="gradient-text">Grow Online</span> — Simply & Affordably');
$hero_subtitle = get_theme_mod('hero_subtitle', 'Remote freelance consultant helping homestays, tourism businesses, ecommerce stores, and local services improve visibility, inquiries, and online presence — without agency complexity.');
$hero_image = get_theme_mod('hero_image', get_template_directory_uri() . '/assets/images/hero-consultant-enhanced.png');
?>

<section class="hero" id="hero">
  <div class="hero-bg">
    <div class="hero-gradient"></div>
    <div class="hero-blur-1"></div>
    <div class="hero-blur-2"></div>
  </div>
  
  <div class="container">
    <div class="hero-grid">
      <!-- Mobile Image -->
      <div class="hero-image-mobile">
        <div class="image-glow"></div>
        <div class="image-wrapper aspect-4-5">
          <img 
            src="<?php echo esc_url($hero_image); ?>" 
            alt="Freelance digital consultant helping small businesses, tourism brands, and local services grow online"
            width="320"
            height="400"
            loading="eager"
          >
        </div>
      </div>
      
      <!-- Content -->
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          <span>Freelance Digital Consultant</span>
        </div>
        
        <h1 class="hero-title"><?php echo wp_kses_post($hero_title); ?></h1>
        
        <p class="hero-subtitle"><?php echo esc_html($hero_subtitle); ?></p>
        
        <div class="hero-benefits">
          <div class="benefit">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-width="2"/>
              <polyline points="22,4 12,14.01 9,11.01" stroke-width="2"/>
            </svg>
            <span>Remote & Affordable</span>
          </div>
          <div class="benefit">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-width="2"/>
              <polyline points="22,4 12,14.01 9,11.01" stroke-width="2"/>
            </svg>
            <span>Personal One-to-One Support</span>
          </div>
          <div class="benefit">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-width="2"/>
              <polyline points="22,4 12,14.01 9,11.01" stroke-width="2"/>
            </svg>
            <span>Results-Focused Solutions</span>
          </div>
        </div>
        
        <div class="hero-ctas">
          <a href="<?php echo esc_url(home_url('/free-audit/')); ?>" class="btn btn-hero">
            Get a Free Website & GMB Audit
            <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12,5 19,12 12,19"/>
            </svg>
          </a>
          <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn btn-animated-gradient">
            <svg class="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Book a Free Discovery Call
          </a>
        </div>
        
        <p class="hero-trust">✨ Free audit includes website & Google Business Profile review</p>
      </div>
      
      <!-- Desktop Image -->
      <div class="hero-image-desktop">
        <div class="image-glow"></div>
        <div class="image-wrapper aspect-16-9">
          <img 
            src="<?php echo esc_url($hero_image); ?>" 
            alt="Freelance digital consultant helping small businesses, tourism brands, and local services grow online"
            width="560"
            height="315"
            loading="eager"
          >
        </div>
        <div class="availability-badge">
          <span class="pulse-dot"></span>
          <span>Available for Projects</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

### SERVICES SECTION

**File:** `template-parts/services.php`

**Content Data:**

| Service | Icon | Description |
|---------|------|-------------|
| Website & Landing Page Support | Globe | Clean, mobile-friendly websites that turn visitors into inquiries. Simple designs that work, without the complexity. |
| Digital Marketing | TrendingUp | Improve online visibility without high budgets or jargon. Organic growth and simple ad strategies that actually work. |
| Lead Generation & Social Media | Users | Focus on messages, calls, and bookings — not vanity metrics. Real results for real businesses. |
| Google Business Profile Management | MapPin | Get found on Google Maps. Profile setup, keyword optimization, and review strategies for local visibility. |

```php
<?php
$services = [
  [
    'icon' => 'globe',
    'title' => 'Website & Landing Page Support',
    'description' => 'Clean, mobile-friendly websites that turn visitors into inquiries. Simple designs that work, without the complexity.',
    'image' => 'service-website.jpg',
    'color' => 'primary'
  ],
  [
    'icon' => 'trending-up',
    'title' => 'Digital Marketing',
    'description' => 'Improve online visibility without high budgets or jargon. Organic growth and simple ad strategies that actually work.',
    'image' => 'service-marketing.jpg',
    'color' => 'secondary'
  ],
  [
    'icon' => 'users',
    'title' => 'Lead Generation & Social Media',
    'description' => 'Focus on messages, calls, and bookings — not vanity metrics. Real results for real businesses.',
    'image' => 'service-leads.jpg',
    'color' => 'accent'
  ],
  [
    'icon' => 'map-pin',
    'title' => 'Google Business Profile Management',
    'description' => 'Get found on Google Maps. Profile setup, keyword optimization, and review strategies for local visibility.',
    'image' => 'service-gmb.jpg',
    'color' => 'primary'
  ]
];
?>

<section class="section section-muted" id="services">
  <div class="container">
    <div class="section-header text-center">
      <span class="section-label">What I Do</span>
      <h2 class="section-title">
        Simple Digital Solutions for <span class="gradient-text">Real Results</span>
      </h2>
      <p class="section-subtitle">
        No complicated packages or confusing tech talk. Just practical support 
        that helps your business get found online and attract more customers.
      </p>
    </div>
    
    <div class="services-grid">
      <?php foreach ($services as $service): ?>
      <div class="service-card card">
        <div class="service-image">
          <img 
            src="<?php echo get_template_directory_uri() . '/assets/images/' . $service['image']; ?>" 
            alt="<?php echo esc_attr($service['title']); ?>"
            loading="lazy"
          >
          <div class="service-icon service-icon-<?php echo $service['color']; ?>">
            <?php get_template_part('assets/icons/' . $service['icon']); ?>
          </div>
        </div>
        <div class="service-content">
          <h3><?php echo esc_html($service['title']); ?></h3>
          <p><?php echo esc_html($service['description']); ?></p>
          <a href="<?php echo esc_url(home_url('/services/')); ?>" class="service-link">
            Learn more →
          </a>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
    
    <div class="text-center mt-12">
      <a href="<?php echo esc_url(home_url('/services/')); ?>" class="btn btn-gradient">
        View All Services
      </a>
    </div>
  </div>
</section>
```

---

### CLIENT LOGOS SECTION

**File:** `template-parts/client-logos.php`

```php
<?php
$clients = [
  ['name' => 'Hotel Boutique', 'logo' => 'client-logo-1.png'],
  ['name' => 'Coffee House', 'logo' => 'client-logo-2.png'],
  ['name' => 'Wellness Spa', 'logo' => 'client-logo-3.png'],
  ['name' => 'Fine Dining', 'logo' => 'client-logo-4.png'],
  ['name' => 'Retail Shop', 'logo' => 'client-logo-5.png'],
  ['name' => 'Real Estate', 'logo' => 'client-logo-6.png'],
];
?>

<section class="client-logos section-muted" id="clients">
  <div class="container">
    <div class="section-header text-center">
      <span class="section-label">Trusted By</span>
      <h2 class="section-title-sm">Businesses We've Helped Grow</h2>
    </div>
  </div>
  
  <!-- Infinite scroll marquee -->
  <div class="logo-marquee">
    <div class="logo-marquee-fade-left"></div>
    <div class="logo-marquee-fade-right"></div>
    
    <div class="logo-track">
      <?php 
      // Double the array for seamless loop
      $all_clients = array_merge($clients, $clients);
      foreach ($all_clients as $client): 
      ?>
      <div class="logo-item">
        <img 
          src="<?php echo get_template_directory_uri() . '/assets/images/' . $client['logo']; ?>" 
          alt="<?php echo esc_attr($client['name']); ?>"
          loading="lazy"
        >
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<style>
.logo-marquee {
  position: relative;
  overflow: hidden;
  padding: 2rem 0;
}

.logo-marquee-fade-left,
.logo-marquee-fade-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 8rem;
  z-index: 10;
  pointer-events: none;
}

.logo-marquee-fade-left {
  left: 0;
  background: linear-gradient(to right, hsl(var(--muted) / 0.3), transparent);
}

.logo-marquee-fade-right {
  right: 0;
  background: linear-gradient(to left, hsl(var(--muted) / 0.3), transparent);
}

.logo-track {
  display: flex;
  gap: 4rem;
  animation: scroll-logos 30s linear infinite;
}

.logo-item {
  flex-shrink: 0;
  width: 8rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s;
}

.logo-item:hover {
  filter: grayscale(0%);
  opacity: 1;
}

.logo-item img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

@keyframes scroll-logos {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
```

---

### PACKAGES/PRICING SECTION

**File:** `template-parts/packages.php`

```php
<?php
$packages = [
  [
    'id' => 'starter',
    'name' => 'Starter Setup',
    'tagline' => 'Quick wins for new businesses',
    'icon' => 'zap',
    'best_for' => 'First-time clients, new websites, solo entrepreneurs',
    'price' => '$99',
    'price_type' => 'one-time',
    'features' => [
      'Complete website audit & report',
      'Google My Business setup or cleanup',
      'Basic SEO optimization (titles, meta descriptions)',
      'Mobile responsiveness check & fixes',
      'WhatsApp click-to-chat integration',
      'One revision round included',
    ],
    'cta_label' => 'Get Started – $99',
    'whatsapp_msg' => "Hi! I'm interested in the Starter Setup package ($99). Can you tell me more?",
    'popular' => false,
    'color' => 'primary',
  ],
  [
    'id' => 'growth',
    'name' => 'Growth Boost',
    'tagline' => 'Complete optimization for growing businesses',
    'icon' => 'sparkles',
    'best_for' => 'Homestays, tourism services, small e-commerce stores',
    'price' => '$249',
    'price_type' => 'one-time',
    'features' => [
      'Everything in Starter Setup',
      'Full website optimization (up to 10 pages)',
      'Advanced SEO with keyword research',
      'Google My Business optimization',
      'Lead generation forms + CTA optimization',
      'Social media profile setup & linking',
      'Conversion-focused content improvements',
      'Two revision rounds included',
    ],
    'cta_label' => 'Buy Growth Boost – $249',
    'whatsapp_msg' => "Hi! I'm interested in the Growth Boost package ($249). I'd like to discuss my business needs.",
    'popular' => true,
    'color' => 'secondary',
  ],
  [
    'id' => 'monthly-support',
    'name' => 'Monthly Support',
    'tagline' => 'Ongoing optimization & peace of mind',
    'icon' => 'trending-up',
    'best_for' => 'Businesses needing regular updates and support',
    'price' => '$149',
    'price_type' => 'monthly',
    'features' => [
      'Monthly website maintenance & updates',
      'Google My Business management',
      'Review monitoring & response guidance',
      'Monthly performance report',
      'Priority email & WhatsApp support',
      '1 content update per month',
      'Technical issue resolution',
      'Cancel anytime – no lock-in',
    ],
    'cta_label' => 'Start Monthly – $149/mo',
    'whatsapp_msg' => "Hi! I'm interested in the Monthly Support package ($149/month). Can we discuss my ongoing needs?",
    'popular' => false,
    'color' => 'accent',
  ],
  [
    'id' => 'premium',
    'name' => 'Premium Partner',
    'tagline' => 'Full-service digital growth partner',
    'icon' => 'crown',
    'best_for' => 'Growing tourism brands, established e-commerce stores',
    'price' => '$349',
    'price_type' => 'monthly',
    'features' => [
      'Everything in Monthly Support',
      'Dedicated priority support',
      'Weekly performance monitoring',
      'Advanced SEO & content strategy',
      'Up to 4 content updates per month',
      'Competitor analysis & insights',
      'Conversion rate optimization',
      'Monthly strategy call (30 min)',
      'Cancel anytime – no lock-in',
    ],
    'cta_label' => 'Go Premium – $349/mo',
    'whatsapp_msg' => "Hi! I'm interested in the Premium Partner package ($349/month). Let's discuss how we can grow together.",
    'popular' => false,
    'color' => 'primary',
  ],
];

$trust_signals = [
  '🔒 Secure payment via Stripe, PayPal, or Razorpay',
  '📄 Invoice provided after payment',
  '💬 WhatsApp support included',
  '🚫 No hidden fees – ever',
];
?>

<section class="packages section" id="packages">
  <div class="container">
    <!-- Header -->
    <div class="section-header text-center">
      <span class="section-label">Simple & Transparent Pricing</span>
      <h2 class="section-title">
        Invest in Your <span class="gradient-text">Digital Growth</span>
      </h2>
      <p class="section-subtitle">
        Affordable packages designed for homestays, tourism businesses, and e-commerce stores. 
        No hidden fees. Pay once or monthly—your choice.
      </p>
    </div>
    
    <!-- Trust Signals -->
    <div class="trust-signals">
      <?php foreach ($trust_signals as $signal): ?>
      <span class="trust-signal"><?php echo esc_html($signal); ?></span>
      <?php endforeach; ?>
    </div>
    
    <!-- Packages Grid -->
    <div class="packages-grid">
      <?php foreach ($packages as $pkg): ?>
      <div class="package-card card <?php echo $pkg['popular'] ? 'package-popular' : ''; ?>">
        <?php if ($pkg['popular']): ?>
        <div class="popular-badge">
          <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
          </svg>
          Most Popular
        </div>
        <?php endif; ?>
        
        <!-- Header -->
        <div class="package-header">
          <div class="package-icon package-icon-<?php echo $pkg['color']; ?>">
            <?php get_template_part('assets/icons/' . $pkg['icon']); ?>
          </div>
          <h3 class="package-name"><?php echo esc_html($pkg['name']); ?></h3>
          <p class="package-tagline"><?php echo esc_html($pkg['tagline']); ?></p>
        </div>
        
        <!-- Pricing -->
        <div class="package-pricing">
          <span class="package-price"><?php echo esc_html($pkg['price']); ?></span>
          <?php if ($pkg['price_type'] === 'monthly'): ?>
          <span class="package-period">/month</span>
          <?php endif; ?>
          <p class="package-payment-type">
            <?php echo $pkg['price_type'] === 'monthly' ? 'Cancel anytime' : 'One-time payment'; ?>
          </p>
        </div>
        
        <!-- Features -->
        <div class="package-features">
          <p class="package-best-for">Best for: <?php echo esc_html($pkg['best_for']); ?></p>
          <ul class="feature-list">
            <?php 
            $display_features = array_slice($pkg['features'], 0, 5);
            $remaining = count($pkg['features']) - 5;
            foreach ($display_features as $feature): 
            ?>
            <li>
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
              <?php echo esc_html($feature); ?>
            </li>
            <?php endforeach; ?>
            <?php if ($remaining > 0): ?>
            <li class="more-features">+<?php echo $remaining; ?> more included</li>
            <?php endif; ?>
          </ul>
        </div>
        
        <!-- CTAs -->
        <div class="package-ctas">
          <a href="#payment-modal" 
             class="btn <?php echo $pkg['popular'] ? 'btn-gradient' : 'btn-primary'; ?> btn-block"
             data-package="<?php echo esc_attr($pkg['id']); ?>">
            <svg class="credit-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <rect x="1" y="4" width="22" height="16" rx="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <?php echo esc_html($pkg['cta_label']); ?>
          </a>
          <a href="https://wa.me/918335870240?text=<?php echo urlencode($pkg['whatsapp_msg']); ?>" 
             class="btn btn-outline btn-block"
             target="_blank" 
             rel="noopener noreferrer">
            <svg class="message-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            Ask Before Buying
          </a>
          <p class="package-secure">🔒 Secure payment · Invoice provided</p>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
    
    <!-- View Full Comparison -->
    <div class="text-center mt-12">
      <a href="<?php echo esc_url(home_url('/pricing/')); ?>" class="btn btn-outline btn-lg">
        View Full Package Comparison →
      </a>
    </div>
    
    <!-- Help CTA -->
    <div class="text-center mt-8">
      <p class="help-text">Not sure which package is right for you?</p>
      <a href="https://wa.me/918335870240?text=<?php echo urlencode("Hi! I'd like help choosing the right package for my business. Can you guide me?"); ?>" 
         class="btn btn-whatsapp btn-xl"
         target="_blank" 
         rel="noopener noreferrer">
        <svg class="message-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
        Chat on WhatsApp — I'll Help You Choose
      </a>
    </div>
  </div>
</section>

<style>
.packages-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .packages-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1280px) {
  .packages-grid { grid-template-columns: repeat(4, 1fr); }
}

.package-card {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.package-popular {
  border-color: hsl(var(--primary));
  box-shadow: 0 10px 40px -10px hsl(var(--primary) / 0.1);
}

.popular-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: hsl(var(--primary));
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
}

.package-header {
  padding: 1.5rem 1.5rem 1rem;
}

.package-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.package-icon-primary { background: hsl(var(--primary) / 0.1); color: hsl(var(--primary)); }
.package-icon-secondary { background: hsl(var(--secondary) / 0.1); color: hsl(var(--secondary)); }
.package-icon-accent { background: hsl(var(--accent) / 0.1); color: hsl(var(--accent)); }

.package-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.package-tagline {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}

.package-pricing {
  padding: 1rem 1.5rem;
  border-top: 1px solid hsl(var(--border) / 0.5);
  border-bottom: 1px solid hsl(var(--border) / 0.5);
  background: hsl(var(--muted) / 0.3);
}

.package-price {
  font-size: 1.875rem;
  font-weight: 700;
}

.package-period {
  color: hsl(var(--muted-foreground));
}

.package-payment-type {
  font-size: 0.75rem;
  color: hsl(var(--muted-foreground));
  margin-top: 0.25rem;
}

.package-features {
  padding: 1.5rem;
  flex: 1;
}

.package-best-for {
  font-size: 0.75rem;
  font-weight: 500;
  color: hsl(var(--primary));
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
}

.feature-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
  margin-bottom: 0.625rem;
}

.feature-list .check-icon {
  color: hsl(var(--primary));
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.feature-list .more-features {
  color: hsl(var(--primary));
  font-weight: 500;
}

.package-ctas {
  padding: 0 1.5rem 1.5rem;
}

.package-ctas .btn {
  margin-bottom: 0.75rem;
}

.package-secure {
  font-size: 0.75rem;
  color: hsl(var(--muted-foreground));
  text-align: center;
}

.trust-signals {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.trust-signal {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}
</style>
```

---

### PORTFOLIO SECTION

**File:** `template-parts/portfolio.php`

```php
<?php
$case_studies = [
  [
    'id' => 1,
    'title' => 'Boutique Hotel Website Redesign',
    'category' => 'Website Design',
    'description' => "Transformed an outdated website into a modern, booking-friendly experience that increased inquiries by 180%.",
    'before_image' => 'case-study-1-before.jpg',
    'after_image' => 'case-study-1-after.jpg',
    'stats' => [
      ['label' => 'More Inquiries', 'value' => '+180%'],
      ['label' => 'Bounce Rate', 'value' => '-45%'],
      ['label' => 'Mobile Traffic', 'value' => '+90%'],
    ],
  ],
  [
    'id' => 2,
    'title' => 'Local Café GMB Optimization',
    'category' => 'Google Business Profile',
    'description' => 'Complete profile overhaul with keyword optimization and review strategy, resulting in top 3 local rankings.',
    'before_image' => 'case-study-2-before.jpg',
    'after_image' => 'case-study-2-after.jpg',
    'stats' => [
      ['label' => 'Google Ranking', 'value' => 'Top 3'],
      ['label' => 'Monthly Views', 'value' => '+320%'],
      ['label' => 'New Reviews', 'value' => '50+'],
    ],
  ],
  [
    'id' => 3,
    'title' => 'Wellness Brand Social Media',
    'category' => 'Social Media & Lead Gen',
    'description' => 'Built a cohesive brand presence and engagement strategy that tripled follower growth and monthly leads.',
    'before_image' => 'case-study-3-before.jpg',
    'after_image' => 'case-study-3-after.jpg',
    'stats' => [
      ['label' => 'Follower Growth', 'value' => '3x'],
      ['label' => 'Engagement Rate', 'value' => '+250%'],
      ['label' => 'Monthly Leads', 'value' => '+180%'],
    ],
  ],
];
?>

<section class="portfolio section section-muted" id="portfolio">
  <div class="container">
    <!-- Header -->
    <div class="section-header text-center">
      <span class="section-label">Portfolio</span>
      <h2 class="section-title">
        Real Results for <span class="gradient-text">Real Businesses</span>
      </h2>
      <p class="section-subtitle">
        See the transformation. Drag the slider to compare before and after 
        results from actual client projects.
      </p>
    </div>
    
    <!-- Case Study Tabs -->
    <div class="case-study-tabs">
      <?php foreach ($case_studies as $index => $study): ?>
      <button 
        class="tab-btn <?php echo $index === 0 ? 'active' : ''; ?>"
        data-study="<?php echo $study['id']; ?>">
        <?php echo esc_html($study['category']); ?>
      </button>
      <?php endforeach; ?>
    </div>
    
    <!-- Case Studies -->
    <?php foreach ($case_studies as $index => $study): ?>
    <div class="case-study <?php echo $index === 0 ? 'active' : ''; ?>" 
         data-study-id="<?php echo $study['id']; ?>">
      <div class="case-study-grid">
        <!-- Before/After Slider -->
        <div class="before-after-slider">
          <div class="slider-container" data-position="50">
            <img 
              src="<?php echo get_template_directory_uri() . '/assets/images/' . $study['after_image']; ?>" 
              alt="<?php echo esc_attr($study['title']); ?> - After"
              class="after-image"
              loading="lazy"
            >
            <div class="before-clip">
              <img 
                src="<?php echo get_template_directory_uri() . '/assets/images/' . $study['before_image']; ?>" 
                alt="<?php echo esc_attr($study['title']); ?> - Before"
                class="before-image"
                loading="lazy"
              >
            </div>
            <div class="slider-line">
              <div class="slider-handle">
                <span class="handle-arrows">◄ ►</span>
              </div>
            </div>
            <span class="label-before">Before</span>
            <span class="label-after">After</span>
          </div>
          <p class="slider-hint">👆 Drag the slider to compare</p>
        </div>
        
        <!-- Content -->
        <div class="case-study-content">
          <span class="case-category"><?php echo esc_html($study['category']); ?></span>
          <h3 class="case-title"><?php echo esc_html($study['title']); ?></h3>
          <p class="case-description"><?php echo esc_html($study['description']); ?></p>
          
          <!-- Stats -->
          <div class="case-stats">
            <?php foreach ($study['stats'] as $stat): ?>
            <div class="stat-card card">
              <div class="stat-value">
                <svg class="trending-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                  <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
                  <polyline points="17,6 23,6 23,12"/>
                </svg>
                <?php echo esc_html($stat['value']); ?>
              </div>
              <span class="stat-label"><?php echo esc_html($stat['label']); ?></span>
            </div>
            <?php endforeach; ?>
          </div>
          
          <a href="<?php echo esc_url(home_url('/free-audit/')); ?>" class="btn btn-primary btn-lg">
            Get Similar Results
            <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12,5 19,12 12,19"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <?php endforeach; ?>
  </div>
</section>

<style>
.case-study-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
}

.tab-btn {
  padding: 0.625rem 1.25rem;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 0.875rem;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  color: hsl(var(--muted-foreground));
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  border-color: hsl(var(--primary) / 0.3);
  color: hsl(var(--foreground));
}

.tab-btn.active {
  background: hsl(var(--primary));
  color: white;
  border-color: hsl(var(--primary));
  box-shadow: 0 4px 12px hsl(var(--primary) / 0.3);
}

.case-study {
  display: none;
}

.case-study.active {
  display: block;
}

.case-study-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .case-study-grid {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

.before-after-slider {
  text-align: center;
}

.slider-container {
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: 0.75rem;
  overflow: hidden;
  cursor: ew-resize;
  user-select: none;
}

.slider-container img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.before-clip {
  position: absolute;
  inset: 0;
  overflow: hidden;
  clip-path: inset(0 50% 0 0);
}

.slider-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  transform: translateX(-50%);
  z-index: 10;
}

.slider-handle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2.5rem;
  height: 2.5rem;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.handle-arrows {
  font-size: 0.625rem;
  color: hsl(var(--foreground) / 0.7);
  letter-spacing: -2px;
}

.label-before,
.label-after {
  position: absolute;
  top: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.label-before {
  left: 1rem;
  background: hsl(var(--background) / 0.9);
  backdrop-filter: blur(4px);
}

.label-after {
  right: 1rem;
  background: hsl(var(--primary));
  color: white;
}

.slider-hint {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}

.case-category {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: hsl(var(--primary) / 0.1);
  color: hsl(var(--primary));
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 9999px;
  margin-bottom: 1rem;
}

.case-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

@media (min-width: 640px) {
  .case-title { font-size: 1.875rem; }
}

.case-description {
  font-size: 1.125rem;
  color: hsl(var(--muted-foreground));
  margin-bottom: 2rem;
}

.case-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  padding: 1rem;
  text-align: center;
}

.stat-value {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: hsl(var(--primary));
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  color: hsl(var(--muted-foreground));
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const studyId = this.dataset.study;
      
      // Update tabs
      document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Update case studies
      document.querySelectorAll('.case-study').forEach(s => s.classList.remove('active'));
      document.querySelector('[data-study-id="' + studyId + '"]').classList.add('active');
    });
  });
  
  // Before/After slider
  document.querySelectorAll('.slider-container').forEach(function(slider) {
    let isDragging = false;
    
    function updateSlider(x) {
      const rect = slider.getBoundingClientRect();
      const position = Math.max(0, Math.min((x - rect.left) / rect.width * 100, 100));
      
      slider.querySelector('.before-clip').style.clipPath = 'inset(0 ' + (100 - position) + '% 0 0)';
      slider.querySelector('.slider-line').style.left = position + '%';
    }
    
    slider.addEventListener('mousedown', function() { isDragging = true; });
    document.addEventListener('mouseup', function() { isDragging = false; });
    
    slider.addEventListener('mousemove', function(e) {
      if (isDragging) updateSlider(e.clientX);
    });
    
    slider.addEventListener('touchmove', function(e) {
      updateSlider(e.touches[0].clientX);
    });
  });
});
</script>
```

---

### ABOUT SECTION

**File:** `template-parts/about.php`

```php
<?php
$about_image = get_theme_mod('about_image', get_template_directory_uri() . '/assets/images/hero-consultant-enhanced.png');

$highlights = [
  [
    'icon' => 'user',
    'title' => 'Freelancer, Not Agency',
    'description' => 'Work directly with me — no middlemen, no handoffs.',
  ],
  [
    'icon' => 'laptop',
    'title' => '100% Remote',
    'description' => 'I work with clients worldwide, wherever you are.',
  ],
  [
    'icon' => 'heart',
    'title' => 'Small Business Focus',
    'description' => 'I understand your budget constraints and real needs.',
  ],
];

$social_links = [
  ['name' => 'Facebook', 'url' => 'https://facebook.com/yourpage', 'bg' => '#1877F2'],
  ['name' => 'Instagram', 'url' => 'https://instagram.com/yourprofile', 'bg' => 'linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)'],
  ['name' => 'LinkedIn', 'url' => 'https://linkedin.com/in/yourprofile', 'bg' => '#0A66C2'],
];
?>

<section class="about section" id="about">
  <div class="container">
    <div class="about-grid">
      <!-- Image -->
      <div class="about-image-wrapper">
        <div class="image-glow"></div>
        <div class="about-image-container">
          <img 
            src="<?php echo esc_url($about_image); ?>" 
            alt="Freelance digital consultant helping small businesses, tourism brands, and local services grow online"
            width="400"
            height="300"
            loading="lazy"
          >
          
          <!-- Overlay Card -->
          <div class="about-overlay-card">
            <h4>Hi, I'm Your Digital Partner</h4>
            <div class="availability-row">
              <div class="availability-status">
                <span class="pulse-dot"></span>
                <span>Available for new projects</span>
              </div>
              <div class="social-icons-mini">
                <?php foreach ($social_links as $social): ?>
                <a href="<?php echo esc_url($social['url']); ?>" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style="background: <?php echo $social['bg']; ?>"
                   aria-label="<?php echo esc_attr($social['name']); ?>">
                </a>
                <?php endforeach; ?>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Content -->
      <div class="about-content">
        <span class="section-label">About Me</span>
        <h2 class="section-title">
          Personal Digital Support for <span class="gradient-text">Growing Businesses</span>
        </h2>
        <p class="about-text">
          I'm a remote freelance digital consultant who works one-to-one with small business 
          owners, homestay operators, and solo entrepreneurs. No complicated systems or expensive 
          packages — just practical solutions that fit your budget and actually work.
        </p>
        
        <!-- Highlights -->
        <div class="about-highlights">
          <?php foreach ($highlights as $item): ?>
          <div class="highlight-item">
            <div class="highlight-icon">
              <?php get_template_part('assets/icons/' . $item['icon']); ?>
            </div>
            <div class="highlight-text">
              <h4><?php echo esc_html($item['title']); ?></h4>
              <p><?php echo esc_html($item['description']); ?></p>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
        
        <!-- CTAs -->
        <div class="about-ctas">
          <a href="<?php echo esc_url(home_url('/about/')); ?>" class="btn btn-primary btn-lg">
            Learn More About Me
          </a>
          <a href="https://wa.me/918335870240?text=<?php echo urlencode("Hello, I'm interested in your freelance services."); ?>" 
             class="btn btn-whatsapp btn-lg"
             target="_blank" 
             rel="noopener noreferrer">
            <svg class="message-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            Let's Chat
          </a>
        </div>
        
        <!-- Social Follow -->
        <div class="about-social">
          <p>Follow me on social media:</p>
          <div class="social-icons">
            <?php foreach ($social_links as $social): ?>
            <a href="<?php echo esc_url($social['url']); ?>" 
               target="_blank" 
               rel="noopener noreferrer"
               style="background: <?php echo $social['bg']; ?>"
               aria-label="Follow on <?php echo esc_attr($social['name']); ?>">
            </a>
            <?php endforeach; ?>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
  }
}

.about-image-wrapper {
  position: relative;
  max-width: 28rem;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .about-image-wrapper { margin: 0; }
}

.about-image-wrapper .image-glow {
  position: absolute;
  inset: -2rem;
  background: linear-gradient(to right, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.08), hsl(var(--accent) / 0.1));
  border-radius: 1.5rem;
  filter: blur(24px);
}

.about-image-container {
  position: relative;
  aspect-ratio: 4/5;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 15px 40px -10px hsl(var(--primary) / 0.25);
}

@media (min-width: 1024px) {
  .about-image-container { aspect-ratio: 4/3; }
}

.about-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.about-overlay-card {
  position: absolute;
  bottom: -1.25rem;
  left: 0.75rem;
  right: 0.75rem;
  background: hsl(var(--background) / 0.95);
  backdrop-filter: blur(4px);
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid hsl(var(--border) / 0.5);
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.about-overlay-card h4 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.availability-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.availability-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: hsl(var(--muted-foreground));
}

.pulse-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: hsl(var(--primary));
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.social-icons-mini {
  display: flex;
  gap: 0.375rem;
}

.social-icons-mini a {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  transition: transform 0.2s;
}

.social-icons-mini a:hover {
  transform: scale(1.1);
}

.about-text {
  font-size: 1.125rem;
  color: hsl(var(--muted-foreground));
  margin-bottom: 2rem;
}

.about-highlights {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.highlight-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: hsl(var(--primary) / 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: hsl(var(--primary));
}

.highlight-text h4 {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.highlight-text p {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}

.about-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.about-social {
  padding-top: 1.5rem;
  border-top: 1px solid hsl(var(--border));
}

.about-social p {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
  margin-bottom: 0.75rem;
}

.social-icons {
  display: flex;
  gap: 0.75rem;
}

.social-icons a {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.social-icons a:hover {
  transform: scale(1.1);
}
</style>
```

---

### LEAD MAGNET SECTION

**File:** `template-parts/lead-magnet.php`

```php
<?php
$audit_includes = [
  'Website usability & clarity review',
  'Mobile responsiveness check',
  'Google Business Profile visibility audit',
  'Local SEO quick analysis',
  'Simple, actionable improvement tips',
  'Personalized recommendations',
  'No obligation, 100% free',
];
?>

<section class="lead-magnet section" id="lead-magnet">
  <div class="lead-magnet-bg">
    <div class="gradient-orb"></div>
  </div>
  
  <div class="container">
    <div class="lead-magnet-card card">
      <div class="decorative-glow"></div>
      
      <div class="lead-magnet-content">
        <!-- Badge -->
        <div class="lead-magnet-badge">
          <svg class="sparkles-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/>
            <path d="M5 3l0.5 1.5L7 5l-1.5 0.5L5 7l-0.5-1.5L3 5l1.5-0.5z"/>
            <path d="M19 17l0.5 1.5L21 19l-1.5 0.5L19 21l-0.5-1.5L17 19l1.5-0.5z"/>
          </svg>
          <span>Free Lead Magnet</span>
        </div>
        
        <div class="lead-magnet-grid">
          <!-- Left: Content -->
          <div class="lead-magnet-left">
            <h2>Free 7-Point Website & GMB Audit</h2>
            <p>
              Get a personalized review of your website and Google Business Profile — 
              discover what's working, what's not, and simple fixes to improve your 
              online visibility.
            </p>
            
            <a href="<?php echo esc_url(home_url('/free-audit/')); ?>" class="btn btn-hero btn-lg">
              Get Your Free Audit
              <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12,5 19,12 12,19"/>
              </svg>
            </a>
            
            <p class="trust-text">Takes 2 minutes • No credit card • No spam</p>
          </div>
          
          <!-- Right: Checklist -->
          <div class="lead-magnet-right">
            <h4>What's Included:</h4>
            <ul class="audit-checklist">
              <?php foreach ($audit_includes as $item): ?>
              <li>
                <svg class="check-circle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
                <?php echo esc_html($item); ?>
              </li>
              <?php endforeach; ?>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
.lead-magnet {
  position: relative;
  overflow: hidden;
}

.lead-magnet-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, hsl(var(--primary) / 0.05), hsl(var(--secondary) / 0.05), hsl(var(--accent) / 0.05));
}

.gradient-orb {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50rem;
  height: 25rem;
  background: linear-gradient(to right, hsl(var(--primary) / 0.2), hsl(var(--secondary) / 0.2), hsl(var(--accent) / 0.2));
  border-radius: 9999px;
  filter: blur(48px);
}

.lead-magnet-card {
  max-width: 56rem;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

@media (min-width: 640px) {
  .lead-magnet-card { padding: 3rem; }
}

.decorative-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 16rem;
  height: 16rem;
  background: linear-gradient(to bottom right, hsl(var(--primary) / 0.1), transparent);
  border-radius: 9999px;
  filter: blur(24px);
}

.lead-magnet-content {
  position: relative;
  z-index: 10;
}

.lead-magnet-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: hsl(var(--primary) / 0.1);
  border: 1px solid hsl(var(--primary) / 0.2);
  border-radius: 9999px;
  margin-bottom: 1.5rem;
}

.lead-magnet-badge span {
  font-size: 0.875rem;
  font-weight: 600;
  color: hsl(var(--primary));
}

.lead-magnet-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

@media (min-width: 1024px) {
  .lead-magnet-grid { grid-template-columns: 1fr 1fr; }
}

.lead-magnet-left h2 {
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

@media (min-width: 640px) {
  .lead-magnet-left h2 { font-size: 2.25rem; }
}

.lead-magnet-left p {
  font-size: 1.125rem;
  color: hsl(var(--muted-foreground));
  margin-bottom: 1.5rem;
}

.trust-text {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}

.lead-magnet-right h4 {
  font-weight: 600;
  margin-bottom: 1rem;
}

.audit-checklist {
  list-style: none;
  padding: 0;
  margin: 0;
}

.audit-checklist li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: hsl(var(--muted-foreground));
}

.audit-checklist .check-circle-icon {
  color: hsl(var(--primary));
  flex-shrink: 0;
}
</style>
```

---

### TESTIMONIALS SECTION

**File:** `template-parts/testimonials.php`

```php
<?php
$testimonials = [
  [
    'name' => 'Maria Santos',
    'business' => 'Coastal Homestay',
    'location' => 'Philippines',
    'content' => "Finally someone who explains things in simple terms! My Google Business Profile now shows up when tourists search for homestays in our area. Bookings have increased significantly.",
    'rating' => 5,
  ],
  [
    'name' => 'Tom Wilson',
    'business' => "Wilson's Café",
    'location' => 'Australia',
    'content' => "Working with a freelancer instead of an agency was the right choice. Personal attention, quick responses, and affordable rates. My new website brings in 3x more inquiries.",
    'rating' => 5,
  ],
  [
    'name' => 'Priya Sharma',
    'business' => 'Tour Guide Services',
    'location' => 'India',
    'content' => "The Google Business optimization made a huge difference. I now appear in 'tour guide near me' searches. Simple changes, real results!",
    'rating' => 5,
  ],
];
?>

<section class="testimonials section section-muted" id="testimonials">
  <div class="container">
    <!-- Header -->
    <div class="section-header text-center">
      <span class="section-label">Testimonials</span>
      <h2 class="section-title">
        Trusted by Small Business Owners <span class="gradient-text">Worldwide</span>
      </h2>
      <p class="section-subtitle">
        Real feedback from real business owners who wanted simple, affordable digital support.
      </p>
    </div>
    
    <!-- Testimonials Grid -->
    <div class="testimonials-grid">
      <?php foreach ($testimonials as $testimonial): ?>
      <div class="testimonial-card card">
        <!-- Quote Icon -->
        <svg class="quote-icon" viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z"/>
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
        </svg>
        
        <!-- Rating -->
        <div class="testimonial-rating">
          <?php for ($i = 0; $i < $testimonial['rating']; $i++): ?>
          <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
          </svg>
          <?php endfor; ?>
        </div>
        
        <!-- Content -->
        <p class="testimonial-content">"<?php echo esc_html($testimonial['content']); ?>"</p>
        
        <!-- Author -->
        <div class="testimonial-author">
          <div class="author-avatar">
            <?php echo esc_html(substr($testimonial['name'], 0, 1)); ?>
          </div>
          <div class="author-info">
            <p class="author-name"><?php echo esc_html($testimonial['name']); ?></p>
            <p class="author-business">
              <?php echo esc_html($testimonial['business']); ?> • <?php echo esc_html($testimonial['location']); ?>
            </p>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<style>
.testimonials-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .testimonials-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .testimonials-grid { grid-template-columns: repeat(3, 1fr); }
}

.testimonial-card {
  padding: 2rem;
  position: relative;
}

.quote-icon {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: hsl(var(--primary) / 0.2);
}

.testimonial-rating {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.star-icon {
  color: hsl(var(--primary));
}

.testimonial-content {
  color: hsl(var(--foreground));
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 10;
  line-height: 1.6;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
}

.author-name {
  font-weight: 600;
}

.author-business {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}
</style>
```

---

### CTA SECTION

**File:** `template-parts/cta.php`

```php
<section class="cta-section" id="cta">
  <div class="cta-bg">
    <div class="cta-gradient"></div>
    <div class="cta-pattern"></div>
  </div>
  
  <div class="container">
    <div class="cta-content text-center">
      <h2>Ready to Grow Your Business Online?</h2>
      <p>
        Let's have a quick chat about your digital needs. No pressure, no jargon — 
        just a friendly conversation about how I can help.
      </p>
      
      <!-- Trust Signals -->
      <div class="cta-trust-signals">
        <div class="trust-item">
          <svg class="clock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
          <span>Response Within 24 Hours</span>
        </div>
        <div class="trust-item">
          <svg class="shield-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span>No Commitment Required</span>
        </div>
        <div class="trust-item">
          <svg class="heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span>Friendly & Personal</span>
        </div>
      </div>
      
      <!-- CTAs -->
      <div class="cta-buttons">
        <a href="<?php echo esc_url(home_url('/free-audit/')); ?>" class="btn btn-white btn-xl">
          Get Your Free Audit
          <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12,5 19,12 12,19"/>
          </svg>
        </a>
        <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn btn-animated-gradient btn-xl">
          <svg class="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Book a Free Discovery Call
        </a>
      </div>
      
      <p class="cta-microcopy">No agencies, no middlemen — just direct freelancer support.</p>
    </div>
  </div>
</section>

<style>
.cta-section {
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.cta-bg {
  position: absolute;
  inset: 0;
}

.cta-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)));
}

.cta-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.3;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34c0-2.209-1.791-4-4-4s-4 1.791-4 4 1.791 4 4 4 4-1.791 4-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.cta-content {
  position: relative;
  z-index: 10;
  max-width: 56rem;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 1.875rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
}

@media (min-width: 640px) {
  .cta-content h2 { font-size: 2.25rem; }
}

@media (min-width: 768px) {
  .cta-content h2 { font-size: 3rem; }
}

.cta-content > p {
  color: rgba(255,255,255,0.8);
  font-size: 1.125rem;
  max-width: 42rem;
  margin: 0 auto 2rem;
}

@media (min-width: 640px) {
  .cta-content > p { font-size: 1.25rem; }
}

.cta-trust-signals {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255,255,255,0.8);
  font-size: 0.875rem;
}

.cta-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

@media (min-width: 640px) {
  .cta-buttons {
    flex-direction: row;
    justify-content: center;
  }
}

.btn-white {
  background: white;
  color: hsl(var(--foreground));
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.btn-white:hover {
  background: rgba(255,255,255,0.9);
}

.cta-microcopy {
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: rgba(255,255,255,0.7);
}
</style>
```

---

## 📄 front-page.php (Complete)

```php
<?php
/**
 * Template Name: Front Page
 * 
 * Simple Client Grow - Home Page
 * Mirrors the Lovable React section flow exactly
 */

get_header();
?>

<main id="main" class="site-main">
  <?php get_template_part('template-parts/hero'); ?>
  <?php get_template_part('template-parts/client-logos'); ?>
  <?php get_template_part('template-parts/services'); ?>
  <?php get_template_part('template-parts/packages'); ?>
  <?php get_template_part('template-parts/portfolio'); ?>
  <?php get_template_part('template-parts/about'); ?>
  <?php get_template_part('template-parts/lead-magnet'); ?>
  <?php get_template_part('template-parts/testimonials'); ?>
  <?php get_template_part('template-parts/cta'); ?>
</main>

<?php
get_footer();
```

---

## 📋 Forms & CRM

### `inc/forms.php`

```php
<?php
/**
 * Form handling - stores leads and sends emails
 */

add_action('init', 'scg_handle_form_submissions');

function scg_handle_form_submissions() {
  if (!isset($_POST['scg_form_action'])) return;
  
  // Verify nonce
  if (!wp_verify_nonce($_POST['_wpnonce'], 'scg_form_nonce')) {
    wp_die('Security check failed');
  }
  
  $form_type = sanitize_text_field($_POST['scg_form_action']);
  
  $lead_data = [
    'name' => sanitize_text_field($_POST['name'] ?? ''),
    'email' => sanitize_email($_POST['email'] ?? ''),
    'phone' => sanitize_text_field($_POST['phone'] ?? ''),
    'website' => esc_url_raw($_POST['website'] ?? ''),
    'business_type' => sanitize_text_field($_POST['business_type'] ?? ''),
    'message' => sanitize_textarea_field($_POST['message'] ?? ''),
    'source' => $form_type,
    'status' => 'new',
    // UTM tracking
    'utm_source' => sanitize_text_field($_COOKIE['utm_source'] ?? ''),
    'utm_medium' => sanitize_text_field($_COOKIE['utm_medium'] ?? ''),
    'utm_campaign' => sanitize_text_field($_COOKIE['utm_campaign'] ?? ''),
    'utm_term' => sanitize_text_field($_COOKIE['utm_term'] ?? ''),
    'utm_content' => sanitize_text_field($_COOKIE['utm_content'] ?? ''),
  ];
  
  // Store lead (hook for external CRM)
  do_action('scg_new_lead', $lead_data);
  
  // Send email notification
  scg_send_lead_email($lead_data);
  
  // Redirect with success
  wp_safe_redirect(add_query_arg('form_success', '1', wp_get_referer()));
  exit;
}

function scg_send_lead_email($lead) {
  $to = 'consultantb84@gmail.com';
  $subject = sprintf('[New Lead] %s - %s', ucfirst($lead['source']), $lead['name']);
  
  $body = sprintf(
    "New lead from %s form:\n\n" .
    "Name: %s\n" .
    "Email: %s\n" .
    "Phone: %s\n" .
    "Website: %s\n" .
    "Business Type: %s\n\n" .
    "Message:\n%s\n\n" .
    "---\nUTM Source: %s\nUTM Medium: %s\nUTM Campaign: %s",
    $lead['source'],
    $lead['name'],
    $lead['email'],
    $lead['phone'] ?: 'Not provided',
    $lead['website'] ?: 'Not provided',
    $lead['business_type'] ?: 'Not specified',
    $lead['message'] ?: 'No message',
    $lead['utm_source'] ?: 'direct',
    $lead['utm_medium'] ?: 'none',
    $lead['utm_campaign'] ?: 'none'
  );
  
  $headers = ['Content-Type: text/plain; charset=UTF-8'];
  
  wp_mail($to, $subject, $body, $headers);
}
```

### `inc/crm.php`

```php
<?php
/**
 * CRM Pipeline Stages:
 * - new
 * - qualified
 * - consultation
 * - proposal_sent
 * - client
 */

add_action('scg_new_lead', 'scg_store_lead_to_crm');

function scg_store_lead_to_crm($lead_data) {
  // Option 1: Store in WordPress options/transients
  $leads = get_option('scg_leads', []);
  $lead_data['id'] = wp_generate_uuid4();
  $lead_data['created_at'] = current_time('mysql');
  $lead_data['followup_count'] = 0;
  $leads[] = $lead_data;
  update_option('scg_leads', $leads);
  
  // Option 2: Send to external API (Supabase, etc.)
  // Uncomment and configure:
  /*
  wp_remote_post('https://your-supabase-url.supabase.co/rest/v1/leads', [
    'headers' => [
      'apikey' => SUPABASE_ANON_KEY,
      'Authorization' => 'Bearer ' . SUPABASE_ANON_KEY,
      'Content-Type' => 'application/json',
    ],
    'body' => json_encode($lead_data),
  ]);
  */
}
```

---

## 🔗 UTM Tracking

### `inc/utm-tracking.php`

```php
<?php
/**
 * UTM Parameter Tracking
 * Captures and persists UTM parameters via cookies (30 days)
 */

add_action('init', 'scg_capture_utm_params');

function scg_capture_utm_params() {
  $utm_params = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  $expiry = time() + (30 * DAY_IN_SECONDS);
  
  foreach ($utm_params as $param) {
    if (isset($_GET[$param]) && !empty($_GET[$param])) {
      $value = sanitize_text_field($_GET[$param]);
      setcookie($param, $value, $expiry, '/', '', true, true);
    }
  }
}

function scg_get_utm_params() {
  return [
    'utm_source' => sanitize_text_field($_COOKIE['utm_source'] ?? ''),
    'utm_medium' => sanitize_text_field($_COOKIE['utm_medium'] ?? ''),
    'utm_campaign' => sanitize_text_field($_COOKIE['utm_campaign'] ?? ''),
    'utm_term' => sanitize_text_field($_COOKIE['utm_term'] ?? ''),
    'utm_content' => sanitize_text_field($_COOKIE['utm_content'] ?? ''),
  ];
}
```

---

## 💳 Payment Links

### `inc/payments.php`

```php
<?php
/**
 * Payment Gateway Configuration
 * Replace with your actual payment links
 */

function scg_get_payment_links() {
  return [
    'starter' => [
      'stripe' => 'https://buy.stripe.com/YOUR_STARTER_LINK',
      'paypal' => 'https://paypal.me/yourlink/99',
      'razorpay' => 'https://rzp.io/YOUR_STARTER_LINK',
    ],
    'growth' => [
      'stripe' => 'https://buy.stripe.com/YOUR_GROWTH_LINK',
      'paypal' => 'https://paypal.me/yourlink/249',
      'razorpay' => 'https://rzp.io/YOUR_GROWTH_LINK',
    ],
    'monthly' => [
      'stripe' => 'https://buy.stripe.com/YOUR_MONTHLY_LINK',
      'paypal' => 'https://paypal.me/yourlink/149',
      'razorpay' => 'https://rzp.io/YOUR_MONTHLY_LINK',
    ],
    'premium' => [
      'stripe' => 'https://buy.stripe.com/YOUR_PREMIUM_LINK',
      'paypal' => 'https://paypal.me/yourlink/349',
      'razorpay' => 'https://rzp.io/YOUR_PREMIUM_LINK',
    ],
  ];
}

function scg_get_payment_url($package, $gateway = 'stripe') {
  $links = scg_get_payment_links();
  return $links[$package][$gateway] ?? '#';
}
```

---

## 🔍 SEO & Schema Markup

### `inc/seo.php`

```php
<?php
/**
 * JSON-LD Schema Markup
 */

add_action('wp_head', 'scg_output_schema');

function scg_output_schema() {
  if (is_front_page()) {
    $schema = [
      '@context' => 'https://schema.org',
      '@type' => 'ProfessionalService',
      'name' => 'DigitalFreelancer',
      'description' => 'Freelance digital consultant helping small businesses grow online through websites, SEO, and Google Business optimization.',
      'url' => home_url(),
      'telephone' => '+91-8335870240',
      'email' => 'consultantb84@gmail.com',
      'priceRange' => '$99-$349',
      'areaServed' => 'Worldwide',
      'serviceType' => ['Website Development', 'SEO', 'Digital Marketing', 'Google Business Profile Management'],
      'sameAs' => [
        'https://wa.me/918335870240',
      ],
    ];
    
    echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>';
  }
}
```

---

## 📱 Contact Information

- **WhatsApp:** +91-8335-870-240
- **Email:** consultantb84@gmail.com
- **Response time:** Within 24 hours

---

## 🖼️ Image Assets to Copy

Copy these files from `src/assets/` to WordPress theme `assets/images/`:

| File | Usage |
|------|-------|
| hero-consultant-enhanced.png | Hero section (main consultant photo) |
| about-consultant.jpg | About section |
| service-website.jpg | Services grid |
| service-marketing.jpg | Services grid |
| service-leads.jpg | Services grid |
| service-gmb.jpg | Services grid |
| client-logo-1.png through client-logo-6.png | Client logos section |
| case-study-*-before.jpg & case-study-*-after.jpg | Portfolio before/after sliders |

**Image Optimization:**
- Convert to WebP format
- Desktop: max 150KB
- Mobile: max 90KB
- Use `loading="lazy"` except for hero image
- Always include width/height attributes

**Standardized Alt Text:**
> "Freelance digital consultant helping small businesses, tourism brands, and local services grow online"

---

## 📩 WhatsApp Integration

### `assets/js/whatsapp.js`

```javascript
/**
 * WhatsApp Click-to-Chat System
 * Phone: +91-8335-870-240
 */

const WHATSAPP_NUMBER = '918335870240';

const messageTemplates = {
  general: {
    greeting: 'Hi 👋',
    context: "I found your website and I'm interested in learning how you can help my business grow online.",
    question: "Would love to have a quick chat when you're free 😊"
  },
  'free-audit': {
    greeting: 'Hi 👋',
    context: "I'd like a free website and GMB audit please.",
    question: "Can you take a look at my online presence and share some suggestions?"
  },
  consultation: {
    greeting: 'Hi 👋',
    context: "I'd like to book a quick discovery call to discuss my business.",
    question: "When would be a good time for you?"
  },
  pricing: {
    greeting: 'Hi 👋',
    context: "I was looking at your pricing packages.",
    question: "Could you help me understand which one would work best for my needs?"
  },
  'website-help': {
    greeting: 'Hi 👋',
    context: "I need some help with my website — it's not bringing in enough customers right now.",
    question: "Would you be able to take a quick look and share your thoughts?"
  },
  'tourism-marketing': {
    greeting: 'Hi 👋',
    context: "I run a homestay/tourism business and need help with online visibility.",
    question: "How can you help me get more bookings?"
  },
  'gmb-help': {
    greeting: 'Hi 👋',
    context: "I'd like help optimizing my Google Business Profile.",
    question: "Can you help me show up better in local searches?"
  }
};

function buildWhatsAppMessage(intent, customDetails = {}) {
  const template = messageTemplates[intent] || messageTemplates.general;
  let message = `${template.greeting}\n\n${template.context}`;
  
  if (customDetails.businessType) {
    message += `\n\n📋 Business type: ${customDetails.businessType}`;
  }
  if (customDetails.packageName) {
    message += `\nPackage interested in: ${customDetails.packageName}`;
  }
  
  if (template.question) {
    message += `\n\n${template.question}`;
  }
  
  return message;
}

function getWhatsAppUrl(intent = 'general', customDetails = {}) {
  const message = buildWhatsAppMessage(intent, customDetails);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Initialize WhatsApp buttons
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[data-whatsapp]').forEach(function(btn) {
    const intent = btn.dataset.whatsapp || 'general';
    btn.href = getWhatsAppUrl(intent);
  });
});

// Export for use
window.WhatsApp = { getUrl: getWhatsAppUrl, buildMessage: buildWhatsAppMessage };
```

---

## 🚀 Deployment Checklist

1. ☐ Copy all template files to WordPress theme folder
2. ☐ Copy image assets and optimize (WebP, <150KB)
3. ☐ Configure `functions.php` with all includes
4. ☐ Set up WordPress Customizer controls
5. ☐ Configure payment gateway links
6. ☐ Test contact forms and email delivery
7. ☐ Verify WhatsApp links work correctly
8. ☐ Check mobile responsiveness
9. ☐ Validate Schema markup
10. ☐ Test UTM tracking with sample URLs
11. ☐ Set up SSL certificate
12. ☐ Configure caching plugin
13. ☐ Submit sitemap to Google Search Console

---

## 📞 Support

This guide was generated from the Lovable React application. For questions about implementing specific features, refer to the original React components or contact the developer.

**Original Stack:** React 18 + Vite + Tailwind CSS + Framer Motion + Supabase
