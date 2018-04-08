import {assert} from 'chai';
import {checkScores, getMockAnswer, getTimer} from '../game-logic';

/**
 @todo: удалить текст отсюда
 Начните решение с описания тестовых случаев. Например:

 - Если игрок ответил меньше, чем на 10 вопросов, то игра считается не пройденной и функция должна вернуть -1;
 - Если игрок ответил на все вопросы и не быстро, и не медленно, и у него остались все жизни, то функция должна вернуть 1150 очков;
 - Комбинируйте разные условия ответов и кол-ва жизней, чтобы описать максимальное кол-во вариантов.
 - Реализуйте работу функции и убедитесь, что все тесты проходят.
 */

describe(`Check scores`, () => {
  /** Это тут надо или лишнее? Руками в тестах вбивать цифры или константы подтягивать откуда-то? */
  const GAME_LIVES_BY_DEFAULT = 3;

  it(`should return -1 if questions answered < 10`, () => {
    const answers = [
      getMockAnswer(true, 1),
      getMockAnswer(true, 2),
      getMockAnswer(true, 3),
      getMockAnswer(true, 4),
      getMockAnswer(true, 5),
      getMockAnswer(true, 6),
      getMockAnswer(true, 7),
      getMockAnswer(true, 8),
      getMockAnswer(true, 9),
      getMockAnswer(false, 10)
    ];

    assert.equal(checkScores(answers, GAME_LIVES_BY_DEFAULT), -1);
  });

  it(`should return 1150 if all questions are answered normally`, () => {
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
      getMockAnswer(true, 11),
      getMockAnswer(true, 12),
      getMockAnswer(true, 13)
    ];

    assert.equal(checkScores(answers, GAME_LIVES_BY_DEFAULT), 1150);
  });

  it(`should return 1400 if all questions are answered, 3 answered fast, 2 answered slow`, () => {
    const answers = [
      getMockAnswer(true, 5),
      getMockAnswer(true, 7),
      getMockAnswer(true, 9),
      getMockAnswer(true, 14),
      getMockAnswer(true, 19),
      getMockAnswer(true, 17),
      getMockAnswer(true, 10),
      getMockAnswer(true, 14),
      getMockAnswer(true, 16),
      getMockAnswer(true, 21),
      getMockAnswer(true, 22),
      getMockAnswer(true, 13)
    ];

    assert.equal(checkScores(answers, GAME_LIVES_BY_DEFAULT), 1400);
  });

  it(`should return 1050 if 10 questions are answered, only 1 live left`, () => {
    const answers = [
      getMockAnswer(true, 11),
      getMockAnswer(true, 12),
      getMockAnswer(true, 10),
      getMockAnswer(true, 14),
      getMockAnswer(true, 19),
      getMockAnswer(false, 17),
      getMockAnswer(true, 10),
      getMockAnswer(true, 14),
      getMockAnswer(true, 16),
      getMockAnswer(true, 15),
      getMockAnswer(true, 14),
      getMockAnswer(false, 13)
    ];

    assert.equal(checkScores(answers, 1), 1050);
  });
});

describe(`Timer`, () => {
  it(`should decrease timer tick by 1 after tick() method is called`, () => {
    const timer = getTimer(10);
    timer.tick();
    timer.tick();
    timer.tick();
    timer.tick();
    timer.tick();

    assert.equal(timer.getTimeLeft(), 5);
  });

  it(`should notify when the timer ends`, () => {
    const timer = getTimer(4);
    timer.tick();
    timer.tick();
    timer.tick();
    timer.tick();

    /** Что-то криво выглядит. Это то, о чем они просят в задании? :)
     * Каким образом образом отлавливать окончание выполнения таймера (написал более подробно внутри getTimer() )? */
    assert.throws(timer.tick.bind(timer), `I'm done with this!`);
  });
});
