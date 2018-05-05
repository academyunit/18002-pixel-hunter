import {assert} from 'chai';
import {LIFE, answer, answers} from './index.mock';
import {getAnswerScore as calculateAnswerScore, getTotalScore as calculateTotalGameScore} from './index';

suite(`calculateAnswerScore(): check parameters`, () => {
  const defaultAnswer = answer.normal;

  test(`should throw an error if 'answer' isn't an object`, () => {
    const types = [[], ``, 2, null, true];

    for (const type of types) {
      assert.throws(() => calculateAnswerScore(type));
    }
  });

  test(`should throw an error if answer doesn't have isCorrect property`, () => {
    const obj = Object.assign({}, defaultAnswer);
    delete obj.isCorrect;

    assert.throw(() => calculateAnswerScore(obj));
  });

  test(`should throw an error if answer doesn't have time property`, () => {
    const obj = Object.assign({}, defaultAnswer);
    delete obj.time;

    assert.throw(() => calculateAnswerScore(obj));
  });

  test(`should throw an error if answer.isCorrect != boolean`, () => {
    const obj = Object.assign({}, defaultAnswer);
    obj.isCorrect = ``;

    assert.throw(() => calculateAnswerScore(obj));
  });

  test(`should throw an error if answer.time != Number`, () => {
    const obj = Object.assign({}, defaultAnswer);
    obj.time = NaN;

    assert.throw(() => calculateAnswerScore(obj));
  });

  test(`function should return a number`, () => {
    const obj = Object.assign({}, defaultAnswer);
    obj.time = 8;

    assert.isNumber(calculateAnswerScore(obj));
  });
});

suite(`calculateAnswerScore(): check math`, () => {
  test(`check slow response time`, () => {
    assert.equal(calculateAnswerScore(answer.slow), 50);
  });

  test(`check normal response time`, () => {
    assert.equal(calculateAnswerScore(answer.normal), 100);
  });

  test(`check fast response time`, () => {
    assert.equal(calculateAnswerScore(answer.fast), 150);
  });

  test(`check wrong response`, () => {
    assert.equal(calculateAnswerScore(answer.failed), 0);
  });
});

suite(`calculateTotalGameScore(): check parameters`, () => {
  test(`should throw an error if 'answer' isn't an array`, () => {
    const types = [{}, 1, ``, null, true];

    for (const type of types) {
      assert.throws(() => calculateTotalGameScore(type));
    }
  });

  test(`should return -1 if answers < 10`, () => {
    const arr = answers.normal.slice();
    arr.length = 9;

    assert.equal(-1, calculateTotalGameScore(arr, LIFE.max));
  });

  test(`should throw an error if lives < 0 or > 3`, () => {
    assert.throws(() => calculateTotalGameScore(answers.normal, -1));
    assert.throws(() => calculateTotalGameScore(answers.normal, 4));
  });

  test(`should return a number`, () => {
    assert.isNumber(calculateTotalGameScore(answers.normal, LIFE.max));
  });
});

suite(`calculateTotalGameScore(): calculate total score and lives`, () => {

  test(`slow response time`, () => {
    assert.equal(calculateTotalGameScore(answers.slow, LIFE.max), 650);
    assert.equal(calculateTotalGameScore(answers.slow, LIFE.medium), 600);
    assert.equal(calculateTotalGameScore(answers.slow, LIFE.min), 550);
    assert.equal(calculateTotalGameScore(answers.slow, LIFE.none), 500);
  });

  test(`normal response time`, () => {
    assert.equal(calculateTotalGameScore(answers.normal, LIFE.max), 1150);
    assert.equal(calculateTotalGameScore(answers.normal, LIFE.medium), 1100);
    assert.equal(calculateTotalGameScore(answers.normal, LIFE.min), 1050);
    assert.equal(calculateTotalGameScore(answers.normal, LIFE.none), 1000);
  });

  test(`fast response time`, () => {
    assert.equal(calculateTotalGameScore(answers.fast, LIFE.max), 1650);
    assert.equal(calculateTotalGameScore(answers.fast, LIFE.medium), 1600);
    assert.equal(calculateTotalGameScore(answers.fast, LIFE.min), 1550);
    assert.equal(calculateTotalGameScore(answers.fast, LIFE.none), 1500);
  });
});

