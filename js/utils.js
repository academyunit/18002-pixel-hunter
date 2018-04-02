/**
 * Удалить элементы из DOM'a.
 *
 * @param {Node} node
 */
export const removeElements = (node) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

/**
 * Проверить включен ли чекбокс.
 *
 * @param {NodeList} options
 * @return {boolean}
 */
export const isRadioButtonChecked = (options) => {
  for (const option of options) {
    if (option.checked) {
      return true;
    }
  }

  return false;
};
