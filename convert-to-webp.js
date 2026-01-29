// import fs from "fs";
// import path from "path";
// import sharp from "sharp";

// const folder =
//   "C:\\Users\\B2HD High End Rigs\\OneDrive\\Desktop\\ImgSuffel\\img\\imageGallery\\src\\assets\\images";

// fs.readdir(folder, (err, files) => {
//   if (err) throw err;

//   files
//     .filter((f) => f.endsWith(".png"))
//     .forEach((file) => {
//       const inputPath = path.join(folder, file);
//       const outputPath = path.join(folder, file.replace(".png", ".webp"));

//       sharp(inputPath)
//         .webp({ quality: 80 }) // 80% quality, smaller size, good look
//         .toFile(outputPath)
//         .then(() =>
//           console.log(`Converted: ${file} → ${file.replace(".png", ".webp")}`),
//         )
//         .catch(console.error);
//     });
// });

import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const ASSETS_DIR = path.resolve("src", "assets");

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".bmp", ".tiff"];

async function walkAndConvert(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await walkAndConvert(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();

    // Skip already-webp
    if (ext === ".webp") continue;

    // Skip non-image files
    if (!IMAGE_EXTENSIONS.includes(ext)) continue;

    const outputPath = fullPath.replace(ext, ".webp");

    try {
      await sharp(fullPath).webp({ quality: 80 }).toFile(outputPath);

      await fs.unlink(fullPath);

      console.log(`✅ ${entry.name} → ${path.basename(outputPath)}`);
    } catch (err) {
      console.error(`❌ Failed: ${fullPath}`, err);
    }
  }
}

walkAndConvert(ASSETS_DIR)
  .then(() => console.log("\n🎉 All assets converted to WEBP"))
  .catch(console.error);
