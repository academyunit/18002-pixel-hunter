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