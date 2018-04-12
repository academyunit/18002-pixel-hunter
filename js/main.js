import {changeView} from './util';
import screenIntro from './components/intro/index';

document.addEventListener(`DOMContentLoaded`, () => {
  changeView(screenIntro());
});
