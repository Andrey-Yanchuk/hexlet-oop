// __tests__/each.test.js
import { each } from "../src/index.js";
/*-----------------------------------------------------*/
describe("Testing the function each", () => {
  let objects;
  beforeEach(() => {
    objects = [{ name: "Karl" }, { name: "Mia" }];
  });
  test("with correctly values", () => {
    const objects = [{ name: "Karl" }, { name: "Mia" }];
    each(objects, function callback() {
      this.name = this.name.split("").reverse().join("");
    });
    expect(objects).toEqual([{ name: "lraK" }, { name: "aiM" }]);
  });
  test("with invalid values", () => {
    expect(() => each()).toThrow(
      "First argument must be collection of objects!",
    );
    expect(() =>
      each("objects", function callback() {
        this.name = this.name.split("").reverse().join("");
      }),
    ).toThrow("First argument must be collection of objects!");
    expect(() => each(objects)).toThrow("Second argument must be a function!");
  });
  test("with an empty array", () => {
    const emptyObjects = [];
    each(emptyObjects, function callback() {
      this.name = this.name.split("").reverse().join("");
    });
    expect(emptyObjects).toEqual([]);
  });
  test("with objects that don't have 'name' property", () => {
    const objectsWithoutName = [{}, { id: 1 }];
    each(objectsWithoutName, function callback() {
      if (this.name) this.name = this.name.split("").reverse().join("");
    });
    expect(objectsWithoutName).toEqual([{}, { id: 1 }]);
  });
});
