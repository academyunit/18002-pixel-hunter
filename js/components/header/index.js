import {Life} from '../../data/game-config';
import AbstractView from '../views/abstract-view';
// Вот здесь получается circular dependency. Header значет про game, game знает про header...
import {renderScreen} from '../game/index';

/**
 * Header
 */
export default class HeaderView extends AbstractView {

  constructor(game) {
    super();
    this.game = game;
  }

  bind() {
    const backButton = this._element.querySelector(`.back`);
    if (!backButton) {
      return;
    }

    backButton.addEventListener(`click`, () => {
      renderScreen(`back`);
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
   * Почему пишет что "method can be static"?
   * Чисто технически, вроде бы, логично, что если на инстанс класса метод не завязан, то
   * он может быть статическим. Какой критерий здесь для выбора динамика/статика для метода ? )
   *
   * @param {Boolean} full
   * @return {*}
   */
  static drawHeart(full) {
    return `<img src='img/heart__${full ? `full` : `empty`}.svg' class='game__heart' alt='Life' width='32' height='32'>`;
  }

  renderContentWithData() {
    const {timer, lives} = this.game;

    const fullLives = new Array(Life.count - lives).fill(this.constructor.drawHeart(false)).join(``);
    const emptyLives = new Array(lives).fill(this.constructor.drawHeart(true)).join(``);

    return `<h1 class='game__timer'>${timer}</h1>
          <div class='game__lives'>
            ${fullLives}
            ${emptyLives}
          </div>`;
  }
}
