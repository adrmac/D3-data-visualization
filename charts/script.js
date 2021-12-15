import { barData } from './barChart/barData.js';
import { scatterData } from './scatterPlot/scatterData.js';
import { heatData } from './heatMap/heatData.js';
import { listenerData } from './orcasound/listenerData.js';

export let w, h, vpadding, hpadding;
export const visHolder = document.querySelectorAll('.visHolder');


export const setSizes = (aspectRatio) => {
  w = visHolder[0].offsetWidth;
  h = aspectRatio * w;
  vpadding = 30;
  hpadding = 50;
};


const fetchData = () => {
  let urlArray = window.location.href.split('/');
  switch (true) {
    case urlArray.includes('orcasound'):
      listenerData();
      break;
    case urlArray.includes('barChart'):
      barData();
      break;
    case urlArray.includes('scatterPlot'):
      scatterData();
      break;
    case urlArray.includes('heatMap'):
      heatData();
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
