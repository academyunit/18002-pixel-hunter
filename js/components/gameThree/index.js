import GameThreeView from './game-three-view';
import {renderScreen} from '../game/index';

export default (game) => {
  const view = new GameThreeView(game);

  view.onClick = (isCorrectAnswer) => {
    game.addAnswer(isCorrectAnswer);
    game.changeLevel();

    renderScreen(game);
  };

  return view.element;
};
