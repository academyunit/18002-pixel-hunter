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
const ScreenName = {
  GREETING: 0,
  RULES: 1,
  GAME_1: 2,
  GAME_2: 3,
  GAME_3: 4,
  STATS: 5
};

/** Шаблоны экранов игры */
const Screens = [
  document.getElementById(`greeting`),
  document.getElementById(`rules`),
  document.getElementById(`game-1`),
  document.getElementById(`game-2`),
  document.getElementById(`game-3`),
  document.getElementById(`stats`)
];

/**
 * Кнопки клавиатуры.
 */
const KeyboardKey = {
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39
};

/**
 * @todo: Почему с маленькой? Это же вроде своего рода хелпер, разве они не должны с заглавной называться?
 */
const keyboardControls = {
  isLeftArrow: (keyCode) => keyCode === KeyboardKey.ARROW_LEFT,
  isRightArrow: (keyCode) => keyCode === KeyboardKey.ARROW_RIGHT
};

/** Состояние приложения. Пока тут только текущий активный скрин. */
const state = {
  currentScreenId: ScreenName.GREETING
};
/** Сцена */
const stage = document.querySelector(`.central`);

/**
 * ID первого intro-экрана.
 *
 * @return {number}
 */
const getFirstIntroScreenId = () => ScreenName.GREETING;

/**
 * ID последнего intro-экрана.
 *
 * @return {number}
 */
const getLastIntroScreenId = () => ScreenName.RULES;

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

  return Screens[id].content.cloneNode(true);
};

/**
 * Обновить значение текущего currentScreenId
 *
 * @param {Number} id
 */
const setCurrentScreenId = (id) => {
  state.currentScreenId = id;
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
 * @param {Node} newScreen
 */
const attachScreenToStage = (newScreen) => {
  stage.appendChild(newScreen);
};

/**
 * Отрисовка/смена экрана на сцене.
 *
 * @param {Number} screenId
 */
const renderStageScreen = (screenId) => {
  const newScreen = getScreenById(screenId);
  if (!newScreen) {
    return;
  }
  setCurrentScreenId(screenId);
  clearStage();
  attachScreenToStage(newScreen);
};

/**
 * Удалить элементы из DOM'a.
 *
 * @param {Node} node
 */
const removeElements = (node) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

/**
 * Обработчик перелистывания скринов влево/вправо.
 *
 * @param {Event} event
 */
const onSwipeScreen = (event) => {
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
};

/**
 * Показать предыдущий экран.
 */
const showPreviousScreen = () => {
  const newScreenId = state.currentScreenId - 1;
  if (newScreenId < getFirstIntroScreenId()) {
    return;
  }

  renderStageScreen(newScreenId);
};

/**
 * Показать следующий экран.
 */
const showNextScreen = () => {
  const newScreenId = state.currentScreenId + 1;
  if (newScreenId > getLastIntroScreenId()) {
    return;
  }

  renderStageScreen(newScreenId);
};

/**
 * Обработчики переключения экранов по ALT + LEFT/RIGHT.
 */
document.addEventListener(`keyup`, onSwipeScreen);

/**
 * Рендер сцены и экрана на ней.
 */
renderStageScreen(ScreenName.GREETING);
