"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
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

const BUDGET_OPTIONS = [
  { value: "", key: "fieldBudget" },
  { value: "under_5k", key: "budget_under_5k" },
  { value: "5k_15k", key: "budget_5k_15k" },
  { value: "15k_30k", key: "budget_15k_30k" },
  { value: "30k_50k", key: "budget_30k_50k" },
  { value: "50k_plus", key: "budget_50k_plus" },
] as const;

const inputClass =
  "w-full rounded-lg px-4 py-3 text-white placeholder-white/50 text-[15px] border border-white/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30";

export default function CTASection() {
  const t = useTranslations("cta");
  const locale = useLocale();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [employeesOpen, setEmployeesOpen] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState("");
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const budgetRef = useRef<HTMLDivElement>(null);

  const description = t("description");
  const parts = description.split(/\*\*(.*?)\*\*/g);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setEmployeesOpen(false);
      }
      if (budgetRef.current && !budgetRef.current.contains(target)) {
        setBudgetOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = EMPLOYEE_OPTIONS.find((o) => o.value === selectedEmployees);
  const displayLabel = selectedOption ? t(selectedOption.key) : t("fieldEmployees");
  const selectedBudgetOption = BUDGET_OPTIONS.find((o) => o.value === selectedBudget);
  const displayBudgetLabel = selectedBudgetOption ? t(selectedBudgetOption.key) : t("fieldBudget");

  return (
    <section id="contact" className="relative py-16 sm:py-24 bg-white overflow-visible">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Colonne gauche */}
          <div className="lg:pt-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">
              {t("title")}
            </h2>
            <p className="text-base sm:text-lg text-black/90 leading-relaxed">
              {parts.map((part, i) =>
                i % 2 === 1 ? <strong key={i}>{part}</strong> : part
              )}
            </p>
          </div>

          {/* Carte formulaire */}
          <div className="relative">
            <div className="rounded-2xl p-6 sm:p-8 shadow-xl bg-black border border-white/20 overflow-visible">
              {/* Indicateur d'étapes */}
              <div className="flex items-center gap-2 mb-8">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                      step >= 1 ? "text-black bg-white" : "bg-white/20 text-white/70"
                    }`}
                  >
                    1
                  </span>
                  <span className={`text-sm font-semibold ${step >= 1 ? "text-white" : "text-white/60"}`}>
                    {t("step1")}
                  </span>
                </div>
                <span className="flex-1 h-px bg-white/20 min-w-[12px]" />
                <div className="flex items-center gap-2">
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                      step >= 2 ? "text-black bg-white" : "bg-white/20 text-white/70"
                    }`}
                  >
                    2
                  </span>
                  <span className={`text-sm font-medium ${step >= 2 ? "text-white" : "text-white/60"}`}>
                    {t("step2")}
                  </span>
                </div>
                <span className="flex-1 h-px bg-white/20 min-w-[12px]" />
                <div className="flex items-center gap-2">
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                      step >= 3 ? "text-black bg-white" : "bg-white/20 text-white/70"
                    }`}
                  >
                    3
                  </span>
                  <span className={`text-sm font-medium ${step >= 3 ? "text-white" : "text-white/60"}`}>
                    {t("step3")}
                  </span>
                </div>
              </div>

              {/* Step 1: Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder={t("fieldName")}
                    className={inputClass}
                    aria-label={t("fieldName")}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="company"
                      placeholder={t("fieldCompany")}
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
                        <span className={selectedEmployees ? "" : "text-white/60"}>
                          {displayLabel}
                        </span>
                        <svg
                          className={`w-5 h-5 text-white/80 shrink-0 transition-transform ${employeesOpen ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {employeesOpen && (
                        <ul
                          className="absolute z-50 left-0 right-0 mt-1 py-1 rounded-lg border border-white/30 bg-black shadow-xl max-h-[280px] overflow-y-auto"
                          role="listbox"
                        >
                          {EMPLOYEE_OPTIONS.map((opt) => (
                            <li
                              key={opt.value || "placeholder"}
                              role="option"
                              aria-selected={selectedEmployees === opt.value}
                              onClick={() => {
                                setSelectedEmployees(opt.value);
                                setEmployeesOpen(false);
                              }}
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
                    <input
                      type="email"
                      name="email"
                      placeholder={t("fieldEmail")}
                      className={inputClass}
                      aria-label={t("fieldEmail")}
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder={t("fieldPhone")}
                      className={inputClass}
                      aria-label={t("fieldPhone")}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Budget (liste déroulante) */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="relative" ref={budgetRef}>
                    <button
                      type="button"
                      onClick={() => setBudgetOpen(!budgetOpen)}
                      className="w-full rounded-lg px-4 py-3 text-left text-white text-[15px] border border-white/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer min-h-[48px] flex items-center justify-between"
                      aria-haspopup="listbox"
                      aria-expanded={budgetOpen}
                      aria-label={t("fieldBudget")}
                    >
                      <span className={selectedBudget ? "" : "text-white/60"}>
                        {displayBudgetLabel}
                      </span>
                      <svg
                        className={`w-5 h-5 text-white/80 shrink-0 transition-transform ${budgetOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {budgetOpen && (
                      <ul
                        className="absolute z-50 left-0 right-0 mt-1 py-1 rounded-lg border border-white/30 bg-black shadow-xl max-h-[280px] overflow-y-auto"
                        role="listbox"
                      >
                        {BUDGET_OPTIONS.map((opt) => (
                          <li
                            key={opt.value || "placeholder"}
                            role="option"
                            aria-selected={selectedBudget === opt.value}
                            onClick={() => {
                              setSelectedBudget(opt.value);
                              setBudgetOpen(false);
                            }}
                            className="px-4 py-3 text-white text-[15px] cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:outline-none"
                          >
                            {t(opt.key)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Sujet + Message */}
              {step === 3 && (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="subject"
                    placeholder={t("fieldSubjectPlaceholder")}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={inputClass}
                    aria-label={t("fieldSubject")}
                  />
                  <textarea
                    name="message"
                    placeholder={t("fieldMessagePlaceholder")}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className={`${inputClass} resize-y min-h-[120px]`}
                    aria-label={t("fieldMessage")}
                  />
                </div>
              )}

              {/* Boutons Retour + Suivant */}
              <div className="mt-6 flex flex-wrap gap-3">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                    className="px-6 py-3 rounded-lg font-semibold text-white border-2 border-white/40 bg-transparent hover:bg-white/10 text-[15px] transition-colors"
                  >
                    {t("back")}
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
                    className="px-8 py-4 rounded-lg font-semibold text-black bg-white hover:bg-gray-100 text-[15px] transition-colors"
                  >
                    {t("next")}
                  </button>
                ) : (
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex justify-center items-center px-8 py-4 rounded-lg font-semibold text-black bg-white hover:bg-gray-100 text-[15px] transition-colors no-underline"
                  >
                    {t("next")}
                  </Link>
                )}
              </div>
            </div>

            {/* Boutons flottants */}
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
