import { renderImgFrame } from '../frames/frames';

const draw = (e) => {
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  const currentColor = localStorage.getItem('currentColor');
  const pixelSize = localStorage.getItem('pixelSize');
  const canvasSize = localStorage.getItem('canvasSize');


  let lastX = e.offsetX;
  let lastY = e.offsetY;

  ctx.fillStyle = currentColor;
  ctx.fillRect(
    Math.floor((lastX / 512) * canvasSize),
    Math.floor((lastY / 512) * canvasSize),
    pixelSize,
    pixelSize,
  );

  canvas.onmousemove = (evt) => {
    const currX = evt.offsetX;
    const currY = evt.offsetY;

    const deltaX = Math.abs(currX - lastX);
    const deltaY = Math.abs(currY - lastY);

    const sx = lastX < currX ? 1 : -1;
    const sy = lastY < currY ? 1 : -1;
    let err = deltaX - deltaY;

    while (!(lastX === currX && lastY === currY)) {
      const e2 = 2 * err;
      if (e2 > -deltaY) {
        err -= deltaY;
        lastX += sx;
      }
      if (e2 < deltaX) {
        err += deltaX;
        lastY += sy;
      }
      ctx.fillRect(
        Math.floor((lastX / 512) * canvasSize),
        Math.floor((lastY / 512) * canvasSize),
        pixelSize,
        pixelSize,
      );
    }
  };

  canvas.onmouseup = () => {
    canvas.onmousemove = null;
  };

  canvas.onmouseleave = () => {
    canvas.onmousemove = null;
  };

  localStorage.setItem('canvasData', canvas.toDataURL());
  const currentFrame = localStorage.getItem('currentFrame');
  renderImgFrame(currentFrame);
};

const erase = (e) => {
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  const currentColor = 'transparent';
  const pixelSize = localStorage.getItem('pixelSize');
  const canvasSize = localStorage.getItem('canvasSize');

  let lastX = e.offsetX;
  let lastY = e.offsetY;

  ctx.fillStyle = currentColor;
  ctx.clearRect(
    Math.floor((lastX / 512) * canvasSize),
    Math.floor((lastY / 512) * canvasSize),
    pixelSize,
    pixelSize,
  );

  canvas.onmousemove = (evt) => {
    const currX = evt.offsetX;
    const currY = evt.offsetY;

    const deltaX = Math.abs(currX - lastX);
    const deltaY = Math.abs(currY - lastY);

    const sx = lastX < currX ? 1 : -1;
    const sy = lastY < currY ? 1 : -1;
    let err = deltaX - deltaY;

    while (!(lastX === currX && lastY === currY)) {
      const e2 = 2 * err;
      if (e2 > -deltaY) {
        err -= deltaY;
        lastX += sx;
      }
      if (e2 < deltaX) {
        err += deltaX;
        lastY += sy;
      }
      ctx.clearRect(
        Math.floor((lastX / 512) * canvasSize),
        Math.floor((lastY / 512) * canvasSize),
        pixelSize,
        pixelSize,
      );
    }
  };

  canvas.onmouseup = () => {
    canvas.onmousemove = null;
  };

  canvas.onmouseleave = () => {
    canvas.onmousemove = null;
  };

  localStorage.setItem('canvasData', canvas.toDataURL());
  const currentFrame = localStorage.getItem('currentFrame');
  renderImgFrame(currentFrame);
};

const fillArea = (e) => {
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  const currentColor = localStorage.getItem('currentColor');
  const pixelSize = localStorage.getItem('pixelSize');
  const canvasSize = localStorage.getItem('canvasSize');

  const targetColorArr = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
  const targetColor = `rgb(${targetColorArr[0]}, ${targetColorArr[1]}, ${targetColorArr[2]})`;
  ctx.fillStyle = currentColor;

  if (targetColor === currentColor) return;

  const lastX = e.offsetX;
  const lastY = e.offsetY;

  function floodFill(x, y) {
    const newPointColorArray = ctx.getImageData(x, y, 1, 1).data;
    const newPointColor = `rgb(${newPointColorArray[0]}, ${newPointColorArray[1]}, ${newPointColorArray[2]})`;
    if (targetColor !== newPointColor) return;

    ctx.fillRect(x, y, pixelSize, pixelSize);
    if (x > 0) {
      floodFill(x - pixelSize, y);
    }
    if (y > 0) {
      floodFill(x, y - pixelSize);
    }
    if (x < 512) {
      floodFill(x + +pixelSize, y);
    }
    if (y < 512) {
      floodFill(x, y + +pixelSize);
    }
  }

  floodFill(
    Math.floor((lastX / 512) * canvasSize),
    Math.floor((lastY / 512) * canvasSize),
  );

  localStorage.setItem('canvasData', canvas.toDataURL());
  const currentFrame = localStorage.getItem('currentFrame');
  renderImgFrame(currentFrame);
};

