
-- 1. Fix coordinator bypass
CREATE OR REPLACE FUNCTION public.is_department_coordinator(_user uuid, _dept uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = _user
      AND p.department_id = _dept
      AND (p.is_tl = true OR public.has_role(_user, 'coordinator'))
  );
$function$;

-- 2. Add WITH CHECK to admin profile update policy (pin is_tl, department_id to existing values)
DROP POLICY IF EXISTS "staff update profiles" ON public.profiles;
CREATE POLICY "staff update profiles" ON public.profiles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (
  public.has_role(auth.uid(), 'admin')
);

-- 3. Add WITH CHECK to assignee update own task (pin assignee_id, department_id, assigned_by, priority)
DROP POLICY IF EXISTS "assignee update own task" ON public.tasks;
CREATE POLICY "assignee update own task" ON public.tasks
FOR UPDATE
TO authenticated
USING (assignee_id = auth.uid())
WITH CHECK (
  assignee_id = auth.uid()
  AND department_id IS NOT DISTINCT FROM (SELECT t.department_id FROM public.tasks t WHERE t.id = tasks.id)
  AND assigned_by IS NOT DISTINCT FROM (SELECT t.assigned_by FROM public.tasks t WHERE t.id = tasks.id)
  AND priority IS NOT DISTINCT FROM (SELECT t.priority FROM public.tasks t WHERE t.id = tasks.id)
);
