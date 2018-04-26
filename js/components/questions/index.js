import renderAnswerControls from '../answers/index';

export default (questions) => questions.map((question, i) => {
  i += 1;

  return `
  <div class='game__option ${question.isSelected ? `game__option--selected` : ``}'>
    <img src=${question.img} alt='Option ${i}'>
    ${(`isSelected` in question) ? `` : renderAnswerControls(i)}
  </div>
  `;
}).join(``);
