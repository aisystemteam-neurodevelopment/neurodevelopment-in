CREATE TABLE public.refund_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  programme text NOT NULL,
  payment_date text NOT NULL,
  amount text NOT NULL,
  transaction_id text,
  reason text NOT NULL,
  details text,
  recordings_accessed boolean NOT NULL DEFAULT false,
  attachment_path text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.refund_requests TO service_role;

ALTER TABLE public.refund_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service role manages refund requests"
ON public.refund_requests FOR ALL TO service_role
USING (true) WITH CHECK (true);

CREATE TRIGGER trg_refund_requests_updated
BEFORE UPDATE ON public.refund_requests
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE INDEX idx_refund_requests_created_at ON public.refund_requests (created_at DESC);