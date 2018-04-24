/** Сцена на которой рендерятся экраны. */
const stage = document.querySelector(`.central`);

/**
 * Генерация DOM-элементов на основе переданной строки.
 *
 * @param {String} template
 * @param {String} tagName
 * @return {Node}
 */
export const getElementFromTemplate = (template = ``, tagName = `div`) => {
  const container = document.createElement(tagName);
  container.innerHTML = template;

  return container;
};

/**
 * Изменить текущий View.
 * @param {Node} view
 */
export const changeView = (view) => {
  stage.innerHTML = ``;
  stage.appendChild(view);
};
