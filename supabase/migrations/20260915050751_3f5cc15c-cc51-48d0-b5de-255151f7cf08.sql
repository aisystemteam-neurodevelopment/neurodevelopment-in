ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS campaign text,
  ADD COLUMN IF NOT EXISTS contacted_at timestamptz,
  ADD COLUMN IF NOT EXISTS counselling_scheduled_at timestamptz,
  ADD COLUMN IF NOT EXISTS counselling_completed_at timestamptz,
  ADD COLUMN IF NOT EXISTS payment_pending_at timestamptz,
  ADD COLUMN IF NOT EXISTS first_paid_at timestamptz,
  ADD COLUMN IF NOT EXISTS enrolled_at timestamptz;

CREATE TABLE public.lead_conversion_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  event_type text NOT NULL CHECK (event_type IN ('new_enquiry','contacted','counselling_scheduled','counselling_completed','payment_pending','paid','enrolled')),
  source text NOT NULL DEFAULT 'system',
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.lead_conversion_events TO authenticated;
GRANT ALL ON public.lead_conversion_events TO service_role;
ALTER TABLE public.lead_conversion_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "parents read own conversion events"
ON public.lead_conversion_events FOR SELECT TO authenticated
USING (parent_id = auth.uid());
CREATE INDEX lead_conversion_events_lead_time_idx ON public.lead_conversion_events (lead_id, occurred_at DESC);
CREATE INDEX lead_conversion_events_parent_time_idx ON public.lead_conversion_events (parent_id, occurred_at DESC);

CREATE OR REPLACE FUNCTION public.record_lead_conversion_event(
  _lead_id uuid,
  _parent_id uuid,
  _event_type text,
  _source text,
  _occurred_at timestamptz DEFAULT now(),
  _details jsonb DEFAULT '{}'::jsonb
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF _event_type NOT IN ('new_enquiry','contacted','counselling_scheduled','counselling_completed','payment_pending','paid','enrolled') THEN
    RAISE EXCEPTION 'Invalid conversion event type';
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM public.lead_conversion_events
    WHERE lead_id = _lead_id AND event_type = _event_type
  ) THEN
    INSERT INTO public.lead_conversion_events (lead_id, parent_id, event_type, source, occurred_at, details)
    VALUES (_lead_id, _parent_id, _event_type, COALESCE(NULLIF(_source, ''), 'system'), COALESCE(_occurred_at, now()), COALESCE(_details, '{}'::jsonb));
  END IF;
