import {AnswerTime} from '../../data/game-config';

export const LIFE = {
  max: 3,
  medium: 2,
  min: 1,
  none: 0
};

/** Кол-вол ответов для мока */
const ANSWERS_MOCK_AMOUNT = 10;

const getAnswers = ({isCorrect, time}) => {
  let answers = new Array(ANSWERS_MOCK_AMOUNT).fill({});

  return answers.map((answer) => {
    answer.isCorrect = isCorrect;
    answer.time = time;

    return answer;
  });
};

export const answer = {
  slow: {
    isCorrect: true,
    time: AnswerTime.slow + 1
  },
  normal: {
    isCorrect: true,
    time: 12
  },
  fast: {
    isCorrect: true,
    time: AnswerTime.fast - 1
  },
  failed: {
    isCorrect: false,
    time: 0
  }
};

export const answers = {
  slow: getAnswers(answer.slow),
  normal: getAnswers(answer.normal),
  fast: getAnswers(answer.fast),
  failed: getAnswers(answer.failed)
};
