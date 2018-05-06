import GameOneView from './views/game-one-view';
import GameTwoView from './views/game-two-view';
import GameThreeView from './views/game-three-view';
import HeaderView from './views/header-view';
import Application from './application';
import {QuestionType} from './data/game-config';

export default class GameScreen {

  constructor(model) {
    this.model = model;

    this.header = new HeaderView(this.model);
    this.content = this.getGameView();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);

    this._interval = null;
  }

  get element() {
    return this.root;
  }

  stopGame() {
    clearInterval(this._interval);
  }

  startGame() {
    this.model.startTimer();
    this.renderLevel();

    this._interval = setInterval(() => {
      this.model.tick();
      this.updateHeader();
      this.checkIfTimeIsUp();
    }, 1000);
  }

  checkIfTimeIsUp() {
    if (this.model.state.time <= 0) {
      this.stopGame();
      this.model.saveAnswer(false);
      this.changeLevel();
    }
  }

  renderLevel() {
    this.updateHeader();

    const view = this.getGameView();
    view.onAnswer = this.onAnswer.bind(this);

    this.changeContentView(view);
  }

  changeLevel() {
    if (this.model.isOver() || this.model.isFinished()) {
      Application.showResults(this.results, this.model.getPlayerName());
    } else {
      this.model.nextLevel();
      this.startGame();
    }
  }

  changeContentView(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }

  getGameView() {
    let view;
    const currentGameType = this.model.getCurrentGameType();
    const currentLevel = this.model.getCurrentLevel();
    const statsBar = this.model.getStatsBar();

    switch (currentGameType) {
      case QuestionType.TWO_OF_TWO:
        view = new GameOneView(currentLevel, statsBar);
        break;
      case QuestionType.TINDER_LIKE:
        view = new GameTwoView(currentLevel, statsBar);
        break;
      case QuestionType.ONE_OF_THREE:
        view = new GameThreeView(currentLevel, statsBar);
        break;
      default:
        throw new Error(`Cannot find any view for a game type = '${currentGameType}'!`);
    }

    return view;
  }

  onAnswer(answer) {
    this.stopGame();
    this.model.saveAnswer(answer);
    this.changeLevel();
  }

  get results() {
    return {
      total: this.model.getTotal(),
      answers: this.model.getAnswers(),
      lives: this.model.getLives(),
      statsBar: this.model.getStatsBar()
    };
  }

  updateHeader() {
    const header = new HeaderView(this.model);

    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
    this.header.updateTimer = this.model.updateTimer;
    this.header.updateTimer(header.element);
  }

}
