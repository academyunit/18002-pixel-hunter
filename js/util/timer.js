import {TimerConfig} from '../data/game-config';
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

export const flashTimer = (element) => {
  const timer = element.querySelector(`.game__timer`);
  if (parseInt(timer.textContent, 10) <= TimerConfig.alarmTime) {
    timer.classList.add(`game__timer--alarm`);
  }
};
