import {getElementFromTemplate} from '../../util';
import {renderScreen} from '../game/index';
import renderQuestions from '../questions/index';
import getHeader from '../header/index';
import getFooter from '../footer/index';
import getStats from '../stats/index';

const ANSWERS_REQUIRED = 2;

const getTemplate = ({task: {questions}}, ...rest) => `
<header class="header">
  ${getHeader(rest)}
</header>
<div class="game">
  <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
  <form class="game__content">
    ${renderQuestions(questions)}
  </form>
  ${getStats()}
</div>
${getFooter()}
`;

export default (game) => {
  const screen = getElementFromTemplate(getTemplate(game));
  const form = screen.querySelector(`.game__content`);
  const answers = Array.from(form.querySelectorAll(`input[type="radio"]`));
  const answer1 = Array.from(form.querySelectorAll(`input[name="question1"]`));
  const answer2 = Array.from(form.querySelectorAll(`input[name="question2"]`));

  // логику проверки вопросов можно сделать получше
  const checkAnswer = (answer, correctValue) => answer.findIndex((control) => control.checked && control.value === correctValue) > -1;
  const isAnswered = () => answers.filter((answer) => answer.checked).length === ANSWERS_REQUIRED;
  const isCorrectAnswer = () => {
    const {task: {questions}} = game.getLevel();

    return checkAnswer(answer1, questions[0].type) && checkAnswer(answer2, questions[1].type);
  };

  const handleChange = () => {
    if (!isAnswered()) {
      return;
    }
    game.addAnswer(isCorrectAnswer());
    game.changeLevel();
    renderScreen(game);
  };

  form.addEventListener(`change`, handleChange);

  return screen;
};
