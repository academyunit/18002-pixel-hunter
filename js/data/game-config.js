// Начальное состояние игры
export const INITIAL_GAME = {
  task: [],
  tasks: [],
  answers: [],
  lives: 3,
  timer: 30
};

/**
 * @deprecated
 * удалить это отсюда потом
 */
// Кол-во уолвней в игре
export const GAME_ROUNDS_COUNT = 10;

/**
 * @deprecated
 * удалить это отсюда потом
 */
// Начальное время таймера
export const TIMER_TIME = 30;

// Жизнь
export const Life = {
  count: INITIAL_GAME.lives,
  bonus: 50
};

// Очки за ответ
export const AnswerPoint = {
  default: 100,
  bonus: 50,
  fine: -50
};

export const AnswerTime = {
  slow: 20,
  fast: 10
};
