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

  triggerAlert() {
    if (this.time <= 28) {
      document.dispatchEvent(new CustomEvent(`countDownTimerAlert`));
    }
  }
}

export const flash = (element, times) => {
  const colors = [`#ffFFFf`, `#ff0000`];
  element.style.backgroundColor = colors[times % colors.length];
  if (times === 0) {
    return;
  }
  setTimeout(() => {
    flash(element, times - 1);
  }, 200);
};
