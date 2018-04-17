/**
 * @todo: перенести код отсюда в компоненты answers и questions
 * */

const getQuestion = ({imgSrc, option, answers}) => {
  const answerTemplate = answers.forEach((item, index) => getAnswer(item, index));

  return `<img src="${imgSrc}" alt="Option 1" width="468" height="458">${answerTemplate}`;
};

const getAnswer = ({isCorrect, value}, index) => {
  const humanName = value === `photo` ? `Фото` : `Картина`;
  return `<label class="game__answer game__answer--${value}">
    <input name="question${index}" type="radio" value="${value}">
    <span>${humanName}</span>
  </label>`;
};
