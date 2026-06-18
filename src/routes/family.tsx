import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { PortalShell } from "@/components/site/PortalShell";
import { RoleGuard } from "@/components/site/RoleGuard";

const FAMILY_NAV = [
  { to: "/family", label: "Overview" },
  { to: "/family/appointments", label: "Appointments" },
  { to: "/family/progress", label: "Progress reports" },
  { to: "/family/modules", label: "Modules" },
  { to: "/family/products", label: "Products" },
];

export const Route = createFileRoute("/family")({
  head: () => ({
    meta: [
      { title: "Family portal — IND" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <RoleGuard
      allow={["parent_enrolled", "parent_prospect", "admin", "coordinator", "clinical_advisor"]}
      label="enrolled families"
    >
      <PortalShell
        title="Family portal"
        subtitle="Your child's flightpath, week by week."
        nav={FAMILY_NAV}
      >
        <Outlet />
      </PortalShell>
    </RoleGuard>
  ),
});
