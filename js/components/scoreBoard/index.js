import {getElementFromTemplate} from '../../util';
import {calculateTotalGameScore} from './util';
import {Life, AnswerPoint, GAME_ROUNDS_COUNT, AnswerTime} from '../../data/game-config';
import renderHeader from '../header/index';
import renderStats from '../stats/index';

// Отрисовывает бoнусы
const renderBonusList = (bonusList) => {
  return bonusList.map((it) => {
    return `<tr>
              <td></td>
              <td class='result__extra'>${it.title}</td>
              <td class='result__extra'>${it.count}&nbsp;<span class='stats__result stats__result--${it.type}'></span></td>
              <td class='result__points'>×&nbsp;50</td>
              <td class='result__total'>${it.points}</td>
            </tr>`;
  }).join(``);
};

// Отрисовка общей статистики
export default (state) => {
  const {answers, lives} = state;

  // Определяем победа или поражение
  const isWin = answers.length >= GAME_ROUNDS_COUNT;

  // Получаем список быстрых ответов
  const fastAnswers = answers.filter((answer) => {
    return (answer.time < AnswerTime.fast) && answer.isCorrect;
  });

  // Получаем список медленных ответов
  const slowAnswers = answers.filter((answer) => {
    return (answer.time > AnswerTime.slow) && answer.isCorrect;
  });

  // Получаем список правильных ответов
  const correctAnswers = answers.filter((answer) => {
    return answer.isCorrect;
  });

  // Сопоставление результата и заголовка
  const resultToTitle = (isWin) ? `Победа!` : `Поражение!`;

  // Список бонусов
  const bonusList = [
    {
      type: `fast`,
      title: `Бонус за скорость:`,
      count: fastAnswers.length,
      points: fastAnswers.length * AnswerPoint.bonus
    },
    {
      type: `alive`,
      title: `Бонус за жизни:`,
      count: lives,
      points: lives * Life.bonus
    },
    {
      type: `slow`,
      title: `Штраф за медлительность:`,
      count: slowAnswers.length,
      points: slowAnswers.length * AnswerPoint.fine
    }
  ];
  const gameResultText = isWin ? correctAnswers.length * AnswerPoint.default : `FAIL`;
  const bonusListText = isWin ? renderBonusList(bonusList) : ``;
  const totalGameScore = isWin ? calculateTotalGameScore(answers, lives) : ``;

  return getElementFromTemplate(
      `${renderHeader()}
        <div class='result'>
          <h1>${resultToTitle}</h1>
          <table class='result__table'>
            <tr>
              <td class='result__number'>1.</td>
              <td colspan='2'>
                ${renderStats(answers)}
              </td>
              <td class='result__points'>${isWin ? `×&nbsp;100` : ``}</td>
              <td class='result__total ${!isWin ? `result__total--final` : ``}'>${gameResultText}</td>
            </tr>
            ${bonusListText}
            <tr>
              <td colspan='5' class='result__total  result__total--final'>${totalGameScore}</td>
            </tr>
          </table>
        </div>`
  );
};
