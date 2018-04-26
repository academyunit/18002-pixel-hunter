import AbstractView from '../views/abstract-view';
import renderHeader from '../header/index';
import renderStats from '../stats/index';

export default class ScoreBoardView extends AbstractView {

  setData({isWin, answers, gameResultText, totalGameScore, bonusList}) {
    this.isWin = isWin;
    this.answers = answers;
    this.gameResultText = gameResultText;
    this.totalGameScore = totalGameScore;
    this.bonusList = bonusList;

    return this;
  }

  get template() {
    // Сопоставление результата и заголовка
    const resultToTitle = this.isWin ? `Победа!` : `Поражение!`;
    const bonusListText = this.isWin ? this.renderBonusList() : ``;
    const points = this.isWin ? `×&nbsp;100` : ``;

    const totalResultClass = !this.isWin ? `result__total--final` : ` `;

    return `
      ${renderHeader()}
          <div class='result'>
            <h1>${resultToTitle}</h1>
            <table class='result__table'>
              <tr>
                <td class='result__number'>1.</td>
                <td colspan='2'>
                  ${renderStats(this.answers)}
                </td>
                <td class='result__points'>${points}</td>
                <td class='result__total ${totalResultClass}'>${this.gameResultText}</td>
              </tr>
              ${bonusListText}
              <tr>
                <td colspan='5' class='result__total  result__total--final'>${this.totalGameScore}</td>
              </tr>
            </table>
          </div>
    `;
  }

  // Отрисовывает бoнусы
  renderBonusList () {
    return this.bonusList.map((it) => {
      return `<tr>
              <td></td>
              <td class='result__extra'>${it.title}</td>
              <td class='result__extra'>${it.count}&nbsp;<span class='stats__result stats__result--${it.type}'></span></td>
              <td class='result__points'>×&nbsp;50</td>
              <td class='result__total'>${it.points}</td>
            </tr>`;
    }).join(``);
  };
}