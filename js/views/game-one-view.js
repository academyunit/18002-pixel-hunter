import AbstractView from '../views/abstract-view';
import renderQuestions from '../util/questions';

const MIN_ANSWERS_REQUIRED = 2;

/**
 * Две картинки
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

  bind() {
    const form = this.element.querySelector(`.game__content`);

    form.addEventListener(`change`, (event) => {
      const {answers} = this.level;
      let checkedInputs;

      if (event.target.tagName !== `INPUT`) {
        return;
      }

      checkedInputs = Array.from(event.currentTarget).filter((input) => input.checked);
      if (checkedInputs.length < MIN_ANSWERS_REQUIRED) {
        return;
      }

      const answer = (
        checkedInputs[0].value === answers[0].type
        && checkedInputs[1].value === answers[1].type
      );

      this.onAnswer(answer);
    });
  }

  onAnswer() {}
}
