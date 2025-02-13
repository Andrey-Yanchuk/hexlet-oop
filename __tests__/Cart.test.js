// __tests__/Cart.test.js
import { Cart } from "../src/Cart.js";
/*-----------------------------------------------------*/
describe("Testing the class Cart", () => {
    let cart;
    beforeEach(() => {
        cart = new Cart();
    });
    test("with empty values", () => {
        expect(cart).toEqual({ items: [] });
    });
    describe("Testing the method addItem", () => {
        test("with correctly values", () => {
            cart.addItem({ name: 'car', price: 3 }, 5);
            cart.addItem({ name: 'house', price: 10 }, 2);
            expect(cart).toEqual({ items: [{ item: { name: 'car', price: 3 }, count: 5 }, { item: { name: 'house', price: 10 }, count: 2 }] });
        });
        test("with argument count equal 0 or <0", () => {
            expect(() => new Cart().addItem({ name: 'house', price: 10 }, 0)).toThrow("Please enter the correct quantity of goods!");
            expect(() => new Cart().addItem({ name: 'car', price: 3 }, -5)).toThrow("Please enter the correct quantity of goods!");
        });
        test("with zero and negative price", () => {
            const priceZero = new Cart();
            priceZero.addItem({ name: 'phone', price: 0 }, 2);
            expect(priceZero).toEqual({ items: [{ item: { name: 'phone', price: 0 }, count: 2 }] });
            expect(() => new Cart().addItem({ name: 'house', price: -10 }, 2)).toThrow("A product cannot have a negative price!");
        });
        test("with invalid name", () => {
            const invalidName = new Cart();
            const invalidNameFunc = () => invalidName.addItem({ name: 123, price: 0 }, 2);
            expect(invalidNameFunc).toThrow("Please enter a valid name!");
        });
    });
    describe("Testing the method getItems", () => {
        test("with correctly values", () => {
            cart.addItem({ name: 'car', price: 3 }, 5);
            cart.addItem({ name: 'house', price: 10 }, 2);
            expect(cart.getItems()).toEqual([{ item: { name: 'car', price: 3 }, count: 5 }, { item: { name: 'house', price: 10 }, count: 2 }]);
        });
        test("with empty values", () => {
            expect(new Cart().getItems()).toEqual([]);
        });
    });
    describe("Testing the method getCost", () => {
        test("with correctly values", () => {
            cart.addItem({ name: 'car', price: 3 }, 5);
            cart.addItem({ name: 'house', price: 10 }, 2);
            expect(cart.getCost()).toBe(35);
        });
        test("with empty values and zero price", () => {
            expect(new Cart().getCost()).toBe(0);
            const zeroPrice = new Cart();
            zeroPrice.addItem({ name: 'house', price: 0 }, 2);
            expect(zeroPrice.getCost()).toBe(0);
        });
        test("with negative price", () => {
            expect(() => new Cart().addItem({ name: 'house', price: -10 }, 2)).toThrow("A product cannot have a negative price!");
        });
    });
    describe("Testing the method getCount", () => {
        test("with correctly values", () => {
            cart.addItem({ name: 'car', price: 3 }, 5);
            cart.addItem({ name: 'house', price: 10 }, 2);
            expect(cart.getCount()).toBe(7);
        });
        test("with zero count", () => {
            expect(() => new Cart().addItem({ name: 'house', price: 10 }, 0).getCount()).toThrow("Please enter the correct quantity of goods!");
        });
        test("with negative count", () => {
            expect(() => new Cart().addItem({ name: 'house', price: 10 }, -2).getCount()).toThrow("Please enter the correct quantity of goods!");
        });
    });
});