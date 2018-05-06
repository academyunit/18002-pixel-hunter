import {INITIAL_STATE, TimerConfig} from '../data/game-config';
import {Timer, flashTimer} from '../util/timer';
import {getTotalScore} from '../util/calc/index';
import {getStatsTemplate} from '../util/stats';

export default class GameModel {
  constructor(playerName, levels) {
    this._state = Object.assign({}, INITIAL_STATE, {playerName}, {levels});
  }

  get state() {
    return this._state;
  }

  getCurrentLevel() {
    return this.getLevels()[this._state.level];
  }

  getCurrentGameType() {
    return this.getLevels()[this._state.level].type;
  }

  getPlayerName() {
    return this._state.playerName;
  }

  updateLevel(level) {
    this._state.level = level;
  }

  nextLevel() {
    this.updateLevel(this._state.level + 1);
  }

  startTimer() {
    this.timer = new Timer(TimerConfig.DEFAULT_TIME);

    return this.timer;
  }

  tick() {
    this._state.time = this.timer.tick();
  }

  getLives() {
    return this._state.lives;
  }

  getTotal() {
    if (!this._state.total) {
      this._state.total = getTotalScore(this.getAnswers(), this.getLives());
    }

    return this._state.total;
  }

  isOver() {
    return this._state.lives < 0;
  }

  isFinished() {
    return this._state.level >= this.getLevels().length - 1;
  }

  reduceLives() {
    this._state.lives--;
  }

  saveAnswer(answer) {
    if (!answer) {
      this.reduceLives();
    }

    this._state.answers = this._state.answers.concat({
      isCorrect: answer,
      time: this._state.time
    });
  }

  getLevels() {
    return this._state.levels;
  }

  getAnswers() {
    return this._state.answers;
  }

  getStatsBar() {
    return getStatsTemplate(this.getAnswers(), this.getLevels());
  }

  updateTimer(element) {
    flashTimer(element);
  }
}
