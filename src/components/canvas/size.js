const setCanvasSize = () => {
  const canvas = document.querySelector('#canvas');

  const value = localStorage.getItem('canvasSize');

  if (!value) {
    canvas.width = 32;
    canvas.height = 32;
    const currentSizeEl = document.querySelector('.canvas-size__item[data-size="32"]');
    currentSizeEl.classList.add('canvas-size__item--active');
    localStorage.setItem('canvasSize', 32);
  } else {
    canvas.width = value;
    canvas.height = value;
    const currentSizeEl = document.querySelector(`.canvas-size__item[data-size="${value}"]`);
    currentSizeEl.classList.add('canvas-size__item--active');
    localStorage.setItem('canvasSize', value);
  }

  localStorage.setItem('currentFrame', 1);
};

export default setCanvasSize;
