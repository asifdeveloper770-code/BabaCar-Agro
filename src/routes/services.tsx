import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Sprout, HeartHandshake } from "lucide-react";

import { Layout, PageHero } from "@/components/site/Layout";
import { useLanguage } from "@/i18n/LanguageContext";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import { TiltCard } from "@/components/site/TiltCard";

import agriculture from "@/assets/product-agriculture.jpg";
import fruits from "@/assets/product-fruits.jpg";
import vegetables from "@/assets/product-vegetables.jpg";
import chickens from "@/assets/product-chickens.jpg";
import farmerHarvest from "@/assets/farmer-harvest.jpg"; // File (21).jpg
import farmerSoilPrep from "@/assets/farmer-soil-prep.jpg"; // File (22).jpg

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


const farmerStories = [
  {
    image: farmerHarvest,
    titleKey: "services.farmers.harvestTitle",
    copyKey: "services.farmers.harvestCopy",
    icon: Sprout,
    badgeKey: "services.farmers.harvestBadge",
  },
  {
    image: farmerSoilPrep,
    titleKey: "services.farmers.soilTitle",
    copyKey: "services.farmers.soilCopy",
    icon: HeartHandshake,
    badgeKey: "services.farmers.soilBadge",
  },
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

      {/* Product Showcase */}
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

      {/* Target Audience / Buyers Section */}
      <section className="mx-auto max-w-6xl px-5 pb-12">
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

      {/* On-the-Ground Farming & Production Section */}
      <section className="border-t border-border/60 bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <p className="eyebrow">{t("services.farmers.eyebrow")}</p>
            <h2 className="mt-2 text-3xl font-bold text-secondary sm:text-4xl">
              {t("services.farmers.title")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              {t("services.farmers.lead")}
            </p>
          </div>

          <RevealGroup className="grid gap-8 md:grid-cols-2">
            {farmerStories.map((story) => {
              const Icon = story.icon;
              return (
                <RevealItem key={story.titleKey}>
                  <TiltCard
                    intensity={6}
                    className="grain-overlay group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <motion.img
                        src={story.image}
                        alt={t(story.titleKey)}
                        className="h-full w-full object-cover"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-background/90 px-3.5 py-1 text-xs font-semibold text-foreground backdrop-blur-sm shadow-sm">
                        <Icon className="size-3.5 text-primary" />
                        {t(story.badgeKey)}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-7">
                      <div>
                        <h3 className="text-xl font-bold text-secondary">
                          {t(story.titleKey)}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {t(story.copyKey)}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-xs font-medium text-muted-foreground">
                        <span>{t("services.farmers.directFromField")}</span>
                        <span className="text-primary font-semibold">100% Organic Practices</span>
                      </div>
                    </div>
                  </TiltCard>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>
    </Layout>
  );
}