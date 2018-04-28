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
  container.innerHTML = template.trim();

  return container;
};

/**
 * Изменить View.
 *
 * @param {Node} view
 */
export const changeView = (view) => {
  stage.innerHTML = ``;
  stage.appendChild(view);
};

/**
 * Обновить View.
 *
 * @param {Node} parent
 * @param {Object} view
 */
export const updateView = (parent, view) => {
  parent.innerHTML = ``;
  parent.appendChild(view);
};
