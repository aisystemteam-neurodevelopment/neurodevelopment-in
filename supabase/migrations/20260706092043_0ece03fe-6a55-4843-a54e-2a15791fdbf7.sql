-- Lock down refund-screenshots uploads: remove anon/authenticated INSERT policy.
-- Uploads now go through the server-side /api/public/refund-request endpoint,
-- which validates size/type and uploads with the service role.
DROP POLICY IF EXISTS "anon upload refund screenshots" ON storage.objects;

-- Tighten tasks UPDATE WITH CHECK for department coordinators: re-verify the
-- coordinator belongs to the (unchanged) department after the update.
DROP POLICY IF EXISTS "dept coord update dept tasks" ON public.tasks;
CREATE POLICY "dept coord update dept tasks" ON public.tasks
  FOR UPDATE TO authenticated
  USING (public.is_department_coordinator(auth.uid(), department_id))
  WITH CHECK (
    public.is_department_coordinator(auth.uid(), department_id)
    AND department_id = (SELECT t.department_id FROM public.tasks t WHERE t.id = tasks.id)
  );
