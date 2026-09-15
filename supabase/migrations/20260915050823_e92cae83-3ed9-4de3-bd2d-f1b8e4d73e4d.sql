REVOKE ALL ON FUNCTION public.track_lead_conversion() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.track_appointment_conversion() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.track_payment_conversion() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.track_lead_conversion() TO service_role;
GRANT EXECUTE ON FUNCTION public.track_appointment_conversion() TO service_role;
GRANT EXECUTE ON FUNCTION public.track_payment_conversion() TO service_role;