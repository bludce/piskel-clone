const getCanvasSize = (e) => {
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  const list = document.querySelectorAll('.canvas-size__item');
  list.forEach((item) => {
    item.classList.remove('canvas-size__item--active');
  });
  e.target.classList.add('canvas-size__item--active');
  const canvasSize = e.target.dataset.size;
  localStorage.setItem('canvasSize', canvasSize);
  canvas.width = canvasSize;
  canvas.height = canvasSize;

  const data = localStorage.getItem('canvasData');
  const img = new Image();
  img.src = data;
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
  };
};


const initPanelCanvasSize = () => {
  const list = document.querySelectorAll('.canvas-size__item');
  list.forEach((item) => {
    item.addEventListener('click', getCanvasSize);
  });
};

export default initPanelCanvasSize;
