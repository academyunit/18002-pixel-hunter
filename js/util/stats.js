import {ANSWER_TIME, ANSWERS_COUNT} from '../util/calc';

export const statsTemplate = (answers) => {
  let resultsArray = [];

  answers.forEach(({answer, time}) => {
    if (!answer) {
      resultsArray.push(`<li class="stats__result stats__result--wrong"></li>`);
    } else if (time > ANSWER_TIME.fast) {
      resultsArray.push(`<li class="stats__result stats__result--fast"></li>`);
    } else if (time < ANSWER_TIME.slow) {
      resultsArray.push(`<li class="stats__result stats__result--slow"></li>`);
    } else {
      resultsArray.push(`<li class="stats__result stats__result--correct"></li>`);
    }
  });

  /**
   * @todo: надо бы избавиться от хардкода с кол-ом ответов тут, потому что вопросов может и 100 прийти с сервера...
   */
  while (resultsArray.length < ANSWERS_COUNT) {
    resultsArray.push(`<li class="stats__result stats__result--unknown"></li>`);
  }

  return resultsArray.join(` `);
};
