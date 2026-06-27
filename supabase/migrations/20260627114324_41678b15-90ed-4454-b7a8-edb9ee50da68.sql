
DROP POLICY IF EXISTS "staff update leads" ON public.leads;
CREATE POLICY "staff update leads" ON public.leads
  FOR UPDATE TO authenticated
  USING (public.is_staff(auth.uid()))
  WITH CHECK (
    public.is_staff(auth.uid())
    AND NOT (parent_id IS DISTINCT FROM (SELECT l.parent_id FROM public.leads l WHERE l.id = leads.id))
    AND NOT (owner_id IS DISTINCT FROM (SELECT l.owner_id FROM public.leads l WHERE l.id = leads.id))
  );

DROP POLICY IF EXISTS "dept coord update dept tasks" ON public.tasks;
CREATE POLICY "dept coord update dept tasks" ON public.tasks
  FOR UPDATE TO authenticated
  USING (public.is_department_coordinator(auth.uid(), department_id))
  WITH CHECK (
    public.is_department_coordinator(auth.uid(), department_id)
    AND NOT (department_id IS DISTINCT FROM (SELECT t.department_id FROM public.tasks t WHERE t.id = tasks.id))
  );
