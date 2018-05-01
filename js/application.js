import HeaderView from './views/header-view';
import FooterView from './views/footer-view';
import IntroView from './views/intro-view';
import GreetingView from './views/greeting-view';
import RulesView from './views/rules-view';
import StatsView from './views/stats-view';
import GameModel from './data/game-model'
import GameScreen from './game-screen';

/** Сцена на которой рендерятся View. */
const stage = document.querySelector(`.central`);
const footer = new FooterView().element;

/**
 * Изменить View.
 *
 * @param {Node} view
 * @param {Node} header
 */
export const changeView = (view, header) => {
  stage.innerHTML = ``;
  stage.nextSibling.remove();
  stage.appendChild(view);
  if (header) {
    stage.insertAdjacentElement(`afterBegin`, header);
  }
  stage.insertAdjacentElement(`afterEnd`, footer);
};


export default class Application {

  static showIntro() {
    changeView(new IntroView().element);
  }

  static showGreeting() {
    changeView(new GreetingView().element);
  }

  static showRules() {
    const header = new HeaderView();
    console.log(header);
    const rules = new RulesView();
    changeView(rules.element, header.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen(new GameModel(playerName));

    changeView(gameScreen.element);

    gameScreen.startGame();
  }

  static showResults(total, answers, lives, statsBar) {
    const statsView = new StatsView(total, answers, lives, statsBar);
    const header = new HeaderView();

    changeView(statsView.element, header.element);
  }
}