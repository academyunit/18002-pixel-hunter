/**
 * Объявить таймер с определенным временем выполнения.
 *
 * @param {Number} runTimeSeconds
 * @return {Timer}
 */
export class Timer {
  constructor(time = 0) {
    this.time = time;
  }

  tick() {
    if (this.time <= 0) {
      return -1;
    }

    this.time--;

    return this.time;
  }
}