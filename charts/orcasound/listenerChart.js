import {w, h, vpadding, hpadding} from '../script.js';

export const buildChart = (dataset) => {

  const visHolder = d3.select('.visHolder');

  // removes the chart so it can rebuild on every resize
    visHolder.selectAll('svg').remove();
    visHolder.selectAll('div').remove();

    visHolder
      .append('div')
      .attr('id','title')
      .html('Orcasound listeners recorded at each detection')

    d3.select('title')
      .html('Orcasound listeners recorded at each detection');

    const svg = visHolder
      .append('svg')
      .attr('viewBox', `0 0 ${w} ${h}`)
      .attr('preserveAspectRatio', 'none');

    const xScale = 
      d3.scaleTime()
        .domain(d3.extent(dataset, d=>d.datetime))
        .range([hpadding, `${w - hpadding}`]);

    const yScale = 
      d3.scaleLinear()
        .domain([d3.min(dataset, d=>d.listener_count), d3.max(dataset, d=>d.listener_count)])
        .range([`${h - vpadding}`, vpadding]);

    const xAxis = d3.axisBottom(xScale);
    svg.append('g')
      .call(xAxis)   
      .attr('id','x-axis')
      .attr('transform', `translate(0, ${h - vpadding})`);

    const yAxis = d3.axisLeft(yScale);
    svg.append('g')
      .call(yAxis)
      .attr('id','y-axis')
      .attr('transform', `translate(${hpadding}, 0)`);

    var uniqueNodes = [...new Set(d3.map(dataset, d=>d.node_name))];
    var color = d3.scaleOrdinal()
                .domain(uniqueNodes);
    

    const tooltip = d3.select('.visHolder')
      .append('div')
      .attr('id','tooltip')
      .style('opacity', 0);

    svg.selectAll('.line')
       .data(dataset)
       .enter()
       .append('path')
       .attr('fill', 'none')
       .attr('stroke', d=>color(d.node_name))
       .attr('stroke-width', 1.5)
       .attr('d', d => {
         d3.line()
           .x(d => xScale(d.datetime))
           .y(d => yScale(d.listener_count))
       })

    let ol_data = [];
    let bp_data = [];
    let pt_data = [];

    dataset.forEach(element => {
      switch (element.node_name) {
        case "rpi_orcasound_lab":
          ol_data.push(element);
          break;
        case "rpi_bush_point":
          bp_data.push(element);
          break;
        case "rpi_port_townsend":
          pt_data.push(element);
          break;
      }
    });

    function drawPaths() {

      svg.selectAll('path').remove();

      var olPath = svg.append('path')
      .datum(ol_data)
      .attr('id', 'orcasound-lab')
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-opacity', .5)
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x(d=>xScale(d.datetime))
        .y(d=>yScale(d.listener_count))
      )

      var bpPath = svg.append('path')
      .datum(bp_data)
      .attr('id', 'bush-point')
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-opacity', .5)
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x(d=>xScale(d.datetime))
        .y(d=>yScale(d.listener_count))
      )

      var ptPath = svg.append('path')
      .datum(pt_data)
      .attr('id', 'port-townsend')
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('stroke-opacity', .5)
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x(d=>xScale(d.datetime))
        .y(d=>yScale(d.listener_count))
      )
    };
    
    function drawMarks() {
      svg.selectAll('circle').remove();
      svg.selectAll('rect').remove();

      svg.selectAll('circle')
//        .remove()
        .data(dataset)
        .enter()
        .append('circle')
        .attr('class', 'data-mark')
        .attr('cx', d => xScale(d.datetime))
        .attr('cy', yScale(220))
        .attr('r', 1)
        .attr('fill','black');

      svg.selectAll('rect')
//        .remove()
        .data(dataset)
        .enter()
        .append('rect')
        .attr('class', 'hover-mark')
        .attr('x', d => xScale(d.datetime) - 5)
        .attr('y', d => yScale(d.listener_count) - 5)
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill','transparent')
        .attr('data-xvalue', d => Date.parse(d.datetime))
        .attr('data-yvalue', d => d.listener_count)
        .on('mouseover', function(e){
          var dataTime = this.getAttribute('data-xvalue');
          var dataCount = this.getAttribute('data-yvalue');

          let xVal = +xScale(dataTime);

          this.setAttribute('fill', 'yellow');

          tooltip.html(
          '<div class="data-time">datetime: ' + new Date(+dataTime) + '</div><div class="data-count">listener_count: ' + dataCount + '</div>'
          )
          .style('left', (xVal + 10) + 'px')
          .style('top', yScale(dataCount) + 'px')
          .style('opacity', 1)
          })
          .on('mouseout', function(e) {
            tooltip.style('opacity', 0);
            this.setAttribute('fill', 'transparent');
          })
    }
    
    drawPaths();
    drawMarks();

    function redrawPaths() {
        d3.select('#orcasound-lab')
          .datum(ol_data)
          .transition().duration(duration)
          .attr('d', d3.line()
          .x(d=>xScale(d.datetime))
          .y(d=>yScale(d.listener_count))  
          );
        d3.select('#bush-point')
          .datum(bp_data)
          .transition().duration(duration)
          .attr('d', d3.line()
            .x(d=>xScale(d.datetime))
            .y(d=>yScale(d.listener_count))
          );
        d3.select('#port-townsend')
          .datum(pt_data)
          .transition().duration(duration)
          .attr('d', d3.line()
            .x(d=>xScale(d.datetime))
            .y(d=>yScale(d.listener_count))
          );
        svg.selectAll('.data-mark')
          .attr('cx', d => xScale(d.datetime));
        svg.selectAll('.hover-mark')
          .attr('x', d => xScale(d.datetime) - 5)
          .attr('y', d => yScale(d.listener_count) - 5);
      };

    const startDate = d3.min(dataset, d => d.datetime);
    const endDate = d3.max(dataset, d => d.datetime);
    let duration = 1500;

    d3.select('#startDate').html(startDate);
    d3.select('#startYear').attr('value', startDate.getFullYear());
      d3.select('#startMonth').attr('value', startDate.getMonth() + 1);
      d3.select('#startDay').attr('value', startDate.getDate());
      d3.select('#startHour').attr('value', startDate.getHours());
      d3.select('#startMinute').attr('value', startDate.getMinutes());
      d3.select('#startSecond').attr('value', startDate.getSeconds());
      
      d3.select('#endDate').html(endDate);
      d3.select('#endYear').attr('value', endDate.getFullYear());
      d3.select('#endMonth').attr('value', endDate.getMonth()+ 1);
      d3.select('#endDay').attr('value', endDate.getDate());
      d3.select('#endHour').attr('value', endDate.getHours());
      d3.select('#endMinute').attr('value', endDate.getMinutes());
      d3.select('#endSecond').attr('value', endDate.getSeconds());


      d3.select('#startForm')
        .on('submit', function(e) {
          e.preventDefault();
          let start = new Date(
            e.target.elements.startYear.value,
            e.target.elements.startMonth.value - 1,
            e.target.elements.startDay.value,
            e.target.elements.startHour.value,
            e.target.elements.startMinute.value,
            e.target.elements.startSecond.value
            );
            xScale.domain([start, xScale.domain()[1]]);
            svg.select('#x-axis')
               .transition().duration(duration)
               .call(xAxis);
            redrawPaths();
            d3.select('#startDate').html(start);
        });

        d3.select('#endForm')
        .on('submit', function(e) {
          e.preventDefault();
          let end = new Date(
            e.target.elements.endYear.value,
            e.target.elements.endMonth.value - 1,
            e.target.elements.endDay.value,
            e.target.elements.endHour.value,
            e.target.elements.endMinute.value,
            e.target.elements.endSecond.value
            );
            xScale.domain([xScale.domain()[0], end]);
            svg.select('#x-axis')
               .transition().duration(0)
               .call(xAxis);
            redrawPaths();
            d3.select('#endDate').html(end);
        });
                
};


// new Date for 203 count returns 2021-11-03T05:31:07.000Z
// original for 203 count was 2021-11-02 22:31:07
// GA shows peak at 