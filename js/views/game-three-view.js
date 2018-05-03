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

  bind() {
    const markSelectedAnswer = (answer) => answer.classList.add(`game__option--selected`);
    const isCorrectAnswer = (answer) => {
      const answersList = Array.from(this.element.querySelectorAll(`.game__option`));

      const selectedAnswerIndex = answersList.indexOf(answer);
      const correctAnswerIndex = getCorrectAnswerIndex();

      return (selectedAnswerIndex === correctAnswerIndex);
    };

    // Один проход по массиву -  O(n) ! :)
    const getCorrectAnswerIndex = () => {
      const {answers} = this.level;

      let availableTypes = {
        [AnswerType.PAINTING]: 0,
        [AnswerType.PHOTO]: 0
      };

      let correctAnswerIndex = -1;
      for (let i = 0; i < answers.length; i++) {
        const imageType = answers[i].type;

        availableTypes[imageType]++;

        if (availableTypes[imageType] < 2) {
          correctAnswerIndex = i;
        }
      }

      return correctAnswerIndex;
    };

    this.element.addEventListener(`click`, (event) => {
      event.preventDefault();

      const answer = event.target.closest(`.game__option`);
      if (!answer) {
        return;
      }

      markSelectedAnswer(answer);

      this.onAnswer(isCorrectAnswer(answer));
    });
  }

  onAnswer() {}
}
