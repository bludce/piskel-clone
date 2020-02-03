import state from './state';
import initHandler from '../shortcuts/handler';

const renderImgFrame = (currentFrame) => {
  const canvas = document.querySelector(`.canvas[data-id="${currentFrame}"]`);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (localStorage) {
    const dataURL = localStorage.getItem('canvasData');
    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 96, 96);
    };
  }
  state[currentFrame] = localStorage.getItem('canvasData');
  localStorage.setItem('frameState', JSON.stringify(state));
};

const deleteFrame = () => {
  const btn = document.querySelectorAll('.canvas-tool__delete');
  btn.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const list = e.target.closest('.frame__list');
      const number = e.target.dataset.delete;
      state[number] = '';
      const array = state.filter((el) => el !== '');
      localStorage.setItem('frameState', JSON.stringify(array));
      list.removeChild(list.children[number]);
    });
  });
  initHandler();
};

const copyFrame = () => {
  const btn = document.querySelectorAll('.canvas-tool__copy');
  btn.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const canvas = document.querySelector('#canvas');
      const ctx = canvas.getContext('2d');

      const number = e.target.dataset.copy;

      state.push(state[number]);

      localStorage.setItem('frameState', JSON.stringify(state));

      const ul = document.querySelector('.frame__list');
      [...ul.children].forEach((element) => {
        element.classList.remove('list__item--active');
      });
      const li = document.createElement('li');
      li.classList.add('list__item');
      li.classList.add('list__item--active');
      li.insertAdjacentHTML('afterBegin',
        `<div class="canvas-container">
          <div class="canvas-background"></div>
          <canvas class="canvas" width="96" height="96" data-id="${ul.children.length}"></canvas>
          <div class="canvas-tool canvas-tool__move" data-tooltip="<div class='tooltip-container'><div>Move <span class='tooltip-shortcut'>(M)</span></div></div>"></div>
          <button class="canvas-tool canvas-tool__delete" data-delete="${ul.children.length}" data-tooltip="<div class='tooltip-container'><div>Delete <span class='tooltip-shortcut'>(D)</span></div></div>"></button>
          <button class="canvas-tool canvas-tool__copy" data-copy="${ul.children.length}" data-tooltip="<div class='tooltip-container'><div>Copy <span class='tooltip-shortcut'>(C)</span></div></div>"></button>
        </div>`);
      ul.appendChild(li);
      initHandler();
      localStorage.setItem('currentFrame', ul.children.length - 1);

      const dataURL = JSON.parse(localStorage.getItem('frameState'));
      const img = new Image();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      img.src = dataURL[number];
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      const canvas1 = document.querySelector(`.canvas[data-id="${ul.children.length - 1}"]`);
      const ctx1 = canvas1.getContext('2d');

      const dataURL1 = JSON.parse(localStorage.getItem('frameState'));
      const img1 = new Image();
      img1.src = dataURL1[number];
      img1.onload = () => {
        ctx1.drawImage(img, 0, 0, 96, 96);
      };
    });
  });
};

const selectActiveFrame = () => {
  setInterval(() => {
    const list = document.querySelectorAll('.list__item');
    list.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.tagName === 'CANVAS') {
          const currentFrame = e.target.dataset.id;
          const currentData = JSON.parse(localStorage.getItem('frameState'))[currentFrame];
          localStorage.setItem('currentFrame', currentFrame);
          localStorage.setItem('canvasData', currentData);

          const canvas = document.querySelector('#canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          img.src = currentData;
          img.onload = () => {
            ctx.drawImage(img, 0, 0);
          };
          const ul = document.querySelector('.frame__list');
          [...ul.children].forEach((element) => {
            element.classList.remove('list__item--active');
          });
          e.target.closest('.list__item').classList.add('list__item--active');
        }
      });
    });
  }, 500);
};

const addFrame = () => {
  const btn = document.querySelector('#add-frame');

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const ul = document.querySelector('.frame__list');
    let array = ul.children;
    const { length } = array;

    [...array].forEach((element) => {
      element.classList.remove('list__item--active');
    });
    const li = document.createElement('li');
    li.classList.add('list__item');
    li.classList.add('list__item--active');
    li.insertAdjacentHTML('afterBegin',
      `<div class="canvas-container">
          <div class="canvas-background"></div>
          <canvas class="canvas" width="96" height="96" data-id="${length}"></canvas>
          <div class="canvas-tool canvas-tool__move" data-tooltip="<div class='tooltip-container'><div>Move <span class='tooltip-shortcut'>(M)</span></div></div>"></div>
          <button class="canvas-tool canvas-tool__delete" data-delete="${length}" data-tooltip="<div class='tooltip-container'><div>Delete <span class='tooltip-shortcut'>(D)</span></div></div>"></button>
          <button class="canvas-tool canvas-tool__copy" data-copy="${length}" data-tooltip="<div class='tooltip-container'><div>Copy <span class='tooltip-shortcut'>(C)</span></div></div>"></button>
        </div>`);
    ul.appendChild(li);

    array = ul.children;

    localStorage.setItem('currentFrame', length);

    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initHandler();

    const deleteEl = document.querySelector(`[data-delete="${length}"]`);
    const copyEl = document.querySelector(`[data-copy="${length}"]`);
    deleteEl.addEventListener('click', deleteFrame());
    copyEl.addEventListener('click', copyFrame());
  });
};

export {
  renderImgFrame,
  addFrame,
  deleteFrame,
  copyFrame,
  selectActiveFrame,
};
