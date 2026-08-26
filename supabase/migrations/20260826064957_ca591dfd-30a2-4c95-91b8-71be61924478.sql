ALTER TABLE public.job_openings
  ADD COLUMN IF NOT EXISTS work_mode text NOT NULL DEFAULT 'On-site';

ALTER TABLE public.job_applications
  ADD COLUMN IF NOT EXISTS parsed_name text,
  ADD COLUMN IF NOT EXISTS parsed_experience text,
  ADD COLUMN IF NOT EXISTS parsed_skills text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS parsed_summary text,
  ADD COLUMN IF NOT EXISTS parsed_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS review_notes text;

CREATE TABLE IF NOT EXISTS public.careers_audit_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  actor_role text NOT NULL,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  entity_label text,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.careers_audit_log TO service_role;

ALTER TABLE public.careers_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service role manages careers audit log"
  ON public.careers_audit_log FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS careers_audit_log_created_at_idx
  ON public.careers_audit_log (created_at DESC);