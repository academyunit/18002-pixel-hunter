import ScoreBoardView from './score-board-view';
import {getElementFromTemplate} from '../../util';
import {calculateTotalGameScore} from './util';
import {Life, AnswerPoint, GAME_ROUNDS_COUNT, AnswerTime} from '../../data/game-config';

// Отрисовка общей статистики
export default (game) => {
 const {answers, lives} = game;

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

  // оставил это тут, потому что ко View отношение это не имеет
  const gameResultText = isWin ? correctAnswers.length * AnswerPoint.default : `FAIL`;
  const totalGameScore = isWin ? calculateTotalGameScore(answers, lives) : ``;

  const data = {
    isWin,
    answers,
    gameResultText,
    totalGameScore,
    bonusList
  };

  return (new ScoreBoardView(game)).setData(data).element;
};
