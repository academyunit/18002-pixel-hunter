import {changeView, getElementFromTemplate} from '../../util';
import headerBack from '../../markups/header-back';
import headerTimer from '../../markups/header-timer';
import headerLives from '../../markups/header-lives';
import footer from '../../markups/footer';
import currentStats from '../../markups/current-stats';
import screenGameTwo from '../gameTwo/index';
import handleGoBackClick from '../../go-back';

const template = getElementFromTemplate(`
<header class="header">
  ${headerBack}
  ${headerTimer}
  ${headerLives(3, 2)}
</header>
<div class="game">
  <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
  <form class="game__content">
    <div class="game__option">
      <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
    <div class="game__option">
      <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
      <label class="game__answer  game__answer--photo">
        <input name="question2" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input name="question2" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
  </form>
  ${currentStats}
</div>
${footer}
`);

export default () => {
  const ANSWERS_REQUIRED = 2;

  const screen = template.cloneNode(true);
  const form = screen.querySelector(`.game__content`);
  const answers = Array.from(form.querySelectorAll(`input[type="radio"]`));

  const isAnswered = () => answers.filter((answer) => answer.checked).length === ANSWERS_REQUIRED;
  const handleChange = () => {
    if (!isAnswered()) {
      return;
    }

    changeView(screenGameTwo());
  };

  form.addEventListener(`change`, handleChange);
  screen.addEventListener(`click`, handleGoBackClick);

  return screen;
};
