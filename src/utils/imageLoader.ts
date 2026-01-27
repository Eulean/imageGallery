export const imageModules = import.meta.glob("/src/assets/*/*.webp", {
  query: "?url",
  import: "default",
}) as Record<string, () => Promise<string>>;
