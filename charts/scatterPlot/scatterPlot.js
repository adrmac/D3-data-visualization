import {w, h, vpadding, hpadding} from '../script.js';
//import { dataset as scatterData } from './scatterData.js';

export const buildScatterPlot = (dataset) => {
    d3.selectAll('.visHolder svg').remove();
  
    const svg = d3.selectAll('.visHolder')
      .append('svg')
      .attr('viewBox', `0 0 ${w} ${h}`)
      .attr('preserveAspectRatio', 'none')

    // setting color coding using standard color library
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    // constructing axes, different for each type of chart
    const xScale = d3.scaleTime()
                    .domain([d3.min(dataset, d=>d.Year - 1), d3.max(dataset, d=>d.Year)])
                    .range([hpadding,w - vpadding]);
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d')); 
    const yScale = d3.scaleTime()
                    .domain(d3.extent(dataset, d=>d.Time))
        // extent returns an array of [min, max]
                    .range([h - vpadding, vpadding / 2]);
    const timeFormat = d3.timeFormat('%M:%S');
    const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat);
  
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
    
    svg.selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('data-xvalue', d => d.Year)
      .attr('data-yvalue', d => d.Time)
      .attr('cx', d => xScale(d.Year) )
      .attr('cy', d => yScale(d.Time))
      .attr('r', 5)
      .attr('fill', d => color(d.Doping !== ""))
      .on('mouseover', function(e){
        var dataYear = this.getAttribute('data-xvalue');
        var dataTime = this.getAttribute('data-yvalue');
  
        tooltip.html(
        '<div class="data-year">' + dataYear + '</div><div class="data-time">' + dataTime + '</div>'
        )
        .style('left', (xScale(dataYear) + 1) + 'px')
        .style('top', '100px')
        .style('opacity', 1)
        .attr('data-year', dataYear);
        })
        .on('mouseout', function(e) {
          tooltip.style('opacity', 0)
        });
    
    const legendContainer = svg.append('g').attr('id', 'legend');
    const legend = legendContainer.selectAll('#legend')
                   .data(color.domain()) // this is NOT an empty array, it captures the two color assignments that were made in constructing the circles
                   .enter()
                   .append('g')
                   .attr('class', 'legend-label')
                   .attr('transform', (d, i) => `translate(0, ${h / 2 - i * 20})`);
    console.log(color.domain()); // logs [true, false]
    legend.append('rect')
          .attr('x', w - 18)
          .attr('width', 18)
          .attr('height', 18)
          .style('fill', color); // passes the function into the method without calling it, iterates through each color in the scale

          legend.append('text')
          .attr('x', w - 24)
          .attr('y', 9)
          .attr('dy', '.35em')
          .style('text-anchor', 'end')
          .text(d => {
            if (d) {
              return 'Riders with doping allegations';
            } else {
              return 'No doping allegations';
            }
          })

  }


