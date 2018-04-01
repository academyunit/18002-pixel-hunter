import Screens from './screens';
import {removeElements} from './utils';

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
const clearStage = (stage) => {
  removeElements(stage);
};

/**
 * Добавить новый экран на сцену.
 *
 * @param {Node} stage
 * @param {Node} screen
 */
const attachScreenToStage = (stage, screen) => {
  stage.appendChild(screen);
};

/**
 * Рендер экрана приложения на сцену.
 *
 * @param {Node} stage
 * @param {Number} screenId
 */
const renderStageScreen = (stage, screenId) => {
  const screen = getScreenById(screenId);
  if (!screen) {
    return;
  }

  clearStage(stage);
  attachScreenToStage(stage, screen);
};

export default renderStageScreen;