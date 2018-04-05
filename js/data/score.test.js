import {assert} from 'chai';
import {checkScore} from '../score';

describe(`Check answers`, () => {
  it(`should check game score`, () => {
    assert(checkScore([{}, {}, {}]), -1);
  });
});
