/**
 * Если сделать эту штуку вьюхой, то как потом ее рендерить в других вьюхах?
 *
 * Сначала думал создать QuestionView и положить туда контент этого файла + ../answers/index,
 * но потом появились сомнения - должно ли это вообще быть View? И если должно, то см выше :)
 *
 * Аналогичная проблема со ../stats/index
 */
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
