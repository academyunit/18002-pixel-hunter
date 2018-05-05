import AbstractView from '../views/abstract-view';
import Application from '../application';
import {Life} from '../data/game-config';

export default class HeaderView extends AbstractView {

  constructor(game) {
    super();
    this.game = game;
  }

  updateTimer() {}

  bind() {
    const backButton = this.element.querySelector(`.back`);
    if (!backButton) {
      return;
    }

    backButton.addEventListener(`click`, (event) => {
      event.preventDefault();
      // eslint-disable-next-line
      if (confirm(`Вы хотите начать игру сначала? Весь текущий прогресс будет утерян!`)) {
        Application.showGreeting();
      }
    });
  }

  get template() {
    const gameProgressBar = this.game ? this.renderContentWithData() : ``;

    return `
      <header class='header'>
        <div class='header__back'>
          <button class='back'>
            <img src='img/arrow_left.svg' width='45' height='45' alt='Back'>
            <img src='img/logo_small.svg' width='101' height='44'>
          </button>
        </div>
        ${gameProgressBar}
      </header>
    `;
  }

  /**
   * @param {Boolean} full
   * @return {String}
   */
  drawHeart(full) {
    return `<img src='img/heart__${full ? `full` : `empty`}.svg' class='game__heart' alt='Life' width='32' height='32'>`;
  }

  renderContentWithData() {
    const {state: {time, lives}} = this.game;

    const fullLives = new Array(Life.COUNT - lives).fill(this.drawHeart(false)).join(``);
    const emptyLives = new Array(lives).fill(this.drawHeart(true)).join(``);

    return `<h1 class='game__timer'>${time}</h1>
          <div class='game__lives'>
            ${fullLives}
            ${emptyLives}
          </div>`;
  }

}
