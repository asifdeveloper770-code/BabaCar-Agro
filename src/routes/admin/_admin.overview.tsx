import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/_admin/overview")({
  component: AdminOverview,
});

function AdminOverview() {
  const [stats, setStats] = useState({ services: 0, contacts: 0 });

  useEffect(() => {
    async function loadStats() {
      const { count: servicesCount } = await supabase.from("services").select("*", { count: "exact", head: true });
      const { count: contactsCount } = await supabase.from("contacts").select("*", { count: "exact", head: true });

      setStats({
        services: servicesCount || 0,
        contacts: contactsCount || 0,
      });
    }
    loadStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary">Dashboard Overview</h1>
      <p className="text-sm text-muted-foreground">Metrics and recent activities</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground">Total Services</p>
          <p className="mt-2 text-3xl font-bold text-secondary">{stats.services}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground">Contact Inquiries</p>
          <p className="mt-2 text-3xl font-bold text-secondary">{stats.contacts}</p>
        </div>
      </div>
    </div>
  );
}