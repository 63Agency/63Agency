"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
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

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
    <div className="min-h-screen bg-white pt-20">
      {/* Top: CONTACT + hero headline — même largeur que le contenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 sm:pt-12 sm:pb-14">
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

      {/* Contact: bloc texte à gauche, formulaire à droite — sections bien placées */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start">
            {/* Bloc texte — gauche */}
            <div className="lg:col-span-5">
            <div className="p-0 lg:sticky lg:top-24 overflow-hidden text-black">
              {/* Social proof */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {REVIEW_AVATARS.map((src) => (
                      <div
                        key={src}
                        className="relative w-9 h-9 rounded-full border-2 border-gray-200 bg-gray-100 flex-shrink-0 overflow-hidden ring-2 ring-white"
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
                      <svg key={i} className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
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

              {/* Paragraphe avec parties en gras */}
              <p className="text-sm text-black leading-relaxed mb-6">
                {t("sidebarDescription").split(/\*\*(.*?)\*\*/g).map((part, i) =>
                  i % 2 === 1 ? <strong key={i} className="font-semibold text-black">{part}</strong> : part
                )}
              </p>

              {/* Statistiques */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold">{t("sidebarStat1Value")}</p>
                  <p className="text-xs sm:text-sm text-white/80">{t("sidebarStat1Label")}</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold">{t("sidebarStat2Value")}</p>
                  <p className="text-xs sm:text-sm text-white/80">{t("sidebarStat2Label")}</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold">{t("sidebarStat3Value")}</p>
                  <p className="text-xs sm:text-sm text-white/80">{t("sidebarStat3Label")}</p>
                </div>
              </div>

              {/* Garanties avec checkmarks — une seule ligne */}
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
                {[
                  t("sidebarGuarantee1"),
                  t("sidebarGuarantee2"),
                  t("sidebarGuarantee3"),
                ].map((label, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm whitespace-nowrap">
                    <svg className="w-5 h-5 text-black flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>

              {/* Encadré places limitées */}
              <div className="rounded-xl border border-black/20 bg-gray-100 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wider text-black mb-2">
                  {t("sidebarLimitedTitle")}
                </p>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-black flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-black/90">{t("sidebarLimitedText")}</p>
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
                <div className="rounded-2xl border border-gray-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-8 sm:p-10 lg:p-12">
                  <h3 className="text-2xl font-bold text-black mb-8">
                    {t("step1Title")}
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className={labelClass}>
                          {t("fullNameLabel")} <span className="text-black/50 font-normal">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder={t("namePlaceholder")}
                          className={inputClass}
                          value={personalInfo.name}
                          onChange={(e) => setPersonalInfo((p) => ({ ...p, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className={labelClass}>
                          {t("phoneLabel")} <span className="text-black/50 font-normal">*</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          required
                          placeholder={t("phonePlaceholder")}
                          className={inputClass}
                          value={personalInfo.phone}
                          onChange={(e) => setPersonalInfo((p) => ({ ...p, phone: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label htmlFor="city" className={labelClass}>
                          {t("cityLabel")}
                        </label>
                        <input
                          id="city"
                          type="text"
                          placeholder={t("cityPlaceholder")}
                          className={inputClass}
                          value={personalInfo.city}
                          onChange={(e) => setPersonalInfo((p) => ({ ...p, city: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className={labelClass}>
                          {t("companyLabel")}
                        </label>
                        <input
                          id="company"
                          type="text"
                          placeholder={t("companyPlaceholder")}
                          className={inputClass}
                          value={personalInfo.company}
                          onChange={(e) => setPersonalInfo((p) => ({ ...p, company: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label htmlFor="employees" className={labelClass}>
                          {t("employeesLabel")}
                        </label>
                        <select
                          id="employees"
                          className={selectClass}
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
                        <label htmlFor="email" className={labelClass}>
                          {t("emailAddressLabel")} <span className="text-black/50 font-normal">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder={t("emailPlaceholder")}
                          className={inputClass}
                          value={personalInfo.email}
                          onChange={(e) => setPersonalInfo((p) => ({ ...p, email: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 pt-8 border-t border-gray-100 space-y-4">
                    <div className="flex items-start gap-3 text-sm text-black/80">
                      <span className="shrink-0 mt-0.5 text-black" aria-hidden>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>{t("formSecurity")}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-black/80">
                      <span className="shrink-0 mt-0.5 text-black" aria-hidden>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>{t("formAuditInfo")}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!personalInfo.name || !personalInfo.email || !personalInfo.phone}
                      className="w-full sm:w-auto min-w-[240px] px-10 py-4 bg-black text-white text-base font-semibold rounded-lg border-2 border-black hover:bg-white hover:text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
                    >
                      {t("continue")}
                    </button>
                  </div>
                </div>
              )}

              {/* Étape 2 : Questions de qualification */}
              {step === 2 && (
                <div className="rounded-2xl border border-gray-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-8 sm:p-10 lg:p-12">
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

                    <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-8 py-3.5 bg-white text-black text-base font-semibold rounded-lg border-2 border-gray-200 hover:border-black hover:bg-gray-50 transition-all"
                      >
                        ← {t("back")}
                      </button>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="min-w-[240px] px-10 py-4 bg-black text-white text-base font-semibold rounded-lg border-2 border-black hover:bg-white hover:text-black transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
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

      {/* Maps: même largeur que la section contact */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shadow-sm h-[280px] sm:h-[300px] min-h-[240px]">
            <iframe
              src={MAP_CASABLANCA}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="63 Agency – Casablanca, 179 Bd de la Résistance"
              className="w-full h-full min-h-[240px]"
            />
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shadow-sm h-[280px] sm:h-[300px] min-h-[240px]">
            <iframe
              src={MAP_RABAT}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="63 Agency – Rabat, 18 Rue Baht"
              className="w-full h-full min-h-[240px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
