// __tests__/parseJson.test.js
import { parseJson } from "../src/index.js";
import { ParseError } from "../src/ParseError.js";
/*-----------------------------------------------------*/
describe("Testing the function parseJson", () => {
  test("with correctly values", () => {
    expect(parseJson('{ "key": "value" }')).toEqual({ key: "value" });
  });
  test("with invalid values", () => {
    // toThrow: Проверяет, что ошибка была выброшена и проверяет текст сообщения, если в качестве аргумента передаётся строка. При этом он не проверяет тип ошибки.
    // toThrowError: Проверяет, что выброшена именно ошибка конкретного типа и с конкретным сообщением.
    expect(() => parseJson('{ key": "value" }')).toThrowError(ParseError);
    expect(() => parseJson(123)).toThrowError(ParseError);
    expect(() => parseJson({})).toThrowError(ParseError);
    expect(() => parseJson([])).toThrowError(ParseError);
  });
  test("with empty values", () => {
    expect(() => parseJson()).toThrowError(ParseError);
  });
  test("with empty string", () => {
    expect(() => parseJson("")).toThrowError(ParseError);
  });
  test("with null as input", () => {
    expect(() => parseJson(null)).toThrowError(ParseError);
  });
});
