import { setSizes, close } from '../script.js';
import { buildChart } from './listenerChart.js';

// get the data to build the bar chart
// export const dataset = []; // not using this anymore because passing the data directly to buildScatterPlot function
const url = './listenerCount.json';

export const listenerData = () => {
    
    d3.json(url)
    .then(data => {
        let ratio = .4;
        // perform any data manipulations
        data.forEach(obj => {
            if (obj.id === 1570) {
                console.log('before: ', obj.datetime);
                console.log('stringified', JSON.stringify(obj));
            }
            obj.datetime = new Date(new Date(obj.datetime) - (60000 * 60 * 7)); 
            if (obj.id === 1570) {
                console.log('after: ', obj.datetime);
                console.log('stringified', JSON.stringify(obj));
            }
        });

        // print to the console
        console.log('data: ', data);

        // render the chart, and recalculate sizes on window resize
        setSizes(ratio);
        buildChart(data);

        // print to the dataHolder, has to go after buildChart because that adds the div
        let html = `<div><strong>source: </strong><a href="${url}">${url}</a></div><a href="#" id="close"> close</a><br />`;

        data.forEach(obj => {
            html += '<div class="data-point">';
            html += JSON.stringify(obj);
            html += '</div>';
        })
        html += '</div>';

        document.getElementById('dataHolder').innerHTML = html;

        window.addEventListener('resize', function(){
            setSizes(ratio);
            buildChart(data);
        });
        close();     
    })
    .catch((err) => console.log(err));
  

};



