const fullScreen = () => {
  if ('fullscreenEnabled' in document || 'webkitFullscreenEnabled' in document || 'mozFullScreenEnabled' in document || 'msFullscreenEnabled' in document) {
    if (document.fullscreenEnabled
      || document.webkitFullscreenEnabled
      || document.mozFullScreenEnabled
      || document.msFullscreenEnabled) {
      const element = document.querySelector('.preview__canvas');
      if ('requestFullscreen' in element) {
        element.requestFullscreen();
      } else if ('webkitRequestFullscreen' in element) {
        element.webkitRequestFullscreen();
      } else if ('mozRequestFullScreen' in element) {
        element.mozRequestFullScreen();
      } else if ('msRequestFullscreen' in element) {
        element.msRequestFullscreen();
      }
    }
  }
};

const screenChange = () => {
  const canvas = document.querySelector('.preview__canvas .canvas-container');
  if (document.fullscreenElement
    || document.webkitFullscreenElement
    || document.mozFullScreenElement
    || document.msFullscreenElement) {
    canvas.classList.add('flex');
  } else {
    canvas.classList.remove('flex');
    if ('exitFullscreen' in document) {
      document.exitFullscreen();
    } else if ('webkitExitFullscreen' in document) {
      document.webkitExitFullscreen();
    } else if ('mozCancelFullScreen' in document) {
      document.mozCancelFullScreen();
    } else if ('msExitFullscreen' in document) {
      document.msExitFullscreen();
    }
  }
};

const initFullScreen = () => {
  const btn = document.querySelector('.full-screen__btn');
  btn.addEventListener('click', fullScreen);
  document.addEventListener('fullscreenchange', screenChange);
  document.addEventListener('webkitfullscreenchange', screenChange);
  document.addEventListener('mozfullscreenchange', screenChange);
  document.addEventListener('MSFullscreenChange', screenChange);
};

export default initFullScreen;
