import {ScreenName} from './screens';
import renderScreenById from './render-screen';

/**
 * Обработчик кнопки Назад.
 *
 * @param {Event} event
 */
export default (event) => {
  let target = event.target;

  while (target !== event.currentTarget) {
    if (target.tagName === `BUTTON` && target.className === `back`) {
      renderScreenById(ScreenName.INTRO);
      return;
    }

    target = target.parentNode;
  }
};
