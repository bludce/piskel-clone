const setPencilSize = () => {
  const value = localStorage.getItem('pixelSize');

  if (!value) {
    const currentSizeEl = document.querySelector('.pen-size__container[data-size="1"]');
    currentSizeEl.classList.add('pen-size__container--active');
    localStorage.setItem('pixelSize', 1);
  } else {
    const currentSizeEl = document.querySelector(`.pen-size__container[data-size="${value}"]`);
    currentSizeEl.classList.add('pen-size__container--active');
  }
};

export default setPencilSize;
