import React from "react";
import { afterEach, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { LazyImage } from "../../src/components/LazyImage";

afterEach(cleanup);

it("disables responsive candidates when the image fails so the fallback can load", () => {
  render(<LazyImage src="/missing.webp" srcSet="/missing-640.webp 640w" alt="Product" fallbackSrc="/fallback.svg" />);
  const img = screen.getByAltText("Product");
  fireEvent.error(img);
  expect(img.getAttribute("src")).toBe("/fallback.svg");
  expect(img.hasAttribute("srcset")).toBe(false);
});

it("shows a new image after the previous source failed", () => {
  const { rerender } = render(<LazyImage src="/missing.webp" alt="Product" />);
  fireEvent.error(screen.getByAltText("Product"));
  rerender(<LazyImage src="/next.webp" alt="Product" />);
  fireEvent.load(screen.getByAltText("Product"));
  expect(screen.getByAltText("Product").getAttribute("src")).toBe("/next.webp");
  expect(screen.getByAltText("Product").className).toContain("opacity-100");
});
