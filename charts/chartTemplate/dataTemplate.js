import { setSizes, close } from '../script.js';
import { buildChart } from './chartTemplate.js';

// get the data to build the bar chart
// export const dataset = []; // not using this anymore because passing the data directly to buildScatterPlot function
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';

export const chartData = () => {
    
    d3.json(url)
    .then(data => {

        // print to the console
        console.log('data: ', data);

        // render the chart, and recalculate sizes on window resize
        setSizes();
        buildChart(data);

        // print to the dataHolder, has to go after buildChart because that adds the div
        let html = `<div><strong>source: </strong><a href="${url}">${url}</a></div><a href="#" id="close"> close</a><br />`;
        document.getElementById('dataHolder').innerHTML = html;
        document.getElementById('dataHolder').innerHTML += JSON.stringify(data);

        window.addEventListener('resize', function(){
            setSizes();
            buildChart(data);
        });
        close();     
    })
    .catch((err) => console.log(err));
  

};



