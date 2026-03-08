"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams, useRouter } from "next/navigation";
import { sendContactEmails, isEmailJSConfigured } from "@/lib/emailjs";
import ContactFormThreeSteps from "@/components/ContactFormThreeSteps";

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
const formBoxClass = "rounded-2xl border border-gray-200 bg-white shadow-xl p-5 sm:p-6 lg:p-8 overflow-visible";
const formLabelClass = "block text-sm font-semibold text-black/90 tracking-wide mb-2";
const formInputClass =
  "w-full rounded-lg bg-gray-50 border border-gray-200 px-5 py-3.5 text-base text-black placeholder-gray-400 focus:border-black focus:ring-2 focus:ring-black/5 focus:outline-none transition-all";
const formSelectClass =
  "contact-select w-full rounded-lg bg-gray-50 border border-gray-200 px-5 py-3.5 text-base text-black appearance-none cursor-pointer focus:border-black focus:ring-2 focus:ring-black/5 focus:outline-none transition-all [&>option]:text-black";

const MOROCCAN_CITIES = [
  "Agadir", "Aït Melloul", "Azrou", "Béni Mellal", "Berrechid", "Casablanca", "El Jadida",
  "Errachidia", "Fès", "Kénitra", "Khémisset", "Khouribga", "Laâyoune", "Larache", "Marrakech",
  "Meknès", "Midelt", "Nador", "Ouarzazate", "Oujda", "Rabat", "Safi", "Salé", "Tanger",
  "Taza", "Tétouan", "Tinghir", "Tiznit", "Zagora",
];

