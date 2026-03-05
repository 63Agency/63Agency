"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { sendContactEmails, isEmailJSConfigured } from "@/lib/emailjs";

const REVIEW_AVATARS = [
  "/images/review/Tarik.png",
  "/images/review/kenza.png",
  "/images/review/Samir.png",
];

const MAP_CASABLANCA =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.835844913415!2d-7.6118495702715645!3d33.583611154454786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd5fec67f4b3%3A0x3f4a27637df0c279!2s179%20Bd%20de%20la%20R%C3%A9sistance%2C%20Casablanca%2020250!5e0!3m2!1sfr!2sma!4v1772465158955!5m2!1sfr!2sma";
const MAP_RABAT =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.70258511729!2d-6.850715325639967!3d34.00017232048039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76c8ee06c07d7%3A0x93fbaec6c935ce1!2s18%20Rue%20Baht%2C%20Rabat%2010090!5e0!3m2!1sfr!2sma!4v1772465257205!5m2!1sfr!2sma";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/63agency.ma?igsh=MXVkZ3B2Znp6cnRzeA==", icon: "fa-brands fa-instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/63-agency/", icon: "fa-brands fa-linkedin-in" },
  { label: "Facebook", href: "https://www.facebook.com/63agency", icon: "fa-brands fa-facebook-f" },
];

const inputClass =
  "w-full rounded-lg bg-white border border-gray-200 px-5 py-3.5 text-base text-black placeholder-gray-400 focus:border-black focus:ring-2 focus:ring-black/5 focus:outline-none transition-all";
const selectClass =
  "contact-select w-full rounded-lg bg-white border border-gray-200 px-5 py-3.5 text-base text-black appearance-none cursor-pointer focus:border-black focus:ring-2 focus:ring-black/5 focus:outline-none transition-all";
const labelClass = "block text-sm font-semibold text-black/90 uppercase tracking-wide mb-2";
/* Formulaire fond blanc (page contact, fond page noir) */
const formBoxClass = "rounded-2xl border border-gray-200 bg-white shadow-xl p-8 sm:p-10 lg:p-12";
const formLabelClass = "block text-sm font-semibold text-black/90 uppercase tracking-wide mb-2";
const formInputClass =
  "w-full rounded-lg bg-gray-50 border border-gray-200 px-5 py-3.5 text-base text-black placeholder-gray-400 focus:border-black focus:ring-2 focus:ring-black/5 focus:outline-none transition-all";
const formSelectClass =
  "contact-select w-full rounded-lg bg-gray-50 border border-gray-200 px-5 py-3.5 text-base text-black appearance-none cursor-pointer focus:border-black focus:ring-2 focus:ring-black/5 focus:outline-none transition-all [&>option]:text-black";

