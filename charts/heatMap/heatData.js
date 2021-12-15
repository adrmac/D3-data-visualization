import { setSizes, close } from '../script.js';
import { buildHeatMap } from './heatMap.js';

// get the data to build the bar chart
// export const dataset = []; // not using this anymore because passing the data directly to buildScatterPlot function
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';

export const heatData = () => {
    
    d3.json(url)
    .then(data => {
        // print to the dataHolder
        let html = '<h2>raw data</h2><div><a href="#" id="close">close</a></div>';
        document.getElementById('dataHolder').innerHTML = html;
        document.getElementById('dataHolder').innerHTML += JSON.stringify(data);

        // print to the console
        console.log('data: ', data);

        // render the chart, and recalculate sizes on window resize
        setSizes();
        buildHeatMap(data);
        window.addEventListener('resize', function(){
            setSizes();
            buildHeatMap(data);
        });
        close();     
    })
    .catch((err) => console.log(err));
  

};



