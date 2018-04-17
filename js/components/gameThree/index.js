/**
 * @deprecated
 *
 * @todo: game* экраны будут обрабатываться компонентом game.
 * Нет особого смысла много раз дублировать код, ставляя их.
 */

import {changeView, getElementFromTemplate} from '../../util';
import screenStats from '../stats/index';
import getHeader from '../../markups/header';
import getFooter from "../../markups/footer";
import getStats from "../../markups/stats";

const getTemplate = ({title, lives, time}) => `
<header class="header">
  ${getHeader({lives: 3, time: 30})}
</header>
<div class="game">
  <p class="game__task">Найдите рисунок среди изображений</p>
  <form class="game__content  game__content--triple">
    <div class="game__option">
      <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
    </div>
    <div class="game__option  game__option--selected">
      <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
    </div>
    <div class="game__option">
      <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
    </div>
  </form>
  ${getStats()}
</div>
${getFooter()}
`;

export default (options = {}) => {
  const screen = getElementFromTemplate(getTemplate(options));

  const form = screen.querySelector(`.game__content`);
  const answers = Array.from(screen.querySelectorAll(`.game__option`));

  const resetAnswers = () => answers.forEach((answer) => answer.classList.remove(`game__option--selected`));
  const setAnswer = (answer) => answer.classList.add(`game__option--selected`);

  const handleClick = (event) => {
    const answer = event.target.closest(`.game__option`);
    if (!answer) {
      return;
    }

    resetAnswers();
    setAnswer(answer);

    changeView(screenStats());
  };

  form.addEventListener(`click`, handleClick);

  return screen;
};
