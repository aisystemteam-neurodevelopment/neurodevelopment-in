import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useAuth } from "@/lib/auth-context";

type Role =
  | "parent_prospect"
  | "parent_enrolled"
  | "employee"
  | "coordinator"
  | "clinical_advisor"
  | "sales"
  | "content_manager"
  | "admin";

export function RoleGuard({
  allow,
  children,
  label,
}: {
  allow: Role[];
  children: ReactNode;
  label: string;
}) {
  const { user, roles, loading } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!loading && !user) nav({ to: "/auth" });
  }, [user, loading, nav]);

  if (loading) {
    return (
      <SiteLayout>
        <div className="p-10 text-center text-muted-foreground">Loading…</div>
      </SiteLayout>
    );
  }
  if (!user) return null;

  const ok = roles.some((r) => allow.includes(r));
  if (!ok) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-md px-5 py-20 text-center">
          <h1 className="font-display text-3xl">Access denied</h1>
          <p className="mt-2 text-muted-foreground">
            This area is for {label}. Your account doesn't have the required role.
            Please contact an admin if you believe this is a mistake.
          </p>
          <Link to="/" className="mt-4 inline-block text-sm underline">
            Back to home
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return <>{children}</>;
}
