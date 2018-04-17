/**
 * @deprecated
 *
 * @todo: game* экраны будут обрабатываться компонентом game.
 * Нет особого смысла много раз дублировать код, ставляя их.
 */

import {changeView, getElementFromTemplate} from '../../util';
import getHeader from '../../markups/header';
import getFooter from '../../markups/footer';
import getStats from '../../markups/stats';
import screenGameTwo from '../gameTwo/index';

const ANSWERS_REQUIRED = 2;

const getTemplate = ({title, lives, time}) => `
<header class="header">
  ${getHeader({lives, time})}
</header>
<div class="game">
  <p class="game__task">${title}Угадайте для каждого изображения фото или рисунок?</p>
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
  ${getStats()}
</div>
${getFooter()}
`;

export default (options = {}) => {
  const screen = getElementFromTemplate(getTemplate(options));
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

  return screen;
};
