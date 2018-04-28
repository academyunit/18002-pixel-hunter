import IntroView from './intro-view';
import {renderScreen} from '../game/index';

export default (game) => {
  const view = new IntroView();

  view.onClick = () => {
    game.changeLevel();
    renderScreen(game);
  };

  return view.element;
};
