import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/family/products")({
  component: ProductsPage,
});

type Product = {
  id: string;
  name: string;
  type: string | null;
  link: string | null;
  notes: string | null;
  assigned_at: string;
};

function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    supabase
      .from("products")
      .select("id,name,type,link,notes,assigned_at")
      .order("assigned_at", { ascending: false })
      .then(({ data }) => setItems((data as Product[]) ?? []));
  }, []);

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        No products assigned yet. Books, kits, and recordings will appear here as your coordinator assigns them.
      </div>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((p) => (
        <li key={p.id} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg">{p.name}</h3>
            {p.type && <Badge variant="outline">{p.type}</Badge>}
          </div>
          {p.notes && <p className="mt-2 text-sm text-muted-foreground">{p.notes}</p>}
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Open <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