const chooseColor = (e) => {
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  const canvasSize = localStorage.getItem('canvasSize');
  const lastX = e.offsetX;
  const lastY = e.offsetY;
  const x = Math.floor((lastX / 512) * canvasSize);
  const y = Math.floor((lastY / 512) * canvasSize);
  const pixel = ctx.getImageData(x, y, 1, 1).data;
  const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;

  const currentColorElement = document.querySelector('.palette__item--current .palette__preview');
  const alterColorElement = document.querySelector('.palette__item--alternative .palette__preview');
  const currentColorValue = document.querySelector('.palette__item--current input').value;

  const prevColor = currentColorValue;
  const curColor = color;

  document.querySelector('.palette__item--current input').value = curColor;
  document.querySelector('.palette__item--alternative input').value = prevColor;
  currentColorElement.style.backgroundColor = curColor;
  alterColorElement.style.backgroundColor = prevColor;

  localStorage.setItem('currentColor', curColor);
  localStorage.setItem('alterColor', prevColor);
};


const drawLine = (e) => {
  let x;
  let y;
  let dx;
  let dy;
  let dx1;
  let dy1;
  let px;
  let py;
  let xe;
  let ye;
  let i;

  const canvas = document.querySelector('#canvas');
  const x1 = e.offsetX;
  const y1 = e.offsetY;

  canvas.onmouseup = (evt) => {
    const x2 = evt.offsetX;
    const y2 = evt.offsetY;

    const ctx = canvas.getContext('2d');
    const currentColor = localStorage.getItem('currentColor');
    const pixelSize = localStorage.getItem('pixelSize');
    const canvasSize = localStorage.getItem('canvasSize');

    dx = x2 - x1;
    dy = y2 - y1;

    dx1 = Math.abs(dx);
    dy1 = Math.abs(dy);

    px = 2 * dy1 - dx1;
    py = 2 * dx1 - dy1;

    if (dy1 <= dx1) {
      if (dx >= 0) {
        x = x1; y = y1; xe = x2;
      } else {
        x = x2; y = y2; xe = x1;
      }

      ctx.fillStyle = currentColor;
      ctx.fillRect(
        Math.floor((x / 512) * canvasSize),
        Math.floor((y / 512) * canvasSize),
        pixelSize,
        pixelSize,
      );

      for (i = 0; x < xe; i += 1) {
        x += 1;
        if (px < 0) {
          px += 2 * dy1;
        } else {
          if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
            y += 1;
          } else {
            y -= 1;
          }
          px += 2 * (dy1 - dx1);
        }

        ctx.fillStyle = currentColor;
        ctx.fillRect(
          Math.floor((x / 512) * canvasSize),
          Math.floor((y / 512) * canvasSize),
          pixelSize,
          pixelSize,
        );
      }
    } else {
      if (dy >= 0) {
        x = x1;
        y = y1;
        ye = y2;
      } else {
        x = x2;
        y = y2;
        ye = y1;
      }

      ctx.fillStyle = currentColor;
      ctx.fillRect(
        Math.floor((x / 512) * canvasSize),
        Math.floor((y / 512) * canvasSize),
        pixelSize,
        pixelSize,
      );

      for (i = 0; y < ye; i += 1) {
        y += 1;
        if (py <= 0) {
          py += 2 * dx1;
        } else {
          if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
            x += 1;
          } else {
            x -= 1;
          }
          py += 2 * (dx1 - dy1);
        }

        ctx.fillStyle = currentColor;
        ctx.fillRect(
          Math.floor((x / 512) * canvasSize),
          Math.floor((y / 512) * canvasSize),
          pixelSize,
          pixelSize,
        );
      }
    }
    localStorage.setItem('canvasData', canvas.toDataURL());
    const currentFrame = localStorage.getItem('currentFrame');
    renderImgFrame(currentFrame);
  };
};

export {
  draw,
  fillArea,
  erase,
  chooseColor,
  drawLine,
};
