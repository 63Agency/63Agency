"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d26590.729979015396!2d-7.6489544!3d33.5834709!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd84d09ffbb5%3A0x69653c6f96ae98ad!2sCommons%20Zerktouni!5e0!3m2!1sfr!2sma!4v1771980097793!5m2!1sfr!2sma";

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Top: CONTACTEZ-NOUS + hero headline */}
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
            <span className="block">{t("heroHeadline2")}<span className="inline-block w-2 h-2 rounded-full bg-black align-middle ml-1" /></span>
            <span className="block">{t("heroHeadline3")}</span>
          </h1>
          <div className="absolute top-0 right-0 text-black">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 opacity-70" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 flex justify-end">
        <div className="max-w-xl w-full">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black mb-1.5">
                  {t("fullNameLabel")} *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder={t("namePlaceholder")}
                  className="w-full rounded-lg bg-gray-100 border border-gray-300 px-4 py-3 text-black placeholder-gray-500 focus:bg-white focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-1.5">
                  {t("emailAddressLabel")} *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  className="w-full rounded-lg bg-gray-100 border border-gray-300 px-4 py-3 text-black placeholder-gray-500 focus:bg-white focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-black mb-1.5">
                  {t("titleLabel")}
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder={t("titlePlaceholder")}
                  className="w-full rounded-lg bg-gray-100 border border-gray-300 px-4 py-3 text-black placeholder-gray-500 focus:bg-white focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-black mb-1.5">
                  {t("howCanWeHelpLabel")} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder={t("messagePlaceholder")}
                  className="w-full rounded-lg bg-gray-100 border border-gray-300 px-4 py-3 text-black placeholder-gray-500 focus:bg-white focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-none transition-all resize-none"
                />
              </div>
              {status === "success" && (
                <p className="text-sm text-black font-medium">{t("success")}</p>
              )}
              {status === "error" && (
                <p className="text-sm text-black font-medium">{t("error")}</p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="coolBeans w-full sm:w-auto min-w-[200px] px-8 py-4 bg-black text-white font-semibold border-2 border-white disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none"
              >
                {status === "sending" ? t("sending") : t("sendMessage")}
              </button>
            </form>
        </div>
      </div>

      {/* Map (location card) - below form */}
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
