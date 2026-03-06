"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

const EMPLOYEE_OPTIONS = [
  { value: "", key: "fieldEmployees" },
  { value: "1", key: "employees_1" },
  { value: "1-5", key: "employees_1_5" },
  { value: "6-20", key: "employees_6_20" },
  { value: "21-50", key: "employees_21_50" },
  { value: "51-200", key: "employees_51_200" },
  { value: "200+", key: "employees_200_plus" },
] as const;

const CITY_OPTIONS = [
  { value: "", key: "fieldCity" },
  { value: "rabat", key: "city_rabat" },
  { value: "casablanca", key: "city_casablanca" },
  { value: "marrakech", key: "city_marrakech" },
  { value: "fes", key: "city_fes" },
  { value: "tanger", key: "city_tanger" },
  { value: "agadir", key: "city_agadir" },
  { value: "oujda", key: "city_oujda" },
  { value: "kenitra", key: "city_kenitra" },
  { value: "tetouan", key: "city_tetouan" },
  { value: "meknes", key: "city_meknes" },
  { value: "sale", key: "city_sale" },
  { value: "nador", key: "city_nador" },
  { value: "el_jadida", key: "city_el_jadida" },
  { value: "autre", key: "city_autre" },
] as const;

const inputClass =
  "w-full rounded-lg px-4 py-3 text-white placeholder-white/50 text-[15px] border border-white/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30";
const selectClassCta =
  "w-full rounded-lg px-4 py-3 text-white text-[15px] border border-white/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer appearance-none";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function isValidEmail(s: string) {
  return EMAIL_REGEX.test((s || "").trim());
}
function isValidPhone(s: string) {
  const digits = (s || "").replace(/\D/g, "");
  return digits.length >= 6;
}

