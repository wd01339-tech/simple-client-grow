
-- Add lifecycle stage and attribution to leads
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS lifecycle_stage text NOT NULL DEFAULT 'lead',
  ADD COLUMN IF NOT EXISTS attribution jsonb;

CREATE INDEX IF NOT EXISTS idx_leads_stage ON public.leads(lifecycle_stage);

-- Conversion events table
CREATE TABLE IF NOT EXISTS public.conversion_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  session_id text,
  score_delta integer NOT NULL DEFAULT 0,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_conv_events_lead ON public.conversion_events(lead_id);
CREATE INDEX IF NOT EXISTS idx_conv_events_type ON public.conversion_events(event_type);

ALTER TABLE public.conversion_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert events"
  ON public.conversion_events FOR INSERT
  TO public WITH CHECK (true);

CREATE POLICY "Admins can read events"
  ON public.conversion_events FOR SELECT
  TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- CRM settings singleton (id='global')
CREATE TABLE IF NOT EXISTS public.crm_settings (
  id text PRIMARY KEY,
  scoring_weights jsonb NOT NULL,
  stage_thresholds jsonb NOT NULL,
  priority_thresholds jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid
);

ALTER TABLE public.crm_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read settings"
  ON public.crm_settings FOR SELECT
  TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update settings"
  ON public.crm_settings FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert settings"
  ON public.crm_settings FOR INSERT
  TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Edge function (service role) read access for runtime config
CREATE POLICY "Service can read settings"
  ON public.crm_settings FOR SELECT
  TO anon USING (true);

-- Seed defaults
INSERT INTO public.crm_settings (id, scoring_weights, stage_thresholds, priority_thresholds)
VALUES (
  'global',
  '{
    "marquee_offer_click": 8,
    "chatbot_optin": 10,
    "whatsapp_click": 15,
    "consultation_booked": 30,
    "payment_completed": 50,
    "audit_request": 20,
    "contact_form": 15,
    "pricing_view": 5
  }'::jsonb,
  '{
    "engaged": 10,
    "qualified": 30,
    "proposal_sent": 60,
    "client": 100
  }'::jsonb,
  '{
    "ready": 70,
    "hot": 41,
    "warm": 21
  }'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS trg_crm_settings_updated ON public.crm_settings;
CREATE TRIGGER trg_crm_settings_updated
BEFORE UPDATE ON public.crm_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
