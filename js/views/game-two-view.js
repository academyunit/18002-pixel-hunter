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

    form.addEventListener(`change`, (event) => {
      if (event.target.tagName !== `INPUT`) {
        return;
      }

      const answer = (event.target.value === this.level.answers[0].type);

      this.onAnswer(answer);
    });
  }

  onAnswer() {}
}
