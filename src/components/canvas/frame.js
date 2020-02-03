import { renderImgFrame } from '../frames/frames';

const renderFrames = () => {
  const frames = JSON.parse(localStorage.getItem('frameState'));
  const ul = document.querySelector('.frame__list');
  if (frames !== null) {
    frames.forEach((item, index) => {
      const li = document.createElement('li');
      li.classList.add('list__item');
      li.insertAdjacentHTML('afterBegin',
        `<div class="canvas-container">
            <div class="canvas-background"></div>
            <canvas class="canvas" width="96" height="96" data-id="${index}"></canvas>
            <div class="canvas-tool canvas-tool__move" data-tooltip="<div class='tooltip-container'><div>Move <span class='tooltip-shortcut'>(M)</span></div></div>"></div>
            <button class="canvas-tool canvas-tool__delete" data-delete="${index}" data-tooltip="<div class='tooltip-container'><div>Delete <span class='tooltip-shortcut'>(D)</span></div></div>"></button>
            <button class="canvas-tool canvas-tool__copy" data-copy="${index}" data-tooltip="<div class='tooltip-container'><div>Copy <span class='tooltip-shortcut'>(C)</span></div></div>"></button>
          </div>`);
      ul.appendChild(li);
    });

    ul.removeChild(ul.children[0]);
    ul.lastChild.classList.add('list__item--active');
    frames.forEach((item, index) => {
      const canvas = document.querySelector(`.canvas[data-id="${index}"]`);
      const ctx = canvas.getContext('2d');

      const dataURL = item;
      const img = new Image();
      img.src = dataURL;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 96, 96);
      };
    });
    localStorage.setItem('currentFrame', frames.length - 1);
  } else {
    localStorage.setItem('currentFrame', '0');
    renderImgFrame(0);
  }
};

export default renderFrames;
