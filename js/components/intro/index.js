import {getElementFromTemplate} from '../../util';
import {renderScreen} from '../game/index';
import getFooter from '../footer/index';

const template = getElementFromTemplate(`
<div id="main" class="central__content">
  <div id="intro" class="intro">
    <h1 class="intro__asterisk">*</h1>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </div>
</div>
${getFooter()}
`);


export default (game) => {
  const screen = template.cloneNode(true);

  const handleClick = (event) => {
    if (event.target.className === `intro__asterisk`) {
      game.changeLevel();
      renderScreen(game);
    }
  };

  screen.addEventListener(`click`, handleClick);

  return screen;
};
