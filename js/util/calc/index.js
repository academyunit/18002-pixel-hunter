import {Life, AnswerPoint, AnswerTime, TOTAL_QUESTIONS, TimerConfig} from '../../data/game-config';
import {isObject} from '../is';

export const isFastAnswer = (time) => TimerConfig.DEFAULT_TIME - time <= AnswerTime.FAST;
export const isSlowAnswer = (time) => TimerConfig.DEFAULT_TIME - time >= AnswerTime.SLOW;

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
    throw new Error(`'answer' object doesn't have 'time' property assigned!`);
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
  score += AnswerPoint.DEFAULT;

  // Быстрый ответ стоит на 50 очков больше...
  if (isFastAnswer(answer.time)) {
    score += AnswerPoint.BONUS;
  }
  // ... а медленный - на 50 меньше
  if (isSlowAnswer(answer.time)) {
    score += AnswerPoint.FINE;
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

  if (answers.length < TOTAL_QUESTIONS) {
    return -1;
  }

  if (lives < -1 || lives > Life.COUNT) {
    throw new Error(`'lives' count is out of range!`);
  }

  const answersScore = answers.reduce((sum, current) => {
    return sum + getAnswerScore(current);
  }, 0);

  // Каждая оставшаяся жизнь тоже добавляет по 50 очков
  return answersScore + (lives * Life.BONUS);
};
