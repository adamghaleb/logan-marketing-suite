import { FROM_NAME, SITE_TAGLINE } from "@/lib/constants";

export function UrlBar() {
  return (
    <div className="urlbar">
      <span className="urlbar-dot" />
      <span>
        {SITE_TAGLINE}, <b>by {FROM_NAME}</b>
      </span>
    </div>
  );
}
