
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS child_name text,
  ADD COLUMN IF NOT EXISTS parent_name text,
  ADD COLUMN IF NOT EXISTS child_age text,
  ADD COLUMN IF NOT EXISTS area text,
  ADD COLUMN IF NOT EXISTS district text,
  ADD COLUMN IF NOT EXISTS state text,
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS phone text;

GRANT INSERT ON public.leads TO anon;

CREATE POLICY "anon can insert website popup leads"
  ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (
    source = 'website_popup'
    AND child_name IS NOT NULL
    AND parent_name IS NOT NULL
    AND phone IS NOT NULL
  );
