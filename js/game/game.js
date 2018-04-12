/**
 * Похоже, что каким-то образом этот файл должен заменить game-score.js. Как бы, должен стать точкой входа в игру
 * и отвечать за логику игры: смена уровней, текущий state и рендеринг уровней.
 *
 */
import {changeView} from '../util';
import screenGameOne from '../components/gameOne/index';
import screenGameTwo from '../components/gameOne/index';
import screenGameThree from '../components/gameOne/index';

/**
 * Типы игры.
 */
const GameTypes = {
  one: screenGameOne(),
  two: screenGameTwo(),
  three: screenGameThree()
};

/**
 * Примерная структура вопросов/ответов. Что думаешь?
 */
const data = [
  // По 10 вопросов каждого вида
  {
    type: `two`,
    question: [`https://k42.kn3.net/D2F0370D6.jpg`, `http://i.imgur.com/1KegWPz.jpg`],
    answer: [`paint`, `photo`]
  },
  {
    type: `two`,
    question: [`https://k42.kn3.net/D2F0370D6.jpg`, `http://i.imgur.com/1KegWPz.jpg`],
    answer: [`paint`, `photo`]
  },
  // По 10 вопросов каждого вида
  {
    type: `one`,
    question: [`https://k42.kn3.net/CF42609C8.jpg`],
    answer: [`paint`]
  },
  // По 10 вопросов каждого вида
  {
    type: `three`,
    question: [`https://k42.kn3.net/CF42609C8.jpg`, `http://i.imgur.com/DiHM5Zb.jpg`, `http://i.imgur.com/DKR1HtB.jpg`],
    answer: [`paint`, `photo`, `photo`]
  }
];

/**
 * Здесь храним состояние игры
 */
const state = {
  gameType: null,
  lives: 3,
  time: 0,
  questions: [],
  stats: []
};

/**
 * На этом место должна быть логика для:
 * - инициализации и запуска игры
 * - смены уровней (с прогрузкой вопросов в шаблоны HTML)
 * ... ?
 *
 */

/**
 * Тут экспортим все нужные нам константы и функции наружу, чтобы можно было их потом заюзать в main.js
 */

export {state};
