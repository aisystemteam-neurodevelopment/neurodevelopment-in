DROP POLICY IF EXISTS "anon can insert website popup leads" ON public.leads;
CREATE POLICY "anon can insert website popup leads"
  ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (
    source = 'website_popup'
    AND child_name IS NOT NULL
    AND btrim(child_name) <> ''
    AND parent_name IS NOT NULL
    AND btrim(parent_name) <> ''
    AND phone IS NOT NULL
    AND btrim(phone) <> ''
    AND owner_id IS NULL
    AND parent_id IS NULL
    AND child_id IS NULL
    AND stage = 'new'::public.lead_stage
    AND urgency = 0
    AND anon_session_id IS NULL
  );

REVOKE INSERT, UPDATE ON public.payment_orders FROM authenticated;
GRANT ALL ON public.payment_orders TO service_role;