// utils/groupImages.ts
import { imageModules } from "./imageLoader";

export type CategoryMap = Record<string, string[]>;

let categoryMap: CategoryMap | null = null;

// Build a map of category -> array of URLs
export async function buildCategoryMap(): Promise<CategoryMap> {
  if (categoryMap) return categoryMap; // cached

  const map: CategoryMap = {};
  const entries = Object.entries(imageModules);

  await Promise.all(
    entries.map(async ([path, loader]) => {
      const category = path.split("/").slice(-2, -1)[0];
      const url = await loader();
      if (!map[category]) map[category] = [];
      map[category].push(url);
    }),
  );

  categoryMap = map;
  return map;
}

export async function loadImagesByCategories(
  selectedCategories: string[],
): Promise<string[]> {
  const map = await buildCategoryMap();
  const results: string[] = [];

  selectedCategories.forEach((cat) => {
    if (map[cat]) results.push(...map[cat]);
  });

  return results;
}

export function getAllCategories(): string[] {
  return Object.keys(imageModules)
    .map((path) => path.split("/").slice(-2, -1)[0])
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();
}
