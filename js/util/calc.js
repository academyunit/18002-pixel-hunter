import {isObject} from '../is';

/**
 * @todo: разобраться с константами тут и что куда испортится, положить все в одно место
 */

/** Кол-во жизней */
export const LIVES_COUNT = 3;
/** Бонус за оставшуюся жизнь */
const LIFE_BONUS = 50;
/** Кол-во ответов */
export const ANSWERS_COUNT = 10;
/** Кол-во очков за ответ */
export const ANSWER_POINT = {
  default: 100,
  bonus: 50,
  fine: -50
};
/** Время ответа на вопросы */
export const ANSWER_TIME = {
  slow: 20,
  fast: 10
};

export const resultsData = {
  victoryTitle: `Победа!`,
  failTitle: `Fail`,
  fastResults: {
    type: `fast`,
    label: `Бонус за скорость:`,
    points: ANSWER_POINT.bonus,
    icon: `fast`
  },

  livesResults: {
    type: `lives`,
    label: `Бонус за жизни:`,
    points: LIFE_BONUS,
    icon: `alive`
  },

  slowResults: {
    type: `slow`,
    label: `Штраф за медлительность:`,
    points: ANSWER_POINT.fine,
    icon: `slow`
  }
};

const isFastAnswer = (time) => time < ANSWER_TIME.fast;
const isSlowAnswer = (time) => time > ANSWER_TIME.slow;

/**
 * @typedef {Object} Answer
 * @property {Boolean} isCorrect
 * @property {Number} time
 */

/**
 * Подсчет очков.
 *
 * @param {Object} answer
 * @return {Number}
 */
export const calculateAnswerScore = (answer) => {
  if (!isObject(answer)) {
    throw new Error(`Given answer isn't an object!`);
  }

  if (!(`isCorrect` in answer)) {
    throw new Error(`'answer' object doesn't have 'isCorrect' property assigned!`);
  }

  if (!(`time` in answer)) {
    throw new Error(`'answer' object doesn't have 'isCorrect' property assigned!`);
  }

  if ((typeof answer.isCorrect) !== `boolean`) {
    throw new Error(`Property answer.isCorrect should be true or false`);
  }

  if (!Number.isFinite(answer.time)) {
    throw new Error(`Property answer.time should be a number`);
  }

  let score = 0;

  if (!answer.isCorrect) {
    return score;
  }

  // Столько стоит каждый правильный ответ
  score += ANSWER_POINT.default;

  // Быстрый ответ стоит на 50 очков больше...
  if (isFastAnswer(answer.time)) {
    score += ANSWER_POINT.bonus;
  }
  // ... а медленный - на 50 меньше
  if (isSlowAnswer(answer.time)) {
    score += ANSWER_POINT.fine;
  }

  return score;
};

export const calculateTotalGameScore = (answers, lives) => {
  if (!Array.isArray(answers)) {
    throw new Error(`Argument 'answers' should be an array!`);
  }
  if (!Number.isFinite(lives)) {
    throw new Error(`Argument 'lives' should be a number!`);
  }
  if (answers.length < ANSWERS_COUNT) {
    return -1;
  }
  if (lives < 0 || lives > LIVES_COUNT) {
    throw new Error(`'lives' count is out of range!`);
  }

  const answersScore = answers.reduce((sum, current) => {
    return sum + calculateAnswerScore(current);
  }, 0);

  // Каждая оставшаяся жизнь тоже добавляет по 50 очков
  return answersScore + (lives * LIFE_BONUS);
};
