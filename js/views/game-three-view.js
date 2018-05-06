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
    const {answers, question} = this.level;

    return `
      <div class="game">
        <p class="game__task">${question}</p>
        <form class="game__content  game__content--triple">
          ${renderQuestions(answers, true)}
        </form>
        ${this.statsBar}
      </div>
    `;
  }

  getCorrectAnswerType() {
    const availableTypesCount = {
      [AnswerType.PAINTING]: 0,
      [AnswerType.PHOTO]: 0
    };
    const {answers} = this.level;

    for (const answer of answers) {
      availableTypesCount[answer.type]++;

      if (availableTypesCount[AnswerType.PAINTING] > 1) {
        return AnswerType.PHOTO;
      }
    }

    return AnswerType.PAINTING;
  }

  getCurrentAnswerType(answer) {
    const {answers} = this.level;
    const answersList = Array.from(this.element.querySelectorAll(`.game__option`));
    const currentAnswerIndex = answersList.indexOf(answer);

    return answers[currentAnswerIndex] ? answers[currentAnswerIndex].type : ``;
  }

  bind() {
    const markSelectedAnswer = (answer) => answer.classList.add(`game__option--selected`);

    this.element.addEventListener(`click`, (event) => {
      event.preventDefault();

      const inputControl = event.target.closest(`.game__option`);
      if (!inputControl) {
        return;
      }

      markSelectedAnswer(inputControl);

      const answer = this.getCorrectAnswerType() === this.getCurrentAnswerType(inputControl);

      this.onAnswer(answer);
    });
  }

  onAnswer() {}
}
