import {changeView} from './util';
import screenIntro from './components/intro/index';

/**
 * Обработчик кнопки Назад.
 *
 * @param {Event} event
 */
export default (event) => {
  let target = event.target;

  while (target !== event.currentTarget) {
    if (target.tagName === `BUTTON` && target.className === `back`) {
      changeView(screenIntro());
      return;
    }

    target = target.parentNode;
  }
};
