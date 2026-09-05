import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
import { afterEach, expect, it, vi } from "vitest";
import products from "../../src/assets/products.json";
import stores from "../../src/assets/stores.json";
import manifest from "../../src/generated/images.json";
import { getAssetUrl, getResponsiveImage } from "../../src/utils/imageUtils";

afterEach(() => vi.unstubAllEnvs());

it("resolves every catalog and store image under the GitHub Pages base path", () => {
  vi.stubEnv("BASE_URL", "/e-commerce-demo/");
  const paths = [
    ...products.map((product) => `${product.category}s/${product.name}.webp`),
    ...stores.map((store) => store.img),
    "hero/phone-stand.png",
  ];
  for (const path of paths) {
    const image = getResponsiveImage(path);
    expect(image, path).toBeDefined();
    expect(image?.src).toMatch(/^\/e-commerce-demo\/generated-images\//);
    expect(image?.srcSet).toMatch(/\.webp 320w/);
    expect(getResponsiveImage(getAssetUrl(path))?.src).toBe(image?.src);
  }
  expect(getResponsiveImage("https://example.com/product.webp")).toBeUndefined();
  expect(getAssetUrl("https://example.com/product.webp")).toBe("https://example.com/product.webp");
});

it("generates decodable variants with accurate srcSet widths and small inline placeholders", async () => {
  for (const image of Object.values(manifest)) {
    const placeholder = Buffer.from(image.placeholder.split(",")[1], "base64");
    expect(placeholder.length).toBeLessThan(2048);
    expect((await sharp(placeholder).metadata()).width).toBeLessThanOrEqual(40);
    for (const variant of image.variants) {
      const file = await readFile(resolve("public", variant.src));
      const metadata = await sharp(file).metadata();
      expect(metadata.format).toBe("webp");
      expect(metadata.width).toBe(variant.width);
      expect(metadata.width).toBeLessThanOrEqual(image.width);
      expect(file.length).toBe(variant.bytes);
    }
  }
});