const META_IMAGE_BY_LOCALE: Record<string, string> = {
  en: "/images/Feceboock/meta-For-Anglais.jpg (2).jpeg",
  fr: "/images/Feceboock/meta-For-Français.jpg (1).jpeg",
};
const GOOGLE_ADS_IMAGE_BY_LOCALE: Record<string, string> = {
  en: "/images/Feceboock/google-Ads-For-Anglais.jpg (2).jpeg",
  fr: "/images/Feceboock/google-Ads-For-Français.jpg (1).jpeg",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function isValidEmail(s: string) {
  return EMAIL_REGEX.test((s || "").trim());
}
function isValidPhone(s: string) {
  const digits = (s || "").replace(/\D/g, "");
  return digits.length >= 6;
}

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const tDigital = useTranslations("digitalPresence");
  const locale = useLocale();
  const metaSrc = META_IMAGE_BY_LOCALE[locale] ?? META_IMAGE_BY_LOCALE.fr;
  const googleAdsSrc = GOOGLE_ADS_IMAGE_BY_LOCALE[locale] ?? GOOGLE_ADS_IMAGE_BY_LOCALE.fr;
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    company: "",
    employees: "",
  });
  const [qualification, setQualification] = useState({
    role: "",
    objective: "",
    timing: "",
    campaigns: "",
    sector: "", 
    establishment: "",
  });

  function validateStep1(): boolean {
    const nextErrors: Record<string, string> = {};
    const name = personalInfo.name.trim();
    if (!name || name.length < 2) nextErrors.name = t("validationRequired");
    if (!personalInfo.email.trim()) nextErrors.email = t("validationRequired");
    else if (!isValidEmail(personalInfo.email)) nextErrors.email = t("validationEmail");
    if (!personalInfo.phone.trim()) nextErrors.phone = t("validationRequired");
    else if (!isValidPhone(personalInfo.phone)) nextErrors.phone = t("validationPhone");
    if (!qualification.role) nextErrors.role = t("validationRequired");
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function validateStep2(): boolean {
    const nextErrors: Record<string, string> = {};
    if (!qualification.objective) nextErrors.objective = t("validationRequired");
    if (!qualification.timing) nextErrors.timing = t("validationRequired");
    if (!qualification.campaigns) nextErrors.campaigns = t("validationRequired");
    if (!qualification.sector) nextErrors.sector = t("validationRequired");
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleContinueToStep2() {
    if (!validateStep1()) return;
    setErrors({});
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateStep2()) return;
    setErrors({});
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string) ?? "";
    const email = (data.get("email") as string) ?? "";
    const phone = (data.get("phone") as string) ?? "";
    const city = (data.get("city") as string) ?? "";
    const company = (data.get("company") as string) ?? "";
    const employees = (data.get("employees") as string) ?? "";
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
      setPersonalInfo({ name: "", email: "", phone: "", city: "", company: "", employees: "" });
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
  const q5Options = [t("q5_1"), t("q5_2"), t("q5_3"), t("q5_6")];
  const employeesOptions = [
    { value: "", labelKey: "employeesLabel" },
    { value: t("employees_1"), labelKey: "employees_1" },
    { value: t("employees_1_5"), labelKey: "employees_1_5" },
    { value: t("employees_6_20"), labelKey: "employees_6_20" },
    { value: t("employees_21_50"), labelKey: "employees_21_50" },
    { value: t("employees_51_200"), labelKey: "employees_51_200" },
    { value: t("employees_200_plus"), labelKey: "employees_200_plus" },
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Top: CONTACT + hero headline — même largeur que le contenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 sm:pt-12 sm:pb-14">
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-white shrink-0" />
            <span className="text-sm font-semibold uppercase tracking-wider text-white">
              {t("contactTag")}
            </span>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            <span className="block">{t("heroHeadline1")}</span>
            <span className="block mt-2 text-white/90 font-semibold text-2xl sm:text-3xl md:text-4xl">
              {t("heroHeadline3")}
            </span>
          </h1>
          <div className="absolute top-0 right-0 text-white">
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

      {/* Contact: bloc texte à gauche, formulaire à droite — sections bien placées */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start">
            {/* Bloc texte — gauche */}
            <div className="lg:col-span-5">
            <div className="p-0 lg:sticky lg:top-24 overflow-hidden text-white">
              {/* Social proof */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {REVIEW_AVATARS.map((src) => (
                      <div
                        key={src}
                        className="relative w-9 h-9 rounded-full border-2 border-gray-600 bg-gray-700 flex-shrink-0 overflow-hidden ring-2 ring-gray-900"
                        aria-hidden
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          className="object-cover object-top"
                          sizes="36px"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="rounded-lg bg-purple-500/90 px-2.5 py-1 text-sm font-bold">
                    {t("sidebarSocialBadge")}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{t("sidebarClientsSatisfaits")}</p>
                  <div className="flex items-center justify-end gap-1.5 mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Titre principal */}
              <h2 className="text-xl sm:text-2xl font-bold leading-tight mb-4">
                {t("sidebarHeadline")}{" "}
                <span className="underline underline-offset-2">{t("sidebarHeadlineHighlight")}</span>
              </h2>

              {/* Paragraphe(s) avec parties en gras */}
              <div className="text-sm text-white/90 leading-relaxed mb-6 space-y-3">
                {t("sidebarDescription")
                  .split(/\n\n+/)
                  .map((paragraph, idx) => (
                    <p key={idx}>
                      {paragraph.split(/\*\*(.*?)\*\*/g).map((part, i) =>
                        i % 2 === 1 ? <strong key={i} className="font-semibold text-white">{part}</strong> : part
                      )}
                    </p>
                  ))}
              </div>

              {/* Garanties avec checkmarks — une seule ligne */}
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
                {[
                  t("sidebarGuarantee1"),
                  t("sidebarGuarantee2"),
                  t("sidebarGuarantee3"),
                ].map((label, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white/90 whitespace-nowrap">
                    <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>

              {/* Encadré places limitées */}
              <div className="rounded-xl border border-amber-500/50 bg-amber-950/40 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                  {t("sidebarLimitedTitle")}
                </p>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-amber-200/90">{t("sidebarLimitedText")}</p>
                </div>
              </div>
            </div>
          </div>

            {/* Formulaire — droite, aligné à la fin de la colonne */}
            <div className="lg:col-span-7 min-w-0 flex flex-col items-stretch lg:items-end">
              <div className="w-full max-w-2xl lg:max-w-[680px]">
              {/* Progress */}
              <div className="mb-8 sm:mb-10">
                <p className="text-sm font-semibold text-black/60 uppercase tracking-widest mb-2">
                  {t("stepProgress", { current: step })}
                </p>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full transition-all duration-300 ease-out"
                    style={{ width: step === 1 ? "50%" : "100%" }}
                  />
                </div>
              </div>

              {/* Étape 1 : Informations personnelles */}
              {step === 1 && (
                <div className={formBoxClass}>
                  <h3 className="text-2xl font-bold text-black mb-8">
                    {t("step1Title")}
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className={formLabelClass}>
                          {t("fullNameLabel")} <span className="text-black/50 font-normal">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder={t("namePlaceholder")}
                          className={`${formInputClass} ${errors.name ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
                          value={personalInfo.name}
                          onChange={(e) => setPersonalInfo((p) => ({ ...p, name: e.target.value }))}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-sm text-red-400" role="alert">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phone" className={formLabelClass}>
                          {t("phoneLabel")} <span className="text-black/50 font-normal">*</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          required
                          placeholder={t("phonePlaceholder")}
                          className={formInputClass}
                          value={personalInfo.phone}
                          onChange={(e) => {
                            setPersonalInfo((p) => ({ ...p, phone: e.target.value }));
                            if (errors.phone) setErrors((e) => ({ ...e, phone: "" }));
                          }}
                        />
                        {errors.phone && (
                          <p className="mt-1.5 text-sm text-red-400" role="alert">{errors.phone}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="city" className={formLabelClass}>
                          {t("cityLabel")}
                        </label>
                        <input
                          id="city"
                          type="text"
                          placeholder={t("cityPlaceholder")}
                          className={formInputClass}
                          value={personalInfo.city}
                          onChange={(e) => setPersonalInfo((p) => ({ ...p, city: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className={formLabelClass}>
                          {t("companyLabel")}
                        </label>
                        <input
                          id="company"
                          type="text"
                          placeholder={t("companyPlaceholder")}
                          className={formInputClass}
                          value={personalInfo.company}
                          onChange={(e) => setPersonalInfo((p) => ({ ...p, company: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label htmlFor="employees" className={formLabelClass}>
                          {t("employeesLabel")}
                        </label>
                        <select
                          id="employees"
                          className={formSelectClass}
                          value={personalInfo.employees}
                          onChange={(e) => setPersonalInfo((p) => ({ ...p, employees: e.target.value }))}
                        >
                          {employeesOptions.map((opt) => (
                            <option key={opt.labelKey} value={opt.value}>
                              {t(opt.labelKey)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="email" className={formLabelClass}>
                          {t("emailAddressLabel")} <span className="text-black/50 font-normal">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder={t("emailPlaceholder")}
                          className={`${formInputClass} ${errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
                          value={personalInfo.email}
                          onChange={(e) => setPersonalInfo((p) => ({ ...p, email: e.target.value }))}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-sm text-red-400" role="alert">{errors.email}</p>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="role" className={formLabelClass}>
                          {t("q1Label")} <span className="text-black/50 font-normal">*</span>
                        </label>
                        <select
                          id="role"
                          value={qualification.role}
                          onChange={(e) => {
                            setQualification((p) => ({ ...p, role: e.target.value }));
                            if (errors.role) setErrors((prev) => ({ ...prev, role: "" }));
                          }}
                          className={`${formSelectClass} ${errors.role ? "border-red-400" : ""}`}
                          required
                        >
                          <option value="">{t("selectPlaceholder")}</option>
                          {q1Options.map((opt, i) => (
                            <option key={i} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {errors.role && (
                          <p className="mt-1.5 text-sm text-red-400" role="alert">{errors.role}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 pt-8 border-t border-gray-200 space-y-4">
                    <div className="flex items-start gap-3 text-sm text-black/70">
                      <span className="shrink-0 mt-0.5 text-black" aria-hidden>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>{t("formSecurity")}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-black/70">
                      <span className="shrink-0 mt-0.5 text-black" aria-hidden>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>{t("formAuditInfo")}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleContinueToStep2}
                      className="w-full sm:w-auto min-w-[240px] px-10 py-4 bg-black text-white text-base font-semibold rounded-lg border-2 border-black hover:bg-white hover:text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
                    >
                      {t("continue")}
                    </button>
                  </div>
                </div>
              )}

              {/* Étape 2 : Questions de qualification */}
              {step === 2 && (
                <div className={formBoxClass}>
                  <h3 className="text-2xl font-bold text-black mb-8">{t("step2Title")}</h3>
                  <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
                    <input type="hidden" name="name" value={personalInfo.name} />
                    <input type="hidden" name="email" value={personalInfo.email} />
                    <input type="hidden" name="phone" value={personalInfo.phone} />
                    <input type="hidden" name="city" value={personalInfo.city} />
                    <input type="hidden" name="company" value={personalInfo.company} />
                    <input type="hidden" name="employees" value={personalInfo.employees} />
                    <input type="hidden" name="role" value={qualification.role} />
                    <input type="hidden" name="objective" value={qualification.objective} />
                    <input type="hidden" name="timing" value={qualification.timing} />
                    <input type="hidden" name="campaigns" value={qualification.campaigns} />
                    <input type="hidden" name="sector" value={qualification.sector} />
                    <input type="hidden" name="establishment" value={qualification.establishment} />

                    <div>
                      <label htmlFor="objective" className={formLabelClass}>
                        {t("q2Label")}
                      </label>
                      <select
                        id="objective"
                        value={qualification.objective}
                        onChange={(e) =>
                          setQualification((p) => ({ ...p, objective: e.target.value }))
                        }
                        className={formSelectClass}
                        required
                      >
                        <option value="">{t("selectPlaceholder")}</option>
                        {q2Options.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.objective && (
                        <p className="mt-1.5 text-sm text-red-600" role="alert">{errors.objective}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="timing" className={formLabelClass}>
                        {t("q3Label")}
                      </label>
                      <select
                        id="timing"
                        value={qualification.timing}
                        onChange={(e) =>
                          setQualification((p) => ({ ...p, timing: e.target.value }))
                        }
                        className={formSelectClass}
                        required
                      >
                        <option value="">{t("selectPlaceholder")}</option>
                        {q3Options.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.timing && (
                        <p className="mt-1.5 text-sm text-red-400" role="alert">{errors.timing}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="campaigns" className={formLabelClass}>
                        {t("q4Label")}
                      </label>
                      <select
                        id="campaigns"
                        value={qualification.campaigns}
                        onChange={(e) =>
                          setQualification((p) => ({ ...p, campaigns: e.target.value }))
                        }
                        className={formSelectClass}
                        required
                      >
                        <option value="">{t("selectPlaceholder")}</option>
                        {q4Options.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.campaigns && (
                        <p className="mt-1.5 text-sm text-red-600" role="alert">{errors.campaigns}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="sector" className={formLabelClass}>
                        {t("q5Label")}
                      </label>
                      <select
                        id="sector"
                        value={qualification.sector}
                        onChange={(e) =>
                          setQualification((p) => ({ ...p, sector: e.target.value }))
                        }
                        className={formSelectClass}
                        required
                      >
                        <option value="">{t("selectPlaceholder")}</option>
                        {q5Options.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.sector && (
                        <p className="mt-1.5 text-sm text-red-400" role="alert">{errors.sector}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="establishment" className={formLabelClass}>
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
                        className={formInputClass}
                      />
                    </div>

                    {status === "success" && (
                      <div className="rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-sm font-medium text-white">
                        {t("success")}
                      </div>
                    )}
                    {status === "error" && (
                      <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm font-medium text-red-700">
                        {t("error")}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-8 py-3.5 bg-transparent text-black text-base font-semibold rounded-lg border-2 border-gray-300 hover:bg-gray-100 transition-all"
                      >
                        ← {t("back")}
                      </button>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="min-w-[240px] px-10 py-4 bg-black text-white text-base font-semibold rounded-lg border-2 border-black hover:bg-gray-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-gray-800"
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
      </div>

      {/* Section Google Ads & Meta en bas de page */}
      <section className="w-full bg-gray-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Left - Meta */}
            <div className="flex flex-col">
              <div className="relative w-full">
                <Image
                  src="/images/Feceboock/meta.jpg (1).jpeg"
                  alt={tDigital("card2Alt")}
                  width={600}
                  height={200}
                  className="w-full h-auto block rounded-xl overflow-hidden"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="mt-6 text-xl sm:text-2xl font-bold text-white">
                {tDigital("headline2")}
              </h3>
              <p className="mt-3 text-white/80 text-base sm:text-lg leading-relaxed">
                {tDigital("body2")}
              </p>
              <p className="mt-3 text-white font-semibold text-base sm:text-lg">
                {tDigital("emphasis2")}
              </p>
            </div>
            {/* Right - Google Ads */}
            <div className="flex flex-col">
              <div className="relative w-full">
                <Image
                  src={googleAdsSrc}
                  alt={tDigital("card1Alt")}
                  width={800}
                  height={500}
                  className="w-full h-auto block rounded-xl overflow-hidden"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="mt-6 text-xl sm:text-2xl font-bold text-white">
                {tDigital("headline1")}
              </h3>
              <p className="mt-3 text-white/80 text-base sm:text-lg leading-relaxed">
                {tDigital("body1")}
              </p>
              <p className="mt-3 text-white font-semibold text-base sm:text-lg">
                {tDigital("emphasis1")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
