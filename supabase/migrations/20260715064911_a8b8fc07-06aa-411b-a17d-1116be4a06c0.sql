
-- 1) Drop parent-writable modules policy so parents can no longer overwrite staff-controlled fields
DROP POLICY IF EXISTS "parent update own modules" ON public.modules;

-- 2) Prevent admins from modifying their OWN user_roles row (blocks trivial self-escalation)
DROP POLICY IF EXISTS "admin manage roles" ON public.user_roles;
CREATE POLICY "admin manage roles"
  ON public.user_roles
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role) AND user_id <> auth.uid())
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) AND user_id <> auth.uid());

-- 3) Revoke EXECUTE from anon/authenticated on SECURITY DEFINER functions that are
--    only invoked by triggers (not needed by RLS or client RPC). Keep grants on
--    has_role / is_staff / is_department_member / is_department_coordinator because
--    RLS policies invoke those as the calling role.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.enforce_leads_immutable_fields() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.enforce_profiles_immutable_fields() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.enforce_modules_immutable_fields() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.enforce_tasks_immutable_fields() FROM PUBLIC, anon, authenticated;
