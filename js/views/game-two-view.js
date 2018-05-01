import AbstractView from '../views/abstract-view';
import renderQuestions from '../util/questions';

export default class GameTwoView extends AbstractView {

  constructor(level, statsBar) {
    super();
    this.level = level;
    this.statsBar = statsBar;
  }

  get template() {
    console.log(this.level);
    const {questions} = this.level;

    return `
    <div class="game">
      <p class="game__task">Угадай, фото или рисунок?</p>
      <form class="game__content  game__content--wide">
        ${renderQuestions(questions)}
      </form>
      ${this.statsBar}
    </div>
    `;
  }

  bind() {
    const form = this.element.querySelector(`.game__content`);
    const answers = Array.from(form.querySelectorAll(`input[type="radio"]`));

    const isAnswered = () => answers.some((answer) => answer.checked);
    const isSelectedAnswerCorrect = () => {
      console.log('this.level', this.level);
      const {questions} = this.level;

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

      this.onAnswer(isSelectedAnswerCorrect());
    });
  }

  onAnswer() {}
}
