import apngDownload from './apngDownload';
import gifDownload from './gifDownload';

const initHandler = () => {
  const apng = document.querySelector('.apng');
  const gif = document.querySelector('.gif');

  apng.addEventListener('click', apngDownload);
  gif.addEventListener('click', gifDownload);
};

export default initHandler;
