import AbstractView from '../views/abstract-view';
import renderQuestions from '../questions/index';
import getStats from '../stats/index';

export default class GameThreeView extends AbstractView {

  /**
   * Одинаковый конструктор дублируется в игровых вьюхах (GameXXXView). Может создать GameView с ним и отнаследоваться от нее?
   * Будет такое наследование: GameThreeView - GameView - AbstractView
   *
   * @param {Object} game
   */
  constructor(game) {
    super();
    this.game = game;
  }

  get template() {
    const {task: {questions}} = this.game;

    return `
    <div class="game">
      <p class="game__task">Найдите рисунок среди изображений</p>
      <form class="game__content  game__content--triple">
        ${renderQuestions(questions)}
      </form>
      ${getStats()}
    </div>
    `;
  }

  bind() {
    const form = this._element.querySelector(`.game__content`);
    const answers = Array.from(form.querySelectorAll(`.game__option`));

    const resetAnswers = () => answers.forEach((answer) => answer.classList.remove(`game__option--selected`));
    const setAnswer = (answer) => answer.classList.add(`game__option--selected`);
    const isSelectedAnswerCorrect = (answer) => {
      const {task: {questions}} = this.game.getLevel();

      // Ищем правильный ответ в нашей структуре
      let questionIndex = -1;
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].isSelected) {
          questionIndex = i;
          break;
        }
      }

      // сравниваем только что выбранный DOM-элемент со списком остальных DOM-элементов.
      return (answers[questionIndex] === answer);
    };

    this._element.addEventListener(`click`, (event) => {
      event.preventDefault();

      const answer = event.target.closest(`.game__option`);
      if (!answer) {
        return;
      }

      resetAnswers();
      setAnswer(answer);

      this.onClick(isSelectedAnswerCorrect(answer));
    });
  }

  onClick() {}
}
