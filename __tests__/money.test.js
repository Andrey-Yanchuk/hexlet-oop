// __tests__/money.test.js
import { Money } from "../src/index.js";
/*-----------------------------------------------------*/
describe("Testing the constructor-function Money", () => {
  let money1;
  beforeEach(() => {
    money1 = new Money(100);
  });
  test("with correctly values", () => {
    expect(money1).toEqual({ value: 100, currency: "usd" });
    expect(new Money(150, "eur")).toEqual({ value: 150, currency: "eur" });
  });
  test("with negative values", () => {
    expect(() => new Money(-10)).toThrow("'value' cannot be less than 0!");
  });
  test("with invalid values", () => {
    expect(() => new Money(NaN)).toThrow("'value' must be a finite number!");
    expect(() => new Money("")).toThrow("'value' must be a finite number!");
    expect(() => new Money(100, "United States dollar")).toThrow(
      "Unsupported currency: 'United States dollar'",
    );
    expect(() => new Money(100, 210)).toThrow("Unsupported currency: '210'");
  });
  test("with value equal 0", () => {
    expect(new Money(0)).toEqual({ value: 0, currency: "usd" });
  });
  test("with empty values", () => {
    expect(() => new Money()).toThrow("'value' must be a finite number!");
  });
  describe("Testing the method getValue", () => {
    test("with correctly values", () => {
      expect(money1.getValue()).toBe(100);
    });
    test("with negative values", () => {
      expect(() => new Money(-100).getValue()).toThrow(
        "'value' cannot be less than 0!",
      );
    });
    test("with invalid values", () => {
      expect(() => new Money("").getValue()).toThrow(
        "'value' must be a finite number!",
      );
      expect(() => new Money(NaN).getValue()).toThrow(
        "'value' must be a finite number!",
      );
    });
    test("with empty values", () => {
      expect(() => new Money().getValue()).toThrow(
        "'value' must be a finite number!",
      );
    });
    test("with value equal 0", () => {
      expect(new Money(0).getValue()).toBe(0);
    });
  });
  describe("Testing the method getCurrency", () => {
    test("with correctly values", () => {
      expect(money1.getCurrency()).toBe("usd");
      expect(new Money(120, "eur").getCurrency()).toBe("eur");
    });
    test("with invalid values", () => {
      expect(() =>
        new Money(100, "United States dollar").getCurrency(),
      ).toThrow("Unsupported currency: 'United States dollar'");
      expect(() => new Money(100, 210).getCurrency()).toThrow(
        "Unsupported currency: '210'",
      );
    });
  });
  describe("Testing the metod exchangeTo", () => {
    test("with correctly values", () => {
      expect(money1.exchangeTo("eur")).toEqual({ value: 70, currency: "eur" });
      expect(money1.exchangeTo("rub")).toEqual({
        value: 9000,
        currency: "rub",
      });
      expect(money1.exchangeTo("usd")).toEqual({ value: 100, currency: "usd" });
      expect(new Money(120, "eur").exchangeTo("usd")).toEqual({
        value: 144,
        currency: "usd",
      });
      expect(new Money(120, "eur").exchangeTo("rub")).toEqual({
        value: 12000,
        currency: "rub",
      });
      expect(new Money(120, "eur").exchangeTo("eur")).toEqual({
        value: 120,
        currency: "eur",
      });
      expect(new Money(900, "rub").exchangeTo("usd")).toEqual({
        value: 10,
        currency: "usd",
      });
      expect(new Money(900, "rub").exchangeTo("eur")).toEqual({
        value: 9,
        currency: "eur",
      });
      expect(new Money(900, "rub").exchangeTo("rub")).toEqual({
        value: 900,
        currency: "rub",
      });
    });
    test("with negative values", () => {
      expect(() => new Money(-120, "eur").exchangeTo("usd")).toThrow(
        "'value' cannot be less than 0!",
      );
    });
    test("with a non-existent rate", () => {
      expect(() => money1.exchangeTo("byr")).toThrow(
        "No exchange rate usd -> byr",
      );
    });
    test("with empty values", () => {
      expect(() => money1.exchangeTo()).toThrow("No exchange rate usd -> ");
    });
    test("with value equal 0", () => {
      expect(new Money(0, "rub").exchangeTo("usd")).toEqual({
        value: 0,
        currency: "usd",
      });
    });
    test("with invalid values", () => {
      expect(() => new Money(NaN).exchangeTo("usd")).toThrow(
        "'value' must be a finite number!",
      );
    });
  });
  describe("Testing the metod add", () => {
    test("adding with one currency type", () => {
      expect(money1.add(money1)).toEqual({ value: 200, currency: "usd" });
      expect(money1.add(money1)).toBeInstanceOf(Money);
    });
    test("addition with different currency types", () => {
      expect(money1.add(new Money(120, "eur"))).toEqual({
        value: 244,
        currency: "usd",
      });
      expect(money1.add(new Money(120, "eur"))).toBeInstanceOf(Money);
    });
    test("addition with non-existent currency type", () => {
      expect(() => money1.add(new Money(300, "byr"))).toThrow(
        "Unsupported currency: 'byr'",
      );
    });
    test("addition with 0 value", () => {
      expect(money1.add(new Money(0, "eur"))).toEqual({
        value: 100,
        currency: "usd",
      });
      expect(money1.add(new Money(0, "eur"))).toBeInstanceOf(Money);
    });
    test("additiom with negative value", () => {
      expect(() => money1.add(new Money(-130, "eur"))).toThrow(
        "'value' cannot be less than 0!",
      );
    });
  });
  describe("Testing the metod format", () => {
    test("with correctly values", () => {
      expect(money1.format()).toBe("$100.00");
      expect(new Money(120, "eur").format()).toBe("120,00\u00A0€");
      expect(new Money(1000, "rub").format()).toBe("1\u00A0000,00\u00A0₽");
    });
    test("with negative values", () => {
      expect(() => new Money(-100).format()).toThrow(
        "'value' cannot be less than 0!",
      );
      expect(() => new Money(-120, "eur").format()).toThrow(
        "'value' cannot be less than 0!",
      );
      expect(() => new Money(-1000, "rub").format()).toThrow(
        "'value' cannot be less than 0!",
      );
    });
  });
});
