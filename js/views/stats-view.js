import AbstractView from './abstract-view';
import {AnswerTime, AnswerPoint, StatsConfig} from '../data/game-config';

export default class StatsView extends AbstractView {
  constructor(total, answers, lives, stats, isLoose = false) {
    super();
    this.total = total;
    this.answers = answers;
    this.lives = lives;
    this.stats = stats;
    this.isLoose = isLoose;
  }

  get template() {
    const results = !this.isLoose
      ? this.getWinTemplate(1, this.stats, this.answers, this.lives, this.total)
      : this.getLooseTemplate(1, this.stats);

    return `<div class="result">${results}</div>`;
  }

  getLooseTemplate(i, stats) {
    return `
      <h1>${StatsConfig.failTitle}</h1>
      <table class="result__table">
        <tr>
          <td class="result__number">${i}</td>
          <td colspan="2">
            ${stats}
          </td>
          <td class="result__total"></td>
          <td class="result__total  result__total--final">${StatsConfig.failTitle}</td>
        </tr>
      </table>
    `;
  }

  getWinTemplate(i, stats, answers, lives, total) {
    const correctAnswersCount = answers.filter((answer) => answer.answer === true).length;
    const fastAnswersCount = answers.filter((answer) => answer.time > AnswerTime.fast).length;
    const slowAnswersCount = answers.filter((answer) => answer.time < AnswerTime.slow).length;

    return `<h1>${StatsConfig.victoryTitle}</h1>
            <table class="result__table">
              <tr>
                <td class="result__number">${i}</td>
                <td colspan="2">
                  ${stats}
                </td>
                <td class="result__points">×&nbsp;${AnswerPoint.default}</td>
                <td class="result__total">${correctAnswersCount * AnswerPoint.default}</td>
              </tr>
              ${this.getRow(fastAnswersCount, StatsConfig.fastResults)}
              ${this.getRow(lives, StatsConfig.livesResults)}
              ${this.getRow(slowAnswersCount, StatsConfig.slowResults)}
              <tr>
                <td colspan="5" class="result__total  result__total--final">${total}</td>
              </tr>
            </table>`;
  };

  getRow(count, result) {
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
}