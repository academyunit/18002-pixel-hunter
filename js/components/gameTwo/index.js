import GameTwoView from './game-two-view';
import {renderScreen} from '../game/index';

export default (game) => {
  const view = new GameTwoView(game);

  const form = view.element.querySelector(`.game__content`);
  const answers = Array.from(form.querySelectorAll(`input[type="radio"]`));

  /**
   * Есть ли смысл убрать функции вне export'a ? Чтобы каждый раз не создавать их.
   * С другой стороны, если это сделать - придется передавать им параметры и будет не так красиво уже.
   */
  const isAnswered = () => answers.some((answer) => answer.checked);
  const isSelectedAnswerCorrect = () => {
    const {task: {questions}} = game.getLevel();

    // какой-то вариант получще должен быть это делать
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].checked && answers[i].value === questions[0].type) {
        return true;
      }
    }

    return false;
  };

  view.onChange = () => {
    if (!isAnswered()) {
      return;
    }

    game.addAnswer(isSelectedAnswerCorrect());
    game.changeLevel();

    renderScreen(game);
  };

  return view.element;
};
