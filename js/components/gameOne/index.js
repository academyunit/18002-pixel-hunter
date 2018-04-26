import GameOneView from './game-one-view';
import {renderScreen} from '../game/index';

const ANSWERS_REQUIRED = 2;

export default (game) => {
  const view = new GameOneView(game);

  const form = view.element.querySelector(`.game__content`);
  const answers = Array.from(form.querySelectorAll(`input[type="radio"]`));
  const answer1 = Array.from(form.querySelectorAll(`input[name="question1"]`));
  const answer2 = Array.from(form.querySelectorAll(`input[name="question2"]`));

  // логику проверки вопросов можно сделать получше
  const checkAnswer = (answer, correctValue) => answer.findIndex((control) => control.checked && control.value === correctValue) > -1;
  const isAnswered = () => answers.filter((answer) => answer.checked).length === ANSWERS_REQUIRED;
  const isCorrectAnswer = () => {
    const {task: {questions}} = game.getLevel();

    return checkAnswer(answer1, questions[0].type) && checkAnswer(answer2, questions[1].type);
  };

  view.onChange = () => {
    if (!isAnswered()) {
      return;
    }
    game.addAnswer(isCorrectAnswer());
    game.changeLevel();
    renderScreen(game);
  };

  return view.element;
};
