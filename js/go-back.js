import stage from './stage';
import {ScreenName} from './constants';
import Screens from './screens';
import renderStageScreen from 'render-screen';

export default (element) => {
  const backButton = element.querySelector('button.back');

  backButton.addEventListener('click', function() {
    renderStageScreen(stage, Screens.INTRO);
  });

  return element;
}