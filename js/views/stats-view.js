import AbstractView from './abstract-view';
import {ANSWER_TIME, ANSWER_POINT, resultsData} from '../util/calc';

const getRow = (count, result) => {
  if (!count) {
    return ``;
  }
  return `<tr>
              <td></td>
              <td class="result__extra">${result.label}</td>
              <td class="result__extra">${count}&nbsp;<span class="stats__result stats__result--${result.icon}"></span></td>
              <td class="result__points">×&nbsp;${result.points}</td>
              <td class="result__total">${count * result.points}</td>
            </tr>`;
};

const templateWin = (i, stats, answers, lives, total) => {
  const correctAnswersCount = answers.filter((answer) => answer.answer === true).length;
  const fastAnswersCount = answers.filter((answer) => answer.time > ANSWER_TIME.fast).length;
  const slowAnswersCount = answers.filter((answer) => answer.time < ANSWER_TIME.slow).length;

  return `<h1>${resultsData.victoryTitle}</h1>
          <table class="result__table">
            <tr>
              <td class="result__number">${i}</td>
              <td colspan="2">
                ${stats}
              </td>
              <td class="result__points">×&nbsp;${ANSWER_POINT.default}</td>
              <td class="result__total">${correctAnswersCount * ANSWER_POINT.default}</td>
            </tr>
            ${getRow(fastAnswersCount, resultsData.fastResults)}
            ${getRow(lives, resultsData.livesResults)}
            ${getRow(slowAnswersCount, resultsData.slowResults)}
            <tr>
              <td colspan="5" class="result__total  result__total--final">${total}</td>
            </tr>
          </table>`;
};

const templateLoose = (i, stats) => `
    <h1>${resultsData.failTitle}</h1>
    <table class="result__table">
      <tr>
        <td class="result__number">${i}</td>
        <td colspan="2">
          ${stats}
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">${resultsData.failTitle}</td>
      </tr>
    </table>
`;

export default class StatsView extends AbstractView {
  constructor(total, answers, lives, stats) {
    super();
    this.total = total;
    this.answers = answers;
    this.lives = lives;
    this.stats = stats;
  }

  get template() {
    const results = this.total > 0
      ? templateWin(1, this.stats, this.answers, this.lives, this.total)
      : templateLoose(1, this.stats);

    return `<div class="result">${results}</div>`;
  }
}