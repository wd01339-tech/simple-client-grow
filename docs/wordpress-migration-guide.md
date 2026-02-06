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

### PACKAGES/PRICING SECTION

**Content Data:**

| Package | Price | Type | Features |
|---------|-------|------|----------|
| Starter Setup | $99 | One-time | Website audit, GMB setup, Basic SEO, Mobile check, WhatsApp integration, 1 revision |
| Growth Boost | $249 | One-time | All Starter + 10 pages optimization, Advanced SEO, Lead forms, Social setup, 2 revisions |
| Monthly Support | $149/mo | Monthly | Maintenance, GMB management, Review monitoring, Monthly report, Priority support |
| Premium Partner | $349/mo | Monthly | All Monthly + Weekly monitoring, Advanced SEO, 4 content updates, Strategy calls |

**WhatsApp Messages:**

```
Starter: "Hi! I'm interested in the Starter Setup package ($99). Can you tell me more?"
Growth: "Hi! I'm interested in the Growth Boost package ($249). I'd like to discuss my business needs."
Monthly: "Hi! I'm interested in the Monthly Support package ($149/month). Can we discuss my ongoing needs?"
Premium: "Hi! I'm interested in the Premium Partner package ($349/month). Let's discuss how we can grow together."
```

---

### TESTIMONIALS SECTION

**Content Data:**

| Name | Business | Location | Quote | Rating |
|------|----------|----------|-------|--------|
| Maria Santos | Coastal Homestay | Philippines | "Finally someone who explains things in simple terms! My Google Business Profile now shows up when tourists search for homestays in our area. Bookings have increased significantly." | 5 |
| Tom Wilson | Wilson's Café | Australia | "Working with a freelancer instead of an agency was the right choice. Personal attention, quick responses, and affordable rates. My new website brings in 3x more inquiries." | 5 |
| Priya Sharma | Tour Guide Services | India | "The Google Business optimization made a huge difference. I now appear in 'tour guide near me' searches. Simple changes, real results!" | 5 |

---

### LEAD MAGNET SECTION

**Content:**
- **Title:** Free 7-Point Website & GMB Audit
- **Subtitle:** Get a personalized review of your website and Google Business Profile — discover what's working, what's not, and simple fixes to improve your online visibility.
- **CTA:** Get Your Free Audit
- **Trust text:** Takes 2 minutes • No credit card • No spam

**Checklist:**
1. Website usability & clarity review
2. Mobile responsiveness check
3. Google Business Profile visibility audit
4. Local SEO quick analysis
5. Simple, actionable improvement tips
6. Personalized recommendations
7. No obligation, 100% free

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

## 🚀 Deployment Checklist

1. ☐ Copy all template files to WordPress theme folder
2. ☐ Copy image assets and optimize
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
