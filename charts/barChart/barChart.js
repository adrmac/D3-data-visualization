import {w, h, vpadding, hpadding} from '../script.js';
//import { dataset } from './barData.js';

export const buildBarChart = (dataset) => {
    d3.selectAll('#bar .visHolder svg').remove();
  
    const svg = d3.selectAll('#bar .visHolder')
      .append('svg')
    .attr('viewBox', `0 0 ${w} ${h}`)
    .attr('preserveAspectRatio', 'none')
  
    const xScale = d3.scaleTime()
                   .domain([new Date(d3.min(dataset, d=>d[0])), new Date(d3.max(dataset, d=>d[0]))])
                   .range([hpadding,w - vpadding]);
    const xAxis = d3.axisBottom(xScale);
    const yScale = d3.scaleLinear()
                   .domain([0, d3.max(dataset,d=>d[1])])
                   .range([h - vpadding, vpadding / 2]);
    const yAxis = d3.axisLeft(yScale);
  
  
    svg.append('g')
      .call(xAxis)   
      .attr('id','x-axis')
      .attr('transform', `translate(0, ${h - vpadding})`);
  
    svg.append('g')
      .call(yAxis)
      .attr('id','y-axis')
      .attr('transform', `translate(${hpadding}, 0)`);
  
    const tooltip = d3.select('.visHolder')
                  .append('div')
                  .attr('id','tooltip')
                  .style('opacity', 0);
    
    svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('data-date', d => d[0])
      .attr('data-gdp', d => d[1])
  //   .attr('y', h)
      .attr('x', d => xScale(new Date(d[0])) )
      .attr('y', d => yScale(d[1]))
      .attr('width', 5)
      .attr('height', d => h - vpadding -yScale(d[1]))
      .attr('fill','blue')
      .on('mouseover', function(e){
        var dataDate = this.getAttribute('data-date');
        var dataGdp = this.getAttribute('data-gdp');
        this.setAttribute('fill','orange');
  
        tooltip.html(
        '<div class="tooltip-date">' + dataDate + '</div><div class="tooltip-gdp">' + dataGdp + '</div>'
        ).style('left', (xScale(new Date(dataDate)) + 20) + 'px').style('top', '100px').style('opacity', 1).attr('data-date', dataDate)
        })
        .on('mouseout', function(e) {
          tooltip.style('opacity', 0)
        });
  }


