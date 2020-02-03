import { tooltipOver, tooltipOut } from './tooltip';
import shortcuts from './shortcuts';

const initHandler = () => {
  const tools = document.querySelectorAll('.tools__item');
  tools.forEach((item) => {
    item.addEventListener('mouseover', tooltipOver);
    item.addEventListener('mouseout', tooltipOut);
  });

  const canvasTools = document.querySelectorAll('.canvas-tool');
  canvasTools.forEach((item) => {
    item.addEventListener('mouseover', tooltipOver);
    item.addEventListener('mouseout', tooltipOut);
  });

  document.addEventListener('keydown', shortcuts);
};

export default initHandler;
