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
  return (
    <main className="page">
      <div className="page-inner" data-screen-label={`Logan suite — ${title}`}>
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 220px) minmax(0, 1fr)",
              gap: 32,
              alignItems: "start",
            }}
            className="inner-grid"
          >
            <aside
              aria-label="Section navigation"
              style={{
                position: "sticky",
                top: 24,
                background: "var(--paper-2)",
                border: "1px solid var(--line)",
                borderRadius: 14,
                padding: 16,
                fontFamily: "var(--sans)",
                fontSize: 13.5,
                lineHeight: 1.5,
              }}
            >
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {sidebar.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      style={{
                        display: "block",
                        padding: "6px 8px",
                        borderRadius: 8,
                        color: item.active
                          ? "var(--lavigo-600)"
                          : "var(--ink-2)",
                        background: item.active
                          ? "var(--lavigo-50)"
                          : "transparent",
                        textDecoration: "none",
                      }}
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
