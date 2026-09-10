import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/_admin/contacts")({
  component: AdminContacts,
});

interface Contact {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    async function fetchContacts() {
      const { data } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
      if (data) setContacts(data);
    }
    fetchContacts();
  }, []);

  const handleDelete = async (id: string) => {
    await supabase.from("contacts").delete().eq("id", id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary">Contact Submissions</h1>
      <p className="text-sm text-muted-foreground">Messages and order inquiries submitted by visitors</p>

      <div className="mt-6 rounded-2xl border border-border bg-card overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 border-b border-border text-xs uppercase font-semibold text-muted-foreground">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Contact Details</th>
              <th className="p-4">Message</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {contacts.map((item) => (
              <tr key={item.id}>
                <td className="p-4 font-semibold">{item.full_name}</td>
                <td className="p-4">
                  <p>{item.email}</p>
                  <p className="text-xs text-muted-foreground">{item.phone}</p>
                </td>
                <td className="p-4 text-muted-foreground max-w-sm">{item.message}</td>
                <td className="p-4 text-xs text-muted-foreground">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(item.id)} className="text-xs text-destructive font-semibold">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}