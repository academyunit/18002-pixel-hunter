import {ScreenName} from '../constants';
import getElementFromTemplate from '../templater.js';
import switchScreen from '../switch-screen';
/**
 * почему-то не работает. Начинает выдавать странные ошибки в файле main.js, что renderStageScene() is undefined.
 * похоже, что когда делаешь import'ы renderStageScene() в нескольких местах, то перестает работать вообще
 */
//import goBack from '../go-back';

const template = getElementFromTemplate(`
<header class="header">
  <div class="header__back">
    <button class="back">
      <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
      <img src="img/logo_small.svg" width="101" height="44">
    </button>
  </div>
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
<footer class="footer">
  <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
  <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
  <div class="footer__social-links">
    <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
    <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
    <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
    <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
  </div>
</footer>
`);

const processUserInput = () => {
  const form = template.querySelector('.rules__form');
  const formInput = template.querySelector('.rules__input');
  const formSubmitButton = form.querySelector('.rules__button');

  /**
   * @todo: не работает submit в форме. Выдает ошибку:
   * "Form submission canceled because the form is not connected"
   *
   * Гуглил эту штуку, пишут что это из-за того, что форма еще не находится
   * в document.body.
   *
   * Что тут можно сделать? Неужели каким-то образом обработчики ставить в другом
   * месте все?
   */
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    console.log('form submit');
  });

  formInput.addEventListener('keyup', function() {
    if (!this.value) {
      formSubmitButton.setAttribute('disabled', 'disabled');
      return;
    }
    formSubmitButton.removeAttribute('disabled');
  });
};

processUserInput();

export default /*goBack*/(switchScreen(ScreenName.GAME_1)(template, '.rules__button'));