export default function CTASection() {
  const t = useTranslations("cta");
  const tContact = useTranslations("contactPage");
  const locale = useLocale();
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [role, setRole] = useState("");
  const [objective, setObjective] = useState("");
  const [timing, setTiming] = useState("");
  const [campaigns, setCampaigns] = useState("");
  const [sector, setSector] = useState("");
  const [establishment, setEstablishment] = useState("");
  const [employeesOpen, setEmployeesOpen] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  const description = t("description");
  const parts = description.split(/\*\*(.*?)\*\*/g);

  const selectedOption = EMPLOYEE_OPTIONS.find((o) => o.value === selectedEmployees);
  const displayLabel = selectedOption ? t(selectedOption.key) : t("fieldEmployees");
  const selectedCityOption = CITY_OPTIONS.find((o) => o.value === selectedCity);
  const displayCityLabel = selectedCityOption ? t(selectedCityOption.key) : t("fieldCity");

  const q1Options = [tContact("q1_1"), tContact("q1_2"), tContact("q1_3"), tContact("q1_4"), tContact("q1_5")];
  const q2Options = [tContact("q2_1"), tContact("q2_2"), tContact("q2_3"), tContact("q2_4")];
  const q3Options = [tContact("q3_1"), tContact("q3_2"), tContact("q3_3"), tContact("q3_4"), tContact("q3_5")];
  const q4Options = [tContact("q4_1"), tContact("q4_2"), tContact("q4_3")];
  const q5Options = [tContact("q5_1"), tContact("q5_2"), tContact("q5_3"), tContact("q5_6")];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) setEmployeesOpen(false);
      if (cityRef.current && !cityRef.current.contains(target)) setCityOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function validateStep1(): boolean {
    const nextErrors: Record<string, string> = {};
    const nameTrim = name.trim();
    if (!nameTrim || nameTrim.length < 2) nextErrors.name = t("validationRequired");
    if (!email.trim()) nextErrors.email = t("validationRequired");
    else if (!isValidEmail(email)) nextErrors.email = t("validationEmail");
    if (!phone.trim()) nextErrors.phone = t("validationRequired");
    else if (!isValidPhone(phone)) nextErrors.phone = t("validationPhone");
    if (!role.trim()) nextErrors.role = t("validationRequired");
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function validateStep2(): boolean {
    const nextErrors: Record<string, string> = {};
    if (!objective.trim()) nextErrors.objective = t("validationRequired");
    if (!timing.trim()) nextErrors.timing = t("validationRequired");
    if (!campaigns.trim()) nextErrors.campaigns = t("validationRequired");
    if (!sector.trim()) nextErrors.sector = t("validationRequired");
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleNext() {
    if (step === 1) {
      if (!validateStep1()) return;
      setErrors({});
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!validateStep2()) return;
      setErrors({});
      setSubmitError("");
      setSending(true);
      const cityLabel = selectedCity ? (() => { try { return t("city_" + selectedCity); } catch { return selectedCity; } })() : "";
      const body = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city: cityLabel || undefined,
        company: company.trim() || undefined,
        employees: selectedEmployees || undefined,
        role: role.trim() || undefined,
        objective: objective.trim() || undefined,
        timing: timing.trim() || undefined,
        campaigns: campaigns.trim() || undefined,
        sector: sector.trim() || undefined,
        establishment: establishment.trim() || undefined,
      };
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setSubmitError(data?.error || tContact("error"));
          setSending(false);
          return;
        }
        setSending(false);
        setSubmittedSuccess(true);
      } catch {
        setSubmitError(tContact("error"));
        setSending(false);
      }
    }
  }

  const labelClassStep3 = "block text-sm font-medium text-white/90 mb-2";

  return (
    <section id="contact" className="relative py-16 sm:py-24 bg-white overflow-visible">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="lg:pt-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">
              {t("title")}
            </h2>
            <p className="text-base sm:text-lg text-black/90 leading-relaxed">
              {parts.map((part, i) =>
                i % 2 === 1 ? <strong key={i}>{part}</strong> : part
              )}
            </p>
            <div className="mt-5 space-y-3">
              <p className="text-base text-black/90 leading-relaxed font-medium">
                {t("auditIntro")}
              </p>
              <p className="text-sm text-black/75 leading-relaxed">
                {t("auditDetail")}
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl p-6 sm:p-8 shadow-xl bg-black border border-white/20 overflow-visible">
              {/* Thank you section (in place of form, same page) */}
              {submittedSuccess && (
                <div className="text-center py-4 sm:py-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-6" aria-hidden>
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    {tContact("thankYouTitle")}
                  </h3>
                  <p className="text-lg text-white/90 mb-2">
                    {tContact("thankYouMessage")}
                  </p>
                  <p className="text-base text-white/70 mb-8 max-w-md mx-auto">
                    {tContact("thankYouSubMessage")}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedSuccess(false);
                      setStep(1);
                      setErrors({});
                      setSubmitError("");
                      setName("");
                      setCompany("");
                      setEmail("");
                      setPhone("");
                      setRole("");
                      setObjective("");
                      setTiming("");
                      setCampaigns("");
                      setSector("");
                      setEstablishment("");
                      setSelectedEmployees("");
                      setSelectedCity("");
                    }}
                    className="px-6 py-3 rounded-lg font-semibold text-white border-2 border-white/50 bg-transparent hover:bg-white/10 transition-colors"
                  >
                    {tContact("thankYouButton")}
                  </button>
                </div>
              )}

              {/* Step 1: Informations personnelles */}
              {!submittedSuccess && step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-black mb-4">{tContact("step1Title")}</h3>
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder={t("fieldName")}
                      value={name}
                      onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: "" })); }}
                      className={`${inputClass} ${errors.name ? "border-red-400 focus:ring-red-400/30" : ""}`}
                      aria-label={t("fieldName")}
                    />
                    {errors.name && <p className="mt-1.5 text-sm text-red-300" role="alert">{errors.name}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="company"
                      placeholder={t("fieldCompany")}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className={inputClass}
                      aria-label={t("fieldCompany")}
                    />
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setEmployeesOpen(!employeesOpen)}
                        className="w-full rounded-lg px-4 py-3 text-left text-white text-[15px] border border-white/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer min-h-[48px] flex items-center justify-between"
                        aria-haspopup="listbox"
                        aria-expanded={employeesOpen}
                        aria-label={t("fieldEmployees")}
                      >
                        <span className={selectedEmployees ? "" : "text-white/60"}>{displayLabel}</span>
                        <svg className={`w-5 h-5 text-white/80 shrink-0 transition-transform ${employeesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {employeesOpen && (
                        <ul className="absolute z-50 left-0 right-0 mt-1 py-1 rounded-lg border border-white/30 bg-black shadow-xl max-h-[280px] overflow-y-auto" role="listbox">
                          {EMPLOYEE_OPTIONS.map((opt) => (
                            <li
                              key={opt.value || "placeholder"}
                              role="option"
                              aria-selected={selectedEmployees === opt.value}
                              onClick={() => { setSelectedEmployees(opt.value); setEmployeesOpen(false); }}
                              className="px-4 py-3 text-white text-[15px] cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:outline-none"
                            >
                              {t(opt.key)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder={t("fieldPhone")}
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value); if (errors.phone) setErrors((p) => ({ ...p, phone: "" })); }}
                        className={`${inputClass} ${errors.phone ? "border-red-400 focus:ring-red-400/30" : ""}`}
                        aria-label={t("fieldPhone")}
                      />
                      {errors.phone && <p className="mt-1.5 text-sm text-red-300" role="alert">{errors.phone}</p>}
                    </div>
                    <div className="relative" ref={cityRef}>
                      <button
                        type="button"
                        onClick={() => setCityOpen(!cityOpen)}
                        className="w-full rounded-lg px-4 py-3 text-left text-white text-[15px] border border-white/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer min-h-[48px] flex items-center justify-between"
                        aria-haspopup="listbox"
                        aria-expanded={cityOpen}
                        aria-label={t("fieldCity")}
                      >
                        <span className={selectedCity ? "" : "text-white/60"}>{displayCityLabel}</span>
                        <svg className={`w-5 h-5 text-white/80 shrink-0 transition-transform ${cityOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {cityOpen && (
                        <ul className="absolute z-50 left-0 right-0 mt-1 py-1 rounded-lg border border-white/30 bg-black shadow-xl max-h-[280px] overflow-y-auto" role="listbox">
                          {CITY_OPTIONS.map((opt) => (
                            <li
                              key={opt.value || "city_placeholder"}
                              role="option"
                              aria-selected={selectedCity === opt.value}
                              onClick={() => { setSelectedCity(opt.value); setCityOpen(false); }}
                              className="px-4 py-3 text-white text-[15px] cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:outline-none"
                            >
                              {t(opt.key)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder={t("fieldEmail")}
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: "" })); }}
                      className={`${inputClass} ${errors.email ? "border-red-400 focus:ring-red-400/30" : ""}`}
                      aria-label={t("fieldEmail")}
                    />
                    {errors.email && <p className="mt-1.5 text-sm text-red-300" role="alert">{errors.email}</p>}
                  </div>
                  <div>
                    <label className={labelClassStep3}>{tContact("q1Label")}</label>
                    <select
                      value={role}
                      onChange={(e) => { setRole(e.target.value); if (errors.role) setErrors((p) => ({ ...p, role: "" })); }}
                      className={`${selectClassCta} ${errors.role ? "border-red-400 focus:ring-red-400/30" : ""}`}
                    >
                      <option value="">{tContact("selectPlaceholder")}</option>
                      {q1Options.map((opt, i) => (
                        <option key={i} value={opt} className="text-black bg-white">{opt}</option>
                      ))}
                    </select>
                    {errors.role && <p className="mt-1.5 text-sm text-red-300" role="alert">{errors.role}</p>}
                  </div>
                </div>
              )}

              {/* Step 2: Questions de qualification (comme page contact étape 2) */}
              {!submittedSuccess && step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-black mb-4">{tContact("step2Title")}</h3>
                  <div>
                    <label className={labelClassStep3}>{tContact("q2Label")}</label>
                    <select
                      value={objective}
                      onChange={(e) => { setObjective(e.target.value); if (errors.objective) setErrors((p) => ({ ...p, objective: "" })); }}
                      className={`${selectClassCta} ${errors.objective ? "border-red-400" : ""}`}
                    >
                      <option value="">{tContact("selectPlaceholder")}</option>
                      {q2Options.map((opt, i) => (
                        <option key={i} value={opt} className="text-black bg-white">{opt}</option>
                      ))}
                    </select>
                    {errors.objective && <p className="mt-1.5 text-sm text-red-300" role="alert">{errors.objective}</p>}
                  </div>
                  <div>
                    <label className={labelClassStep3}>{tContact("q3Label")}</label>
                    <select
                      value={timing}
                      onChange={(e) => { setTiming(e.target.value); if (errors.timing) setErrors((p) => ({ ...p, timing: "" })); }}
                      className={`${selectClassCta} ${errors.timing ? "border-red-400" : ""}`}
                    >
                      <option value="">{tContact("selectPlaceholder")}</option>
                      {q3Options.map((opt, i) => (
                        <option key={i} value={opt} className="text-black bg-white">{opt}</option>
                      ))}
                    </select>
                    {errors.timing && <p className="mt-1.5 text-sm text-red-300" role="alert">{errors.timing}</p>}
                  </div>
                  <div>
                    <label className={labelClassStep3}>{tContact("q4Label")}</label>
                    <select
                      value={campaigns}
                      onChange={(e) => { setCampaigns(e.target.value); if (errors.campaigns) setErrors((p) => ({ ...p, campaigns: "" })); }}
                      className={`${selectClassCta} ${errors.campaigns ? "border-red-400" : ""}`}
                    >
                      <option value="">{tContact("selectPlaceholder")}</option>
                      {q4Options.map((opt, i) => (
                        <option key={i} value={opt} className="text-black bg-white">{opt}</option>
                      ))}
                    </select>
                    {errors.campaigns && <p className="mt-1.5 text-sm text-red-300" role="alert">{errors.campaigns}</p>}
                  </div>
                  <div>
                    <label className={labelClassStep3}>{tContact("q5Label")}</label>
                    <select
                      value={sector}
                      onChange={(e) => { setSector(e.target.value); if (errors.sector) setErrors((p) => ({ ...p, sector: "" })); }}
                      className={`${selectClassCta} ${errors.sector ? "border-red-400" : ""}`}
                    >
                      <option value="">{tContact("selectPlaceholder")}</option>
                      {q5Options.map((opt, i) => (
                        <option key={i} value={opt} className="text-black bg-white">{opt}</option>
                      ))}
                    </select>
                    {errors.sector && <p className="mt-1.5 text-sm text-red-300" role="alert">{errors.sector}</p>}
                  </div>
                  <div>
                    <label className={labelClassStep3}>{tContact("q6Label")}</label>
                    <input
                      type="text"
                      value={establishment}
                      onChange={(e) => setEstablishment(e.target.value)}
                      placeholder={tContact("q6Placeholder")}
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {!submittedSuccess && step === 2 && submitError && (
                <div className="rounded-lg bg-red-500/20 border border-red-400/50 px-4 py-3 text-sm text-red-200 mb-4" role="alert">
                  {submitError}
                </div>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                {!submittedSuccess && step === 2 && (
                  <button
                    type="button"
                    onClick={() => { setStep(1); setErrors({}); setSubmitError(""); }}
                    disabled={sending}
                    className="px-6 py-3 rounded-lg font-semibold text-white border-2 border-white/50 bg-transparent hover:bg-white/10 text-[15px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {tContact("back")}
                  </button>
                )}
                {!submittedSuccess && (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={sending}
                  className="px-8 py-4 rounded-lg font-semibold text-black bg-white hover:bg-gray-100 text-[15px] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {step === 1 ? tContact("continue") : sending ? tContact("sending") : t("button")}
                </button>
              )}
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-4 sm:mt-6">
              <a
                href="https://wa.me/212720007007"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 bg-white text-black border-2 border-black"
                aria-label="WhatsApp"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 bg-black text-white border-2 border-black"
                aria-label="Remonter"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
