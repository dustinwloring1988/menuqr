export const updateDarkModeState = (isDarkMode) => {
  document.body.classList.toggle('dark-mode', isDarkMode);
};