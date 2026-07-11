
-- profiles
CREATE OR REPLACE FUNCTION public.enforce_profiles_immutable_fields()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    IF NEW.is_tl IS DISTINCT FROM OLD.is_tl THEN
      RAISE EXCEPTION 'Not allowed to change is_tl';
    END IF;
    IF NEW.department_id IS DISTINCT FROM OLD.department_id THEN
      RAISE EXCEPTION 'Not allowed to change department_id';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_lock_privileged_fields ON public.profiles;
CREATE TRIGGER profiles_lock_privileged_fields
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.enforce_profiles_immutable_fields();

DROP POLICY IF EXISTS "own profile update" ON public.profiles;
CREATE POLICY "own profile update" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- modules
CREATE OR REPLACE FUNCTION public.enforce_modules_immutable_fields()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_staff(auth.uid()) THEN
    IF NEW.phase IS DISTINCT FROM OLD.phase
       OR NEW.week IS DISTINCT FROM OLD.week
       OR NEW.title IS DISTINCT FROM OLD.title
       OR NEW.description IS DISTINCT FROM OLD.description
       OR NEW.child_id IS DISTINCT FROM OLD.child_id
       OR NEW.parent_id IS DISTINCT FROM OLD.parent_id THEN
      RAISE EXCEPTION 'Not allowed to change protected module fields';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS modules_lock_privileged_fields ON public.modules;
CREATE TRIGGER modules_lock_privileged_fields
  BEFORE UPDATE ON public.modules
  FOR EACH ROW EXECUTE FUNCTION public.enforce_modules_immutable_fields();

DROP POLICY IF EXISTS "parent update own modules" ON public.modules;
CREATE POLICY "parent update own modules" ON public.modules
  FOR UPDATE TO authenticated
  USING (parent_id = auth.uid())
  WITH CHECK (parent_id = auth.uid());

-- tasks
CREATE OR REPLACE FUNCTION public.enforce_tasks_immutable_fields()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF public.has_role(auth.uid(), 'admin'::app_role) THEN
    RETURN NEW;
  END IF;
  IF public.is_department_coordinator(auth.uid(), OLD.department_id) THEN
    IF NEW.department_id IS DISTINCT FROM OLD.department_id THEN
      RAISE EXCEPTION 'Coordinators cannot move tasks to another department';
    END IF;
    RETURN NEW;
  END IF;
  IF NEW.department_id IS DISTINCT FROM OLD.department_id
     OR NEW.assigned_by IS DISTINCT FROM OLD.assigned_by
     OR NEW.priority IS DISTINCT FROM OLD.priority THEN
    RAISE EXCEPTION 'Not allowed to change protected task fields';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS tasks_lock_privileged_fields ON public.tasks;
CREATE TRIGGER tasks_lock_privileged_fields
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.enforce_tasks_immutable_fields();

DROP POLICY IF EXISTS "assignee update own task" ON public.tasks;
CREATE POLICY "assignee update own task" ON public.tasks
  FOR UPDATE TO authenticated
  USING (assignee_id = auth.uid())
  WITH CHECK (assignee_id = auth.uid());

DROP POLICY IF EXISTS "dept coord update dept tasks" ON public.tasks;
CREATE POLICY "dept coord update dept tasks" ON public.tasks
  FOR UPDATE TO authenticated
  USING (is_department_coordinator(auth.uid(), department_id))
  WITH CHECK (is_department_coordinator(auth.uid(), department_id));

-- leads
CREATE OR REPLACE FUNCTION public.enforce_leads_immutable_fields()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    IF NEW.parent_id IS DISTINCT FROM OLD.parent_id THEN
      RAISE EXCEPTION 'Not allowed to change parent_id';
    END IF;
    IF NEW.owner_id IS DISTINCT FROM OLD.owner_id THEN
      RAISE EXCEPTION 'Not allowed to change owner_id';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS leads_lock_privileged_fields ON public.leads;
CREATE TRIGGER leads_lock_privileged_fields
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.enforce_leads_immutable_fields();

DROP POLICY IF EXISTS "staff update leads" ON public.leads;
CREATE POLICY "staff update leads" ON public.leads
  FOR UPDATE TO authenticated
  USING (is_staff(auth.uid()))
  WITH CHECK (is_staff(auth.uid()));
