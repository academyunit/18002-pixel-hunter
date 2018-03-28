/**
 * Связь: константа - номер экрана игры. (SCREEN_NAMES и SCREENS)
 *
 * Но уже, как обсуждали, не понятно пока как это лучше сделать :)
 *
 * Было бы проще в SCREEN_NAMES сразу положить шаблоны... (Например:
 * {
 * GREETING: document.getElementById('greeting')
 * ...
 * }
 */
const SCREEN_NAMES = {
  GREETING: 0,
  RULES: 1,
  GAME_1: 2,
  GAME_2: 3,
  GAME_3: 4,
  STATS: 5
};

/** Шаблоны экранов игры */
const SCREENS = [
  document.getElementById(`greeting`),
  document.getElementById(`rules`),
  document.getElementById(`game-1`),
  document.getElementById(`game-2`),
  document.getElementById(`game-3`),
  document.getElementById(`stats`),
];

/**
 * Кнопки клавиатуры.
 */
const KEYBOARD_KEYS = {
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39,
};

/**
 * @todo: Почему с маленькой? Это же вроде своего рода хелпер, разве они не должны с заглавной называться?
 */
const keyboardControls = {
  isAlt: (keyCode) => keyCode === KEYBOARD_KEYS.ALT,
  isLeftArrow: (keyCode) => keyCode === KEYBOARD_KEYS.ARROW_LEFT,
  isRightArrow: (keyCode) => keyCode === KEYBOARD_KEYS.ARROW_RIGHT
};

/** Состояние приложения. Пока тут только текущий активный скрин. */
const state = {
  currentScreen: SCREEN_NAMES.GREETING
};
/** Сцена */
const stage = document.querySelector(`.central`);

/**
 * ID первого intro-экрана.
 *
 * @return {number}
 */
function getFirstIntroScreenId() {
  return SCREEN_NAMES.GREETING;
}

/**
 * ID последнего intro-экрана.
 *
 * @return {number}
 */
function getLastIntroScreenId() {
  return SCREEN_NAMES.RULES;
}

/**
 * Получить экран по ID.
 *
 * @param {Number} id
 * @return {Node|null}
 */
function getScreenById(id) {
  if (!SCREENS[id]) {
    return null;
  }
  state.currentScreen = id;

  return SCREENS[id].content.cloneNode(true);
}

/**
 * Clear out the stage.
 */
function clearStage() {
  removeElements(stage);
}

/**
 * Отрисовка/смена экрана на сцене.
 *
 * @param {Number} screenId
 */
function renderStageScreen(screenId) {
  const newScreen = getScreenById(screenId);
  if (!newScreen) {
    return;
  }

  clearStage();
  stage.appendChild(newScreen);
}

/**
 * Remove children of a given node.
 *
 * @param {Node} node
 */
function removeElements(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

/**
 * On key up handler.
 *
 * @param {Event} event
 */
function onSwipeScreen(event) {
  const keyCode = event.keyCode;

  if (!event.altKey) {
    return;
  }

  if (keyboardControls.isLeftArrow(keyCode)) {
    showPreviousScreen();
  }
  if (keyboardControls.isRightArrow(keyCode)) {
    showNextScreen();
  }
}

/**
 * Показать предыдущий экран.
 */
function showPreviousScreen() {
  const newScreenId = state.currentScreen - 1;
  if (newScreenId < getFirstIntroScreenId()) {
    return;
  }

  renderStageScreen(newScreenId);
}

/**
 * Показать следующий экран.
 */
function showNextScreen() {
  const newScreenId = state.currentScreen + 1;
  if (newScreenId > getLastIntroScreenId()) {
    return;
  }

  renderStageScreen(newScreenId);
}

/**
 * Обработчики переключения экранов по ALT + LEFT/RIGHT.
 */
document.addEventListener(`keyup`, onSwipeScreen);

/**
 * Рендер сцены и экрана на ней.
 */
renderStageScreen(SCREEN_NAMES.GREETING);
