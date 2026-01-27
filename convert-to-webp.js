import fs from "fs";
import path from "path";
import sharp from "sharp";

const folder =
  "C:\\Users\\B2HD High End Rigs\\OneDrive\\Desktop\\ImgSuffel\\img\\imageGallery\\src\\assets\\images";

fs.readdir(folder, (err, files) => {
  if (err) throw err;

  files
    .filter((f) => f.endsWith(".png"))
    .forEach((file) => {
      const inputPath = path.join(folder, file);
      const outputPath = path.join(folder, file.replace(".png", ".webp"));

      sharp(inputPath)
        .webp({ quality: 80 }) // 80% quality, smaller size, good look
        .toFile(outputPath)
        .then(() =>
          console.log(`Converted: ${file} → ${file.replace(".png", ".webp")}`),
        )
        .catch(console.error);
    });
});
