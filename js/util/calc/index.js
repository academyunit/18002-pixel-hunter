import {Life, AnswerPoint, AnswerTime} from '../../data/game-config';
import {isObject} from '../is';

const isFastAnswer = (time) => time < AnswerTime.fast;
const isSlowAnswer = (time) => time > AnswerTime.slow;

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
export const getAnswerScore = (answer) => {
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
  score += AnswerPoint.default;

  // Быстрый ответ стоит на 50 очков больше...
  if (isFastAnswer(answer.time)) {
    score += AnswerPoint.bonus;
  }
  // ... а медленный - на 50 меньше
  if (isSlowAnswer(answer.time)) {
    score += AnswerPoint.fine;
  }

  return score;
};

export const getTotalScore = (answers, lives) => {
  if (!Array.isArray(answers)) {
    throw new Error(`Argument 'answers' should be an array!`);
  }
  if (!Number.isFinite(lives)) {
    throw new Error(`Argument 'lives' should be a number!`);
  }

  if (lives < 0 || lives > Life.count) {
    throw new Error(`'lives' count is out of range!`);
  }

  const answersScore = answers.reduce((sum, current) => {
    return sum + getAnswerScore(current);
  }, 0);

  // Каждая оставшаяся жизнь тоже добавляет по 50 очков
  return answersScore + (lives * Life.bonus);
};
