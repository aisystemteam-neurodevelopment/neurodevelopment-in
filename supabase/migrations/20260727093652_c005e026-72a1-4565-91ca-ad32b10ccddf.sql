-- Drop unused task/department system
DROP TRIGGER IF EXISTS enforce_tasks_immutable_fields ON public.tasks;
DROP FUNCTION IF EXISTS public.enforce_tasks_immutable_fields() CASCADE;
DROP TABLE IF EXISTS public.tasks CASCADE;
DROP TABLE IF EXISTS public.departments CASCADE;

DROP FUNCTION IF EXISTS public.is_department_coordinator(uuid, uuid) CASCADE;
DROP FUNCTION IF EXISTS public.is_department_member(uuid, uuid) CASCADE;

-- Remove department / team-lead columns from profiles
ALTER TABLE public.profiles DROP COLUMN IF EXISTS department_id;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS is_tl;

-- Remove self-service profile updates entirely
DROP POLICY IF EXISTS "own profile update" ON public.profiles;

-- The immutability trigger only guarded is_tl/department_id, which no longer exist
DROP TRIGGER IF EXISTS enforce_profiles_immutable_fields ON public.profiles;
DROP FUNCTION IF EXISTS public.enforce_profiles_immutable_fields() CASCADE;