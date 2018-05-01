/**
 * @todo: разобраться с константами тут и что куда испортится, положить все в одно место
 */

//import {QUESTIONS} from './structure';
//
//// Начальное состояние игры
//export const INITIAL_GAME = Object.freeze({
//  task: null,
//  tasks: [...QUESTIONS],
//  type: `intro`,
//  gameNumber: null,
//  answers: [],
//  lives: 3,
//  timer: 30,
//  playerName: ``
//});

/**
 * @deprecated
 * удалить это отсюда потом
 * @todo: 05/01/18 - точно удалить потом
 */
// Кол-во уровней в игре
export const GAME_ROUNDS_COUNT = 10;

/**
 * @deprecated
 * удалить это отсюда потом
 * @todo: 05/01/18 - точно удалить потом
 */
// Начальное время таймера
export const TIMER_TIME = 30;

//// Жизнь
//export const Life = {
//  count: INITIAL_GAME.lives,
//  bonus: 50
//};

// Очки за ответ
export const AnswerPoint = {
  default: 100,
  bonus: 50,
  fine: -50
};

export const AnswerTime = {
  slow: 20,
  fast: 10
};

export const Result = {
  INCORRECT_ANSWER: 0,
  CORRECT_ANSWER: 1
};