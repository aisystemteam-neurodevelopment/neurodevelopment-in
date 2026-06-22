import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Talk to IND — Our parent assistant" },
      {
        name: "description",
        content: "Share what's on your mind about your child. Our assistant listens and our team follows up.",
      },
      { property: "og:title", content: "Talk to IND — Our parent assistant" },
      { property: "og:description", content: "Share what's on your mind about your child. Our assistant listens and our team follows up." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Talk to IND — Our parent assistant" },
      { name: "twitter:description", content: "Share what's on your mind. We follow up personally." },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "ind.chat.leadId";
const GREETING: Msg = {
  role: "assistant",
  content:
    "Hello, I'm here to listen. Take your time. Could you start by telling me, in your own words, what's on your mind about your child right now?",
};

function ChatPage() {
  const [leadId, setLeadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLeadId(localStorage.getItem(STORAGE_KEY));
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setBusy(true);
    try {
      const res = await fetch("/api/public/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, message: text }),
      });
      const data = (await res.json()) as { leadId?: string; reply?: string; error?: string };
      if (data.leadId && data.leadId !== leadId) {
        setLeadId(data.leadId);
        localStorage.setItem(STORAGE_KEY, data.leadId);
      }
      if (data.error) {
        toast.error(data.error);
      } else if (data.reply) {
        setMessages((m) => [...m, { role: "assistant", content: data.reply! }]);
      }
    } catch {
      toast.error("Network hiccup — please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteLayout>
      <section className="mx-auto flex max-w-3xl flex-col px-5 pt-10 pb-16">
        <div className="text-center">
          <h1 className="font-display text-4xl">Talk to us</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Anything you share helps our team prepare for you. We never give a diagnosis online.
          </p>
        </div>

        <div data-no-center className="mt-8 flex h-[60vh] flex-col rounded-3xl border border-border bg-card">
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-secondary px-4 py-2.5 text-sm text-muted-foreground">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current [animation-delay:240ms]" />
                  </span>
                </div>
              </div>
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              disabled={busy}
              maxLength={3000}
            />
            <Button type="submit" size="icon" disabled={busy || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
