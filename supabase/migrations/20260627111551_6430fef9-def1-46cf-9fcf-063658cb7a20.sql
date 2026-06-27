
DROP POLICY IF EXISTS "parent update own modules" ON public.modules;
CREATE POLICY "parent update own modules" ON public.modules
  FOR UPDATE TO authenticated
  USING (parent_id = auth.uid())
  WITH CHECK (
    parent_id = auth.uid()
    AND NOT (phase IS DISTINCT FROM (SELECT m.phase FROM public.modules m WHERE m.id = modules.id))
    AND NOT (week IS DISTINCT FROM (SELECT m.week FROM public.modules m WHERE m.id = modules.id))
    AND NOT (title IS DISTINCT FROM (SELECT m.title FROM public.modules m WHERE m.id = modules.id))
    AND NOT (description IS DISTINCT FROM (SELECT m.description FROM public.modules m WHERE m.id = modules.id))
  );

DROP POLICY IF EXISTS "dept coord update dept tasks" ON public.tasks;
CREATE POLICY "dept coord update dept tasks" ON public.tasks
  FOR UPDATE TO authenticated
  USING (is_department_coordinator(auth.uid(), department_id))
  WITH CHECK (is_department_coordinator(auth.uid(), department_id));
