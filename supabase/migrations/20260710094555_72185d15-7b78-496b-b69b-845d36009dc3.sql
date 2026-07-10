
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;

DROP POLICY IF EXISTS "Anyone can insert events" ON public.conversion_events;
REVOKE INSERT ON public.conversion_events FROM anon, authenticated;

ALTER PUBLICATION supabase_realtime DROP TABLE public.whatsapp_messages;
