import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/i18n/LanguageContext";

import { Layout, PageHero } from "@/components/site/Layout";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import { TiltCard } from "@/components/site/TiltCard";
import farm from "@/assets/farm-landscape.jpg";
import owner from "@/assets/owner-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Thiaw Agro Élevage" },
      {
        name: "description",
        content:
          "The story behind Thiaw Agro Élevage: a family farm raising poultry and growing fruits and vegetables with honest, careful practices.",
      },
      { property: "og:title", content: "About Thiaw Agro Élevage" },
      {
        property: "og:description",
        content: "A family farm built on quality breeding and the taste of the terroir.",
      },
    ],
  }),
  component: About,
});

const chapters = [
  { yearKey: "about.beginning", titleKey: "about.beginningTitle", copyKey: "about.beginningCopy" },
  { yearKey: "about.land", titleKey: "about.landTitle", copyKey: "about.landCopy" },
  { yearKey: "about.today", titleKey: "about.todayTitle", copyKey: "about.todayCopy" },
] as const;

function About() {
  const { t } = useLanguage();
  return (
    <Layout>
      <PageHero
        eyebrow={t("about.eyebrow")}
        title={
          <>
            {t("about.title1")}
            <br />
            <span className="text-ember">{t("about.title2")}</span>
          </>
        }
        lead={t("about.lead")}
      />

      <section className="mx-auto max-w-6xl px-5 py-12">
        <RevealGroup className="grid gap-8 lg:grid-cols-2">
          <RevealItem>
            <TiltCard className="grain-overlay overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-lift)]">
              <img
                src={owner}
                alt="Babacar Thiaw on the farm"
                width={1008}
                height={1312}
                loading="lazy"
                className="h-[26rem] w-full object-cover lg:h-full"
              />
            </TiltCard>
          </RevealItem>
          <div className="space-y-6">
            {chapters.map((chapter) => (
              <RevealItem key={chapter.yearKey}>
                <article className="surface-card rounded-3xl p-7">
                  <p className="eyebrow">{t(chapter.yearKey)}</p>
                  <h2 className="mt-2 text-2xl font-bold text-secondary">{t(chapter.titleKey)}</h2>
                  <p className="mt-3 text-muted-foreground">{t(chapter.copyKey)}</p>
                </article>
              </RevealItem>
            ))}
          </div>
        </RevealGroup>
      </section>

      <section className="relative mt-6 overflow-hidden">
        <img
          src={farm}
          alt="Farm fields at sunrise"
          width={1600}
          height={900}
          loading="lazy"
          className="h-72 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-[image:var(--gradient-olive)]/70">
          <p className="max-w-2xl px-6 text-center font-display text-2xl font-bold text-secondary-foreground sm:text-3xl">
            {t("about.quote")}
          </p>
        </div>
      </section>
    </Layout>
  );
}
