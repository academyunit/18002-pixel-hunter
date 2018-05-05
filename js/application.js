import HeaderView from './views/header-view';
import FooterView from './views/footer-view';
import IntroView from './views/intro-view';
import GreetingView from './views/greeting-view';
import RulesView from './views/rules-view';
import StatsView from './views/stats-view';
import ErrorView from './views/error-view';
import GameModel from './data/game-model';
import GameScreen from './game-screen';
import Loader from './loader';

/** Сцена на которой рендерятся View. */
const stage = document.querySelector(`.central`);
const footer = new FooterView().element;
let gameData;

/**
 * Изменить View.
 *
 * @param {Node} view
 * @param {Node} header
 */
export const changeView = (view, header = null) => {
  stage.innerHTML = ``;
  stage.nextSibling.remove();
  stage.appendChild(view);
  if (header) {
    stage.insertAdjacentElement(`afterBegin`, header);
  }
  stage.insertAdjacentElement(`afterEnd`, footer);
};

export default class Application {

  static start() {
    Application.showIntro();
    Loader
        .loadData()
        .then((data) => {
          gameData = data;

          Application.showGreeting();
        })
        .catch(Application.showError);
  }

  static showIntro() {
    const introView = new IntroView();

    changeView(introView.element);
  }

  static showGreeting() {
    const greetingView = new GreetingView();

    changeView(greetingView.element);
  }

  static showRules() {
    const header = new HeaderView();
    const rules = new RulesView();

    changeView(rules.element, header.element);
  }

  static showGame(playerName) {
    const game = new GameModel(playerName, gameData);
    const gameScreen = new GameScreen(game);

    changeView(gameScreen.element);

    gameScreen.startGame();
  }

  static showResults(results, playerName) {
    const statsView = new StatsView(results);
    const header = new HeaderView();

    changeView(statsView.element, header.element);
    Loader
        .saveResults(results, playerName)
        .then(() => Loader.loadResults(playerName))
        .then((scores) => statsView.showScores(scores))
        .catch(Application.showError);
  }

  static showError(error) {
    changeView(new ErrorView(error).element);
  }
}
