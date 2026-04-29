import { SITE_DOMAIN, SITE_TAGLINE } from "@/lib/constants";

interface FooterProps {
  readonly name: string;
  readonly fromName: string;
  readonly version?: string;
}

export function Footer({ name, fromName, version = "v0.1" }: FooterProps) {
  return (
    <footer className="footer-note">
      <div className="line1">
        you are going to be so good
        <br />
        at this job.
      </div>
      <div className="line2">
        — for {name}, by {fromName}. always.
      </div>
      <div className="footer-meta">
        {SITE_DOMAIN} · {SITE_TAGLINE} · {version}
      </div>
    </footer>
  );
}
