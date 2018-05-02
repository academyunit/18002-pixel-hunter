import {AnswerTime} from '../data/game-config';

const getEmptyQuestionsIcons = (answers, totalAnswers) => {
  return new Array(totalAnswers.length - answers.length)
    .fill(`<li class="stats__result stats__result--unknown"></li>`)
    .join(``);
};

export const getStatsTemplate = (answers, totalAnswers) => {
  let output = answers.reduce((questions, {isCorrect, time}) => {
    let icon = 'wrong';
    if (isCorrect) {
      icon = time < AnswerTime.slow ? 'slow' : 'fast';
    }
    return questions + `<li class="stats__result stats__result--${icon}"></li>`;
  }, '');

  // Оставшиеся вопросы пока не отвечены и должны быть помечены нейтральными иконками
  output += getEmptyQuestionsIcons(answers, totalAnswers);

  return `<ul class="stats">${output}</ul>`;
};