END;
$$;
REVOKE ALL ON FUNCTION public.record_lead_conversion_event(uuid, uuid, text, text, timestamptz, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_lead_conversion_event(uuid, uuid, text, text, timestamptz, jsonb) TO service_role;

CREATE OR REPLACE FUNCTION public.track_lead_conversion()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM public.record_lead_conversion_event(NEW.id, NEW.parent_id, 'new_enquiry', NEW.source, NEW.created_at, jsonb_build_object('campaign', NEW.campaign));
  END IF;
  IF TG_OP = 'UPDATE' THEN
    IF NEW.parent_id IS DISTINCT FROM OLD.parent_id THEN
      UPDATE public.lead_conversion_events SET parent_id = NEW.parent_id WHERE lead_id = NEW.id;
    END IF;
    IF NEW.contacted_at IS NOT NULL AND OLD.contacted_at IS NULL THEN
      PERFORM public.record_lead_conversion_event(NEW.id, NEW.parent_id, 'contacted', 'lead', NEW.contacted_at);
    END IF;
    IF NEW.counselling_scheduled_at IS NOT NULL AND OLD.counselling_scheduled_at IS NULL THEN
      PERFORM public.record_lead_conversion_event(NEW.id, NEW.parent_id, 'counselling_scheduled', 'lead', NEW.counselling_scheduled_at);
    END IF;
    IF NEW.counselling_completed_at IS NOT NULL AND OLD.counselling_completed_at IS NULL THEN
      PERFORM public.record_lead_conversion_event(NEW.id, NEW.parent_id, 'counselling_completed', 'lead', NEW.counselling_completed_at);
    END IF;
    IF NEW.payment_pending_at IS NOT NULL AND OLD.payment_pending_at IS NULL THEN
      PERFORM public.record_lead_conversion_event(NEW.id, NEW.parent_id, 'payment_pending', 'lead', NEW.payment_pending_at);
    END IF;
    IF NEW.first_paid_at IS NOT NULL AND OLD.first_paid_at IS NULL THEN
      PERFORM public.record_lead_conversion_event(NEW.id, NEW.parent_id, 'paid', 'lead', NEW.first_paid_at);
    END IF;
    IF NEW.enrolled_at IS NOT NULL AND OLD.enrolled_at IS NULL THEN
      PERFORM public.record_lead_conversion_event(NEW.id, NEW.parent_id, 'enrolled', 'lead', NEW.enrolled_at);
    END IF;
  END IF;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS leads_track_conversion ON public.leads;
CREATE TRIGGER leads_track_conversion AFTER INSERT OR UPDATE ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.track_lead_conversion();

CREATE OR REPLACE FUNCTION public.track_appointment_conversion()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_lead public.leads%ROWTYPE;
BEGIN
  SELECT * INTO target_lead FROM public.leads
  WHERE parent_id = NEW.parent_id
  ORDER BY created_at ASC LIMIT 1;
  IF target_lead.id IS NULL THEN RETURN NEW; END IF;

  IF TG_OP = 'INSERT' THEN
    UPDATE public.leads SET counselling_scheduled_at = COALESCE(counselling_scheduled_at, NEW.created_at)
    WHERE id = target_lead.id;
  END IF;
  IF NEW.status = 'completed'::public.appt_status AND (TG_OP = 'INSERT' OR OLD.status IS DISTINCT FROM NEW.status) THEN
    UPDATE public.leads SET counselling_completed_at = COALESCE(counselling_completed_at, now())
    WHERE id = target_lead.id;
  END IF;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS appointments_track_conversion ON public.appointments;
CREATE TRIGGER appointments_track_conversion AFTER INSERT OR UPDATE OF status ON public.appointments
FOR EACH ROW EXECUTE FUNCTION public.track_appointment_conversion();

CREATE OR REPLACE FUNCTION public.track_payment_conversion()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_lead_id uuid;
BEGIN
  IF NEW.user_id IS NULL THEN RETURN NEW; END IF;
  SELECT id INTO target_lead_id FROM public.leads
  WHERE parent_id = NEW.user_id ORDER BY created_at ASC LIMIT 1;
  IF target_lead_id IS NULL THEN RETURN NEW; END IF;

  IF TG_OP = 'INSERT' THEN
    UPDATE public.leads SET payment_pending_at = COALESCE(payment_pending_at, NEW.created_at)
    WHERE id = target_lead_id;
  END IF;
  IF NEW.status = 'paid' AND (TG_OP = 'INSERT' OR OLD.status IS DISTINCT FROM NEW.status) THEN
    UPDATE public.leads
    SET first_paid_at = COALESCE(first_paid_at, NEW.paid_at, now()),
        stage = CASE WHEN stage IN ('new','diagnostic','trust_building','offer') THEN 'paid'::public.lead_stage ELSE stage END
    WHERE id = target_lead_id;
  END IF;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS payment_orders_track_conversion ON public.payment_orders;
CREATE TRIGGER payment_orders_track_conversion AFTER INSERT OR UPDATE OF status ON public.payment_orders
FOR EACH ROW EXECUTE FUNCTION public.track_payment_conversion();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  child_uuid uuid;
  age_value integer;
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, city)
  VALUES (
    NEW.id,
    COALESCE(NULLIF(btrim(NEW.raw_user_meta_data->>'full_name'), ''), NEW.email),
    NULLIF(btrim(NEW.raw_user_meta_data->>'phone'), ''),
    NULLIF(btrim(NEW.raw_user_meta_data->>'city'), '')
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'parent_prospect')
  ON CONFLICT (user_id, role) DO NOTHING;

  BEGIN
    age_value := NULLIF(NEW.raw_user_meta_data->>'child_age', '')::integer;
  EXCEPTION WHEN invalid_text_representation THEN
    age_value := NULL;
  END;

  IF NULLIF(btrim(NEW.raw_user_meta_data->>'child_name'), '') IS NOT NULL THEN
    INSERT INTO public.children (parent_id, name, age_years, primary_concern, notes)
    VALUES (
      NEW.id,
      btrim(NEW.raw_user_meta_data->>'child_name'),
      age_value,
      NULLIF(btrim(NEW.raw_user_meta_data->>'primary_concern'), ''),
      CASE WHEN NULLIF(btrim(NEW.raw_user_meta_data->>'pincode'), '') IS NOT NULL
        THEN 'PIN/ZIP: ' || btrim(NEW.raw_user_meta_data->>'pincode') ELSE NULL END
    ) RETURNING id INTO child_uuid;
  END IF;

  RETURN NEW;
END;
$$;

CREATE POLICY "own profile update"
ON public.profiles FOR UPDATE TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

GRANT UPDATE (full_name, phone, city, avatar_url) ON public.profiles TO authenticated;
GRANT UPDATE (name, age_years, primary_concern, current_therapies, notes) ON public.children TO authenticated;