import AbstractView from '../views/abstract-view';
import getHeader from '../header/index';

export default class RulesView extends AbstractView {
  get template() {
    return `
    <header class="header">
      ${getHeader()}
    </header>
    <div class="rules">
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
        src="img/photo_icon.png" width="16" height="16"> или рисунок <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На каждую попытку отводится 30 секунд.<br>
        Ошибиться можно не более 3 раз.<br>
        <br>
        Готовы?
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </div>
    `;
  }

  bind() {
    // это хорошая идея вот так вот делать?
    this.form = this._element.querySelector(`.rules__form`);
    this.inputField = this.form.querySelector(`.rules__input`);
    this.submitButton = this.form.querySelector(`.rules__button`);

    this._element.addEventListener('input', (event) => {
      event.preventDefault();

      this.onInput(event);
    });
    this._element.addEventListener('submit', (event) => {
      event.preventDefault();

      this.onSubmit(event);
    });
  }

  onInput() {}
  onSubmit() {}
}