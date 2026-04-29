import type { CSSProperties } from "react";
import { FROM_NAME, SITE_DOMAIN, SITE_TAGLINE } from "@/lib/constants";

const trailingStyle: CSSProperties = {
  color: "var(--ink-4)",
  marginLeft: 8,
};

export function UrlBar() {
  const [host, tld] = SITE_DOMAIN.split(/\.(?=[^.]+$)/);
  return (
    <div className="urlbar">
      <span>
        <span className="urlbar-dot" />
        {host}
        <b>.{tld}</b>
      </span>
      <span style={trailingStyle}>
        · {SITE_TAGLINE}, by {FROM_NAME}
      </span>
    </div>
  );
}
