// __tests__/bind.test.js
import { bind } from "../src/index.js";
/*-----------------------------------------------------*/
describe("Testing the function bind", () => {
  let obj, fn, fnWithContext;
  beforeEach(() => {
    obj = { number: 5 };
    fn = function fn(number) {
      return number + this.number;
    };
    fnWithContext = bind(obj, fn);
  });
  test("with correctly values", () => {
    expect(fnWithContext(3)).toBe(8);
  });
  test("with empty arguments", () => {
    expect(fnWithContext()).toBeNaN();
  });
  test("with invalid values", () => {
    expect(() => bind(null, fn)).toThrow("First argument must be an object!");
    expect(() => bind(123, fn)).toThrow("First argument must be an object!");
    expect(() => bind({}, "fn")).toThrow("Second argument must be a function!");
    expect(() => bind({})).toThrow("Second argument must be a function!");
  });
});
