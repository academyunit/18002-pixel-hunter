import AbstractView from './abstract-view';
import {AnswerTime, AnswerPoint, StatsConfig} from '../data/game-config';

export default class StatsView extends AbstractView {
  constructor({total, answers, lives, statsBar}) {
    super();
    this.total = total;
    this.answers = answers;
    this.lives = lives;
    this.statsBar = statsBar;
  }

  get template() {
    const results = this.total > 0
      ? this.getWinTemplate(this.answers, this.lives, this.statsBar, this.total, 1)
      : this.getLooseTemplate(this.statsBar, 1);

    return `
      <div class="result">
        ${results}
      </div>
      <div class="result result--history"></div>
    `;
  }

  getLooseTemplate(stats, i) {
    return `
      <h1>${StatsConfig.FAIL_TITLE}</h1>
      <table class="result__table">
        <tr>
          <td class="result__number">${i}</td>
          <td colspan="2">
            ${stats}
          </td>
          <td class="result__total"></td>
          <td class="result__total  result__total--final">${StatsConfig.FAIL_TITLE}</td>
        </tr>
      </table>
    `;
  }

  getWinTemplate(answers, lives, stats, total, i) {
    const correctAnswersCount = answers.filter((answer) => answer.answer === true).length;
    const fastAnswersCount = answers.filter((answer) => answer.time > AnswerTime.FAST).length;
    const slowAnswersCount = answers.filter((answer) => answer.time < AnswerTime.SLOW).length;

    return `
      <h1>${StatsConfig.VICTORY_TITLE}</h1>
      <table class="result__table">
        <tr>
          <td class="result__number">${i}</td>
          <td colspan="2">
            ${stats}
          </td>
          <td class="result__points">×&nbsp;${AnswerPoint.DEFAULT}</td>
          <td class="result__total">${correctAnswersCount * AnswerPoint.DEFAULT}</td>
        </tr>
        ${this.getRow(lives, StatsConfig.LIVES_RESULTS)}
        ${this.getRow(fastAnswersCount, StatsConfig.FAST_RESULTS)}
        ${this.getRow(slowAnswersCount, StatsConfig.SLOW_RESULTS)}
        <tr>
          <td colspan="5" class="result__total  result__total--final">${total}</td>
        </tr>
      </table>
    `;
  }

  getRow(count, result) {
    if (!count) {
      return ``;
    }
    return `
      <tr>
        <td></td>
        <td class="result__extra">${result.LABEL}</td>
        <td class="result__extra">${count}&nbsp;<span class="stats__result stats__result--${result.ICON}"></span></td>
        <td class="result__points">×&nbsp;${result.POINTS}</td>
        <td class="result__total">${count * result.POINTS}</td>
      </tr>
    `;
  }

  showScores(scores) {
    this.history.innerHTML = scores.reverse().slice(1, 3).map((score, i) =>
      score.total > 0
        ? this.getWinTemplate(score.answers, score.lives, score.statsBar, score.total, i + 2)
        : this.getLooseTemplate(score.statsBar, i + 2)
    ).join(` `);
  }

  bind() {
    this.history = this.element.querySelector(`.result--history`);
  }
}
