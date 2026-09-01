import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Check, Mail, Phone, Send } from "lucide-react";

import { Layout, PageHero } from "@/components/site/Layout";
import { useLanguage } from "@/i18n/LanguageContext";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Ordering — Thiaw Agro Élevage" },
      {
        name: "description",
        content:
          "Order chickens, fruits and vegetables from Thiaw Agro Élevage, or ask about investing. Call 901-319-9938 or send your order details.",
      },
      { property: "og:title", content: "Contact & Ordering — Thiaw Agro Élevage" },
      {
        property: "og:description",
        content: "Send your order or investment enquiry to Thiaw Agro Élevage.",
      },
    ],
  }),
  component: Contact,
});

const interests = ["chickens", "vegetables", "fruits", "agriculture", "investing"] as const;

function Field({
  label,
  name,
  type = "text",
  required = true,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="group block">
      <span className="text-sm font-semibold text-secondary">{label}</span>
      <div className="relative mt-2">
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-secondary outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
        />
        <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[image:var(--gradient-ember)] transition-transform duration-500 group-focus-within:scale-x-100" />
      </div>
    </label>
  );
}

function Contact() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  const [interest, setInterest] = useState<string>("Chickens");

  return (
    <Layout>
      <PageHero
        eyebrow={t("contact.eyebrow")}
        title={
          <>
            {t("contact.title1")}
            <br />
            <span className="text-ember">{t("contact.title2")}</span>
          </>
        }
        lead={t("contact.lead")}
      />

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="surface-card relative overflow-hidden rounded-[2rem] p-8"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[26rem] flex-col items-center justify-center text-center"
              >
                <motion.span
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 14 }}
                  className="flex size-20 items-center justify-center rounded-full bg-[image:var(--gradient-ember)] text-primary-foreground"
                >
                  <Check className="size-9" />
                </motion.span>
                <h2 className="mt-6 text-3xl font-black text-secondary">{t("contact.received")}</h2>
                <p className="mt-3 max-w-sm text-muted-foreground">
                  {t("contact.receivedCopy")}
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-7 rounded-full border border-secondary/30 px-5 py-2.5 text-sm font-semibold text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground"
                >
                  {t("contact.another")}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t("contact.fullName")} name="name" placeholder={t("contact.namePlaceholder")} />
                  <Field label={t("contact.phone")} name="phone" type="tel" placeholder={t("contact.phonePlaceholder")} />
                </div>
                <Field label={t("contact.email")} name="email" type="email" placeholder={t("contact.emailPlaceholder")} />

                <div>
                  <span className="text-sm font-semibold text-secondary">{t("contact.interest")}</span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {interests.map((item) => (
                      <motion.button
                        key={item}
                        type="button"
                        whileTap={{ scale: 0.94 }}
                        onClick={() => setInterest(item)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                          interest === item
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card text-secondary hover:border-primary"
                        }`}
                      >
                        {item}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <label className="group block">
                  <span className="text-sm font-semibold text-secondary">
                    {t("contact.message")}
                  </span>
                  <div className="relative mt-2">
                    <textarea
                      name="message"
                      rows={5}
                      required
                      placeholder={t("contact.messagePlaceholder")}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-secondary outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
                    />
                    <span className="pointer-events-none absolute bottom-1.5 left-0 h-[2px] w-full origin-left scale-x-0 bg-[image:var(--gradient-ember)] transition-transform duration-500 group-focus-within:scale-x-100" />
                  </div>
                </label>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-[var(--shadow-lift)]"
                >
                  {t("contact.send")}
                  <Send className="size-4" />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        <RevealGroup className="space-y-5">
          <RevealItem>
            <div className="surface-card rounded-3xl p-7">
              <p className="eyebrow">{t("contact.direct")}</p>
              <a
                href="tel:+19013199938"
                className="mt-3 flex items-center gap-2 text-lg font-bold text-secondary"
              >
                <Phone className="size-5 text-primary" /> 901-319-9938
              </a>
              <a
                href="mailto:thiaw@att.net"
                className="mt-2 flex items-center gap-2 text-lg font-bold text-secondary"
              >
                <Mail className="size-5 text-primary" /> thiaw@att.net
              </a>
            </div>
          </RevealItem>
          <RevealItem>
            <div className="rounded-3xl bg-[image:var(--gradient-olive)] p-7 text-secondary-foreground">
              <h2 className="font-display text-xl font-bold">{t("contact.wholesaleTitle")}</h2>
              <p className="mt-2 text-sm opacity-90">{t("contact.wholesaleCopy")}</p>
            </div>
          </RevealItem>
          <RevealItem>
            <div className="surface-card rounded-3xl p-7">
              <h2 className="font-display text-xl font-bold text-secondary">{t("contact.responseTitle")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("contact.responseCopy")}
              </p>
            </div>
          </RevealItem>
        </RevealGroup>
      </section>
    </Layout>
  );
}
