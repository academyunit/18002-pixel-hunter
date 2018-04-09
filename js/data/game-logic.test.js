import {assert} from 'chai';
import {checkScores, getTimer} from './game-logic';

/**
 * Получить сгенерированный mock-объект ответа.
 *
 * @param {Boolean} isCorrect
 * @param {Number} time
 * @return {Object}
 */
export const getMockAnswer = (isCorrect, time) => {
  return {
    isCorrect,
    time
  };
};

suite(`Check scores`, () => {
  test(`check if answer object has a correct type`, () => {
    const answers = [
      getMockAnswer(true, 11),
      `I'm a string!`,
      `me too :)`,
      getMockAnswer(true, 14),
      getMockAnswer(true, 19),
      getMockAnswer(true, 17),
      getMockAnswer(true, 10),
      getMockAnswer(true, 14),
      getMockAnswer(true, 16),
      getMockAnswer(false, 13)
    ];

    assert.throws(() => {
      checkScores(answers);
    }, `Given answer isn't an object!`);
  });

  test(`return -1 if answered < 10 questions`, () => {
    const answers = [
      getMockAnswer(true, 1),
      getMockAnswer(true, 2),
      getMockAnswer(true, 3),
      getMockAnswer(true, 4),
      getMockAnswer(true, 5),
      getMockAnswer(true, 6),
      getMockAnswer(true, 7)
    ];

    assert.equal(checkScores(answers), -1);
  });

  test(`return -1 if failed answers > 3`, () => {
    const answers = [
      getMockAnswer(true, 1),
      getMockAnswer(true, 2),
      getMockAnswer(true, 3),
      getMockAnswer(true, 4),
      getMockAnswer(true, 5),
      getMockAnswer(true, 6),
      getMockAnswer(false, 7),
      getMockAnswer(false, 8),
      getMockAnswer(false, 9),
      getMockAnswer(false, 10)
    ];

    assert.equal(checkScores(answers), -1);
  });

  test(`should return 1150 if all questions are answered normally`, () => {
    const answers = [
      getMockAnswer(true, 11),
      getMockAnswer(true, 15),
      getMockAnswer(true, 15),
      getMockAnswer(true, 14),
      getMockAnswer(true, 19),
      getMockAnswer(true, 17),
      getMockAnswer(true, 10),
      getMockAnswer(true, 14),
      getMockAnswer(true, 16),
      getMockAnswer(true, 11)
    ];

    assert.equal(checkScores(answers), 1150);
  });

  test(`should return 1150 if all questions are answered, 3 answered fast, 3 answered slow`, () => {
    const answers = [
      getMockAnswer(true, 5),
      getMockAnswer(true, 7),
      getMockAnswer(true, 9),
      getMockAnswer(true, 14),
      getMockAnswer(true, 19),
      getMockAnswer(true, 17),
      getMockAnswer(true, 10),
      getMockAnswer(true, 21),
      getMockAnswer(true, 22),
      getMockAnswer(true, 23)
    ];

    assert.equal(checkScores(answers), 1150);
  });

  test(`should return 1000 if 9 questions are answered and has only 2 lives`, () => {
    const answers = [
      getMockAnswer(true, 11),
      getMockAnswer(true, 12),
      getMockAnswer(true, 10),
      getMockAnswer(true, 14),
      getMockAnswer(true, 19),
      getMockAnswer(true, 17),
      getMockAnswer(true, 10),
      getMockAnswer(true, 14),
      getMockAnswer(true, 16),
      getMockAnswer(false, 13)
    ];

    assert.equal(checkScores(answers), 1000);
  });
});

suite(`Timer`, () => {
  it(`should decrease timer tick by 1 after tick() method is called`, () => {
    const timer = getTimer(10);
    timer.tick();
    timer.tick();
    timer.tick();
    timer.tick();

    assert.equal(timer.tick(), 5);
  });

  test(`should notify when the timer ends`, () => {
    const timer = getTimer(4);
    timer.tick();
    timer.tick();
    timer.tick();
    timer.tick();

    assert.strictEqual(timer.tick(), -1, `I'm done with this!`);
  });
});
