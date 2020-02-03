const UPNG = require('upng-js');
const download = require('downloadjs');

const apngDownload = () => {
  const frames = document.querySelectorAll('.canvas');
  const fps = document.querySelector('.preview__range').value;
  const arrayFrameTime = new Array(frames.length).fill(1000 / fps);
  const arrayBuffer = [];
  frames.forEach((item) => {
    const ctx = item.getContext('2d');
    const imageData = ctx.getImageData(0, 0, 100, 100);
    const { buffer } = imageData.data;
    arrayBuffer.push(buffer);
  });
  const img = UPNG.encode(arrayBuffer, 100, 100, 0, arrayFrameTime);
  download(img, 'Anim.apng', 'apng');
};

export default apngDownload;