const META_IMAGE_BY_LOCALE: Record<string, string> = {
  en: "/images/Feceboock/Meta-EN-(1).png",
  fr: "/images/Feceboock/Meta-Fr-(3).png",
};
const GOOGLE_ADS_IMAGE_BY_LOCALE: Record<string, string> = {
  en: "/images/Feceboock/GoogleAds-EN-(3).png",
  fr: "/images/Feceboock/Google-Ads-Fr-(2).png",
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
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const metaSrc = META_IMAGE_BY_LOCALE[locale] ?? META_IMAGE_BY_LOCALE.fr;
  const googleAdsSrc = GOOGLE_ADS_IMAGE_BY_LOCALE[locale] ?? GOOGLE_ADS_IMAGE_BY_LOCALE.fr;
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    if (searchParams.get("sent") === "1") router.push(`/${locale}/contact/thank-you`);
  }, [searchParams, locale, router]);
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
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function validateStep2(): boolean {
    const nextErrors: Record<string, string> = {};
    if (!qualification.role) nextErrors.role = t("validationRequired");
    if (!qualification.objective) nextErrors.objective = t("validationRequired");
    if (!qualification.timing) nextErrors.timing = t("validationRequired");
    if (!qualification.campaigns) nextErrors.campaigns = t("validationRequired");
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function validateStep3(): boolean {
    const nextErrors: Record<string, string> = {};
    if (!qualification.sector) nextErrors.sector = t("validationRequired");
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleContinueToStep2() {
    if (!validateStep1()) return;
    setErrors({});
    setStep(2);
  }

  function handleContinueToStep3() {
    if (!validateStep2()) return;
    setErrors({});
    setStep(3);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateStep3()) return;
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
          employees,
          role: qualification.role,
          objective: qualification.objective,
          timing: qualification.timing,
          campaigns: qualification.campaigns,
          sector: qualification.sector,
          establishment: qualification.establishment,
        });
      }
      form.reset();
      setPersonalInfo({ name: "", email: "", phone: "", city: "", company: "", employees: "" });
      setQualification({ role: "", objective: "", timing: "", campaigns: "", sector: "", establishment: "" });
      setStep(1);
      router.push(`/${locale}/contact/thank-you`);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 sm:pt-12 sm:pb-14">
        <div className="relative">
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-white shrink-0" />
            <span className="text-sm font-semibold uppercase tracking-wider text-white">
              {t("contactTag")}
            </span>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <h1 className="text-xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            <span className="block">{t("heroHeadline1")}</span>
            <span className="block mt-1.5 sm:mt-2 text-white/90 font-semibold text-lg sm:text-3xl md:text-4xl">
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
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
            {/* Bloc texte — gauche (ordre 2 sur mobile pour afficher le formulaire en premier) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="p-0 lg:sticky lg:top-24 overflow-hidden text-white">
              {/* Social proof — badge vert + étoiles dorées comme l’image */}
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
                  <span className="rounded-full bg-green-500 text-white px-3 py-1.5 text-sm font-bold">
                    {t("sidebarSocialBadge")}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{t("sidebarClientsSatisfaits")}</p>
                  <div className="flex items-center justify-end gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Titre principal — soulignement bleu sur le highlight */}
              <h2 className="text-xl sm:text-2xl font-bold leading-tight mb-4 text-white">
                {t("sidebarHeadline")}{" "}
                <span className="underline underline-offset-2 decoration-white text-white">{t("sidebarHeadlineHighlight")}</span>
              </h2>

              {/* Paragraphe avec mots-clés en bleu */}
              <div className="text-sm text-white/90 leading-relaxed mb-6 space-y-3">
                {t("sidebarDescription")
                  .split(/\n\n+/)
                  .map((paragraph, idx) => (
                    <p key={idx}>
                      {paragraph.split(/\*\*(.*?)\*\*/g).map((part, i) =>
                        i % 2 === 1 ? <strong key={i} className="font-semibold text-blue-400">{part}</strong> : part
                      )}
                    </p>
                  ))}
              </div>

              {/* Bloc statistiques — chiffres en bleu */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{t("sidebarStat1Value")}</p>
                  <p className="text-xs text-white/80 mt-1">{t("sidebarStat1Label")}</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{t("sidebarStat2Value")}</p>
                  <p className="text-xs text-white/80 mt-1">{t("sidebarStat2Label")}</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{t("sidebarStat3Value")}</p>
                  <p className="text-xs text-white/80 mt-1">{t("sidebarStat3Label")}</p>
                </div>
              </div>

              {/* Garanties avec checkmarks verts (comme l’image) */}
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
                {[
                  t("sidebarGuarantee1"),
                  t("sidebarGuarantee2"),
                  t("sidebarGuarantee3"),
                ].map((label, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white/90 whitespace-nowrap">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>

              {/* Places limitées — texte en couleur d’attention uniquement (pas de fond) */}
              <div className="mt-6 rounded-xl border border-amber-400/50 bg-amber-400/5 px-4 py-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">{t("sidebarLimitedTitle")}</p>
                    <p className="text-sm text-amber-300 font-medium">{t("sidebarLimitedText")}</p>
                  </div>
                </div>
              </div>

              {/* Nos 2 localisations */}
              <div className="mt-6 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wider text-white/90 mb-3">
                  {t("visitOffices")}
                </p>
                <div className="flex flex-col gap-3 text-sm text-white/80">
                  <div>
                    <p className="font-semibold text-white/95">{t("officeRabat")}</p>
                    <p className="leading-snug mt-0.5">{t("addressRabat")}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white/95">{t("officeCasa")}</p>
                    <p className="leading-snug mt-0.5">{t("addressCasa")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Formulaire — colonnes 7–12 pour le placer à droite */}
            <div id="form" className="lg:col-span-6 lg:col-start-7 min-w-0 flex flex-col items-stretch order-1 lg:order-2">
              <div className="w-full">
              <ContactFormThreeSteps />
              {false && step === 1 && (
                <div className={formBoxClass}>
                  {/* Barre d’étape en haut de la carte */}
                  <h2 className="text-2xl font-bold text-black mb-1">
                    {t("formTitleAudit")}
                  </h2>
                  <p className="text-base text-black/70 mb-6">
                    {t("formSubtitle")}
                  </p>
                  {/* Stepper : comme l’image, couleurs noir et blanc */}
                  <div className="flex items-start justify-between gap-0 mb-8 overflow-visible">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className={`flex items-center min-w-0 overflow-visible ${s === 2 ? "flex-1" : s === 3 ? "ml-auto flex-initial" : "flex-1"}`}>
                        <div className="flex flex-col items-center flex-shrink-0 w-10">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors shrink-0 ${
                              step === s
                                ? "bg-black text-white"
                                : "bg-white border-2 border-gray-300 text-gray-600"
                            }`}
                          >
                            {s}
                          </div>
                          <span
                            className={`mt-2 text-sm font-medium text-center whitespace-nowrap block w-full leading-tight ${
                              step === s ? "text-black font-semibold" : "text-gray-600"
                            } ${s === 1 ? "-translate-x-6" : s === 2 ? "-translate-x-6" : ""}`}
                          >
                            {t(s === 1 ? "step1Label" : s === 2 ? "step2Label" : "step3Label")}
                          </span>
                        </div>
                        {s < 3 && (
                          <div className="flex-1 h-0.5 mx-3 bg-gray-300 rounded self-start mt-5 min-w-[48px]" aria-hidden />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    </div>
                    <div>
                      <label htmlFor="city" className={formLabelClass}>
                        {t("cityLabel")}
                      </label>
                      <select
                        id="city"
                        className={formSelectClass}
                        value={personalInfo.city}
                        onChange={(e) => setPersonalInfo((p) => ({ ...p, city: e.target.value }))}
                      >
                        <option value="">{t("selectPlaceholder")}</option>
                        {MOROCCAN_CITIES.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="phone" className={formLabelClass}>
                        {t("phoneLabel")} <span className="text-black/50 font-normal">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        required
                        placeholder={t("phonePlaceholder")}
                        className={`${formInputClass} ${errors.phone ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
                        value={personalInfo.phone}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, "");
                          setPersonalInfo((p) => ({ ...p, phone: digits }));
                          if (errors.phone) setErrors((e) => ({ ...e, phone: "" }));
                        }}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-sm text-red-400" role="alert">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 pt-5 border-t border-gray-200 space-y-4">
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
                      <span>{t("formAuditReserved")}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleContinueToStep2}
                      className="w-full py-4 bg-black text-white text-base font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {t("continue")}
                    </button>
                  </div>
                </div>
              )}

              {/* Étape 2 : Service souhaité */}
              {step === 2 && (
                <div className={formBoxClass}>
                  {/* Barre d’étape en haut de la carte */}
                  <h2 className="text-2xl font-bold text-black mb-1">{t("formTitleAudit")}</h2>
                  {t("formSubtitle") && (
                    <p className="text-base text-black/70 mb-6">{t("formSubtitle")}</p>
                  )}
                  {/* Stepper : comme l’image, couleurs noir et blanc */}
                  <div className="flex items-start justify-between gap-0 mb-8 overflow-visible">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className={`flex items-center min-w-0 overflow-visible ${s === 2 ? "flex-1" : s === 3 ? "ml-auto flex-initial" : "flex-1"}`}>
                        <div className="flex flex-col items-center flex-shrink-0 w-10">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors shrink-0 ${
                              step === s
                                ? "bg-black text-white"
                                : "bg-white border-2 border-gray-300 text-gray-600"
                            }`}
                          >
                            {s}
                          </div>
                          <span
                            className={`mt-2 text-sm font-medium text-center whitespace-nowrap block w-full leading-tight ${
                              step === s ? "text-black font-semibold" : "text-gray-600"
                            } ${s === 1 ? "-translate-x-6" : s === 2 ? "-translate-x-6" : ""}`}
                          >
                            {t(s === 1 ? "step1Label" : s === 2 ? "step2Label" : "step3Label")}
                          </span>
                        </div>
                        {s < 3 && (
                          <div className="flex-1 h-0.5 mx-3 bg-gray-300 rounded self-start mt-5 min-w-[48px]" aria-hidden />
                        )}
                      </div>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-black mb-6">{t("step2Title")}</h3>
                  <div className="space-y-4 sm:space-y-5">
                    <div>
                      <label htmlFor="role" className={formLabelClass}>
                        {t("q1Label")}
                      </label>
                      <select
                        id="role"
                        value={qualification.role}
                        onChange={(e) =>
                          setQualification((p) => ({ ...p, role: e.target.value }))
                        }
                        className={formSelectClass}
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
                        <p className="mt-1.5 text-sm text-red-600" role="alert">{errors.role}</p>
                      )}
                    </div>
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
                    <div className="pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={handleContinueToStep3}
                        className="w-full py-4 bg-black text-white text-base font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        {t("continue")}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Étape 3 : Détails + envoi */}
              {false && step === 3 && (
                <div className={formBoxClass}>
                  <h2 className="text-2xl font-bold text-black mb-1">{t("formTitleAudit")}</h2>
                  {t("formSubtitle") && (
                    <p className="text-base text-black/70 mb-6">{t("formSubtitle")}</p>
                  )}
                  <div className="flex items-start justify-between gap-0 mb-8 overflow-visible">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className={`flex items-center min-w-0 overflow-visible ${s === 2 ? "flex-1" : s === 3 ? "ml-auto flex-initial" : "flex-1"}`}>
                        <div className="flex flex-col items-center flex-shrink-0 w-10">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors shrink-0 ${
                              step === s
                                ? "bg-black text-white"
                                : "bg-white border-2 border-gray-300 text-gray-600"
                            }`}
                          >
                            {s}
                          </div>
                          <span
                            className={`mt-2 text-sm font-medium text-center whitespace-nowrap block w-full leading-tight ${
                              step === s ? "text-black font-semibold" : "text-gray-600"
                            } ${s === 1 ? "-translate-x-6" : s === 2 ? "-translate-x-6" : ""}`}
                          >
                            {t(s === 1 ? "step1Label" : s === 2 ? "step2Label" : "step3Label")}
                          </span>
                        </div>
                        {s < 3 && (
                          <div className="flex-1 h-0.5 mx-3 bg-gray-300 rounded self-start mt-5 min-w-[48px]" aria-hidden />
                        )}
                      </div>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-black mb-6">{t("step3Title")}</h3>
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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
                      <label htmlFor="sector-step3" className={formLabelClass}>
                        {t("q5Label")}
                      </label>
                      <select
                        id="sector-step3"
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
                      <label htmlFor="establishment-step3" className={formLabelClass}>
                        {t("q6Label")}
                      </label>
                      <input
                        id="establishment-step3"
                        type="text"
                        value={qualification.establishment}
                        onChange={(e) =>
                          setQualification((p) => ({ ...p, establishment: e.target.value }))
                        }
                        placeholder={t("q6Placeholder")}
                        className={formInputClass}
                      />
                    </div>

                    {status === "error" && (
                      <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm font-medium text-red-700">
                        {t("error")}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-8 py-3.5 bg-transparent text-black text-base font-semibold rounded-lg border-2 border-gray-300 hover:bg-gray-100 transition-all"
                      >
                        ← {t("back")}
                      </button>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="w-full sm:w-auto min-w-[200px] px-10 py-4 bg-black text-white text-base font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === "sending" ? t("sending") : t("submit")}
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
      <section className="w-full bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Left - Meta : même fond blanc pour image + texte */}
            <div className="flex flex-col">
              <div className="relative w-full">
                <div className="absolute left-0 right-0 top-40 sm:top-52 bottom-0 rounded-2xl bg-white z-0" aria-hidden />
                <div className="absolute left-0 right-0 top-40 sm:top-52 bottom-0 flex items-center justify-center pointer-events-none z-0" aria-hidden>
                  <div
                    className="w-[75%] max-w-[400px] aspect-square rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(147, 197, 253, 0.22) 0%, rgba(96, 165, 250, 0.06) 45%, transparent 70%)",
                    }}
                  />
                </div>
                <Image
                  src={encodeURI(metaSrc)}
                  alt={tDigital("card2Alt")}
                  width={600}
                  height={200}
                  className="relative z-10 w-full h-auto block rounded-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="relative z-10 px-4 sm:px-5 pt-6 pb-5 sm:pb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-black">
                    {tDigital("headline2")}
                  </h3>
                  <p className="mt-3 text-black/80 text-base sm:text-lg leading-relaxed">
                    {tDigital("body2")}
                  </p>
                  <p className="mt-3 text-black font-semibold text-base sm:text-lg">
                    {tDigital("emphasis2")}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <Link
                      href="#form"
                      className="view-more-btn"
                      aria-label={tNav("contactButton")}
                    >
                      <span>
                        <span className="text-1">{tNav("contactButton")}</span>
                        <span className="text-2">{tNav("contactButton")}</span>
                      </span>
                      <i>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 11L11 1M11 1V11M11 1H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 11L11 1M11 1V11M11 1H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
{/* Right - Google Ads : même fond blanc pour image + texte */}
            <div className="flex flex-col">
              <div className="relative w-full">
                <div className="absolute left-0 right-0 top-40 sm:top-52 bottom-0 rounded-2xl bg-white z-0" aria-hidden />
                <div className="absolute left-0 right-0 top-40 sm:top-52 bottom-0 flex items-center justify-center pointer-events-none z-0" aria-hidden>
                  <div
                    className="w-[75%] max-w-[400px] aspect-square rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(253, 224, 71, 0.1) 0%, rgba(251, 191, 36, 0.04) 45%, transparent 70%)",
                    }}
                  />
                </div>
                <Image
                  src={encodeURI(googleAdsSrc)}
                  alt={tDigital("card1Alt")}
                  width={800}
                  height={500}
                  className="relative z-10 w-full h-auto block rounded-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="relative z-10 px-4 sm:px-5 pt-6 pb-5 sm:pb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-black">
                    {tDigital("headline1")}
                  </h3>
                  <p className="mt-3 text-black/80 text-base sm:text-lg leading-relaxed">
                    {tDigital("body1")}
                  </p>
                  <p className="mt-3 text-black font-semibold text-base sm:text-lg">
                    {tDigital("emphasis1")}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <Link
                      href="#form"
                      className="view-more-btn"
                      aria-label={tNav("contactButton")}
                    >
                      <span>
                        <span className="text-1">{tNav("contactButton")}</span>
                        <span className="text-2">{tNav("contactButton")}</span>
                      </span>
                      <i>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 11L11 1M11 1V11M11 1H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 11L11 1M11 1V11M11 1H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
