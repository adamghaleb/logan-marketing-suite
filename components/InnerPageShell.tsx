import Link from "next/link";
import type { ReactNode } from "react";
import type { ContentEntry } from "@/lib/content";

interface BreadcrumbCrumb {
  readonly label: string;
  readonly href?: string;
}

interface SidebarItem {
  readonly label: string;
  readonly href: string;
  readonly active?: boolean;
}

interface InnerPageShellProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro?: string;
  readonly breadcrumbs: ReadonlyArray<BreadcrumbCrumb>;
  readonly sidebar?: ReadonlyArray<SidebarItem>;
  readonly children: ReactNode;
}

export function InnerPageShell({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  sidebar,
  children,
}: InnerPageShellProps) {
  const parentCrumb = breadcrumbs
    .slice(0, -1)
    .reverse()
    .find((crumb) => crumb.href);
  const backHref = parentCrumb?.href ?? "/";
  const backLabel = parentCrumb?.label
    ? `back to ${parentCrumb.label}`
    : "back to the toolkit";

  return (
    <main className="page">
      <div className="page-inner" data-screen-label={`Logan suite — ${title}`}>
        <Link href={backHref} className="back-link">
          <span
            style={{
              fontFamily: "var(--hand)",
              fontSize: 22,
              color: "var(--lavigo-400)",
              lineHeight: 1,
            }}
          >
            ←
          </span>
          <span>{backLabel}</span>
        </Link>

        <nav
          aria-label="Breadcrumb"
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "var(--ink-3)",
            marginBottom: 22,
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <span
                key={`${crumb.label}-${index}`}
                style={{ display: "inline-flex", gap: 8 }}
              >
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    style={{ color: "var(--lavigo-400)" }}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span style={{ color: "var(--ink-2)" }}>{crumb.label}</span>
                )}
                {!isLast && <span aria-hidden>/</span>}
              </span>
            );
          })}
        </nav>

        <div className="inner-eyebrow">{eyebrow}</div>
        <h1 className="inner-h1">{title}</h1>
        {intro && <p className="inner-intro">{intro}</p>}

        {sidebar && sidebar.length > 0 ? (
          <div className="inner-grid">
            <aside className="inner-grid-aside" aria-label="Section navigation">
              <ul className="inner-grid-aside-list">
                {sidebar.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inner-grid-aside-item"
                      data-active={item.active ? "true" : "false"}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
            <article className="mdx-body">{children}</article>
          </div>
        ) : (
          <article className="mdx-body">{children}</article>
        )}
      </div>
    </main>
  );
}
