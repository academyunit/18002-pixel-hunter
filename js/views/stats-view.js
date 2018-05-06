import AbstractView from './abstract-view';
import {AnswerTime, AnswerPoint, StatsConfig} from '../data/game-config';
import {isSlowAnswer, isFastAnswer} from '../util/calc/index';

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
      ? StatsView.getWinTemplate(this.answers, this.lives, this.statsBar, this.total, 1)
      : StatsView.getLooseTemplate(this.statsBar, 1);

    return `
      <div class="result">
        ${results}
      </div>
      <div class="result result--history"></div>
    `;
  }

  showScores(scores) {
    this.history.innerHTML = scores.reverse().slice(1, 3).map((score, i) =>
      score.total > 0
        ? StatsView.getWinTemplate(score.answers, score.lives, score.statsBar, score.total, i + 2)
        : StatsView.getLooseTemplate(score.statsBar, i + 2)
    ).join(` `);
  }

  bind() {
    this.history = this.element.querySelector(`.result--history`);
  }

  static getLooseTemplate(stats, i) {
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

  static getWinTemplate(answers, lives, stats, total, i) {
    const correctAnswers = answers.filter((answer) => answer.isCorrect);
    const correctAnswersCount = correctAnswers.length;
    const fastAnswersCount = correctAnswers.filter((answer) => isFastAnswer(answer.time)).length;
    const slowAnswersCount = correctAnswers.filter((answer) => isSlowAnswer(answer.time)).length;

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
        ${StatsView.getRow(lives, StatsConfig.LIVES_RESULTS)}
        ${StatsView.getRow(fastAnswersCount, StatsConfig.FAST_RESULTS)}
        ${StatsView.getRow(slowAnswersCount, StatsConfig.SLOW_RESULTS)}
        <tr>
          <td colspan="5" class="result__total  result__total--final">${total}</td>
        </tr>
      </table>
    `;
  }

  static getRow(count, result) {
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
}
