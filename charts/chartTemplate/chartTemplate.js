import {w, h, vpadding, hpadding} from '../script.js';

export const buildChart = (dataset) => {
    // removes the chart so it can rebuild on every resize
    d3.selectAll('svg').remove();

    const visHolder = d3.select('.visHolder');

    visHolder
      .append('div')
      .attr('id','title')
      .html('Chart Title')

    d3.select('title')
      .html('Chart Title');

    const svg = visHolder
      .append('svg')
      .attr('viewBox', `0 0 ${w} ${h}`)
      .attr('preserveAspectRatio', 'none');

    const xScale = 
      d3.scaleLinear()
        .domain([0, 100])
        .range([hpadding, `${w - hpadding}`]);

    const yScale = 
      d3.scaleLinear()
        .domain([0, 100])
        .range([`${h - vpadding}`, vpadding]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .call(xAxis)   
      .attr('id','x-axis')
      .attr('transform', `translate(0, ${h - vpadding})`);
    
    svg.append('g')
      .call(yAxis)
      .attr('id','y-axis')
      .attr('transform', `translate(${hpadding}, 0)`);

};


