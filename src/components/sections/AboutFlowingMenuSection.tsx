"use client";

import { useTranslations, useLocale } from "next-intl";
import FlowingMenu from "@/components/FlowingMenu";

const SERVICES = [
  { key: "item1Name" as const, icon: "/icons/iconSeo.png" },
  { key: "item2Name" as const, icon: "/icons/IconCommunotyManagement.png" },
  { key: "item3Name" as const, icon: "/icons/IconContentCreation.png" },
  { key: "item4Name" as const, icon: "/icons/IconGraphiqueDesigne.png" },
];

export default function AboutFlowingMenuSection() {
  const t = useTranslations("aboutServices");
  const locale = useLocale();

  const items = SERVICES.map(({ key, icon }) => ({
    link: `/${locale}#services`,
    text: t(key),
    image: icon,
  }));

  return (
    <section className="min-h-[80vh] flex flex-col">
      <FlowingMenu
        items={items}
        speed={20}
        textColor="#fff"
        bgColor="#000"
        marqueeBgColor="#fff"
        marqueeTextColor="#000"
        borderColor="rgba(255,255,255,0.2)"
      />
    </section>
  );
}
