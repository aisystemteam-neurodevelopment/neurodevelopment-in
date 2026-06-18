import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — IND" },
      { name: "description", content: "Sign in or create your IND account to access your family portal." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Sign in — IND" },
      { property: "og:description", content: "Access your IND family or staff portal." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) nav({ to: "/" });
  }, [user, nav]);

  async function emailSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(fd.get("email")),
      password: String(fd.get("password")),
    });
    setBusy(false);
    if (error) toast.error(error.message);
    else nav({ to: "/" });
  }

  async function emailSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.auth.signUp({
      email: String(fd.get("email")),
      password: String(fd.get("password")),
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: String(fd.get("name") ?? "") },
      },
    });
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Account created. You're signed in.");
      nav({ to: "/" });
    }
  }

  async function google() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) toast.error("Google sign-in failed");
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-md px-5 py-16">
        <h1 className="text-center font-display text-4xl">Welcome</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Sign in to save your conversation and access your portal.
        </p>

        <div className="mt-8 rounded-3xl border border-border bg-card p-6">
          <Button onClick={google} variant="outline" className="w-full rounded-full">
            Continue with Google
          </Button>
          <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
          </div>

          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Create account</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={emailSignIn} className="mt-4 space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="se">Email</Label>
                  <Input id="se" name="email" type="email" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sp">Password</Label>
                  <Input id="sp" name="password" type="password" required />
                </div>
                <Button disabled={busy} type="submit" className="w-full rounded-full">Sign in</Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={emailSignUp} className="mt-4 space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="un">Your name</Label>
                  <Input id="un" name="name" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ue">Email</Label>
                  <Input id="ue" name="email" type="email" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="up">Password</Label>
                  <Input id="up" name="password" type="password" minLength={8} required />
                </div>
                <Button disabled={busy} type="submit" className="w-full rounded-full">Create account</Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          <Link to="/" className="underline">Back to home</Link>
        </p>
      </section>
    </SiteLayout>
  );
}
