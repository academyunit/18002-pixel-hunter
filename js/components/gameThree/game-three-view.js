import AbstractView from '../views/abstract-view';
import renderQuestions from '../questions/index';
import getHeader from '../header/index';
import getStats from '../stats/index';

export default class GameThreeView extends AbstractView {
  get template() {
    const {task: {questions}, ...rest} = this.game;

    return `
    <header class="header">
      ${getHeader(rest)}
    </header>
    <div class="game">
      <p class="game__task">Найдите рисунок среди изображений</p>
      <form class="game__content  game__content--triple">
        ${renderQuestions(questions)}
      </form>
      ${getStats()}
    </div>
    `;
  };

  bind() {
    // это хорошая идея вот так вот делать? проблема в том, что если обращаться к view.form до вызова view.element - все падает
    //this.form = this._element.querySelector(`.game__content`);

    this._element.addEventListener('click', (event) => {
      event.preventDefault();

      this.onClick(event);
    });
  }

  onClick() {}
}