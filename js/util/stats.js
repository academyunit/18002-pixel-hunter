import {isSlowAnswer, isFastAnswer} from './calc/index';

const getEmptyQuestionsIcons = (answers, totalAnswers) => {
  return new Array(totalAnswers.length - answers.length)
      .fill(`<li class="stats__result stats__result--unknown"></li>`)
      .join(``);
};

const getIcon = (isCorrect, time) => {
  if (!isCorrect) {
    return `wrong`;
  }

  if (isSlowAnswer(time)) {
    return `slow`;
  }

  if (isFastAnswer(time)) {
    return `fast`;
  }

  return `correct`;
};

export const getStatsTemplate = (answers, totalAnswers) => {
  let output = answers.reduce((questions, {isCorrect, time}) => {
    return questions + `<li class="stats__result stats__result--${getIcon(isCorrect, time)}"></li>`;
  }, ``);

  // Оставшиеся вопросы пока не отвечены и должны быть помечены нейтральными иконками
  output += getEmptyQuestionsIcons(answers, totalAnswers);

  return `<ul class="stats">${output}</ul>`;
};
