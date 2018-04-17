import {changeView, getElementFromTemplate} from '../../util';
import {INITIAL_GAME, TIMER_TIME} from '../../data/game-config';
import {QUESTIONS, GameType} from '../../data/structure';
import getHeader from '../../markups/header';
import getFooter from '../../markups/footer';
import getQuestions from '../questions/index';
import getStats from '../stats/index';

let game;

const initGame = () => {
  // грузим вопросы для игры
  const questions = [...QUESTIONS];

  // прогружаем их в изначальный state игры
  game = Object.assign({}, INITIAL_GAME, {
    question: questions.pop(),
    questions
  });
};

const changeGameState = (state) => {
  /**
   * 1. получаем из state вопрос
   * 2. рисуем под него игровой экран (gameOne, gameTwo, gameThree экраны больше не нужны)
   * 3. рисуем ответы в форме
   * 4. Вешаем обработчик на форму (выбор ответа в форме)
   * 5. Проверяем как-то
   * 6. Кладем результат ответа на вопрос в state (при это отнимаем жизнь, если ответ неверный)
   * 7. Проверяем можно ли идти дальше (есть ли жизни  вопросы)
   * 8. Повторяем...
   */
};

export default () => {
  initGame();

  return changeGameState(game);
};
