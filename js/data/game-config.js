/** Состояние игры по дефолту */
export const INITIAL_STATE = Object.freeze({
  gameType: `one`,
  level: 0,
  levels: [],
  lives: 3,
  time: 30,
  playerName: ``,
  answers: []
});

/** Жизнь */
export const Life = Object.freeze({
  // Кол-во жизней
  COUNT: INITIAL_STATE.lives,
  // Бонус за оставшуюся жизнь
  BONUS: 50
});

/** Кол-во очков за ответ */
export const AnswerPoint = Object.freeze({
  DEFAULT: 100,
  BONUS: 50,
  FINE: -50
});

/** Время ответа на вопросы */
export const AnswerTime = Object.freeze({
  SLOW: 20,
  FAST: 10
});

/** Настройки таймера */
export const TimerConfig = {
  DEFAULT_TIME: 30,
  ALARM_TIME: 5
};

export const TOTAL_QUESTIONS = 10;

/** Статистика по окончанию игры */
export const StatsConfig = Object.freeze({
  VICTORY_TITLE: `Победа!`,
  FAIL_TITLE: `Fail`,
  FAST_RESULTS: {
    TYPE: `fast`,
    LABEL: `Бонус за скорость:`,
    POINTS: AnswerPoint.BONUS,
    ICON: `fast`
  },
  LIVES_RESULTS: {
    TYPE: `lives`,
    LABEL: `Бонус за жизни:`,
    POINTS: Life.BONUS,
    ICON: `alive`
  },
  SLOW_RESULTS: {
    TYPE: `slow`,
    LABEL: `Штраф за медлительность:`,
    POINTS: AnswerPoint.FINE,
    ICON: `slow`
  }
});

export const QuestionType = Object.freeze({
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`
});

export const AnswerType = Object.freeze({
  PAINTING: `painting`,
  PHOTO: `photo`
});
