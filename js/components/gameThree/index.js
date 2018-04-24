import {getElementFromTemplate} from '../../util';
import {renderScreen} from '../game/index';
import renderQuestions from '../questions/index';
import getHeader from '../header/index';
import getFooter from '../footer/index';
import getStats from '../stats/index';

const getTemplate = ({task: {questions}, ...rest}) => {
  return `<header class="header">
  ${getHeader(rest)}
</header>
<div class="game">
  <p class="game__task">Найдите рисунок среди изображений</p>
  <form class="game__content  game__content--triple">
    ${renderQuestions(questions)}
  </form>
  ${getStats()}
</div>
${getFooter()}
`;
};

export default (game) => {
  const screen = getElementFromTemplate(getTemplate(game));

  const form = screen.querySelector(`.game__content`);
  const answers = Array.from(screen.querySelectorAll(`.game__option`));

  // логику проверки вопросов можно сделать получше
  const resetAnswers = () => answers.forEach((answer) => answer.classList.remove(`game__option--selected`));
  const setAnswer = (answer) => answer.classList.add(`game__option--selected`);
  const isSelectedAnswerCorrect = (answer) => {
    const {task: {questions}} = game.getLevel();

    // Ищем правильный ответ в нашей структуре
    let questionIndex = -1;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].isSelected) {
        questionIndex = i;
        break;
      }
    }

    // сравниваем только что выбранный DOM-элемент со списком остальных DOM-элементов.
    return (answers[questionIndex] === answer);
  };

  const handleClick = (event) => {
    const answer = event.target.closest(`.game__option`);
    if (!answer) {
      return;
    }

    resetAnswers();
    setAnswer(answer);

    game.addAnswer(isSelectedAnswerCorrect(answer));
    game.changeLevel();

    renderScreen(game);
  };

  form.addEventListener(`click`, handleClick);

  return screen;
};
