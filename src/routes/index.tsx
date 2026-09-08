import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowRight, Leaf, Sprout, Truck } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { RevealGroup, RevealItem, fadeUp, staggerParent } from "@/components/site/Reveal";
import { TiltCard } from "@/components/site/TiltCard";
import owner from "@/assets/hero.png";
import farm from "@/assets/farm-landscape.jpg";
import chickens from "@/assets/product-chickens.jpg";
import fruits from "@/assets/product-fruits.jpg";
import vegetables from "@/assets/product-vegetables.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Darou Thiaw Agro Élevage — Farm-Fresh Poultry, Fruits & Vegetables" },
      {
        name: "description",
        content:
          "Darou Thiaw Agro Élevage supplies farm-direct chickens, fruits and vegetables to families, restaurants and resellers. La qualité d'élevage, le goût du terroir.",
      },
      { property: "og:title", content: "Darou Thiaw Agro Élevage — Farm-Fresh from Our Land to Your Table" },
      {
        property: "og:description",
        content:
          "Poultry, fruits, vegetables and agriculture grown with care. Order direct or invest with us.",
      },
    ],
  }),
  component: Home,
});

const teasers = [{ image: chickens, titleKey: "home.chickens", copyKey: "home.chickensCopy" }, { image: vegetables, titleKey: "home.vegetables", copyKey: "home.vegetablesCopy" }, { image: fruits, titleKey: "home.fruits", copyKey: "home.fruitsCopy" }] as const;

function Home() {
  const { t } = useLanguage();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <Layout>
      {/* Hero */}
      <section ref={parallaxRef} className="relative overflow-hidden">
        <motion.img
          src={farm}
          alt="Farmland at golden hour"
          width={1600}
          height={900}
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 size-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[image:var(--gradient-wood)] opacity-70" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <motion.div variants={staggerParent} initial="hidden" animate="show">
            <motion.p variants={fadeUp} className="eyebrow">
              {t("home.eyebrow")}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-4 text-5xl leading-[0.95] font-black text-secondary sm:text-7xl"
            >
              {t("home.hero1")}
              <br />
              <span className="text-ember">{t("home.hero2")}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-lg text-lg text-muted-foreground">
              {t("home.heroLead")}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-105"
              >
                {t("home.order")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/whats-coming"
                className="inline-flex items-center gap-2 rounded-full border border-secondary/30 px-6 py-3 font-semibold text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground"
              >
                {t("home.invest")}
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 grid max-w-lg grid-cols-3 gap-4 text-sm text-secondary"
            >
              {[
                { icon: Sprout, label: t("home.value1") },
                { icon: Leaf, label: t("home.value2") },
                { icon: Truck, label: t("home.value3") },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col gap-2">
                  <Icon className="size-5 text-primary" />
                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: portraitY }}
            initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative mx-auto w-full max-w-md"
          >
            <TiltCard className="grain-overlay overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-lift)]">
              <img
                src={owner}
                alt={t("home.founderAlt")}
                width={1008}
                height={1312}
                className="h-[32rem] w-full object-cover sm:h-[36rem]"
              />
            </TiltCard>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="surface-card absolute -bottom-6 -left-4 max-w-[15rem] rounded-2xl px-5 py-4 sm:-left-8"
            >
              <p className="font-display text-lg font-bold text-secondary">{t("home.founderTitle")}</p>
              <p className="text-sm text-muted-foreground">
                {t("home.founderCopy")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Teaser products */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <RevealGroup>
          <RevealItem>
            <p className="eyebrow">{t("home.marketEyebrow")}</p>
          </RevealItem>
          <RevealItem>
            <h2 className="mt-3 max-w-2xl text-3xl font-black text-secondary sm:text-5xl">
              {t("home.marketTitle")}
            </h2>
          </RevealItem>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {teasers.map((item) => (
              <RevealItem key={item.titleKey}>
                <TiltCard className="grain-overlay h-full overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
                  <img
                    src={item.image}
                    alt={t(item.titleKey)}
                    width={900}
                    height={1100}
                    loading="lazy"
                    className="h-60 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-secondary">{t(item.titleKey)}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{t(item.copyKey)}</p>
                  </div>
                </TiltCard>
              </RevealItem>
            ))}
          </div>

          <RevealItem className="mt-10">
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 font-semibold text-primary"
            >
              {t("home.seeAll")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </RevealItem>
        </RevealGroup>
      </section>
    </Layout>
  );
}
