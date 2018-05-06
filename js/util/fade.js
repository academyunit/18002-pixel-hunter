const fade = (element, fadeIn = false) => {
  element.classList.add(`crossfader`);
  if (fadeIn) {
    element.style.opacity = 1;
    return;
  }

  element.style.opacity = 0;
};

export const fadeIn = (element) => {
  fade(element, true);
};

export const fadeOut = (element) => {
  fade(element);
};
