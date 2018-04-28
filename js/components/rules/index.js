import RulesView from './rules-view';
import {renderScreen} from '../game/index';

export default (game) => {
  const view = new RulesView(game);

  view.onSubmitName = (name) => {
    event.target.reset();

    game.addPlayerName(name);
    game.changeLevel();

    renderScreen(game);
  };

  return view.element;
};
