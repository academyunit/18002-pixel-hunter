/**
 * Генерация DOM-элементов на основе переданной строки.
 *
 * @param {String} template
 * @return {Node}
 */
const getElementFromTemplate = (template) => {
  const container = document.createElement(`div`);
  container.innerHTML = template;

  return container;
};

export default getElementFromTemplate;
