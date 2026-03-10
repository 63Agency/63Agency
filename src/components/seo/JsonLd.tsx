/**
 * Reusable JSON-LD structured data component.
 * Renders a script tag with type="application/ld+json" for SEO.
 */
import React from "react";

export type JsonLdProps = {
  data: object | object[];
};

export default function JsonLd({ data }: JsonLdProps) {
  const json =
    Array.isArray(data) && data.length === 0
      ? null
      : Array.isArray(data)
        ? data
        : data;

  if (json === null || (Array.isArray(json) && json.length === 0)) {
    return null;
  }

  const serialized = JSON.stringify(json);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}
