const getPencilSize = (e) => {
  const list = document.querySelectorAll('.pen-size__container');
  list.forEach((item) => {
    item.classList.remove('pen-size__container--active');
  });
  e.target.classList.add('pen-size__container--active');
  const pixelSize = e.target.dataset.size;
  localStorage.setItem('pixelSize', pixelSize);
};

const initPanelPencilSizes = () => {
  const list = document.querySelectorAll('.pen-size__container');
  list.forEach((item) => {
    item.addEventListener('click', getPencilSize);
  });
};

export default initPanelPencilSizes;
