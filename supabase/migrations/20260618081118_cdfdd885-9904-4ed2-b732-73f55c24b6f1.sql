ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'employee';

CREATE TABLE public.departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  tl_user_id uuid,
  tl_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.departments TO authenticated;
GRANT ALL ON public.departments TO service_role;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone read departments" ON public.departments FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin manage departments" ON public.departments FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS department_id uuid REFERENCES public.departments(id) ON DELETE SET NULL;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_tl boolean NOT NULL DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url text;

CREATE OR REPLACE FUNCTION public.is_department_member(_user uuid, _dept uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = _user AND department_id = _dept);
$$;
CREATE OR REPLACE FUNCTION public.is_department_coordinator(_user uuid, _dept uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = _user AND p.department_id = _dept AND (p.is_tl = true OR public.has_role(_user, 'coordinator')));
$$;
REVOKE EXECUTE ON FUNCTION public.is_department_member(uuid, uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_department_coordinator(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_department_member(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_department_coordinator(uuid, uuid) TO authenticated;

CREATE TYPE public.task_status AS ENUM ('todo','in_progress','done');
CREATE TYPE public.task_priority AS ENUM ('low','normal','high','urgent');

CREATE TABLE public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id uuid NOT NULL REFERENCES public.departments(id) ON DELETE CASCADE,
  assignee_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  title text NOT NULL, description text, due_date date,
  month_bucket date NOT NULL,
  status public.task_status NOT NULL DEFAULT 'todo',
  priority public.task_priority NOT NULL DEFAULT 'normal',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tasks TO authenticated;
GRANT ALL ON public.tasks TO service_role;
CREATE INDEX idx_tasks_assignee_month ON public.tasks(assignee_id, month_bucket);
CREATE INDEX idx_tasks_dept_month ON public.tasks(department_id, month_bucket);
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "assignee read own tasks" ON public.tasks FOR SELECT TO authenticated USING (assignee_id = auth.uid());
CREATE POLICY "assignee update own task" ON public.tasks FOR UPDATE TO authenticated USING (assignee_id = auth.uid());
CREATE POLICY "dept coord read dept tasks" ON public.tasks FOR SELECT TO authenticated USING (public.is_department_coordinator(auth.uid(), department_id));
CREATE POLICY "dept coord insert dept tasks" ON public.tasks FOR INSERT TO authenticated WITH CHECK (public.is_department_coordinator(auth.uid(), department_id) AND assigned_by = auth.uid());
CREATE POLICY "dept coord update dept tasks" ON public.tasks FOR UPDATE TO authenticated USING (public.is_department_coordinator(auth.uid(), department_id));
CREATE POLICY "dept coord delete dept tasks" ON public.tasks FOR DELETE TO authenticated USING (public.is_department_coordinator(auth.uid(), department_id));
CREATE POLICY "admin manage tasks" ON public.tasks FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER tasks_updated_at BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TYPE public.appt_mode AS ENUM ('in_person','call','video');
CREATE TYPE public.appt_status AS ENUM ('scheduled','completed','cancelled','no_show');
CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid REFERENCES public.children(id) ON DELETE CASCADE,
  parent_id uuid NOT NULL,
  coordinator_id uuid,
  scheduled_at timestamptz NOT NULL,
  mode public.appt_mode NOT NULL DEFAULT 'in_person',
  location text,
  status public.appt_status NOT NULL DEFAULT 'scheduled',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.appointments TO authenticated;
GRANT ALL ON public.appointments TO service_role;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "parent read own appts" ON public.appointments FOR SELECT TO authenticated USING (parent_id = auth.uid());
CREATE POLICY "staff read appts" ON public.appointments FOR SELECT TO authenticated USING (is_staff(auth.uid()));
CREATE POLICY "staff manage appts" ON public.appointments FOR ALL TO authenticated USING (is_staff(auth.uid())) WITH CHECK (is_staff(auth.uid()));
CREATE TRIGGER appts_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.progress_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  parent_id uuid NOT NULL,
  week_start date NOT NULL, phase text, summary text NOT NULL,
  author_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.progress_reports TO authenticated;
GRANT ALL ON public.progress_reports TO service_role;
ALTER TABLE public.progress_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "parent read own reports" ON public.progress_reports FOR SELECT TO authenticated USING (parent_id = auth.uid());
CREATE POLICY "staff manage reports" ON public.progress_reports FOR ALL TO authenticated USING (is_staff(auth.uid())) WITH CHECK (is_staff(auth.uid()));

CREATE TABLE public.modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  parent_id uuid NOT NULL,
  phase text NOT NULL, week int NOT NULL DEFAULT 1,
  title text NOT NULL, description text,
  status public.task_status NOT NULL DEFAULT 'todo',
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.modules TO authenticated;
GRANT ALL ON public.modules TO service_role;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "parent read own modules" ON public.modules FOR SELECT TO authenticated USING (parent_id = auth.uid());
CREATE POLICY "parent update own modules" ON public.modules FOR UPDATE TO authenticated USING (parent_id = auth.uid());
CREATE POLICY "staff manage modules" ON public.modules FOR ALL TO authenticated USING (is_staff(auth.uid())) WITH CHECK (is_staff(auth.uid()));

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid REFERENCES public.children(id) ON DELETE CASCADE,
  parent_id uuid NOT NULL,
  name text NOT NULL, type text, link text, notes text,
  assigned_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "parent read own products" ON public.products FOR SELECT TO authenticated USING (parent_id = auth.uid());
CREATE POLICY "staff manage products" ON public.products FOR ALL TO authenticated USING (is_staff(auth.uid())) WITH CHECK (is_staff(auth.uid()));

INSERT INTO public.departments (name, slug, tl_name) VALUES
  ('Marketing','marketing','Sourav Chowdhury'),
  ('Sales','sales','Joy Basu'),
  ('PE & FP Sales','pe-fp-sales','Shreya Dey'),
  ('PE & FP Progress','pe-fp-progress','Shreya Dey'),
  ('PE & FP Ops','pe-fp-ops','Shreya Dey'),
  ('Events','events','Shreya Dey'),
  ('Rest of Ops','rest-of-ops','Shoubhik Chowdhury'),
  ('Finance','finance','Shoubhik Chowdhury'),
  ('People','people','Shoubhik Chowdhury'),
  ('MDO','mdo','Shoubhik Chowdhury'),
  ('Business Growth','business-growth','Shoubhik Chowdhury'),
  ('Systems','systems','Tanmoy Biswas'),
  ('Advance System & AI','advance-system-ai','Md. Sahir Islam'),
  ('Media','media','Sourav Chowdhury'),
  ('Books','books','Sourav Chowdhury'),
  ('DD Personal','dd-personal','Shoubhik Chowdhury'),
  ('AD Personal','ad-personal','Shoubhik Chowdhury'),
  ('Writoja-Arkodipto Studies','writoja-arkodipto','Shoubhik Chowdhury')
ON CONFLICT (slug) DO NOTHING;