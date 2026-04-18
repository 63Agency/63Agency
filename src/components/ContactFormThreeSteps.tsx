"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { sendContactEmails, isEmailJSConfigured } from "@/lib/emailjs";

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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function isValidEmail(s: string) {
  return EMAIL_REGEX.test((s || "").trim());
}
function isValidPhone(s: string) {
  const digits = (s || "").replace(/\D/g, "");
  return digits.length >= 6;
}

/** Barre de progression (bar) pour les 3 étapes — pas de cercles */
function Stepper({ step, t }: { step: number; t: (k: string) => string }) {
  const widthPercent = step === 1 ? 33.33 : step === 2 ? 66.66 : 100;
  return (
    <div className="mb-8">
      <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3} aria-label={`Étape ${step} sur 3`}>
        <div
          className="h-full rounded-full bg-black transition-all duration-300 ease-out"
          style={{ width: `${widthPercent}%` }}
        />
      </div>
      <div className="flex justify-between mt-2 pr-8">
        {[1, 2, 3].map((s) => (
          <span
            key={s}
            className={`text-xs font-medium ${step >= s ? "text-black font-semibold" : "text-gray-500"}`}
          >
            {t(s === 1 ? "step1Label" : s === 2 ? "step2Label" : "step3Label")}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ContactFormThreeSteps() {
  const t = useTranslations("contactPage");
  const locale = useLocale();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [personalInfo, setPersonalInfo] = useState({
    name: "", email: "", phone: "", city: "", company: "", employees: "",
  });
  const [qualification, setQualification] = useState({
    role: "", objective: "", campaigns: "", sector: "", establishment: "",
  });
  const [extraFields, setExtraFields] = useState({
    budget: "", availability: "",
  });

  const validateStep1 = () => {
    const nextErrors: Record<string, string> = {};
    const name = personalInfo.name.trim();
    if (!name || name.length < 2) nextErrors.name = t("validationRequired");
    if (!personalInfo.email.trim()) nextErrors.email = t("validationRequired");
    else if (!isValidEmail(personalInfo.email)) nextErrors.email = t("validationEmail");
    if (!personalInfo.phone.trim()) nextErrors.phone = t("validationRequired");
    else if (!isValidPhone(personalInfo.phone)) nextErrors.phone = t("validationPhone");
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };
  const validateStep2 = () => {
    const nextErrors: Record<string, string> = {};
    if (!qualification.role) nextErrors.role = t("validationRequired");
    if (!qualification.objective) nextErrors.objective = t("validationRequired");
    if (!qualification.campaigns) nextErrors.campaigns = t("validationRequired");
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };
  const validateStep3 = () => {
    const nextErrors: Record<string, string> = {};
    if (!qualification.sector) nextErrors.sector = t("validationRequired");
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleContinueToStep2 = () => {
    if (!validateStep1()) return;
    setErrors({});
    setStep(2);
  };
  const handleContinueToStep3 = () => {
    if (!validateStep2()) return;
    setErrors({});
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
          body: JSON.stringify({ ...Object.fromEntries(data), ...qualification }),
        });
        if (!res.ok) throw new Error("API error");
      } else {
        await sendContactEmails({
          name, email, phone, city, company, employees,
          role: qualification.role,
          objective: qualification.objective,
          campaigns: qualification.campaigns,
          sector: qualification.sector,
          establishment: qualification.establishment,
          budget: (data.get("budget") as string) ?? "",
          service: (data.get("service") as string) ?? "",
          availability: (data.get("availability") as string) ?? "",
        });
      }
      form.reset();
      setPersonalInfo({ name: "", email: "", phone: "", city: "", company: "", employees: "" });
      setQualification({ role: "", objective: "", campaigns: "", sector: "", establishment: "" });
      setStep(1);
      router.push(`/${locale}/contact/thank-you`);
    } catch {
      setStatus("error");
    }
  };

  const q1Options = [t("q1_1"), t("q1_2"), t("q1_3"), t("q1_4"), t("q1_5")];
  const q2Options = [t("q2_1"), t("q2_2"), t("q2_3"), t("q2_4")];
  const q4Options = [t("q4_1"), t("q4_2"), t("q4_3")];
  const q5Options = [t("q5_1"), t("q5_2"), t("q5_3"), t("q5_6")];
  const budgetOptions = [t("budget_0"), t("budget_1"), t("budget_2"), t("budget_3"), t("budget_4"), t("budget_5"), t("budget_6")];
  const serviceOptions = [t("service_1"), t("service_2"), t("service_3"), t("service_4"), t("service_5")];
  const availabilityOptions = [t("availability_1"), t("availability_2"), t("availability_3"), t("availability_4")];
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
    <div className="w-full">
      {step === 1 && (
        <div className={formBoxClass}>
          <Stepper step={step} t={t} />
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-black">{t("formTitleAudit")}</h2>
            {t("formSubtitle") ? <p className="text-base text-black/70 mt-2">{t("formSubtitle")}</p> : null}
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cta-name" className={formLabelClass}>{t("fullNameLabel")} <span className="text-black/50 font-normal">*</span></label>
                <input id="cta-name" type="text" required placeholder={t("namePlaceholder")} className={`${formInputClass} ${errors.name ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`} value={personalInfo.name} onChange={(e) => setPersonalInfo((p) => ({ ...p, name: e.target.value }))} />
                {errors.name && <p className="mt-1.5 text-sm text-red-400" role="alert">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="cta-email" className={formLabelClass}>{t("emailAddressLabel")} <span className="text-black/50 font-normal">*</span></label>
                <input id="cta-email" type="email" required placeholder={t("emailPlaceholder")} className={`${formInputClass} ${errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`} value={personalInfo.email} onChange={(e) => setPersonalInfo((p) => ({ ...p, email: e.target.value }))} />
                {errors.email && <p className="mt-1.5 text-sm text-red-400" role="alert">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="cta-company" className={formLabelClass}>{t("companyLabel")}</label>
                <input id="cta-company" type="text" placeholder={t("companyPlaceholder")} className={formInputClass} value={personalInfo.company} onChange={(e) => setPersonalInfo((p) => ({ ...p, company: e.target.value }))} />
              </div>
              <div>
                <label htmlFor="cta-employees" className={formLabelClass}>{t("employeesLabel")}</label>
                <select id="cta-employees" className={formSelectClass} value={personalInfo.employees} onChange={(e) => setPersonalInfo((p) => ({ ...p, employees: e.target.value }))}>
                  {employeesOptions.map((opt) => <option key={opt.labelKey} value={opt.value}>{t(opt.labelKey)}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="cta-city" className={formLabelClass}>{t("cityLabel")}</label>
              <select id="cta-city" className={formSelectClass} value={personalInfo.city} onChange={(e) => setPersonalInfo((p) => ({ ...p, city: e.target.value }))}>
                <option value="">{t("selectPlaceholder")}</option>
                {MOROCCAN_CITIES.map((city) => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="cta-phone" className={formLabelClass}>{t("phoneLabel")} <span className="text-black/50 font-normal">*</span></label>
              <input id="cta-phone" type="tel" inputMode="numeric" pattern="[0-9]*" required placeholder={t("phonePlaceholder")} className={`${formInputClass} ${errors.phone ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`} value={personalInfo.phone} onChange={(e) => { const digits = e.target.value.replace(/\D/g, ""); setPersonalInfo((p) => ({ ...p, phone: digits })); if (errors.phone) setErrors((e) => ({ ...e, phone: "" })); }} />
              {errors.phone && <p className="mt-1.5 text-sm text-red-400" role="alert">{errors.phone}</p>}
            </div>
          </div>
          <div className="mt-4 pt-5 border-t border-gray-200 space-y-4">
            <div className="flex items-start gap-3 text-sm text-black/70">
              <span className="shrink-0 mt-0.5 text-black" aria-hidden><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" /></svg></span>
              <span>{t("formSecurity")}</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-black/70">
              <span className="shrink-0 mt-0.5 text-black" aria-hidden><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" /></svg></span>
              <span>{t("formAuditReserved")}</span>
            </div>
            <button type="button" onClick={handleContinueToStep2} className="w-full py-4 bg-black text-white text-base font-semibold rounded-lg hover:bg-gray-800 transition-colors">
              {t("continue")}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={formBoxClass}>
          <h2 className="text-2xl font-bold text-black mb-1">{t("formTitleAudit")}</h2>
          {t("formSubtitle") ? <p className="text-base text-black/70 mb-6">{t("formSubtitle")}</p> : null}
          <Stepper step={step} t={t} />
          <h3 className="text-xl font-bold text-black mb-6">{t("step2Title")}</h3>
          <div className="space-y-4 sm:space-y-5">
            <div>
              <label htmlFor="cta-role" className={formLabelClass}>{t("q1Label")}</label>
              <select id="cta-role" className={formSelectClass} value={qualification.role} onChange={(e) => setQualification((p) => ({ ...p, role: e.target.value }))} required>
                <option value="">{t("selectPlaceholder")}</option>
                {q1Options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
              </select>
              {errors.role && <p className="mt-1.5 text-sm text-red-600" role="alert">{errors.role}</p>}
            </div>
            <div>
              <label htmlFor="cta-objective" className={formLabelClass}>{t("q2Label")}</label>
              <select id="cta-objective" className={formSelectClass} value={qualification.objective} onChange={(e) => setQualification((p) => ({ ...p, objective: e.target.value }))} required>
                <option value="">{t("selectPlaceholder")}</option>
                {q2Options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
              </select>
              {errors.objective && <p className="mt-1.5 text-sm text-red-600" role="alert">{errors.objective}</p>}
            </div>
            <div>
              <label htmlFor="cta-campaigns" className={formLabelClass}>{t("q4Label")}</label>
              <select id="cta-campaigns" className={formSelectClass} value={qualification.campaigns} onChange={(e) => setQualification((p) => ({ ...p, campaigns: e.target.value }))} required>
                <option value="">{t("selectPlaceholder")}</option>
                {q4Options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
              </select>
              {errors.campaigns && <p className="mt-1.5 text-sm text-red-600" role="alert">{errors.campaigns}</p>}
            </div>
            <div className="pt-6 border-t border-gray-200">
              <button type="button" onClick={handleContinueToStep3} className="w-full py-4 bg-black text-white text-base font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                {t("continue")}
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={formBoxClass}>
          <Stepper step={step} t={t} />
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-black">{t("formTitleAudit")}</h2>
            {t("formSubtitle") ? <p className="text-base text-black/70 mt-2">{t("formSubtitle")}</p> : null}
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
            <input type="hidden" name="campaigns" value={qualification.campaigns} />
            <input type="hidden" name="sector" value={qualification.sector} />
            <input type="hidden" name="establishment" value={qualification.establishment} />
            <div>
              <label htmlFor="cta-sector" className={formLabelClass}>{t("q5Label")}</label>
              <select id="cta-sector" className={formSelectClass} value={qualification.sector} onChange={(e) => setQualification((p) => ({ ...p, sector: e.target.value }))} required>
                <option value="">{t("selectPlaceholder")}</option>
                {q5Options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
              </select>
              {errors.sector && <p className="mt-1.5 text-sm text-red-400" role="alert">{errors.sector}</p>}
            </div>
            <div>
              <label htmlFor="cta-budget" className={formLabelClass}>{t("budgetLabel")}</label>
              <select id="cta-budget" name="budget" className={formSelectClass} value={extraFields.budget} onChange={(e) => setExtraFields((p) => ({ ...p, budget: e.target.value }))}>
                <option value="">{t("selectPlaceholder")}</option>
                {budgetOptions.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="cta-availability" className={formLabelClass}>{t("availabilityLabel")}</label>
              <select id="cta-availability" name="availability" className={formSelectClass} value={extraFields.availability} onChange={(e) => setExtraFields((p) => ({ ...p, availability: e.target.value }))}>
                <option value="">{t("selectPlaceholder")}</option>
                {availabilityOptions.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            {status === "error" && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm font-medium text-red-700">{t("error")}</div>
            )}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
              <button type="button" onClick={() => setStep(2)} className="px-8 py-3.5 bg-transparent text-black text-base font-semibold rounded-lg border-2 border-gray-300 hover:bg-gray-100 transition-all">
                ← {t("back")}
              </button>
              <button type="submit" disabled={status === "sending"} className="w-full sm:w-auto min-w-[200px] px-10 py-4 bg-black text-white text-base font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                {status === "sending" ? t("sending") : t("submit")}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
