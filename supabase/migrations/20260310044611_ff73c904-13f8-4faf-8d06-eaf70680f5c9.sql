
-- Add lead scoring columns
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS lead_score integer NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS lead_priority text NOT NULL DEFAULT 'cold',
ADD COLUMN IF NOT EXISTS country text,
ADD COLUMN IF NOT EXISTS inquiry_topic text;

-- Create user_roles table for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles without recursion
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS: only admins can read user_roles
CREATE POLICY "Admins can read roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR user_id = auth.uid());

-- Create chat_conversations table for AI chat logging
CREATE TABLE public.chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  intent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;

-- Anyone can insert chat messages (public widget)
CREATE POLICY "Anyone can insert chat messages"
ON public.chat_conversations
FOR INSERT
TO public
WITH CHECK (true);

-- Only admins can read chat conversations
CREATE POLICY "Admins can read chats"
ON public.chat_conversations
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Function to calculate lead score
CREATE OR REPLACE FUNCTION public.calculate_lead_priority(score integer)
RETURNS text
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE
    WHEN score >= 70 THEN 'ready'
    WHEN score >= 41 THEN 'hot'
    WHEN score >= 21 THEN 'warm'
    ELSE 'cold'
  END
$$;

-- Trigger to auto-update lead_priority when lead_score changes
CREATE OR REPLACE FUNCTION public.update_lead_priority()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.lead_priority = calculate_lead_priority(NEW.lead_score);
  RETURN NEW;
END;
$$;

CREATE TRIGGER tr_lead_priority
  BEFORE INSERT OR UPDATE OF lead_score ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_lead_priority();

-- Update RLS on leads to allow admin updates
CREATE POLICY "Admins can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
