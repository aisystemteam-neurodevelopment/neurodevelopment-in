import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Video, Phone } from "lucide-react";

export const Route = createFileRoute("/family/appointments")({
  component: AppointmentsPage,
});

type Appt = {
  id: string;
  scheduled_at: string;
  mode: "in_person" | "call" | "video";
  location: string | null;
  status: string;
  notes: string | null;
};

function AppointmentsPage() {
  const [items, setItems] = useState<Appt[]>([]);

  useEffect(() => {
    supabase
      .from("appointments")
      .select("id,scheduled_at,mode,location,status,notes")
      .order("scheduled_at", { ascending: false })
      .then(({ data }) => setItems((data as Appt[]) ?? []));
  }, []);

  const now = Date.now();
  const upcoming = items.filter((a) => new Date(a.scheduled_at).getTime() >= now);
  const past = items.filter((a) => new Date(a.scheduled_at).getTime() < now);

  return (
    <div className="space-y-8">
      <Section title="Upcoming" empty="No upcoming appointments. Your coordinator will schedule the next one." items={upcoming} />
      <Section title="Past" empty="No past appointments yet." items={past} />
    </div>
  );
}

function Section({ title, items, empty }: { title: string; items: Appt[]; empty: string }) {
  return (
    <div>
      <h2 className="font-display text-xl">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-2 rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {items.map((a) => (
            <li key={a.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="h-4 w-4" />
                  {new Date(a.scheduled_at).toLocaleString()}
                </div>
                <Badge variant="outline" className="capitalize">{a.status.replace(/_/g, " ")}</Badge>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                {a.mode === "in_person" && <><MapPin className="h-4 w-4" />{a.location ?? "In person"}</>}
                {a.mode === "video" && <><Video className="h-4 w-4" />Video call</>}
                {a.mode === "call" && <><Phone className="h-4 w-4" />Phone call</>}
              </div>
              {a.notes && <p className="mt-3 text-sm">{a.notes}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
