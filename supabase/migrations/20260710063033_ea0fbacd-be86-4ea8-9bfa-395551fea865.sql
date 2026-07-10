-- Allow server-side (service role) writes to the refund-screenshots bucket.
-- The refund-request API uploads via the admin client; explicit policies make
-- the intent clear and unblock uploads if the current key does not fully bypass RLS.
CREATE POLICY "Service role manages refund screenshots"
ON storage.objects
FOR ALL
TO service_role
USING (bucket_id = 'refund-screenshots')
WITH CHECK (bucket_id = 'refund-screenshots');