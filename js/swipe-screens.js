/**
 * @todo: удалить, наверное, больше не нужно.
 */
//import keyboardControls from './keyboard-helper';
//
///**
// * Обработчик перелистывания скринов влево/вправо.
// *
// * @param {Event} event
// */
//const onSwipeScreen = (event) => {
//  const keyCode = event.keyCode;
//
//  if (!event.altKey) {
//    return;
//  }
//
//  if (keyboardControls.isLeftArrow(keyCode)) {
//    showPreviousScreen();
//  }
//  if (keyboardControls.isRightArrow(keyCode)) {
//    showNextScreen();
//  }
//};
//
///**
// * Показать предыдущий экран.
// */
//const showPreviousScreen = () => {
//  const newScreenId = state.currentScreenId - 1;
//  if (newScreenId < getFirstIntroScreenId()) {
//    return;
//  }
//
//  renderStageScreen(newScreenId);
//};
//
///**
// * Показать следующий экран.
// */
//const showNextScreen = () => {
//  const newScreenId = state.currentScreenId + 1;
//  if (newScreenId > getLastIntroScreenId()) {
//    return;
//  }
//
//  renderStageScreen(newScreenId);
//};
//
//export default onSwipeScreen;