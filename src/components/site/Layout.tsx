import type { ReactNode } from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip">
      <Header />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
}) {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-14 pb-6 text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-4 text-4xl font-black text-secondary sm:text-6xl">{title}</h1>
      <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">{lead}</p>
    </section>
  );
}
