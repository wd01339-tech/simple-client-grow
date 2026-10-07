DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;
CREATE POLICY "Validated public lead submissions"
ON public.leads
FOR INSERT
TO public
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 200
  AND char_length(btrim(email)) BETWEEN 3 AND 320
  AND position('@' IN email) > 1
  AND position('.' IN split_part(email, '@', 2)) > 1
  AND source IN (
    'contact',
    'free-audit',
    'strategy-proposal',
    'whatsapp-general',
    'whatsapp-free-audit',
    'whatsapp-consultation',
    'whatsapp-pricing',
    'whatsapp-website-help',
    'whatsapp-website-dev',
    'whatsapp-tourism-marketing',
    'whatsapp-gmb-help',
    'whatsapp-growth-marketing',
    'whatsapp-contact',
    'whatsapp-package-inquiry',
    'whatsapp-talk-to-consultant'
  )
  AND status = 'new'
  AND lead_score = 0
  AND lead_priority = 'cold'
  AND lifecycle_stage = 'lead'
  AND followup_count = 0
  AND last_followup_at IS NULL
  AND attribution IS NULL
  AND created_at BETWEEN now() - interval '5 minutes' AND now() + interval '5 minutes'
  AND updated_at BETWEEN now() - interval '5 minutes' AND now() + interval '5 minutes'
  AND (website IS NULL OR char_length(website) <= 2048)
  AND (company IS NULL OR char_length(company) <= 200)
  AND (business_type IS NULL OR char_length(business_type) <= 200)
  AND (subject IS NULL OR char_length(subject) <= 300)
  AND (message IS NULL OR char_length(message) <= 20000)
  AND (notes IS NULL OR char_length(notes) <= 5000)
  AND (preferred_followup_time IS NULL OR char_length(preferred_followup_time) <= 200)
  AND (country IS NULL OR char_length(country) <= 120)
  AND (inquiry_topic IS NULL OR char_length(inquiry_topic) <= 120)
  AND (utm_source IS NULL OR char_length(utm_source) <= 500)
  AND (utm_medium IS NULL OR char_length(utm_medium) <= 500)
  AND (utm_campaign IS NULL OR char_length(utm_campaign) <= 500)
  AND (utm_term IS NULL OR char_length(utm_term) <= 500)
  AND (utm_content IS NULL OR char_length(utm_content) <= 500)
);

DROP POLICY IF EXISTS "Anyone can insert chat messages" ON public.chat_conversations;

DROP POLICY IF EXISTS "Webhook can insert messages" ON public.whatsapp_messages;