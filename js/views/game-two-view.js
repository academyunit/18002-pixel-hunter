import AbstractView from '../views/abstract-view';
import renderQuestions from '../util/questions';

/**
 * Одна картинка
 */
export default class GameTwoView extends AbstractView {

  constructor(level, statsBar) {
    super();
    this.level = level;
    this.statsBar = statsBar;
  }

  get template() {
    const {answers} = this.level;

    return `
    <div class="game">
      <p class="game__task">Угадай, фото или рисунок?</p>
      <form class="game__content  game__content--wide">
        ${renderQuestions(answers)}
      </form>
      ${this.statsBar}
    </div>
    `;
  }

  bind() {
    const form = this.element.querySelector(`.game__content`);
    const answersList = Array.from(form.querySelectorAll(`input[type="radio"]`));

    const isAnswered = () => answersList.some((answer) => answer.checked);
    const isSelectedAnswerCorrect = () => {
      const {answers} = this.level;

      for (let i = 0; i < answersList.length; i++) {
        if (answersList[i].checked && answersList[i].value === answers[0].type) {
          return true;
        }
      }

      return false;
    };

    this.element.addEventListener(`change`, (event) => {
      event.preventDefault();

      if (!isAnswered()) {
        return;
      }

      this.onAnswer(isSelectedAnswerCorrect());
    });
  }

  onAnswer() {}
}
