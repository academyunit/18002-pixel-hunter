import GameTwoView from './game-two-view';
import {renderScreen} from '../game/index';

export default (game) => {
  const view = new GameTwoView(game);

  view.onChange = (isSelectedAnswerCorrect) => {
    game.addAnswer(isSelectedAnswerCorrect);
    game.changeLevel();

    renderScreen(game);
  };

  return view.element;
};
