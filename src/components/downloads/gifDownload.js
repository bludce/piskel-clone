const download = require('downloadjs');
const Gif = require('gif.js-upgrade/dist/gif');

const gifDownload = () => {
  const gif = new Gif({
    workers: 4,
    workerScript: './gif.worker.js',
    width: 100,
    height: 100,
  });

  const frames = document.querySelectorAll('.canvas');
  const fps = document.querySelector('.preview__range').value;
  frames.forEach((item) => {
    gif.addFrame(item, { delay: 1000 / fps });
  });

  gif.on('finished', (resultGif) => {
    download(resultGif, 'animation.gif', 'gif');
  });

  gif.render();
};

export default gifDownload;
