import {
  draw,
  fillArea,
  erase,
  chooseColor,
  drawLine,
} from '../utils';

const removeActiveTool = () => {
  document.querySelectorAll('.tools__item').forEach((item) => {
    item.classList.remove('tools__item--active');
  });
};

const initPanelTools = () => {
  const canvas = document.querySelector('#canvas');
  document.querySelector('.tools__item--pen').addEventListener('click', (e) => {
    removeActiveTool();
    e.target.classList.toggle('tools__item--active');
    localStorage.setItem('currentTool', 'pen');
    canvas.addEventListener('mousedown', draw);
    canvas.removeEventListener('mousedown', fillArea);
    canvas.removeEventListener('mousedown', erase);
    canvas.removeEventListener('click', chooseColor);
    canvas.removeEventListener('mousedown', drawLine);
  });
  document.querySelector('.tools__item--fill').addEventListener('click', (e) => {
    removeActiveTool();
    e.target.classList.toggle('tools__item--active');
    localStorage.setItem('currentTool', 'fill');
    canvas.addEventListener('mousedown', fillArea);
    canvas.removeEventListener('mousedown', draw);
    canvas.removeEventListener('mousedown', erase);
    canvas.removeEventListener('click', chooseColor);
    canvas.removeEventListener('mousedown', drawLine);
  });
  document.querySelector('.tools__item--eraser').addEventListener('click', (e) => {
    removeActiveTool();
    e.target.classList.toggle('tools__item--active');
    localStorage.setItem('currentTool', 'eraser');
    canvas.addEventListener('mousedown', erase);
    canvas.removeEventListener('mousedown', draw);
    canvas.removeEventListener('mousedown', fillArea);
    canvas.removeEventListener('click', chooseColor);
    canvas.removeEventListener('mousedown', drawLine);
  });
  document.querySelector('.tools__item--stroke').addEventListener('click', (e) => {
    removeActiveTool();
    e.target.classList.toggle('tools__item--active');
    localStorage.setItem('currentTool', 'stroke');
    canvas.addEventListener('mousedown', drawLine);
    canvas.removeEventListener('mousedown', draw);
    canvas.removeEventListener('mousedown', fillArea);
    canvas.removeEventListener('mousedown', erase);
    canvas.removeEventListener('click', chooseColor);
  });
  document.querySelector('.tools__item--color-picker').addEventListener('click', (e) => {
    removeActiveTool();
    e.target.classList.toggle('tools__item--active');
    localStorage.setItem('currentTool', 'color-picker');
    canvas.addEventListener('click', chooseColor);
    canvas.removeEventListener('mousedown', erase);
    canvas.removeEventListener('mousedown', draw);
    canvas.removeEventListener('mousedown', fillArea);
    canvas.removeEventListener('mousedown', drawLine);
  });
};

export default initPanelTools;
