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
  count: INITIAL_STATE.lives,
  // Бонус за оставшуюся жизнь
  bonus: 50
});

/** Кол-во очков за ответ */
export const AnswerPoint = Object.freeze({
  default: 100,
  bonus: 50,
  fine: -50
});

/** Время ответа на вопросы */
export const AnswerTime = Object.freeze({
  slow: 20,
  fast: 10
});

/** Настройки таймера */
export const TimerConfig = {
  defaultTime: 30,
  alarmTime: 5
};

export const TOTAL_QUESTIONS = 10;

/** Статистика по окончанию игры */
export const StatsConfig = Object.freeze({
  victoryTitle: `Победа!`,
  failTitle: `Fail`,
  fastResults: {
    type: `fast`,
    label: `Бонус за скорость:`,
    points: AnswerPoint.bonus,
    icon: `fast`
  },
  livesResults: {
    type: `lives`,
    label: `Бонус за жизни:`,
    points: Life.bonus,
    icon: `alive`
  },
  slowResults: {
    type: `slow`,
    label: `Штраф за медлительность:`,
    points: AnswerPoint.fine,
    icon: `slow`
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
