import {Screens} from './screens';
import {removeElements} from './utils';

const stage = document.querySelector(`.central`);

/**
 * Получить экран по ID.
 *
 * @param {Number} id
 * @return {Node|null}
 */
const getScreenById = (id) => {
  if (!Screens[id]) {
    return null;
  }
  return Screens[id];
};

/**
 * Очистить сцену.
 */
const clearStage = () => {
  removeElements(stage);
};

/**
 * Добавить новый экран на сцену.
 *
 * @param {Node} screen
 */
const attachScreenToStage = (screen) => {
  stage.appendChild(screen);
};

/**
 * Рендер экрана приложения на сцену.
 *
 * @param {Number} screenId
 */
const renderScreenById = (screenId) => {
  const screen = getScreenById(screenId);
  if (!screen) {
    return;
  }

  clearStage();
  attachScreenToStage(screen);
};

export default renderScreenById;
