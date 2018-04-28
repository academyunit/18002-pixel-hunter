import AbstractView from '../views/abstract-view';
import renderQuestions from '../questions/index';
import getStats from '../stats/index';

export default class GameTwoView extends AbstractView {

  constructor(game) {
    super();
    this.game = game;
  }

  get template() {
    const {task: {questions}} = this.game;

    return `
    <div class="game">
      <p class="game__task">Угадай, фото или рисунок?</p>
      <form class="game__content  game__content--wide">
        ${renderQuestions(questions)}
      </form>
      ${getStats()}
    </div>
    `;
  }

  bind() {
    const form = this._element.querySelector(`.game__content`);
    const answers = Array.from(form.querySelectorAll(`input[type="radio"]`));

    const isAnswered = () => answers.some((answer) => answer.checked);
    const isSelectedAnswerCorrect = () => {
      const {task: {questions}} = this.game.getLevel();

      for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked && answers[i].value === questions[0].type) {
          return true;
        }
      }

      return false;
    };

    this._element.addEventListener(`change`, (event) => {
      event.preventDefault();

      if (!isAnswered()) {
        return;
      }

      this.onChange(isSelectedAnswerCorrect());
    });
  }

  onChange() {

  }
}
