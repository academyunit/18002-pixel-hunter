import AbstractView from '../views/abstract-view';
import renderQuestions from '../util/questions';

/**
 * 2 картинки
 */
export default class GameOneView extends AbstractView {

  constructor(level, statsBar) {
    super();
    this.level = level;
    this.statsBar = statsBar;
  }

  get template() {
    const {answers} = this.level;

    return `
      <div class="game">
        <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
        <form class="game__content">
          ${renderQuestions(answers)}
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
    const answersList = Array.from(form.querySelectorAll(`input[type="radio"]`));
    const answer1 = Array.from(form.querySelectorAll(`input[name="question1"]`));
    const answer2 = Array.from(form.querySelectorAll(`input[name="question2"]`));

    // логику проверки вопросов можно сделать получше
    const checkAnswer = (answer, correctValue) => answer.findIndex((control) => control.checked && control.value === correctValue) > -1;
    const isAnswered = () => answersList.filter((answer) => answer.checked).length === ANSWERS_REQUIRED;
    const isCorrectAnswer = () => {
      const {answers} = this.level;

      return checkAnswer(answer1, answers[0].type) && checkAnswer(answer2, answers[1].type);
    };

    this.element.addEventListener(`change`, (event) => {
      event.preventDefault();

      if (!isAnswered()) {
        return;
      }

      console.log('GameOneView', isCorrectAnswer());

      this.onAnswer(isCorrectAnswer());
    });
  }

  onAnswer() {}
}
