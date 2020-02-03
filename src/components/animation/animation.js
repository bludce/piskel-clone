let fpsInterval;
let now;
let then;
let elapsed;
let currentFrame = 0;


const animate = () => {
  requestAnimationFrame(animate);

  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    const canvas = document.querySelector('.preview__canvas canvas');
    const ctx = canvas.getContext('2d');
    const data = JSON.parse(localStorage.getItem('frameState'));
    currentFrame = (currentFrame + 1) % data.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.src = data[currentFrame];
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }
};

const startAnimating = (fps) => {
  fpsInterval = 1000 / fps;
  then = Date.now();
  animate();
};

export default startAnimating;
