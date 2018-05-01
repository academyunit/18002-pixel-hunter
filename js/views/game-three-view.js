import AbstractView from '../views/abstract-view';
import renderQuestions from '../util/questions';

export default class GameThreeView extends AbstractView {

  constructor(level, statsBar) {
    super();
    this.level = level;
    this.statsBar = statsBar;
  }

  get template() {
    const {questions} = this.level;

    return `
    <div class="game">
      <p class="game__task">Найдите рисунок среди изображений</p>
      <form class="game__content  game__content--triple">
        ${renderQuestions(questions)}
      </form>
      ${this.statsBar}
    </div>
    `;
  }

  bind() {
    const form = this.element.querySelector(`.game__content`);
    const answers = Array.from(form.querySelectorAll(`.game__option`));

    const resetAnswers = () => answers.forEach((answer) => answer.classList.remove(`game__option--selected`));
    const setAnswer = (answer) => answer.classList.add(`game__option--selected`);
    const isSelectedAnswerCorrect = (answer) => {
      const {questions} = this.level;

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

      this.onAnswer(isSelectedAnswerCorrect(answer));
    });
  }

  onAnswer() {}
}
