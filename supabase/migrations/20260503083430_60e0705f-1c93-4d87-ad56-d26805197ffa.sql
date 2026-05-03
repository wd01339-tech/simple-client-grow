DROP POLICY IF EXISTS "Leads are readable" ON public.leads;

CREATE POLICY "Admins can read leads"
ON public.leads
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));