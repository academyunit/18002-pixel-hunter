import RulesView from './rules-view';
import {renderScreen} from '../game/index';

export default (game) => {
  const view = new RulesView(game);

  view.onInput = (event) => {
    view.submitButton.disabled = !event.target.value;
  };

  view.onSubmit = (event) => {
    event.preventDefault();
    view.submitButton.disabled = true;

    game.addPlayerName(view.inputField.value);
    game.changeLevel();
    renderScreen(game);

    event.target.reset();
  };

  return view.element;
};
