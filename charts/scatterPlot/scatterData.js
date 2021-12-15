import { setSizes, close } from '../script.js';
import { buildScatterPlot } from './scatterPlot.js';

// get the data to build the bar chart
// export const dataset = []; // not using this anymore because passing the data directly to buildScatterPlot function
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

export const scatterData = () => {
    d3.json(url)
    .then(data => {
        let ratio = .5625;

        let html = '<h2>raw data</h2><div><a href="#" id="close">close</a></div>';

        data.forEach((obj)=> {
            // formatting the data 
            obj.Place = +obj.Place; // unary + converts to number
            var parsedTime = obj.Time.split(':');
            obj.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);

            // formatting the dataset for the dataHolder
            for (const key in obj) {
                html += '<div class="dataPoint">'
                html += key + ": " + obj[key];
                html += '</div>';                    
            }
            html += '<br />';
        });

        // print to the dataHolder
        document.getElementById('dataHolder').innerHTML = html;
        document.getElementById('dataHolder').style.display = "block";

        // render the chart, and recalculate sizes on window resize
        setSizes(ratio);
        buildScatterPlot(data);
        window.addEventListener('resize', function(){
            setSizes(ratio);
            buildScatterPlot(data);
        });
        close();
    })  
    .catch((err) => console.log(err));
};

