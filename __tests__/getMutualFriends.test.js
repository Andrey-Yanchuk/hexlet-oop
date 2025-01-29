// __tests__/getMutualFriends.test.js
import { makeUser, getMutualFriends } from "../src/index.js";
/*-----------------------------------------------------*/
describe("Testing the function makeUser", () => {
    test("with correctly values", () => {
        const user1 = makeUser({
            id: 1,
            friends: [
                makeUser({ id: 1 }),
                makeUser({ id: 2 }),
            ],
        });
        expect(user1).toEqual({
            id: 1,
            friends: [
                { id: 1, friends: [], getFriends: expect.any(Function) },
                { id: 2, friends: [], getFriends: expect.any(Function) }
            ],
            // expect.any(Function) используется в Jest для проверки того, что значение является экземпляром указанного типа(в данном случае, функцией). Это означает, что вместо того, чтобы проверять точное значение(например, конкретную функцию), ты проверяешь, что это любая функция.
            getFriends: expect.any(Function),
        });
        // Проверяем, что функция getFriends() возвращает правильные данные
        expect(user1.getFriends()).toEqual([
            { id: 1, friends: [], getFriends: expect.any(Function) },
            { id: 2, friends: [], getFriends: expect.any(Function) },
        ]);
    });
    test("with invalid values", () => {
        expect(() => makeUser({ id: null, friends: '' })).toThrow("id must be a number or undefined!");
        expect(() => makeUser({ id: 1, friends: '' })).toThrow("friends must be an array!");
        expect(() => makeUser({ id: 'string', friends: [] })).toThrow("id must be a number or undefined!");
        expect(() => makeUser({ id: 1, friends: {} })).toThrow("friends must be an array!");
        expect(() => makeUser({ id: 1, friends: 123 })).toThrow("friends must be an array!");
        expect(() => makeUser({ id: 1, friends: null })).toThrow("friends must be an array!");
        expect(() => makeUser({ id: 1, friends: [{ id: 2 }, 'invalid friend'] })).toThrow("Each friend must be an object with an 'id' property!");
    });
    test("with empty values", () => {
        expect(makeUser()).toEqual({ id: undefined, friends: [], getFriends: expect.any(Function) });
        expect(makeUser({ friends: [] })).toEqual({ id: undefined, friends: [], getFriends: expect.any(Function) });
    });
});
describe("Testing the function getMutualFriends", () => {
    test("both users have the same friend lists", () => {
        const user1 = makeUser({
            friends: [
                makeUser({ id: 1 }),
                makeUser({ id: 2 }),
            ],
        });
        const user2 = makeUser({
            friends: [
                makeUser({ id: 1 }),
                makeUser({ id: 2 }),
            ],
        });
        expect(getMutualFriends(user1, user2)).toEqual([
            { id: 1, friends: [], getFriends: expect.any(Function) },
            { id: 2, friends: [], getFriends: expect.any(Function) },
        ]);
    });
    test("have mutual friends", () => {
        const user1 = makeUser({
            friends: [
                makeUser({ id: 1 }),
                makeUser({ id: 2 }),
            ],
        });
        const user2 = makeUser({
            friends: [
                makeUser({ id: 2 }),
                makeUser({ id: 3 }),
            ],
        });
        expect(getMutualFriends(user1, user2)).toEqual([{ id: 2, friends: [], getFriends: expect.any(Function) }]);
    });
    test("one user has no friends", () => {
        const user1 = makeUser({
            friends: [
                makeUser({ id: 1 }),
                makeUser({ id: 2 }),
            ],
        });
        const user2 = makeUser();
        expect(getMutualFriends(user1, user2)).toEqual([]);
    });
    test("no mutual friends", () => {
        expect(getMutualFriends(makeUser(), makeUser())).toEqual([]);
    });
});