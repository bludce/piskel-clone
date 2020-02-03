import startAnimating from './animation';
import initFullScreen from './fullScreen';

const initAnimating = () => {
  const fpsEl = document.querySelector('.preview__range');
  let fps = document.querySelector('.preview__range').value;
  startAnimating(fps);
  fpsEl.addEventListener('input', () => {
    fps = document.querySelector('.preview__range').value;
    const fpsDOMValue = document.querySelector('.preview__fps');
    fpsDOMValue.textContent = fps;
    startAnimating(fps);
  });
};

initAnimating();
initFullScreen();
