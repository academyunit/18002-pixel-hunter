import AbstractView from '../views/abstract-view';
import renderQuestions from '../util/questions';

export default class GameOneView extends AbstractView {

  constructor(level, statsBar) {
    super();
    this.level = level;
    this.statsBar = statsBar;
  }

  get template() {
    const {questions} = this.level;

    return `
      <div class="game">
        <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
        <form class="game__content">
          ${renderQuestions(questions)}
        </form>
        ${this.statsBar}
      </div>
    `;
  }

  /**
   * @todo: спросить Леонида как избавиться от порнографии снизу тут и в остальных вьюхах - как эффективнее всего с контролами работать... :)
   */
  bind() {
    const ANSWERS_REQUIRED = 2;

    const form = this.element.querySelector(`.game__content`);
    const answers = Array.from(form.querySelectorAll(`input[type="radio"]`));
    const answer1 = Array.from(form.querySelectorAll(`input[name="question1"]`));
    const answer2 = Array.from(form.querySelectorAll(`input[name="question2"]`));

    // логику проверки вопросов можно сделать получше
    const checkAnswer = (answer, correctValue) => answer.findIndex((control) => control.checked && control.value === correctValue) > -1;
    const isAnswered = () => answers.filter((answer) => answer.checked).length === ANSWERS_REQUIRED;
    const isCorrectAnswer = () => {
      const {questions} = this.level;

      return checkAnswer(answer1, questions[0].type) && checkAnswer(answer2, questions[1].type);
    };

    this._element.addEventListener(`change`, (event) => {
      event.preventDefault();

      if (!isAnswered()) {
        return;
      }

      this.onAnswer(isCorrectAnswer());
    });
  }

  onAnswer() {}
}
