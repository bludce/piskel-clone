const shortcuts = (e) => {
  const KeyboardEvent = {
    pen: 80,
    fill: 66,
    eraser: 69,
    stroke: 76,
    color: 79,
    delete: 68,
    move: 77,
    copy: 67,
  };
  const keys = Object.keys(KeyboardEvent);
  if (e.keyCode === KeyboardEvent.pen) {
    const indexElement = keys.indexOf('pen');
    const element = document.querySelector(`[data-tool="${keys[indexElement]}"]`);
    element.click();
  }
  if (e.keyCode === KeyboardEvent.fill) {
    const indexElement = keys.indexOf('fill');
    const element = document.querySelector(`[data-tool="${keys[indexElement]}"]`);
    element.click();
  }
  if (e.keyCode === KeyboardEvent.eraser) {
    const indexElement = keys.indexOf('eraser');
    const element = document.querySelector(`[data-tool="${keys[indexElement]}"]`);
    element.click();
  }
  if (e.keyCode === KeyboardEvent.stroke) {
    const indexElement = keys.indexOf('stroke');
    const element = document.querySelector(`[data-tool="${keys[indexElement]}"]`);
    element.click();
  }
  if (e.keyCode === KeyboardEvent.color) {
    const indexElement = keys.indexOf('color');
    const element = document.querySelector(`[data-tool="${keys[indexElement]}"]`);
    element.click();
  }
  if (e.keyCode === KeyboardEvent.delete) {
    const element = document.querySelector('.list__item--active .canvas-tool__delete');
    element.click();
  }
  if (e.keyCode === KeyboardEvent.copy) {
    const element = document.querySelector('.list__item--active .canvas-tool__copy');
    element.click();
  }
};

export default shortcuts;
