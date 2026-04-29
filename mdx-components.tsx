import type { MDXComponents } from "mdx/types";

// Required by @next/mdx in the App Router. Pages can override these per-route.
// Keep this minimal — page-level shells decide the visual frame.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
