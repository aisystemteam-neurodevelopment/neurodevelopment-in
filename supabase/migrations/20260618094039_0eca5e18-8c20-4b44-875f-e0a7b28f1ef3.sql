DROP POLICY IF EXISTS "own profile update" ON public.profiles;

CREATE POLICY "own profile update"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id
  AND is_tl IS NOT DISTINCT FROM (SELECT p.is_tl FROM public.profiles p WHERE p.id = auth.uid())
  AND department_id IS NOT DISTINCT FROM (SELECT p.department_id FROM public.profiles p WHERE p.id = auth.uid())
);