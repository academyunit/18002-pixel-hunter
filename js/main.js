(() => {
  /** Screen names */
  const ScreenNames = {
    Greeting: 0,
    Rules: 1,
    Game1: 2,
    Game2: 3,
    Game3: 4,
    Stats: 5
  };

  const KeyboardKeys = {
    ARROW_LEFT: 37,
    ARROW_RIGHT: 39,
  };

  const Keyboard = {
    isAlt: (keyCode) => keyCode === KeyboardKeys.ALT,
    isLeftArrow: (keyCode) => keyCode === KeyboardKeys.ARROW_LEFT,
    isRightArrow: (keyCode) => keyCode === KeyboardKeys.ARROW_RIGHT
  };

  /** Entities */
  let currentScreen = -1;
  const stage = document.querySelector(`.central`);
  const gameScreens = document.querySelectorAll(`template`);

  /**
   * Get min allowed screen ID.
   * @return {number}
   */
  function getMinAllowedScreenId() {
    return ScreenNames.Greeting;
  }

  /**
   * Get max allowed screen ID.
   * @return {number}
   */
  function getMaxAllowedScreenId() {
    return ScreenNames.Rules;
  }

  /**
   * Get screen by its ID.
   *
   * @param {Number} id
   * @return {Node|null}
   */
  function getScreenById(id) {
    if (!gameScreens[id]) {
      return null;
    }
    currentScreen = id;

    return gameScreens[id].content.cloneNode(true);
  }

  /**
   * Clear out the stage.
   */
  function clearStage() {
    removeElements(stage);
  }

  /**
   * Cha
   *
   * @param {Number} screenId
   */
  function changeStageScreen(screenId) {
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
   * @param {Event} ev
   */
  function onKeyUp(ev) {
    const keyCode = ev.keyCode;

    if (!ev.altKey) {
      return;
    }

    if (Keyboard.isLeftArrow(keyCode)) {
      const newScreenId = currentScreen - 1;
      if (newScreenId < getMinAllowedScreenId()) {
        return;
      }

      changeStageScreen(newScreenId);
    }
    if (Keyboard.isRightArrow(keyCode)) {
      const newScreenId = currentScreen + 1;
      if (newScreenId > getMaxAllowedScreenId()) {
        return;
      }

      changeStageScreen(newScreenId);
    }
  }

  /**
   * Run app and register handlers.
   */
  document.addEventListener(`keyup`, onKeyUp);

  changeStageScreen(ScreenNames.Greeting);
})();
