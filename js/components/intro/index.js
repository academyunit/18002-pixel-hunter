import {changeView, getElementFromTemplate} from '../../util';
import screenGreeting from '../greeting/index';
import footer from "../../markups/footer";

const template = getElementFromTemplate(`
<div id="main" class="central__content">
  <div id="intro" class="intro">
    <h1 class="intro__asterisk">*</h1>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </div>
</div>
${footer}
`);


export default () => {
  const screen = template.cloneNode(true);

  const handleClick = (event) => {
    if (event.target.className === `intro__asterisk`) {
      changeView(screenGreeting());
    }
  };

  screen.addEventListener(`click`, handleClick);

  return screen;
};
