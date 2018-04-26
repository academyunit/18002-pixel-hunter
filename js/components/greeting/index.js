import GreetingView from './greeting-view';
import {renderScreen} from '../game/index';

export default (game) => {
  const view = new GreetingView(game);

  view.onClick = (event) => {
    const target = event.target.closest(`.greeting__continue`);
    if (!target) {
      return;
    }
    game.changeLevel();
    renderScreen(game);
  };

  return view.element;
};
