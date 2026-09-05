import { createHash } from "node:crypto";
import console from "node:console";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = resolve(root, "public/generated-images");
const widths = [320, 640, 960, 1280];
const quality = 78;
const sources = [];

for (const directory of ["gadgets", "furnitures", "decorations", "Stores"]) {
  for (const name of (await readdir(resolve(root, "public", directory))).sort()) {
    if (/\.(webp|png|jpe?g)$/i.test(name)) {
      sources.push({ key: `${directory}/${name}`, path: `public/${directory}/${name}` });
    }
  }
}
for (const name of ["phone-stand", "ornament", "ratten-bag", "cork-art"]) {
  sources.push({ key: `hero/${name}.png`, path: `src/assets/${name}.png` });
}

// This directory contains only reproducible build output, never source images.
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await mkdir(resolve(root, "src/generated"), { recursive: true });
const manifest = {};
let originalBytes = 0;
let defaultBytes = 0;

for (const source of sources) {
  const input = await readFile(resolve(root, source.path));
  const metadata = await sharp(input).rotate().metadata();
  const width = metadata.autoOrient?.width ?? metadata.width;
  const height = metadata.autoOrient?.height ?? metadata.height;
  const hash = createHash("sha256").update(input).update(JSON.stringify({ widths, quality, version: 1 })).digest("hex").slice(0, 12);
  const stem = basename(source.key).replace(/\.[^.]+$/, "").replace(/[^a-z0-9-]/gi, "-");
  const candidates = [...new Set(widths.map((size) => Math.min(size, width)))];
  const variants = await Promise.all(candidates.map(async (size) => {
    const path = `generated-images/${stem}-${hash}-${size}.webp`;
    const info = await sharp(input).rotate().resize({ width: size, withoutEnlargement: true })
      .webp({ quality }).toFile(resolve(root, "public", path));
    return { src: path, width: info.width, bytes: info.size };
  }));
  const placeholder = await sharp(input).rotate().resize({ width: 24, withoutEnlargement: true })
    .webp({ quality: 35 }).toBuffer();
  const defaultVariant = variants.find((variant) => variant.width >= 640) ?? variants.at(-1);
  manifest[source.key] = {
    width, height, src: defaultVariant.src, variants,
    placeholder: `data:image/webp;base64,${placeholder.toString("base64")}`,
  };
  originalBytes += input.length;
  defaultBytes += defaultVariant.bytes;
}

await writeFile(resolve(root, "src/generated/images.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`Generated ${sources.length} responsive images: originals ${(originalBytes / 1024 / 1024).toFixed(2)} MiB; 640px variants ${(defaultBytes / 1024 / 1024).toFixed(2)} MiB.`);
