// __tests__/magic.test.js
import { magic } from "../src/index.js";
/*-----------------------------------------------------*/
describe("Testing the function magic", () => {
  test("test with multiple arguments and one call", () => {
    expect(magic(5, 2, -8) == -1).toBe(true);
  });
  test("test with multiple arguments and multiple calls", () => {
    expect(magic(1, 2)(3, 4, 5)(6)(7, 10) == 38).toBe(true);
  });
  test("test with multiple arguments, multiple calls and negative value", () => {
    expect(magic(4, 8, 1, -1, -8)(3)(-3)(7, 2) == 13).toBe(true);
  });
  test("test without passing arguments", () => {
    expect(magic() == 0).toBe(true);
  });
});
