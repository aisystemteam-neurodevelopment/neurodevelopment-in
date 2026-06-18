-- Roles
CREATE TYPE public.app_role AS ENUM ('parent_prospect','parent_enrolled','coordinator','clinical_advisor','sales','content_manager','admin');
CREATE TYPE public.lead_stage AS ENUM ('new','diagnostic','trust_building','offer','paid','onboarded','lost');
CREATE TYPE public.escalation_type AS ENUM ('emotional_distress','clinical_complexity','payment_issue','technical_issue','conversion_ready','other');
CREATE TYPE public.escalation_status AS ENUM ('open','in_progress','resolved');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT, phone TEXT, city TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('coordinator','clinical_advisor','sales','content_manager','admin'));
$$;

CREATE TABLE public.children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT, age_years INT, primary_concern TEXT, current_therapies TEXT, notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.children TO authenticated;
GRANT ALL ON public.children TO service_role;

CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  child_id UUID REFERENCES public.children(id) ON DELETE SET NULL,
  anon_session_id TEXT, contact_name TEXT, contact_email TEXT, contact_phone TEXT,
  stage public.lead_stage NOT NULL DEFAULT 'new',
  owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  urgency INT NOT NULL DEFAULT 0,
  source TEXT NOT NULL DEFAULT 'chat',
  summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
CREATE INDEX idx_leads_stage ON public.leads(stage);
CREATE INDEX idx_leads_parent ON public.leads(parent_id);
CREATE INDEX idx_leads_anon ON public.leads(anon_session_id);

CREATE TABLE public.lead_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user','assistant','system')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lead_messages TO authenticated;
GRANT ALL ON public.lead_messages TO service_role;
CREATE INDEX idx_lead_messages_lead ON public.lead_messages(lead_id, created_at);

CREATE TABLE public.escalations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  type public.escalation_type NOT NULL,
  severity INT NOT NULL DEFAULT 1,
  assigned_role public.app_role NOT NULL,
  status public.escalation_status NOT NULL DEFAULT 'open',
  sla_due_at TIMESTAMPTZ, resolution_note TEXT, resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.escalations TO authenticated;
GRANT ALL ON public.escalations TO service_role;

CREATE TABLE public.knowledge_snippets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE, category TEXT NOT NULL, content TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 100, active BOOLEAN NOT NULL DEFAULT true,
  version INT NOT NULL DEFAULT 1,
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.knowledge_snippets TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.knowledge_snippets TO authenticated;
GRANT ALL ON public.knowledge_snippets TO service_role;

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_leads_updated BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name) VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'parent_prospect');
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escalations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_snippets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id OR public.is_staff(auth.uid()));
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "staff update profiles" ON public.profiles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE POLICY "own roles read" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.is_staff(auth.uid()));
CREATE POLICY "admin manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "parent manage own children" ON public.children FOR ALL TO authenticated USING (parent_id = auth.uid()) WITH CHECK (parent_id = auth.uid());
CREATE POLICY "staff read children" ON public.children FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));

CREATE POLICY "parent read own leads" ON public.leads FOR SELECT TO authenticated USING (parent_id = auth.uid());
CREATE POLICY "staff read all leads" ON public.leads FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "staff update leads" ON public.leads FOR UPDATE TO authenticated USING (public.is_staff(auth.uid()));

CREATE POLICY "parent read own lead messages" ON public.lead_messages FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.leads l WHERE l.id = lead_id AND l.parent_id = auth.uid()));
CREATE POLICY "staff read lead messages" ON public.lead_messages FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));

CREATE POLICY "staff read escalations" ON public.escalations FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "staff update escalations" ON public.escalations FOR UPDATE TO authenticated USING (public.is_staff(auth.uid()));

CREATE POLICY "anyone read active snippets" ON public.knowledge_snippets FOR SELECT TO anon, authenticated USING (active = true OR public.is_staff(auth.uid()));
CREATE POLICY "content/admin manage snippets" ON public.knowledge_snippets FOR ALL TO authenticated USING (public.has_role(auth.uid(),'content_manager') OR public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'content_manager') OR public.has_role(auth.uid(),'admin'));

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_staff(UUID) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;