const setTool = () => {
  const value = localStorage.getItem('currentTool');

  if (!value) {
    const currentSizeEl = document.querySelector('.tools__item[data-tool="pen"]');
    currentSizeEl.classList.add('tools__item--active');
    localStorage.setItem('currentTool', 'pen');
  } else {
    const currentSizeEl = document.querySelector(`.tools__item[data-tool="${value}"]`);
    currentSizeEl.classList.add('tools__item--active');
    localStorage.setItem('currentTool', value);
  }
};

export default setTool;
