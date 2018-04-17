import {changeView, getElementFromTemplate} from '../../util';
import screenGameOne from '../gameOne/index';
import getHeader from '../../markups/header';
import getFooter from "../../markups/footer";

const template = getElementFromTemplate(`
<header class="header">
  ${getHeader({})}
</header>
<div class="rules">
  <h1 class="rules__title">Правила</h1>
  <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
    src="img/photo_icon.png" width="16" height="16"> или рисунок <img
    src="img/paint_icon.png" width="16" height="16" alt="">.<br>
    Фотографиями или рисунками могут быть оба изображения.<br>
    На каждую попытку отводится 30 секунд.<br>
    Ошибиться можно не более 3 раз.<br>
    <br>
    Готовы?
  </p>
  <form class="rules__form">
    <input class="rules__input" type="text" placeholder="Ваше Имя">
    <button class="rules__button  continue" type="submit" disabled>Go!</button>
  </form>
</div>
${getFooter()}
`);

export default () => {
  const screen = template.cloneNode(true);

  const form = screen.querySelector(`.rules__form`);
  const inputField = form.querySelector(`.rules__input`);
  const submitButton = form.querySelector(`.rules__button`);

  const handleInput = (event) => {
    submitButton.disabled = !event.target.value;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    submitButton.disabled = true;

    changeView(screenGameOne());
  };

  inputField.addEventListener(`input`, handleInput);
  form.addEventListener(`submit`, handleSubmit);

  return screen;
};
