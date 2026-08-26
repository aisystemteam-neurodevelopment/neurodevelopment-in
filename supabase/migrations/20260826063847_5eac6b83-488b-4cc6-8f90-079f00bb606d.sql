CREATE POLICY "service role manages job resumes"
  ON storage.objects FOR ALL
  TO service_role
  USING (bucket_id = 'job-resumes')
  WITH CHECK (bucket_id = 'job-resumes');