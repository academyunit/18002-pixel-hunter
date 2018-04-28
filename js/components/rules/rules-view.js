import AbstractView from '../views/abstract-view';

export default class RulesView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }

  get template() {
    return `
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
    const form = this._element.querySelector(`.rules__form`);
    const inputField = form.querySelector(`.rules__input`);
    const submitButton = form.querySelector(`.rules__button`);

    inputField.addEventListener(`input`, (event) => {
      event.preventDefault();

      submitButton.disabled = !event.target.value;
    });

    form.addEventListener(`submit`, (event) => {
      event.preventDefault();

      submitButton.disabled = true;

      this.onSubmitName(inputField.value);
    });
  }

  onSubmitName() {}
}
