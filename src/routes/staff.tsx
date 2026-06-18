import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PortalShell } from "@/components/site/PortalShell";
import { RoleGuard } from "@/components/site/RoleGuard";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/staff")({
  head: () => ({
    meta: [
      { title: "Staff portal — IND" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StaffLayout,
});

function StaffLayout() {
  const { isCoordinator, isAdmin } = useAuth();
  const nav = [
    { to: "/staff", label: "My tasks" },
    ...(isCoordinator || isAdmin ? [{ to: "/staff/manage", label: "Team & assign" }] : []),
  ];
  return (
    <RoleGuard
      allow={["employee", "coordinator", "clinical_advisor", "sales", "content_manager", "admin"]}
      label="IND staff"
    >
      <PortalShell title="Staff portal" subtitle="Tasks for this month and the next." nav={nav}>
        <Outlet />
      </PortalShell>
    </RoleGuard>
  );
}
