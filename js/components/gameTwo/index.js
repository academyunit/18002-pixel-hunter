import {changeView, getElementFromTemplate} from '../../util';
import screenGameThree from '../gameThree/index';
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
  ${currentStats}
</div>
${footer}
`);

export default () => {
  const screen = template.cloneNode(true);

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
  screen.addEventListener(`click`, handleGoBackClick);

  return screen;
};
