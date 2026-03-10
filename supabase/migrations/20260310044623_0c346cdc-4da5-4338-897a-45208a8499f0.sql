
-- Fix search_path on calculate_lead_priority
CREATE OR REPLACE FUNCTION public.calculate_lead_priority(score integer)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT CASE
    WHEN score >= 70 THEN 'ready'
    WHEN score >= 41 THEN 'hot'
    WHEN score >= 21 THEN 'warm'
    ELSE 'cold'
  END
$$;
