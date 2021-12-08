import { buildBarChart } from './barChart.js';
import { setSizes, close } from '../script.js';

// get the data to build the bar chart
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

export const barData = () => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        // formatting data for the dataHolder
        let html = '<h2>raw data</h2><div><a href="#" id="close">close</a></div>';
        data.data.forEach(val=> {
            html += '<div class="dataPoint">'
            html += val;
            html += '</div>';
        });
        // print data to the dataHolder
        document.getElementById('dataHolder').innerHTML = html;
        document.getElementById('dataHolder').style.display = "block";

        // render chart and recalculate size on window resize
        setSizes();
        buildBarChart(data.data);
        window.addEventListener('resize', function(){
            setSizes();
            buildBarChart(data.data);
        });
        close();
    });
};

