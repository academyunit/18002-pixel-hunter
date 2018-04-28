import AbstractView from '../views/abstract-view';
import renderQuestions from '../questions/index';
import getStats from '../stats/index';

export default class GameOneView extends AbstractView {

  constructor(game) {
    super();
    this.game = game;
  }

  get template() {
    const {task: {questions}} = this.game;

    return `
      <div class="game">
        <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
        <form class="game__content">
          ${renderQuestions(questions)}
        </form>
        ${getStats()}
      </div>
    `;
  }

  bind() {
    const ANSWERS_REQUIRED = 2;

    const form = this._element.querySelector(`.game__content`);
    const answers = Array.from(form.querySelectorAll(`input[type="radio"]`));
    const answer1 = Array.from(form.querySelectorAll(`input[name="question1"]`));
    const answer2 = Array.from(form.querySelectorAll(`input[name="question2"]`));

    // логику проверки вопросов можно сделать получше
    const checkAnswer = (answer, correctValue) => answer.findIndex((control) => control.checked && control.value === correctValue) > -1;
    const isAnswered = () => answers.filter((answer) => answer.checked).length === ANSWERS_REQUIRED;
    const isCorrectAnswer = () => {
      const {task: {questions}} = this.game.getLevel();

      return checkAnswer(answer1, questions[0].type) && checkAnswer(answer2, questions[1].type);
    };

    this._element.addEventListener(`change`, (event) => {
      event.preventDefault();

      if (!isAnswered()) {
        return;
      }

      this.onChange(isCorrectAnswer());
    });
  }

  onChange() {}
}
