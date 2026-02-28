"use client";

import { useTranslations } from "next-intl";

const GREEN_ACCENT = "#22c55e";

const iconClass = "text-white/90 text-2xl sm:text-3xl w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto";

const STEP_ICONS = [
  <i key="1" className={`fa-solid fa-arrows-down-to-people ${iconClass}`} aria-hidden />,
  <i key="2" className={`fa-solid fa-bullhorn ${iconClass}`} aria-hidden />,
  <i key="3" className={`fa-solid fa-gauge-high ${iconClass}`} aria-hidden />,
  <i key="4" className={`fa-solid fa-users ${iconClass}`} aria-hidden />,
];

export default function OurSystemSection() {
  const t = useTranslations("system");
  const tFooter = useTranslations("footer");

  const steps = [
    {
      icon: STEP_ICONS[0],
      title: t("step1.title"),
      description: t("step1.description"),
      items: [t("step1.item1"), t("step1.item2"), t("step1.item3"), t("step1.item4")],
    },
    {
      icon: STEP_ICONS[1],
      title: t("step2.title"),
      description: t("step2.description"),
      items: [t("step2.item1"), t("step2.item2"), t("step2.item3"), t("step2.item4")],
    },
    {
      icon: STEP_ICONS[2],
      title: t("step3.title"),
      description: t("step3.description"),
      items: [t("step3.item1"), t("step3.item2"), t("step3.item3"), t("step3.item4")],
    },
    {
      icon: STEP_ICONS[3],
      title: t("step4.title"),
      description: t("step4.description"),
      items: [t("step4.item1"), t("step4.item2"), t("step4.item3"), t("step4.item4")],
    },
  ];

  return (
    <section id="system" className="relative py-20 sm:py-28 bg-black overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header: left = tagline + title + green dot, right = intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 sm:mb-20">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-white/60">
                {t("tagline")}
              </span>
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: GREEN_ACCENT }}
              />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              {t("title")}
            </h2>
          </div>
          <div className="lg:col-span-7 flex items-center">
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl">
              {t("intro")}
            </p>
          </div>
        </div>

        {/* Four-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {steps.map((step, index) => (
            <div key={index} className="text-center lg:text-left">
              <div className="mb-4 flex justify-center lg:justify-start">
                {step.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed mb-5">
                {step.description}
              </p>
              <ul className="space-y-2">
                {step.items.map((item, i) => (
                  <li key={i} className="text-sm text-white/60 flex items-center gap-2">
                    <span className="text-white/80">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div className="mt-14 sm:mt-16 text-center">
          <p className="text-lg sm:text-xl font-bold text-white">
            {t("bottomMessage")}
          </p>
        </div>
      </div>

      {/* Right sidebar: vertical "Suivez-nous" */}
      <div className="hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 origin-center">
        <p
          className="text-xs uppercase tracking-widest text-white/40 whitespace-nowrap"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
        >
          {tFooter("followUs")} — Ig. / Lk. / Fb.
        </p>
      </div>
    </section>
  );
}
