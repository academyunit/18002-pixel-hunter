import GreetingView from './greeting-view';
import {renderScreen} from '../game/index';

export default (game) => {
  const view = new GreetingView();

  view.onClick = () => {
    game.changeLevel();
    renderScreen(game);
  };

  return view.element;
};
