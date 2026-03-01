"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { sendContactEmails, isEmailJSConfigured } from "@/lib/emailjs";

const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d26590.729979015396!2d-7.6489544!3d33.5834709!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd84d09ffbb5%3A0x69653c6f96ae98ad!2sCommons%20Zerktouni!5e0!3m2!1sfr!2sma!4v1771980097793!5m2!1sfr!2sma";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/63agency", icon: "fa-brands fa-instagram" },
  { label: "LinkedIn", href: "https://linkedin.com/company/63agency", icon: "fa-brands fa-linkedin-in" },
  { label: "Facebook", href: "https://facebook.com/63agency", icon: "fa-brands fa-facebook-f" },
];

const inputClass =
  "w-full rounded-lg bg-white border border-gray-200 px-4 py-3 text-[15px] text-black placeholder-gray-400 focus:border-black focus:ring-2 focus:ring-black/5 focus:outline-none transition-all";
const selectClass =
  "contact-select w-full rounded-lg bg-white border border-gray-200 px-4 py-3 text-[15px] text-black appearance-none cursor-pointer focus:border-black focus:ring-2 focus:ring-black/5 focus:outline-none transition-all";
const labelClass = "block text-[13px] font-semibold text-black/90 uppercase tracking-wide mb-2";

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [qualification, setQualification] = useState({
    role: "",
    objective: "",
    timing: "",
    campaigns: "",
    sector: "",
    establishment: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string) ?? "";
    const email = (data.get("email") as string) ?? "";
    const phone = (data.get("phone") as string) ?? "";
    const city = (data.get("city") as string) ?? "";
    const address = (data.get("address") as string) ?? "";
    const company = (data.get("company") as string) ?? "";
    try {
      if (!isEmailJSConfigured()) {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...Object.fromEntries(data),
            ...qualification,
          }),
        });
        if (!res.ok) throw new Error("API error");
      } else {
        await sendContactEmails({
          name,
          email,
          phone,
          city,
          address,
          company,
          role: qualification.role,
          objective: qualification.objective,
          timing: qualification.timing,
          campaigns: qualification.campaigns,
          sector: qualification.sector,
          establishment: qualification.establishment,
        });
      }
      setStatus("success");
      form.reset();
      setQualification({ role: "", objective: "", timing: "", campaigns: "", sector: "", establishment: "" });
      setStep(1);
    } catch {
      setStatus("error");
    }
  }

  const q1Options = [t("q1_1"), t("q1_2"), t("q1_3"), t("q1_4"), t("q1_5")];
  const q2Options = [t("q2_1"), t("q2_2"), t("q2_3"), t("q2_4")];
  const q3Options = [t("q3_1"), t("q3_2"), t("q3_3"), t("q3_4"), t("q3_5")];
  const q4Options = [t("q4_1"), t("q4_2"), t("q4_3")];
  const q5Options = [t("q5_1"), t("q5_2"), t("q5_3"), t("q5_4"), t("q5_5"), t("q5_6")];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Top: CONTACT + hero headline */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-10 sm:pt-12 sm:pb-14">
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-black shrink-0" />
            <span className="text-sm font-semibold uppercase tracking-wider text-black">
              {t("contactTag")}
            </span>
            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
            {t("heroHeadline1")}{" "}
            <span className="block">
              {t("heroHeadline2")}
              <span className="inline-block w-2 h-2 rounded-full bg-black align-middle ml-1" />
            </span>
            <span className="block">{t("heroHeadline3")}</span>
          </h1>
          <div className="absolute top-0 right-0 text-black">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 opacity-70"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative w-full aspect-[21/9] min-h-[200px] sm:min-h-[260px] overflow-hidden bg-gray-200">
        <Image
          src="/images/contact/contactimage.jpg"
          alt="Contact 63 Agency"
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={95}
          priority
        />
      </div>

      {/* Contact info + Multi-step form */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Infos agence */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 sm:p-8 lg:sticky lg:top-24">
              <h2 className="text-[13px] font-bold text-black/70 uppercase tracking-widest mb-6">
                {t("infoTitle")}
              </h2>
              <div className="space-y-5">
                <div>
                  <p className="text-[11px] font-semibold text-black/50 uppercase tracking-wider mb-1">
                    {t("phone")}
                  </p>
                  <a
                    href={`tel:${t("phoneValue").replace(/\s/g, "")}`}
                    className="text-[15px] font-semibold text-black hover:underline"
                  >
                    {t("phoneValue")}
                  </a>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-black/50 uppercase tracking-wider mb-1">
                    {t("email")}
                  </p>
                  <a
                    href={`mailto:${t("emailValue")}`}
                    className="text-[15px] font-semibold text-black hover:underline break-all"
                  >
                    {t("emailValue")}
                  </a>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-black/50 uppercase tracking-wider mb-1">
                    {t("address")}
                  </p>
                  <p className="text-[15px] text-black/90 leading-snug">{t("addressValue")}</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-[11px] font-bold text-black/60 uppercase tracking-widest mb-3">
                  {t("followUs")}
                </p>
                <div className="flex gap-2">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-lg hover:bg-black/80 transition-colors"
                      aria-label={s.label}
                    >
                      <i className={`${s.icon} text-lg`} aria-hidden />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire multi-étapes */}
          <div className="lg:col-span-7">
            <div className="max-w-2xl lg:max-w-none w-full">
              {/* Progress */}
              <div className="mb-6 sm:mb-8">
                <p className="text-xs font-semibold text-black/60 uppercase tracking-widest mb-2">
                  {t("stepProgress", { current: step })}
                </p>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full transition-all duration-300 ease-out"
                    style={{ width: step === 1 ? "50%" : "100%" }}
                  />
                </div>
              </div>

              {step === 1 && (
                <div className="rounded-2xl border border-gray-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 sm:p-8 lg:p-10">
                  <h3 className="text-xl font-bold text-black mb-6">
                    {t("step1Title")}
                  </h3>
                  <div className="space-y-5 sm:space-y-6">
                    <div>
                      <label htmlFor="role" className={labelClass}>
                        {t("q1Label")}
                      </label>
                      <select
                        id="role"
                        value={qualification.role}
                        onChange={(e) =>
                          setQualification((p) => ({ ...p, role: e.target.value }))
                        }
                        className={selectClass}
                        required
                      >
                        <option value="">{t("selectPlaceholder")}</option>
                        {q1Options.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="objective" className={labelClass}>
                        {t("q2Label")}
                      </label>
                      <select
                        id="objective"
                        value={qualification.objective}
                        onChange={(e) =>
                          setQualification((p) => ({ ...p, objective: e.target.value }))
                        }
                        className={selectClass}
                        required
                      >
                        <option value="">{t("selectPlaceholder")}</option>
                        {q2Options.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timing" className={labelClass}>
                        {t("q3Label")}
                      </label>
                      <select
                        id="timing"
                        value={qualification.timing}
                        onChange={(e) =>
                          setQualification((p) => ({ ...p, timing: e.target.value }))
                        }
                        className={selectClass}
                        required
                      >
                        <option value="">{t("selectPlaceholder")}</option>
                        {q3Options.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="campaigns" className={labelClass}>
                        {t("q4Label")}
                      </label>
                      <select
                        id="campaigns"
                        value={qualification.campaigns}
                        onChange={(e) =>
                          setQualification((p) => ({ ...p, campaigns: e.target.value }))
                        }
                        className={selectClass}
                        required
                      >
                        <option value="">{t("selectPlaceholder")}</option>
                        {q4Options.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="sector" className={labelClass}>
                        {t("q5Label")}
                      </label>
                      <select
                        id="sector"
                        value={qualification.sector}
                        onChange={(e) =>
                          setQualification((p) => ({ ...p, sector: e.target.value }))
                        }
                        className={selectClass}
                        required
                      >
                        <option value="">{t("selectPlaceholder")}</option>
                        {q5Options.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="establishment" className={labelClass}>
                        {t("q6Label")}
                      </label>
                      <input
                        id="establishment"
                        type="text"
                        value={qualification.establishment}
                        onChange={(e) =>
                          setQualification((p) => ({ ...p, establishment: e.target.value }))
                        }
                        placeholder={t("q6Placeholder")}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={
                        !qualification.role ||
                        !qualification.objective ||
                        !qualification.timing ||
                        !qualification.campaigns ||
                        !qualification.sector
                      }
                      className="w-full sm:w-auto min-w-[220px] px-8 py-3.5 bg-black text-white text-[15px] font-semibold rounded-lg border-2 border-black hover:bg-white hover:text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
                    >
                      {t("continue")}
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="rounded-2xl border border-gray-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 sm:p-8 lg:p-10">
                  <h3 className="text-xl font-bold text-black mb-6">{t("step2Title")}</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input type="hidden" name="role" value={qualification.role} />
                    <input type="hidden" name="objective" value={qualification.objective} />
                    <input type="hidden" name="timing" value={qualification.timing} />
                    <input type="hidden" name="campaigns" value={qualification.campaigns} />
                    <input type="hidden" name="sector" value={qualification.sector} />
                    <input type="hidden" name="establishment" value={qualification.establishment} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className={labelClass}>
                          {t("fullNameLabel")} <span className="text-black/50 font-normal">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder={t("namePlaceholder")}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className={labelClass}>
                          {t("phoneLabel")} <span className="text-black/50 font-normal">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder={t("phonePlaceholder")}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="city" className={labelClass}>
                          {t("cityLabel")}
                        </label>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          placeholder={t("cityPlaceholder")}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className={labelClass}>
                          {t("companyLabel")}
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          placeholder={t("companyPlaceholder")}
                          className={inputClass}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="address" className={labelClass}>
                          {t("addressLabel")}
                        </label>
                        <input
                          id="address"
                          name="address"
                          type="text"
                          placeholder={t("addressPlaceholder")}
                          className={inputClass}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="email" className={labelClass}>
                          {t("emailAddressLabel")} <span className="text-black/50 font-normal">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder={t("emailPlaceholder")}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {status === "success" && (
                      <div className="rounded-lg bg-black/5 border border-black/10 px-4 py-3 text-sm font-medium text-black">
                        {t("success")}
                      </div>
                    )}
                    {status === "error" && (
                      <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm font-medium text-red-800">
                        {t("error")}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-3 bg-white text-black text-[15px] font-semibold rounded-lg border-2 border-gray-200 hover:border-black hover:bg-gray-50 transition-all"
                      >
                        ← {t("back")}
                      </button>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="min-w-[220px] px-8 py-3.5 bg-black text-white text-[15px] font-semibold rounded-lg border-2 border-black hover:bg-white hover:text-black transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
                      >
                        {status === "sending" ? t("sending") : t("continue")}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="w-full h-[45vh] min-h-[280px] bg-gray-200">
        <iframe
          src={MAP_EMBED_URL}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Carte 63 Agency"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
