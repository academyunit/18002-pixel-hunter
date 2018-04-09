const DEFAULT_LIVES = 3;
const isFastAnswer = (time) => time < 10;
const isSlowAnswer = (time) => time > 20;

/**
 * @typedef {Object} Answer
 * @property {Boolean} isCorrect
 * @property {Number} time
 */

/**
 * Подсчет очков.
 *
 * @param {Answer[]} answers
 * @return {Number}
 */
export const checkScores = (answers) => {
  if (answers.length < 10) {
    return -1;
  }

  let totalScore = 0;
  let answersFail = 0;

  answers.forEach((answer, index) => {
    if (typeof answer !== `object` && !Array.isArray(answer)) {
      throw new Error(`Given answer isn't an object!`);
    }
    if (index >= 10) {
      return;
    }
    if (!answer.isCorrect) {
      answersFail++;
      return;
    }

    // Столько стоит каждый правильный ответ
    totalScore += 100;

    // Быстрый ответ стоит на 50 очков больше...
    if (isFastAnswer(answer.time)) {
      totalScore += 50;
    }
    // ... а медленный - на 50 меньше
    if (isSlowAnswer(answer.time)) {
      totalScore -= 50;
    }
  });

  if (answersFail > DEFAULT_LIVES) {
    return -1;
  }

  // Каждая оставшаяся жизнь тоже добавляет по 50 очков
  totalScore += ((DEFAULT_LIVES - answersFail) * 50);

  return totalScore;
};

/**
 * Объявить таймер с определенным временем выполнения.
 *
 * @param {Number} runTimeSeconds
 * @return {Timer}
 */
export const getTimer = (runTimeSeconds) => {
  class Timer {
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

  return new Timer(runTimeSeconds);
};
