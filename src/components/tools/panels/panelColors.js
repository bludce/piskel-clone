const setCurrentColor = () => {
  document.querySelector('.palette__item--current input').addEventListener('change', (e) => {
    e.target.nextElementSibling.style.backgroundColor = e.target.value;
    e.target.nextElementSibling.style.backgroundImage = 'none';
    localStorage.setItem('currentColor', e.target.value);
  });
};

const setAlterColor = () => {
  document.querySelector('.palette__item--alternative input').addEventListener('change', (e) => {
    e.target.nextElementSibling.style.backgroundColor = e.target.value;
    e.target.nextElementSibling.style.backgroundImage = 'none';
    localStorage.setItem('alterColor', e.target.value);
  });
};

const swapColor = () => {
  document.querySelector('.palette__item--swap').addEventListener('click', () => {
    const currentColorElement = document.querySelector('.palette__item--current .palette__preview');
    const alterColorElement = document.querySelector('.palette__item--alternative .palette__preview');
    const currentColorValue = document.querySelector('.palette__item--current input').value;
    const alterColorValue = document.querySelector('.palette__item--alternative input').value;

    document.querySelector('.palette__item--current input').value = alterColorValue;
    document.querySelector('.palette__item--alternative input').value = currentColorValue;
    currentColorElement.style.backgroundColor = alterColorValue;
    alterColorElement.style.backgroundColor = currentColorValue;
    localStorage.setItem('currentColor', alterColorValue);
    localStorage.setItem('alterColor', currentColorValue);
  });
};


const initPanelColors = () => {
  setCurrentColor();
  setAlterColor();
  swapColor();
};

export default initPanelColors;
