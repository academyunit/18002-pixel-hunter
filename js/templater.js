/**
 * Генерация DOM-элементов на основе переданной строки.
 *
 * @todo:
 * 1) если делать через documentFragment(),
 * то при вставке на страницу через renderStageScreen() все "растворяется"
 * и оригинальные ноды больше не доступны
 *
 * (если делать cloneNode(true) для documentFragment() в getScreenById(),
 * то слетают все обработчики в DOM'e. Опять засада :) )
 *
 * 2) если делать через костыль с оборачиванием в div - имеет лишний тег-обертку
 *
 * Как сделать лучше?
 *
 * @param {String} template
 * @returns DocumentFragment
 */
const getElementFromTemplate = (template) => {
  const temp = document.createElement('div');
  temp.innerHTML = template;

  const fragment = document.createElement('div');
  while(temp.firstChild) {
    fragment.appendChild(temp.firstChild);
  }

  return fragment;
};

export default getElementFromTemplate;