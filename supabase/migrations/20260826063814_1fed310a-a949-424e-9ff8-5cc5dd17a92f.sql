CREATE TABLE public.job_openings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  department text NOT NULL DEFAULT 'General',
  location text NOT NULL DEFAULT 'Kolkata',
  employment_type text NOT NULL DEFAULT 'Full-time',
  experience text,
  summary text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  responsibilities text[] NOT NULL DEFAULT '{}',
  requirements text[] NOT NULL DEFAULT '{}',
  salary_note text,
  apply_by date,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.job_openings TO anon;
GRANT SELECT ON public.job_openings TO authenticated;
GRANT ALL ON public.job_openings TO service_role;

ALTER TABLE public.job_openings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can read published openings"
  ON public.job_openings FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY "service role manages openings"
  ON public.job_openings FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

CREATE TRIGGER job_openings_touch_updated_at
  BEFORE UPDATE ON public.job_openings
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES public.job_openings(id) ON DELETE SET NULL,
  job_title text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  city text,
  current_role_title text,
  experience_years text,
  cover_note text,
  link_url text,
  resume_path text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.job_applications TO service_role;

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service role manages applications"
  ON public.job_applications FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

CREATE INDEX job_applications_job_id_idx ON public.job_applications(job_id);

CREATE TRIGGER job_applications_touch_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.job_openings (title, slug, department, location, employment_type, experience, summary, description, responsibilities, requirements, published)
VALUES
('Parent Coach (Neurodevelopment)', 'parent-coach', 'Clinical', 'Kolkata / Remote', 'Full-time', '2+ years',
 'Guide families through the parent-led Flightpath programme with weekly coaching calls.',
 'You will work directly with parents of children with autism, ADHD and speech delay, translating the Flightpath framework into weekly, doable home plans.',
 ARRAY['Run weekly coaching calls with enrolled families','Track child progress and update module plans','Escalate clinical concerns to the advisory team'],
 ARRAY['Background in speech therapy, occupational therapy, psychology or special education','Excellent spoken Bengali, Hindi and English','Comfortable with video calls and simple digital tools'],
 true),
('Front Desk & Family Coordinator', 'front-desk-coordinator', 'Operations', 'Kolkata', 'Full-time', '1+ years',
 'Be the first friendly voice for families reaching out to the Kolkata clinic.',
 'You will manage appointments, greet families at the clinic and keep records tidy and accurate.',
 ARRAY['Handle calls, WhatsApp and appointment scheduling','Welcome families at the clinic','Maintain accurate records of visits and follow-ups'],
 ARRAY['Warm, patient communication style','Fluent Bengali and working English','Basic computer and spreadsheet skills'],
 true);