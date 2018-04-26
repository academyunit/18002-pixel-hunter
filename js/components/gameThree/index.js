import GameThreeView from './game-three-view';
import {renderScreen} from '../game/index';

export default (game) => {
  const view = new GameThreeView(game);

  // Здесь приходится обращаться через view.element...
  const form = view.element.querySelector(`.game__content`);
  const answers = Array.from(form.querySelectorAll(`.game__option`));

  // логику проверки вопросов можно сделать получше
  const resetAnswers = () => answers.forEach((answer) => answer.classList.remove(`game__option--selected`));
  const setAnswer = (answer) => answer.classList.add(`game__option--selected`);
  const isSelectedAnswerCorrect = (answer) => {
    const {task: {questions}} = game.getLevel();

    // Ищем правильный ответ в нашей структуре
    let questionIndex = -1;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].isSelected) {
        questionIndex = i;
        break;
      }
    }

    // сравниваем только что выбранный DOM-элемент со списком остальных DOM-элементов.
    return (answers[questionIndex] === answer);
  };

  view.onClick = (event) => {
    const answer = event.target.closest(`.game__option`);
    if (!answer) {
      return;
    }

    resetAnswers();
    setAnswer(answer);

    game.addAnswer(isSelectedAnswerCorrect(answer));
    game.changeLevel();

    renderScreen(game);
  };

  return view.element;
};
