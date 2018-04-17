/**
 * @deprecated
 *
 * @todo:
 * - проверить еще раз на соответствие state и INIT_GAME из game-config
 * - удалить этот файол позже. Будет заменен components/game.
 */

import {changeView} from '../util';
import screenGameOne from '../components/gameOne/index';
import screenGameTwo from '../components/gameOne/index';
import screenGameThree from '../components/gameOne/index';

/**
 * Здесь храним состояние игры
 */
const state = {
  /**
   * текущий экран игры.
   * В начале проходит через intro - greeting - rules, потом задачет тип игры: gameOne, gameTwo, gameThree
   */
  game: 'intro',
  level: 0, // текуший уровень игры (вопросы от 1 до 10)
  lives: 3,
  time: 0,
  questions: [], // вопросы
  stats: []
};


/**
 * @typdef {Object} Question
 @property {string} imgSrc
 @property {string} option
 @property {Answer[]} answers
 */

/**
 * @typdef {Object} Answer
 @property {string} name
 @property {boolean} isCorrect
 */

/**
 @type Question
 */
const question = {
  imgSrc: ``,
  option: ``,
  answers: [{
    isCorrect: true,
    value: ``
  },
  {
    isCorrect: false,
    value: ``
  }
  ]
};

export {state};
