import intro from './modules/intro';
import greeting from './modules/greeting';
import rules from './modules/rules';
import game1 from './modules/game-1';
import game2 from './modules/game-2';
import game3 from './modules/game-3';
import stats from './modules/stats';

/**
 * Список констант с названиями экранов.
 */
export const ScreenName = {
  INTRO: 0,
  GREETING: 1,
  RULES: 2,
  GAME_1: 3,
  GAME_2: 4,
  GAME_3: 5,
  STATS: 6
};

/**
 * Игровые экраны.
 */
export const Screens = [
  intro,
  greeting,
  rules,
  game1,
  game2,
  game3,
  stats
];
