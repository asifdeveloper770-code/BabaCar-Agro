import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { Layout, PageHero } from "@/components/site/Layout";
import { useLanguage } from "@/i18n/LanguageContext";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import { TiltCard } from "@/components/site/TiltCard";
import agriculture from "@/assets/product-agriculture.jpg";
import fruits from "@/assets/product-fruits.jpg";
import vegetables from "@/assets/product-vegetables.jpg";
import chickens from "@/assets/product-chickens.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Products & Service — Darou Thiaw Agro Élevage" },
      {
        name: "description",
        content:
          "Agriculture, fruits, vegetables and chickens from Darou Thiaw Agro Élevage — retail crates for consumers, standing orders for restaurants, and bulk pricing for resellers.",
      },
      { property: "og:title", content: "Products & Service — Darou Thiaw Agro Élevage" },
      {
        property: "og:description",
        content: "Farm-direct supply for consumers, restaurants and resellers.",
      },
    ],
  }),
  component: Services,
});

const products = [
  { image: chickens, titleKey: "services.chickens", copyKey: "services.chickensCopy", tags: ["services.restaurants", "services.resellers"] },
  { image: vegetables, titleKey: "services.vegetables", copyKey: "services.vegetablesCopy", tags: ["services.consumers", "services.restaurants"] },
  { image: fruits, titleKey: "services.fruits", copyKey: "services.fruitsCopy", tags: ["services.consumers", "services.resellers"] },
  { image: agriculture, titleKey: "services.agriculture", copyKey: "services.agricultureCopy", tags: ["services.wholesale", "services.partners"] },
] as const;

const buyers = [
  { titleKey: "services.consumers", copyKey: "services.consumerCopy" },
  { titleKey: "services.restaurants", copyKey: "services.restaurantCopy" },
  { titleKey: "services.resellers", copyKey: "services.resellerCopy" },
] as const;

function Services() {
  const { t } = useLanguage();
  return (
    <Layout>
      <PageHero
        eyebrow={t("services.eyebrow")}
        title={
          <>
            {t("services.title1")}
            <br />
            <span className="text-ember">{t("services.title2")}</span>
          </>
        }
        lead={t("services.lead")}
      />

      <section className="mx-auto max-w-6xl px-5 py-12">
        <RevealGroup className="grid gap-6 sm:grid-cols-2">
          {products.map((product) => (
            <RevealItem key={product.titleKey}>
              <TiltCard
                intensity={9}
                className="grain-overlay group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]"
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={t(product.titleKey)}
                    width={900}
                    height={1100}
                    loading="lazy"
                    className="h-64 w-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={t(tag)}
                        className="rounded-full bg-secondary/85 px-3 py-1 text-xs font-semibold text-secondary-foreground"
                      >
                        {t(tag)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-7">
                  <h2 className="text-2xl font-bold text-secondary">{t(product.titleKey)}</h2>
                  <p className="mt-2 text-muted-foreground">{t(product.copyKey)}</p>
                  <Link
                    to="/contact"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    {t("services.request")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8">
        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {buyers.map((buyer) => (
            <RevealItem key={buyer.titleKey}>
              <div className="surface-card h-full rounded-3xl p-7">
                <p className="eyebrow">{t("services.builtFor")}</p>
                <h3 className="mt-2 text-xl font-bold text-secondary">{t(buyer.titleKey)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(buyer.copyKey)}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </Layout>
  );
}
