import GameOneView from './game-one-view';
import {renderScreen} from '../game/index';

export default (game) => {
  const view = new GameOneView(game);

  view.onChange = (isCorrectAnswer) => {
    game.addAnswer(isCorrectAnswer);
    game.changeLevel();

    renderScreen(game);
  };

  return view.element;
};
