// __tests__/reversed-segment.test.js
import { Point, Segment, reverse } from "../src/index.js";
/*-----------------------------------------------------*/
describe("Testing the constructor-function Point", () => {
  test("with correctly values", () => {
    expect(new Point(1, 10)).toEqual({ x: 1, y: 10 });
  });
  test("with negative values", () => {
    expect(new Point(-1, -10)).toEqual({ x: -1, y: -10 });
  });
  test("with empty values", () => {
    expect(() => new Point()).toThrow("x must be a finite number!");
    expect(() => new Point(1)).toThrow("y must be a finite number!");
  });
  test("with invalid values", () => {
    expect(() => new Point("123", null)).toThrow("x must be a finite number!");
    expect(() => new Point(123, null)).toThrow("y must be a finite number!");
    expect(() => new Point(NaN, null)).toThrow("x must be a finite number!");
  });
  test("with zero values", () => {
    expect(new Point(0, 0)).toEqual({ x: 0, y: 0 });
  });
  describe("Testing Point.prototype.toString", () => {
    test("with correctly values", () => {
      expect(new Point(1, 10).toString()).toBe("(1, 10)");
    });
    test("with negative values", () => {
      expect(new Point(11, -3).toString()).toBe("(11, -3)");
    });
    test("with empty values", () => {
      expect(() => new Point().toString()).toThrow("x must be a finite number!");
      expect(() => new Point(1).toString()).toThrow("y must be a finite number!");
    });
    test("with invalid values", () => {
      expect(() => new Point("123", null).toString()).toThrow("x must be a finite number!");
      expect(() => new Point(123, null).toString()).toThrow("y must be a finite number!");
      expect(() => new Point(NaN, null).toString()).toThrow("x must be a finite number!");
    });
    test("with zero values", () => {
      expect(new Point(0, 0).toString()).toBe("(0, 0)");
    });
  });
});
describe("Testing the constructor-function Segment", () => {
  test("with correctly values", () => {
    expect(new Segment(new Point(1, 10), new Point(11, 3))).toEqual({
      beginPoint: { x: 1, y: 10 },
      endPoint: { x: 11, y: 3 },
    });
  });
  test("with negative values", () => {
    expect(new Segment(new Point(-1, -10), new Point(-11, -3))).toEqual({
      beginPoint: { x: -1, y: -10 },
      endPoint: { x: -11, y: -3 },
    });
  });
  test("with empty arguments", () => {
    expect(() => new Segment()).toThrow(
      "beginPoint must be an instance of Point!",
    );
    expect(() => new Segment(new Point(-1, -10))).toThrow(
      "endPoint must be an instance of Point!",
    );
  });
  test("with invalid values", () => {
    expect(() => new Segment("", {})).toThrow(
      "beginPoint must be an instance of Point!",
    );
    expect(() => new Segment(new Point(-1, -10), null)).toThrow(
      "endPoint must be an instance of Point!",
    );
  });
  describe("Testing Segment.prototype.toString", () => {
    test("with correctly values", () => {
      expect(new Segment(new Point(1, 10), new Point(11, 3)).toString()).toBe("[(1, 10), (11, 3)]");
    });
    test("with negative values", () => {
      expect(new Segment(new Point(-1, -10), new Point(-11, -3)).toString()).toBe("[(-1, -10), (-11, -3)]");
    });
    test("with empty arguments", () => {
      expect(() => new Segment().toString()).toThrow(
        "beginPoint must be an instance of Point!",
      );
      expect(() => new Segment(new Point(-1, -10)).toString()).toThrow(
        "endPoint must be an instance of Point!",
      );
    });
    test("with invalid values", () => {
      expect(() => new Segment("", {}).toString()).toThrow(
        "beginPoint must be an instance of Point!",
      );
      expect(() => new Segment(new Point(-1, -10), null).toString()).toThrow(
        "endPoint must be an instance of Point!",
      );
    });
  });
});
describe("Testing the function reverse", () => {
  test("with correctly values", () => {
    expect(reverse(new Segment(new Point(1, 10), new Point(11, -3)))).toEqual({
      beginPoint: { x: 11, y: -3 },
      endPoint: { x: 1, y: 10 },
    });
  });
  test("with negative values", () => {
    expect(
      reverse(new Segment(new Point(-1, -10), new Point(-11, -3))),
    ).toEqual({
      beginPoint: { x: -11, y: -3 },
      endPoint: { x: -1, y: -10 },
    });
  });
  test("with empty values", () => {
    expect(() => reverse()).toThrow(
      "reverse function expects a Segment instance!",
    );
  });
});