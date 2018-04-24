import {getElementFromTemplate} from '../../util';
import {renderScreen} from '../game/index';
import renderQuestions from '../questions/index';
import getHeader from '../header/index';
import getFooter from '../footer/index';
import getStats from '../stats/index';

const getTemplate = ({task: {questions}}, ...rest) => `
<header class="header">
  ${getHeader(rest)}
</header>
<div class="game">
  <p class="game__task">Угадай, фото или рисунок?</p>
  <form class="game__content  game__content--wide">
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

  const isAnswered = () => answers.some((answer) => answer.checked);
  const isSelectedAnswerCorrect = () => {
    const {task: {questions}} = game.getLevel();

    // какой-то вариант получще должен быть это делать
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].checked && answers[i].value === questions[0].type) {
        return true;
      }
    }

    return false;
  };

  const handleChange = () => {
    if (!isAnswered()) {
      return;
    }

    game.addAnswer(isSelectedAnswerCorrect());
    game.changeLevel();

    renderScreen(game);
  };

  form.addEventListener(`change`, handleChange);

  return screen;
};
