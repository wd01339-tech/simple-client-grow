-- Add CRM pipeline fields and UTM tracking to leads table
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS utm_source text,
ADD COLUMN IF NOT EXISTS utm_medium text,
ADD COLUMN IF NOT EXISTS utm_campaign text,
ADD COLUMN IF NOT EXISTS utm_term text,
ADD COLUMN IF NOT EXISTS utm_content text,
ADD COLUMN IF NOT EXISTS last_followup_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS followup_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS notes text;

-- Update status column to use proper CRM stages
COMMENT ON COLUMN public.leads.status IS 'CRM pipeline stage: new, qualified, consultation, proposal_sent, client';