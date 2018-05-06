import {AnswerTime, TimerConfig, TOTAL_QUESTIONS} from '../../data/game-config';

export const LIFE = {
  MAX: 3,
  MEDIUM: 2,
  MIN: 1,
  NONE: 0
};

const getAnswers = ({isCorrect, time}) => {
  let answers = new Array(TOTAL_QUESTIONS).fill({});

  return answers.map((answer) => {
    answer.isCorrect = isCorrect;
    answer.time = time;

    return answer;
  });
};

export const answer = {
  slow: {
    isCorrect: true,
    time: TimerConfig.DEFAULT_TIME - AnswerTime.SLOW
  },
  normal: {
    isCorrect: true,
    time: 12
  },
  fast: {
    isCorrect: true,
    time: TimerConfig.DEFAULT_TIME - AnswerTime.FAST
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
