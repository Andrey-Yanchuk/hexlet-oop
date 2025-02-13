// src/Time.js
/*-----------------------------------------------------*/
export class Time {
  constructor(hours, minutes) {
    if (typeof hours !== "number" || !Number.isFinite(hours))
      throw new Error("hours - must be type number!");
    if (typeof minutes !== "number" || !Number.isFinite(minutes))
      throw new Error("minutes - must be type number!");
    if (hours < 0 || minutes < 0)
      throw new Error("Hours and minutes must be positive values!");
    this.hours = hours;
    this.minutes = minutes;
  }
  toString() {
    // Метод padStart(), значений String дополняет эту строку другой строкой(несколько раз, если необходимо), пока результирующая строка не достигнет заданной длины. Дополнение применяется с начала этой строки.
    return `${String(this.hours).padStart(2, "0")}:${String(this.minutes).padStart(2, "0")}`;
  }
  static fromString(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return new Time(hours, minutes);
  }
}
