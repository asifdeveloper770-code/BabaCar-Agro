import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/_admin/services")({
  component: AdminServices,
});

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
}

function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState({ title: "", description: "", category: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("created_at", { ascending: false });
    if (data) setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from("services").update(form).eq("id", editingId);
    } else {
      await supabase.from("services").insert([form]);
    }
    setForm({ title: "", description: "", category: "" });
    setEditingId(null);
    fetchServices();
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setForm({ title: service.title, description: service.description, category: service.category });
  };

  const handleDelete = async (id: string) => {
    await supabase.from("services").delete().eq("id", id);
    fetchServices();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary">Services Management</h1>
      
      {/* Create / Edit Form */}
      <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-border bg-card p-6 space-y-4 max-w-xl">
        <h2 className="text-sm font-semibold">{editingId ? "Edit Service" : "Add New Service"}</h2>
        <input
          placeholder="Service Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
        />
        <input
          placeholder="Category (e.g. Vegetables, Chickens)"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm h-24"
        />
        <div className="flex gap-2">
          <button type="submit" className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
            {editingId ? "Update Service" : "Add Service"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ title: "", description: "", category: "" });
              }}
              className="rounded-xl bg-muted px-4 py-2 text-xs font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Services List Table */}
      <div className="mt-8 rounded-2xl border border-border bg-card overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 border-b border-border text-xs uppercase font-semibold text-muted-foreground">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Description</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {services.map((item) => (
              <tr key={item.id}>
                <td className="p-4 font-semibold">{item.title}</td>
                <td className="p-4">{item.category}</td>
                <td className="p-4 text-muted-foreground max-w-xs truncate">{item.description}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleEdit(item)} className="text-xs text-primary font-semibold">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-xs text-destructive font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}