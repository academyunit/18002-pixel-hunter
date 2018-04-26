import AbstractView from '../views/abstract-view';
import renderQuestions from '../questions/index';
import getHeader from '../header/index';
import getFooter from '../footer/index';
import getStats from '../stats/index';

export default class GameThreeView extends AbstractView {
  get template() {
    const {task: {questions}, ...rest} = this.game;

    return `
      <header class="header">
        ${getHeader(rest)}
      </header>
      <div class="game">
        <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
        <form class="game__content">
          ${renderQuestions(questions)}
        </form>
        ${getStats()}
      </div>
    `;
  };

  bind() {
    this._element.addEventListener('change', (event) => {
      event.preventDefault();

      this.onChange(event);
    });
  }

  onChange() {}
}