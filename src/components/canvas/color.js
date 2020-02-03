const setColor = () => {
  const currentColorValue = localStorage.getItem('currentColor');
  const alterColorValue = localStorage.getItem('alterColor');
  const currentColorElement = document.querySelector('.palette__item--current .palette__preview');
  const alterColorElement = document.querySelector('.palette__item--alternative .palette__preview');

  if (currentColorValue || alterColorValue) {
    document.querySelector('.palette__item--current input').value = currentColorValue;
    document.querySelector('.palette__item--alternative input').value = alterColorValue;

    currentColorElement.style.backgroundColor = currentColorValue;
    alterColorElement.style.backgroundColor = alterColorValue;

    currentColorElement.style.backgroundImage = 'none';
    alterColorElement.style.backgroundImage = 'none';
  } else {
    document.querySelector('.palette__item--current input').value = '#000000';
    document.querySelector('.palette__item--alternative input').value = '#ffffff';

    currentColorElement.style.backgroundColor = '#000000';
    alterColorElement.style.backgroundColor = '#ffffff';

    currentColorElement.style.backgroundImage = 'none';
    alterColorElement.style.backgroundImage = 'none';
  }
};

export default setColor;
