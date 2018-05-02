import AbstractView from '../views/abstract-view';
import renderQuestions from '../util/questions';
import {AnswerType} from '../data/game-config';

export default class GameThreeView extends AbstractView {

  constructor(level, statsBar) {
    super();
    this.level = level;
    this.statsBar = statsBar;
  }

  get template() {
    const {answers} = this.level;

    return `
    <div class="game">
      <p class="game__task">Найдите рисунок среди изображений</p>
      <form class="game__content  game__content--triple">
        ${renderQuestions(answers, true)}
      </form>
      ${this.statsBar}
    </div>
    `;
  }

  bind() {
    const form = this.element.querySelector(`.game__content`);
    const answersList = Array.from(form.querySelectorAll(`.game__option`));

    const resetAnswers = () => answersList.forEach((answer) => answer.classList.remove(`game__option--selected`));
    const setAnswer = (answer) => answer.classList.add(`game__option--selected`);
    const isSelectedAnswerCorrect = (answer) => {
      const {answers} = this.level;

      // Ищем правильный ответ в нашей структуре
      let answerIndex = -1;
      for (let i = 0; i < answers.length; i++) {
        if (answers[i].type === AnswerType.PAINTING) {
          answerIndex = i;
          break;
        }
      }

      // сравниваем только что выбранный DOM-элемент со списком остальных DOM-элементов.
      return (answers[answerIndex] === answer);
    };

    this.element.addEventListener(`click`, (event) => {
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
