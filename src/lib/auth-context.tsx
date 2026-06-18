import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

type Role =
  | "parent_prospect"
  | "parent_enrolled"
  | "employee"
  | "coordinator"
  | "clinical_advisor"
  | "sales"
  | "content_manager"
  | "admin";

type AuthState = {
  user: User | null;
  session: Session | null;
  roles: Role[];
  isStaff: boolean;
  isAdmin: boolean;
  isCoordinator: boolean;
  isEmployee: boolean;
  isParent: boolean;
  portalPath: string;
  loading: boolean;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthState | null>(null);

const STAFF_ROLES: Role[] = ["coordinator", "clinical_advisor", "sales", "content_manager", "admin", "employee"];

function pickPortalPath(roles: Role[]): string {
  if (roles.includes("admin")) return "/app/admin";
  if (roles.includes("coordinator")) return "/staff/manage";
  if (roles.includes("employee")) return "/staff";
  if (roles.includes("parent_enrolled")) return "/family";
  return "/profile";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s?.user) {
        setTimeout(() => loadRoles(s.user.id), 0);
      } else {
        setRoles([]);
      }
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session?.user) {
        loadRoles(data.session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function loadRoles(userId: string) {
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
    setRoles((data ?? []).map((r) => r.role as Role));
  }

  const value = useMemo<AuthState>(
    () => ({
      user: session?.user ?? null,
      session,
      roles,
      isStaff: roles.some((r) => STAFF_ROLES.includes(r)),
      isAdmin: roles.includes("admin"),
      isCoordinator: roles.includes("coordinator"),
      isEmployee: roles.includes("employee"),
      isParent: roles.includes("parent_enrolled") || roles.includes("parent_prospect"),
      portalPath: pickPortalPath(roles),
      loading,
      signOut: async () => {
        await supabase.auth.signOut();
      },
    }),
    [session, roles, loading],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
