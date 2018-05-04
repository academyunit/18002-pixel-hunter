import {AnswerType} from '../data/game-config';

const answerTypeToAnswerName = {
  [AnswerType.PHOTO]: `Фото`,
  [AnswerType.PAINTING]: `Рисунок`
};

const answers = [AnswerType.PHOTO, AnswerType.PAINTING];

const renderAnswerControls = (index) => {
  return answers.map((it) =>
    `<label class="game__answer game__answer--${it}">
      <input name="question${index}" type="radio" value="${it}">
      <span>${answerTypeToAnswerName[it]}</span>
    </label>`).join(``);
};

const getImage = ({url, height, width}, i) => {
  return `<img src='${url}' width='${width}' height='${height}' alt='Option ${i}'>`;
};

export default (questions, hideControls = false) => questions.map((question, i) => {
  i += 1;

  return `
  <div class='game__option ${hideControls ? `game__option--selected` : ``}'>
    ${getImage(question.image)}
    ${hideControls ? `` : renderAnswerControls(i)}
  </div>
  `;
}).join(``);
