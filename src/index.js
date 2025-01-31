// src/index.js
// import util from "util"; // Для отображения уровня вложенности
/*-----------------------------------------------------*/
export const makeUser = ({ id = undefined, friends = [] } = {}) => {
  // деструктуризация объекта с значениями по умолчанию, то есть если в объекте не будут переадны, аргументы id и friends, то они будут использоваться по умолчанию
  if (typeof id !== "undefined" && typeof id !== "number")
    throw new Error("id must be a number or undefined!");
  if (!Array.isArray(friends)) throw new Error("friends must be an array!");
  friends.forEach((friend) => {
    // Инструкция 'id' in friend проверяет, существует ли в объекте friend свойство с именем id
    if (typeof friend !== "object" || !("id" in friend))
      throw new Error("Each friend must be an object with an 'id' property!");
  });
  return {
    id,
    friends,
    getFriends: () => friends,
  };
};
export const getMutualFriends = (user1, user2) => {
  const friendsUser1 = user1.getFriends();
  const friendsUser2 = user2.getFriends();
  return friendsUser1.filter((friend1) =>
    // Здесь метод some используется для того, чтобы найти хотя бы одно совпадение в другом массиве, и если оно есть, то текущий элемент из первого массива добавляется в итоговый результат
    friendsUser2.some((friend2) => friend1.id === friend2.id),
  );
};
// console.log(util.inspect(getMutualFriends(user1, user2), { depth: 5, colors: true }));
/*-----------------------------------------------------*/
const getGsd = (a, b) => { // НОД
  while (b !== 0) {
    const temp = a;
    a = b;
    b = temp % b
  }
  return Math.abs(a);
};
export const make = (numer, denom) => {
  if (typeof numer !== 'number' || Number.isNaN(numer)) throw new Error("The numerator must be of data type number!");
  if (typeof denom !== 'number' || Number.isNaN(denom)) throw new Error("The denominator must be of data type number!");
  if (denom === 0) throw new Error("Denominator cannot be zero!");
  // Нормализация дроби
  const gsd = getGsd(numer, denom);
  return {
    numer: numer / gsd,
    denom: denom / gsd,
    getNumer() {
      return this.numer;
    },
    getDenom() {
      return this.denom;
    },
    // Если написать getNumer() и getDenom(), без ключевого слова this, то они будут восприниматься как обычные функции из глобальной области видимости, а не как методы объекта
    toString() {
      return `${this.getNumer()}/${this.getDenom()}`;
    },
    add(rational) {
      // Мой вариант
      /* const a = this.getNumer();
      const b = this.getDenom();
      const c = rational.getNumer();
      const d = rational.getDenom();
      return make((a * d + b * c), (b * d)); */
      // Вариант gpt
      return make(
        // Формула сложения: a / b + c / d = (a * d + b * c) / (b * d)
        this.getNumer() * rational.getDenom() + this.getDenom() * rational.getNumer(),
        this.getDenom() * rational.getDenom()
      )
    },
  };
};
/*-----------------------------------------------------*/