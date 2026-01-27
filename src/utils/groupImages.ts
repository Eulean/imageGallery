import { imageModules } from "./imageLoader";

export type CategoryMap = Record<string, string[]>;

export async function loadImagesByCategories(
  selectedCategories: string[],
): Promise<string[]> {
  const entries = Object.entries(imageModules);

  const results: string[] = [];

  for (const [path, loader] of entries) {
    const category = path.split("/").slice(-2, -1)[0];

    if (selectedCategories.includes(category)) {
      const url = await loader();
      results.push(url);
    }
  }

  return results;
}

export function getAllCategories(): string[] {
  const categories = new Set<string>();

  Object.keys(imageModules).forEach((path) => {
    const category = path.split("/").slice(-2, -1)[0];

    categories.add(category);
  });

  return Array.from(categories).sort();
}
