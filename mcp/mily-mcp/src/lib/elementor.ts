interface ElementorElement {
  id?: string;
  elType?: string;
  widgetType?: string;
  settings?: Record<string, unknown>;
  elements?: ElementorElement[];
}

export interface ElementorNodeSummary {
  id: string;
  elType: string;
  widgetType: string | null;
  childCount: number;
  children: ElementorNodeSummary[];
}

export interface ElementorTreeSummary {
  hasData: boolean;
  rootCount: number;
  widgetCounts: Record<string, number>;
  tree: ElementorNodeSummary[];
}

function summarizeNode(
  node: ElementorElement,
  widgetCounts: Record<string, number>,
): ElementorNodeSummary {
  const elType = node.elType ?? "unknown";
  const widgetType = node.widgetType ?? null;
  if (widgetType) {
    widgetCounts[widgetType] = (widgetCounts[widgetType] ?? 0) + 1;
  }
  const children = (node.elements ?? []).map((child) =>
    summarizeNode(child, widgetCounts),
  );
  return {
    id: node.id ?? "",
    elType,
    widgetType,
    childCount: children.length,
    children,
  };
}

export function parseElementorData(raw: unknown): ElementorTreeSummary {
  if (raw === null || raw === undefined || raw === "") {
    return { hasData: false, rootCount: 0, widgetCounts: {}, tree: [] };
  }
  let parsed: unknown = raw;
  if (typeof raw === "string") {
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Elementor data is not valid JSON: ${message}`);
    }
  }
  if (!Array.isArray(parsed)) {
    throw new Error("Elementor data must be an array of root elements.");
  }
  const widgetCounts: Record<string, number> = {};
  const tree = (parsed as ElementorElement[]).map((node) =>
    summarizeNode(node, widgetCounts),
  );
  return {
    hasData: true,
    rootCount: tree.length,
    widgetCounts,
    tree,
  };
}
