// __tests__/Time.test.js
import { Time } from "../src/Time.js";
/*-----------------------------------------------------*/
describe("Testing the class Time", () => {
  test("with correctly values", () => {
    expect(new Time(10, 15)).toEqual({ hours: 10, minutes: 15 });
  });
  test("with negative values", () => {
    expect(() => new Time(-10, 15)).toThrow(
      "Hours and minutes must be positive values!",
    );
    expect(() => new Time(10, -15)).toThrow(
      "Hours and minutes must be positive values!",
    );
  });
  test("with zero values", () => {
    expect(new Time(0, 0)).toEqual({ hours: 0, minutes: 0 });
    expect(new Time(0, 0).toString()).toBe("00:00");
  });
  test("with invalid values", () => {
    expect(() => new Time("0", NaN)).toThrow("hours - must be type number!");
    expect(() => new Time(23, NaN)).toThrow("minutes - must be type number!");
  });
  describe("Testing the method toString", () => {
    test("with correctly values", () => {
      expect(new Time(10, 15).toString()).toBe("10:15");
    });
    test("with zero values", () => {
      expect(new Time(0, 15).toString()).toBe("00:15");
    });
  });
  describe("Testing the method fromString", () => {
    test("with correctly values", () => {
      expect(`The time is ${Time.fromString("22:22")}`).toBe(
        "The time is 22:22",
      );
    });
    test("with zero values", () => {
      expect(`The time is ${Time.fromString("00:22")}`).toBe(
        "The time is 00:22",
      );
    });
  });
});
