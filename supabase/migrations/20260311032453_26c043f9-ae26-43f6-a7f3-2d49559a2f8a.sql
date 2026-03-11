
-- WhatsApp messages table
CREATE TABLE public.whatsapp_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id text UNIQUE,
  customer_phone text NOT NULL,
  customer_name text,
  message_text text NOT NULL,
  direction text NOT NULL DEFAULT 'incoming' CHECK (direction IN ('incoming', 'outgoing')),
  conversation_status text NOT NULL DEFAULT 'active' CHECK (conversation_status IN ('active', 'waiting', 'closed', 'handover')),
  detected_intent text,
  menu_state text DEFAULT 'main',
  lead_id uuid REFERENCES public.leads(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Index for fast lookups
CREATE INDEX idx_whatsapp_messages_phone ON public.whatsapp_messages(customer_phone);
CREATE INDEX idx_whatsapp_messages_direction ON public.whatsapp_messages(direction);
CREATE INDEX idx_whatsapp_messages_created ON public.whatsapp_messages(created_at DESC);

-- Enable RLS
ALTER TABLE public.whatsapp_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (webhook needs this)
CREATE POLICY "Webhook can insert messages" ON public.whatsapp_messages
  FOR INSERT TO public WITH CHECK (true);

-- Admins can read
CREATE POLICY "Admins can read messages" ON public.whatsapp_messages
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update status
CREATE POLICY "Admins can update messages" ON public.whatsapp_messages
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.whatsapp_messages;

-- Updated_at trigger
CREATE TRIGGER update_whatsapp_messages_updated_at
  BEFORE UPDATE ON public.whatsapp_messages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
