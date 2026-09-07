import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

import { Layout, PageHero } from "@/components/site/Layout";
import { useLanguage } from "@/i18n/LanguageContext";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";

export const Route = createFileRoute("/whats-coming")({
  head: () => ({
    meta: [
      { title: "What is Coming — Invest with Darou Thiaw Agro Élevage" },
      {
        name: "description",
        content:
          "Upcoming expansion at Darou Thiaw Agro Élevage and investment opportunities for immigrants who want a stake in productive farmland and poultry operations.",
      },
      { property: "og:title", content: "What is Coming — Invest with Darou   Thiaw Agro Élevage" },
      {
        property: "og:description",
        content: "Expansion phases and investment openings for the diaspora community.",
      },
    ],
  }),
  component: WhatsComing,
});

const phases = [
  { tagKey: "coming.p1", titleKey: "coming.p1t", copyKey: "coming.p1c" },
  { tagKey: "coming.p2", titleKey: "coming.p2t", copyKey: "coming.p2c" },
  { tagKey: "coming.p3", titleKey: "coming.p3t", copyKey: "coming.p3c" },
  { tagKey: "coming.p4", titleKey: "coming.p4t", copyKey: "coming.p4c" },
] as const;

function WhatsComing() {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <Layout>
      <PageHero
        eyebrow={t("coming.eyebrow")}
        title={
          <>
            {t("coming.title1")}
            <br />
            <span className="text-ember">{t("coming.title2")}</span>
          </>
        }
        lead={t("coming.lead")}
      />

      <section className="mx-auto max-w-4xl px-5 py-12">
        <div ref={trackRef} className="relative pl-10 sm:pl-14">
          <div className="absolute top-2 bottom-2 left-3 w-[3px] rounded-full bg-border sm:left-5" />
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute top-2 bottom-2 left-3 w-[3px] rounded-full bg-[image:var(--gradient-ember)] sm:left-5"
          />

          <RevealGroup className="space-y-8" amount={0.1}>
            {phases.map((phase) => (
              <RevealItem key={phase.tagKey}>
                <div className="relative">
                  <motion.span
                    whileInView={{ scale: [0.4, 1.15, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="absolute top-8 -left-[1.9rem] size-4 rounded-full border-2 border-background bg-primary sm:-left-[2.6rem]"
                  />
                  <article className="surface-card rounded-3xl p-7">
                    <p className="eyebrow">{t(phase.tagKey)}</p>
                    <h2 className="mt-2 text-2xl font-bold text-secondary">{t(phase.titleKey)}</h2>
                    <p className="mt-3 text-muted-foreground">{t(phase.copyKey)}</p>
                  </article>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grain-overlay overflow-hidden rounded-[2rem] bg-[image:var(--gradient-ember)] p-10 text-center text-primary-foreground"
        >
          <h2 className="text-3xl font-black sm:text-4xl">{t("coming.ctaTitle")}</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-90">{t("coming.ctaCopy")}</p>
          <Link
            to="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 font-semibold text-secondary-foreground transition-transform hover:scale-105"
          >
            {t("coming.cta")}
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
}
