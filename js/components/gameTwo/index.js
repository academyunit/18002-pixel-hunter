/**
 * @deprecated
 *
 * @todo: game* экраны будут обрабатываться компонентом game.
 * Нет особого смысла много раз дублировать код, ставляя их.
 */

import {changeView, getElementFromTemplate} from '../../util';
import screenGameThree from '../gameThree/index';
import getHeader from '../../markups/header';
import getFooter from "../../markups/footer";
import getStats from "../../markups/stats";

const getTemplate = ({title, lives, time}) => `
<header class="header">
  ${getHeader({lives: 3, time: 30})}
</header>
<div class="game">
  <p class="game__task">Угадай, фото или рисунок?</p>
  <form class="game__content  game__content--wide">
    <div class="game__option">
      <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
      <label class="game__answer  game__answer--photo">
        <input name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--wide  game__answer--paint">
        <input name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
  </form>
  ${getStats()}
</div>
${getFooter()}
`;

export default (options = {}) => {
  const screen = getElementFromTemplate(getTemplate(options));

  const form = screen.querySelector(`.game__content`);
  const answers = Array.from(form.querySelectorAll(`input[type="radio"]`));

  const isAnswered = () => answers.some((answer) => answer.checked);
  const handleChange = () => {
    if (!isAnswered()) {
      return;
    }

    form.reset();

    changeView(screenGameThree());
  };

  form.addEventListener(`change`, handleChange);

  return screen;
};
