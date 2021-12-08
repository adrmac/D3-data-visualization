import { barData } from './barChart/barData.js';
import { scatterData } from './scatterPlot/scatterData.js';

export let w, h, vpadding, hpadding;
export const visHolder = document.querySelectorAll('.visHolder');


export const setSizes = () => {
  w = visHolder[0].offsetWidth;
  h = .5625 * w;
  vpadding = 30;
  hpadding = 50;
  console.log('just ran setSizes and w is '+w);
};


const fetchData = () => {
  let urlArray = window.location.href.split('/');
  switch (true) {
    case urlArray.includes('barChart'):
      barData();
      break;
    case urlArray.includes('scatterPlot'):
      scatterData();
      break;
  }
}
fetchData();


export const close = () => {
  document.getElementById('close').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('dataHolder').style.display = "none";
  });
}
