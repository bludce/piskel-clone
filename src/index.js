import './index.sass';
import './components/canvas/init';
import './components/tools/init';
import './components/frames/init';
import './components/animation/init';
import './components/shortcuts/init';
import './components/downloads/init';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
window.addEventListener('beforeunload', () => {
  localStorage.setItem('canvasData', canvas.toDataURL());
});

if (localStorage) {
  const dataURL = JSON.parse(localStorage.getItem('frameState'));
  const currentFrame = localStorage.getItem('currentFrame');
  const img = new Image();
  img.src = dataURL[currentFrame];
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
  };
}
