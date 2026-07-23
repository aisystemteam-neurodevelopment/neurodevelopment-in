DROP POLICY IF EXISTS "staff update escalations" ON public.escalations;
CREATE POLICY "staff update escalations" ON public.escalations FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "dept coord update dept tasks" ON public.tasks;
CREATE POLICY "dept coord update dept tasks" ON public.tasks FOR UPDATE TO authenticated USING (public.is_department_coordinator(auth.uid(), department_id)) WITH CHECK (public.is_department_coordinator(auth.uid(), department_id) AND department_id = (SELECT t.department_id FROM public.tasks t WHERE t.id = tasks.id));