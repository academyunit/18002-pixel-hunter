import stage from './stage';
import renderStageScreen from './render-screen';

/**
 * Здесь появляется ошибка почему-то про renderStageScreen is undefined
 */
//
///**
// * Декоратор-обработчик переключения скринов.
// */
//export const switchScreenOnAnswer = (nextScreenId) => (element, callback) => {
//  if (callback) {
//    //renderStageScreen(stage, nextScreenId);
//  }
//
//  return element;
//};

export const switchScreenOnAnswer = (nextScreenId) => {
  renderStageScreen(stage, nextScreenId);
};

/**
 * Декоратор-обработчик переключения скринов.
 */
export default (nextScreenId) => (element, selector) => {
  const control = element.querySelector(selector);

  control.addEventListener('click', () => {
    renderStageScreen(stage, nextScreenId);
  });

  return element;
};