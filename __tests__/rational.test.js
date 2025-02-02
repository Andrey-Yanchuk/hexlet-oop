// __tests__/rational.test.js
import { make } from "../src/index.js";
/*-----------------------------------------------------*/
describe("Testing the function make", () => {
  let ratCorr1, ratCorr2;
  let ratNegative1, ratNegative2;
  beforeEach(() => {
    ratCorr1 = make(3, 9);
    ratCorr2 = make(10, 3);
    ratNegative1 = make(-3, -9);
    ratNegative2 = make(-10, -3);
  });
  test("with empty values", () => {
    const emptyNumer = () => make();
    const emptyDenom = () => make(3);
    expect(() => emptyNumer().getNumer()).toThrow(
      "The numerator must be of data type number!",
    );
    expect(() => emptyDenom().getNumer()).toThrow(
      "The denominator must be of data type number!",
    );
  });
  describe("Testing the function getNumer", () => {
    test("with correctly values", () => {
      expect(ratCorr1.getNumer()).toBe(1);
    });
    test("with negative values", () => {
      expect(ratNegative1.getNumer()).toBe(-1);
    });
    test("with zero values", () => {
      const rat = make(0, 9);
      expect(rat.getNumer()).toBe(0);
    });
    test("with invalid values", () => {
      const invalidVal = () => make("3", "9");
      expect(() => invalidVal().getNumer()).toThrow(
        "The numerator must be of data type number!",
      );
    });
  });
  describe("Testing the function getDenom", () => {
    test("with correctly values", () => {
      expect(ratCorr1.getDenom()).toBe(3);
    });
    test("with negative values", () => {
      expect(ratNegative1.getDenom()).toBe(-3);
    });
    test("with zero values", () => {
      const zeroVal = () => make(0, 0);
      expect(() => zeroVal().getNumer()).toThrow("Denominator cannot be zero!");
    });
    test("with invalid values", () => {
      const invalidVal = () => make(3, "9");
      expect(() => invalidVal().getNumer()).toThrow(
        "The denominator must be of data type number!",
      );
    });
  });
  describe("Testing the function toString", () => {
    test("with correctly values", () => {
      expect(ratCorr2.toString()).toBe("10/3");
    });
    test("with negative values", () => {
      expect(ratNegative2.toString()).toBe("-10/-3");
    });
  });
  describe("Testing the function add", () => {
    test("with correctly values", () => {
      expect(ratCorr1.add(ratCorr2).toString()).toBe("11/3");
    });
    test("with negative values", () => {
      expect(ratNegative1.add(ratNegative2).toString()).toBe("11/3");
    });
    test("with one negative and one positive", () => {
      expect(ratNegative1.add(ratCorr2).toString()).toBe("-11/-3");
    });
  });
});
