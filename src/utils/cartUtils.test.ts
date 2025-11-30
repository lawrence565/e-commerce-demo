import { describe, it, expect } from "vitest";
import { calculateDiscount, calculateTotal } from "./cartUtils";

describe("Cart Calculations", () => {
    describe("calculateDiscount", () => {
        it("should return 0 if subtotal is less than or equal to 5000", () => {
            expect(calculateDiscount(4000)).toBe(0);
            expect(calculateDiscount(5000)).toBe(0);
        });

        it("should return 500 if subtotal is greater than 5000", () => {
            expect(calculateDiscount(5001)).toBe(500);
            expect(calculateDiscount(10000)).toBe(500);
        });
    });

    describe("calculateTotal", () => {
        it("should calculate total correctly", () => {
            expect(calculateTotal(1000, 0, 0)).toBe(1000);
            expect(calculateTotal(6000, 500, 100)).toBe(5400);
        });

        it("should not return negative total", () => {
            expect(calculateTotal(100, 0, 200)).toBe(0);
        });
    });
});
