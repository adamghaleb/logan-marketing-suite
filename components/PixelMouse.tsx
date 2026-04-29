import type { PixelGrid } from "@/lib/mily-data";

export interface PixelMouseProps {
  readonly pixels: PixelGrid;
  readonly pixelSize?: number;
  readonly title?: string;
}

const DEFAULT_PIXEL_SIZE = 4;

export function PixelMouse({
  pixels,
  pixelSize = DEFAULT_PIXEL_SIZE,
  title,
}: PixelMouseProps) {
  const cols = pixels.reduce((max, row) => Math.max(max, row.length), 0);
  const rows = pixels.length;
  const width = cols * pixelSize;
  const height = rows * pixelSize;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      shapeRendering="crispEdges"
      role="img"
      aria-label={title ?? "pixel mouse"}
    >
      {title ? <title>{title}</title> : null}
      {pixels.flatMap((row, y) =>
        row.map((color, x) =>
          color ? (
            <rect
              key={`${x}-${y}`}
              x={x * pixelSize}
              y={y * pixelSize}
              width={pixelSize}
              height={pixelSize}
              fill={color}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
