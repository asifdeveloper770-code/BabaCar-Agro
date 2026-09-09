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
      { title: "Contact & Ordering — Darou Thiaw Agro Élevage" },
      {
        name: "description",
        content:
          "Order chickens, fruits and vegetables from Darou Thiaw Agro Élevage, or ask about investing. Call 901-319-9938 or send your order details.",
      },
      { property: "og:title", content: "Contact & Ordering — Darou Thiaw Agro Élevage" },
      {
        property: "og:description",
        content: "Send your order or investment enquiry to Darou Thiaw Agro Élevage.",
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

  // Official WhatsApp SVG Icon Component
  function WhatsAppIcon({ className = "size-4" }: { className?: string }) {
    return (
      <svg
        className={className}
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.487 1.333 5.006L2 22l5.129-1.343c1.46.797 3.109 1.216 4.88 1.217h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.667-1.038-5.174-2.925-7.06A9.923 9.923 0 0012.012 2zm5.836 14.126c-.244.688-1.427 1.314-1.969 1.397-.502.077-1.151.109-1.851-.115-.432-.138-1.002-.325-1.745-.646-3.13-1.353-5.171-4.512-5.328-4.721-.157-.209-1.272-1.693-1.272-3.23 0-1.538.802-2.295 1.085-2.603.283-.308.618-.385.824-.385.206 0 .412.002.592.01.19.008.448-.072.701.536.258.621.876 2.138.953 2.293.077.155.129.336.026.543-.103.207-.155.336-.309.516-.154.18-.324.402-.463.54-.154.155-.315.324-.135.633.18.309.802 1.321 1.72 2.139 1.181 1.05 2.177 1.376 2.486 1.53.309.155.489.129.67-.077.18-.206.772-.901.978-1.21.206-.309.412-.258.695-.155.283.103 1.799.849 2.108 1.003.309.155.515.232.592.361.077.129.077.747-.167 1.435z" />
      </svg>
    );
  }

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
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${interest === item
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

              <div className="mt-4 space-y-3">
                {/* WhatsApp Section */}
                <div>
                  <span className="text-xs uppercase font-medium tracking-wider text-muted-foreground block mb-1">
                    WhatsApp
                  </span>
                  <a
                    href="https://wa.me/19013199938"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-lg font-bold text-secondary hover:text-primary transition-colors"
                  >
                    <WhatsAppIcon className="size-5 text-[#25D366]" />
                    <span>+1 901-319-9938</span>
                  </a>
                </div>

                {/* Local Phone Section */}
                <div>
                  <span className="text-xs uppercase font-medium tracking-wider text-muted-foreground block mb-1">
                    Local
                  </span>
                  <a
                    href="tel:+221777548004"
                    className="flex items-center gap-2.5 text-lg font-bold text-secondary hover:text-primary transition-colors"
                  >
                    <Phone className="size-5 text-primary" />
                    <span>+221 77 754 80 04</span>
                  </a>
                </div>

                {/* Email Section */}
                <div className="pt-1">
                  <span className="text-xs uppercase font-medium tracking-wider text-muted-foreground block mb-1">
                    Email
                  </span>
                  <a
                    href="mailto:thiaw@att.net"
                    className="flex items-center gap-2.5 text-lg font-bold text-secondary hover:text-primary transition-colors"
                  >
                    <Mail className="size-5 text-primary" />
                    <span>thiaw@att.net</span>
                  </a>
                </div>
              </div>
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
