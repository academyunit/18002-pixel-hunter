import IntroView from './intro-view';
import {renderScreen} from '../game/index';

export default (game) => {
  const view = new IntroView();

  view.onClick = (event) => {
    if (event.target.className === `intro__asterisk`) {
      game.changeLevel();
      renderScreen(game);
    }
  };

  return view.element;
};
