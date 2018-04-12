import {changeView, getElementFromTemplate} from '../../util';
import screenStats from '../stats/index';
import handleGoBackClick from '../../go-back';
import headerTimer from "../../markups/header-timer";
import headerLives from "../../markups/header-lives";
import headerBack from "../../markups/header-back";
import footer from "../../markups/footer";
import currentStats from "../../markups/current-stats";

const template = getElementFromTemplate(`
<header class="header">
  ${headerBack}
  ${headerTimer}
  ${headerLives(3, 2)}
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
  ${currentStats}
</div>
${footer}
`);

export default () => {
  const screen = template.cloneNode(true);

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
  screen.addEventListener(`click`, handleGoBackClick);

  return screen;
};
