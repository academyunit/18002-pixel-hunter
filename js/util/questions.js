const answerTypeToAnswerName = {
  'photo': `Фото`,
  'paint': `Рисунок`
};

const answers = [`photo`, `paint`];

const renderAnswerControls = (index) => {
  return answers.map((it) =>
    `<label class="game__answer game__answer--${it}">
      <input name="question${index}" type="radio" value="${it}">
      <span>${answerTypeToAnswerName[it]}</span>
    </label>`).join(``);
};

export default (questions) => questions.map((question, i) => {
  i += 1;

  return `
  <div class='game__option ${question.isSelected ? `game__option--selected` : ``}'>
    <img src=${question.img} alt='Option ${i}'>
    ${(`isSelected` in question) ? `` : renderAnswerControls(i)}
  </div>
  `;
}).join(``);
