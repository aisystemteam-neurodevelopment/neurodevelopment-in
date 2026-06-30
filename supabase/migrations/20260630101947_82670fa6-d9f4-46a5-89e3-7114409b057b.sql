CREATE POLICY "anon upload refund screenshots"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'refund-screenshots');

CREATE POLICY "staff read refund screenshots"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'refund-screenshots' AND public.is_staff(auth.uid()));

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS attachment_path text;