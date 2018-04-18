import {changeView, getElementFromTemplate} from '../../util';
import {INITIAL_GAME, TIMER_TIME} from '../../data/game-config';
import {QUESTIONS, TaskType} from '../../data/structure';
import {ContentType, Event, Control, getCheckedControls, nextTask, addAnswer, selectImage, die, canContinue} from './util';
import getHeader from '../header/index';
import renderQuestions from '../questions/index';
import getStats from '../stats/index';
import getScoreBoard from '../scoreBoard/index';

let game;

const initGame = () => {
  // грузим вопросы для игры
  const tasks = [...QUESTIONS];

  // прогружаем их в изначальный state игры
  game = Object.assign({}, INITIAL_GAME, {
    task: tasks.pop(),
    tasks
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

    // Получение Задания
  const {task, answers, timer} = state;
  const {type, title, questions} = task;

  console.log(state);

  // Создаем игровой экран
  const screen = getElementFromTemplate(
    `${getHeader(state)}
      <div class='game'>
          <p class='game__task'>${title}</p>
          <form class='game__content ${ContentType[type] || ``}'>
            ${renderQuestions(questions)}
          </form>
          <div class='stats'>
            ${getStats(answers)}
          </div>
        </div>`
  );

  const content = screen.querySelector(`.game__content`);
  const answerControls = Array.from(screen.querySelectorAll(Control[type]));

  console.log('type', type);
  content.addEventListener(Event[type], (e) => {
    const checkedAnswerControls = getCheckedControls(answerControls);

    if (!checkedAnswerControls.length || ((type === TaskType.GUESS_TWO)
        && checkedAnswerControls.length !== 2)) {
      return;
    }

    let correctAnswer;

    if (type === TaskType.FIND) {
      correctAnswer = selectImage(e);
    } else {
      correctAnswer = questions.every((question, i) => {
        return question.type === checkedAnswerControls[i].value;
      });
    }

    if (!correctAnswer) {
      state = die(state);
    }

    state = addAnswer(state, {isCorrect: correctAnswer, time: TIMER_TIME - timer});

    if (canContinue(state)) {
      changeView(changeGameState(nextTask(state)));
    } else {
      changeView(getScoreBoard(state));
    }
  });

  // Возвращаем игровой экран
  return screen;
};

export default () => {
  initGame();

  return changeGameState(game);
};
