import buildBarChart from './barChart.js';
import { setSizes } from '../script.js';

// get the data to build the bar chart
export const dataset = [];
const urlBar = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
let html = "";

const barData = () => {
    fetch(urlBar)
    .then(response => response.json())
    .then(data => {
        document.getElementById('dataHolder').innerHTML =JSON.stringify(data.data);
        html = "";
        data.data.forEach(val=> {
            html += '<div class="dataPoint">'
            html += val;
            html += '</div>';
            dataset.push(val);
        });
        document.getElementById('dataHolder').innerHTML = html;

        setSizes();
        buildBarChart();
    });
};

export default barData;
