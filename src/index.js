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
const getGsd = (a, b) => {
  // НОД
  while (b !== 0) {
    const temp = a;
    a = b;
    b = temp % b;
  }
  return Math.abs(a);
};
export const make = (numer, denom) => {
  if (typeof numer !== "number" || Number.isNaN(numer))
    throw new Error("The numerator must be of data type number!");
  if (typeof denom !== "number" || Number.isNaN(denom))
    throw new Error("The denominator must be of data type number!");
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
        this.getNumer() * rational.getDenom() +
          this.getDenom() * rational.getNumer(),
        this.getDenom() * rational.getDenom(),
      );
    },
  };
};
/*-----------------------------------------------------*/
// Внешняя функция bind — это оболочка она не вызывает fn сразу, а создаёт и возвращает новую функцию(с ее нужными для передачи аргументами), которая "запоминает" переданный объект(obj) и функцию(fn).
export const bind = (obj, fn) => {
  if (typeof obj !== "object" || obj === null)
    throw new Error("First argument must be an object!");
  if (typeof fn !== "function")
    throw new Error("Second argument must be a function!");
  return (...arg) => {
    return fn.apply(obj, arg);
  };
};
/*-----------------------------------------------------*/
export const each = (objects, callback) => {
  if (!Array.isArray(objects))
    throw new Error("First argument must be collection of objects!");
  if (typeof callback !== "function")
    throw new Error("Second argument must be a function!");
  return objects.forEach((obj) => callback.call(obj));
};
/*-----------------------------------------------------*/
export function Point(x, y) {
  // Метод Number.isFinite() определяет, является ли переданное значение конечным числом.
  if (!Number.isFinite(x)) throw new Error("x must be a finite number!");
  if (!Number.isFinite(y)) throw new Error("y must be a finite number!");
  this.x = x;
  this.y = y;
}
function getBeginPoint() {
  return this.beginPoint;
}
function getEndPoint() {
  return this.endPoint;
}
export function Segment(beginPoint, endPoint) {
  if (!(beginPoint instanceof Point))
    throw new Error("beginPoint must be an instance of Point!");
  if (!(endPoint instanceof Point))
    throw new Error("endPoint must be an instance of Point!");
  this.beginPoint = beginPoint;
  this.endPoint = endPoint;
  this.getBeginPoint = getBeginPoint;
  this.getEndPoint = getEndPoint;
}
export function reverse(segment) {
  if (!(segment instanceof Segment))
    throw new Error("reverse function expects a Segment instance!");
  const beginPoint = new Point(
    segment.getBeginPoint().x,
    segment.getBeginPoint().y,
  );
  const endPoint = new Point(segment.getEndPoint().x, segment.getEndPoint().y);
  return new Segment(endPoint, beginPoint);
}
/*-----------------------------------------------------*/
