import {assert} from 'chai';
import {Timer} from './timer';

suite(`Timer`, () => {
  test(`should decrease timer tick by 1 after tick() method is called`, () => {
    const timer = new Timer(10);
    timer.tick();
    timer.tick();
    timer.tick();
    timer.tick();

    assert.equal(timer.tick(), 5);
  });

  test(`should notify when the timer ends`, () => {
    const timer = new Timer(4);
    timer.tick();
    timer.tick();
    timer.tick();
    timer.tick();

    assert.strictEqual(timer.tick(), -1, `I'm done with this!`);
  });
});

