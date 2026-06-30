import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { RoleGuard } from "@/components/site/RoleGuard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Loader2, Download, FileText } from "lucide-react";

export const Route = createFileRoute("/app/refunds")({
  head: () => ({ meta: [{ title: "Refund Requests — IND Staff" }] }),
  component: () => (
    <RoleGuard
      allow={["coordinator", "clinical_advisor", "sales", "content_manager", "admin"]}
      label="IND staff"
    >
      <RefundsPage />
    </RoleGuard>
  ),
});

type RefundLead = {
  id: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  stage: string;
  summary: string | null;
  attachment_path: string | null;
  created_at: string;
};

function RefundsPage() {
  const [rows, setRows] = useState<RefundLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState<Record<string, string>>({});

  useEffect(() => {
    supabase
      .from("leads")
      .select("id,contact_name,contact_email,contact_phone,stage,summary,attachment_path,created_at")
      .eq("source", "refund_request")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data }) => {
        setRows((data as RefundLead[]) ?? []);
        setLoading(false);
      });
  }, []);

  const openScreenshot = async (id: string, path: string) => {
    if (signed[id]) {
      window.open(signed[id], "_blank");
      return;
    }
    const { data, error } = await supabase.storage
      .from("refund-screenshots")
      .createSignedUrl(path, 60 * 10);
    if (error || !data?.signedUrl) {
      alert("Could not load screenshot: " + (error?.message ?? "unknown"));
      return;
    }
    setSigned((s) => ({ ...s, [id]: data.signedUrl }));
    window.open(data.signedUrl, "_blank");
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-5 py-10" data-no-center>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="text-left">
            <h1 className="font-display text-3xl">Refund requests</h1>
            <p className="text-sm text-muted-foreground">
              {loading ? "Loading…" : `${rows.length} request${rows.length === 1 ? "" : "s"} from the refund form.`}
            </p>
          </div>
          <Link to="/app/leads" className="text-sm underline text-muted-foreground hover:text-foreground">
            View all leads →
          </Link>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3">Parent</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Details</th>
                <th className="px-4 py-3">Stage</th>
                <th className="px-4 py-3">Screenshot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground"><Loader2 className="inline h-4 w-4 animate-spin" /> Loading…</td></tr>
              )}
              {!loading && rows.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No refund requests yet.</td></tr>
              )}
              {rows.map((r) => (
                <tr key={r.id} className="align-top">
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-muted-foreground">
                    {new Date(r.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-medium">{r.contact_name ?? "—"}</td>
                  <td className="px-4 py-3 text-xs">
                    {r.contact_email && <div>{r.contact_email}</div>}
                    {r.contact_phone && <div className="text-muted-foreground">{r.contact_phone}</div>}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground max-w-md">
                    <div className="whitespace-pre-wrap break-words">{r.summary ?? "—"}</div>
                  </td>
                  <td className="px-4 py-3"><Badge variant="outline">{r.stage}</Badge></td>
                  <td className="px-4 py-3">
                    {r.attachment_path ? (
                      <button
                        onClick={() => openScreenshot(r.id, r.attachment_path!)}
                        className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs hover:bg-muted"
                      >
                        <Download className="h-3 w-3" /> View
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><FileText className="h-3 w-3" /> None</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </SiteLayout>
  );
}