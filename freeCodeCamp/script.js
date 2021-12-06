import barData from './barData.js';
import buildBarChart from './barChart.js';

export let w, h, vpadding, hpadding;
export const visHolder = document.querySelectorAll('.visHolder');
let i = 0;



export const setSizes = () => {
  w = visHolder[0].offsetWidth;
  h = .5625 * w;
  vpadding = 30;
  hpadding = 50;
  console.log('w '+w+' h '+h+' '+i);
  i++;
}



export const resetSizes = () => {
  setSizes();
  buildBarChart();
}

barData();
window.addEventListener('resize', resetSizes);