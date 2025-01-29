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
