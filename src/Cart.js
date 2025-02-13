// src/Cart.js
export class Cart {
  constructor() {
    this.items = [];
  }
  addItem(item, count = 1) {
    if (count <= 0)
      throw new Error("Please enter the correct quantity of goods!");
    if (!item.name || typeof item.name !== "string")
      throw new Error("Please enter a valid name!");
    if (typeof item.price !== "number" || item.price < 0)
      throw new Error("A product cannot have a negative price!");
    const existingEl = this.items.find((el) => el.item.name === item.name);
    if (!existingEl) {
      this.items.push({ item, count });
    } else {
      existingEl.count += count;
    }
  }
  getItems() {
    // Делаем для расширяемости кода, и чтобы нельзя было явно изменить код при его возврате
    return this.items.map((el) => ({ ...el, item: { ...el.item } }));
  }
  getCost() {
    return this.items.reduce((acc, el) => acc + el.item.price * el.count, 0);
  }
  getCount() {
    return this.items.reduce((acc, el) => acc + el.count, 0);
  }
}
