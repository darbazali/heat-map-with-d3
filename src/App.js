// import d3 package
import * as d3 from 'd3';
import { axisBottom } from 'd3';

// target the container node, this will be the frame for the entier application
const container = d3.select("#container")
const baseTemp = 8.66;
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  'June',
  'July',
  'Augast',
  'September',
  'November',
  'October',
  'Desember'
]
// create a title for the app
container
  .append('h2')
  .attr('id', 'title')
  .text("Monthly Global Land-Surface Temperature")

container
  .append('p')
  .attr('id', 'description')
  .text(`1753 - 2015: base temperature ${baseTemp}℃`)

/*============================================== 
  DEFINE THE ATTRIBURES
===============================================*/

// define margins
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 60
}

// define dimentions for the chart
const width = 1200 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// crate the svg canvas
const canvas = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + margin.right + margin.left} ${height + margin.top + margin.bottom}`);

// create a group for the svg elements
const svgGroups = canvas
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);






/*============================================== 
  DEFINE SCALES
===============================================*/
const xScale = d3
  .scaleTime()
  .range([0, width])

const yScale = d3
  .scaleTime()
  .range([0, height])
  

const parseTimeYear = d3.timeParse("%Y");
const parseTimeMonth = d3.timeParse("%m")



/*============================================== 
  CELL COLORIZER, Filles a cell based on temp
===============================================*/
const fillCell = temp => {
  temp = parseFloat(temp)
  if ( temp <= 3 ) {
    return "#205695"
  } else if ( temp <= 4 ) {
    return "#2A6DBA"
  } else if ( temp <= 5 ) {
    return "#5D96D8"
  } else if ( temp <= 6 ) {
    return "#99BCE5"
  } else if ( temp <= 7 ) {
    return "#DEEDFF"
  } else if ( temp <= 8 ) {
    return "#F7F0CC"
  } else if ( temp <= 9 ) {
    return "#F0D0A3"
  } else if ( temp <= 10 ) {
    return "#E0B06D"
  } else if ( temp <= 11 ) {
    return "#CC8726"
  } else if ( temp <= 12 ) {
    return "#985E0D"
  }
}

/*============================================== 
  CHART DRAWER FUNCTION
===============================================*/
const drawHeatMap = data => {

  // format data
  data.forEach(d => {
    d["year"] = parseTimeYear(d["year"])
    d["month"] = d["month"] - 1;
    d.temp = Number.parseFloat(baseTemp + d.variance).toFixed(1);
  });

  const barWidth = width / (data.length / 12)

  /*============================================== 
  X Axis
  ===============================================*/
  xScale
    .domain(d3.extent( data, d => d["year"]))

  // create Axes
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(d3.timeYear.every(10))

  svgGroups
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)

    /*============================================== 
    Y Axis
    ===============================================*/
    yScale
      .domain(d3.extent( data, d => d["month"]))
    
    const yAxis = d3
      .axisLeft(yScale)


      

    svgGroups
      .append('g')
      .attr('id', 'y-axis')
      .call(yAxis)


     /*============================================== 
      PLOT CELLS
    ===============================================*/
    svgGroups
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')

      // data attributes
      .attr('data-month', d => d.month)
      .attr('data-year', d => d.year.getFullYear())
      .attr('data-temp', d => d.temp)


      // set coordinates
      .attr('x', d => xScale(d.year))
      .attr('y', d => d.month * ( height / 12))

      // set size
      .attr('width', barWidth)
      .attr('height', (height / 12))

      .attr('class', 'cell')

      .attr('fill', d => fillCell(d.temp))
}


/* 

  "year": 1754,
  "month": 2,
  "variance": -4.175
*/

/*============================================== 
  GRAB DATA WITH FETCH API
===============================================*/
const api_url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
fetch( api_url )
.then( res => res.json())
.then( json => {
  const data = json.monthlyVariance
  drawHeatMap(data)
})



/*============================================== 
  DEFINE LEGEND
===============================================*/
const legendData = [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const legendWidth = 400, legendHeight = 40, l_margin = 40;
const lWidth = legendWidth / legendData.length;
const legend = container
  .append('svg')
  .attr('id', 'legend')
  .attr('width', legendWidth + l_margin)
  .attr('height', legendHeight + l_margin);


const l_group = legend
  .append('g')
  .attr('transform', `translate(${l_margin / 2}, ${l_margin / 2})`)


l_group.selectAll('rect')
  .data(legendData)
  .enter()
  .append('rect')

  .attr('x', (d, i) => i * lWidth)
  .attr('y', 0)

  .attr('height', legendHeight)
  .attr('width', lWidth)

  .attr('fill', d => fillCell(d))


const lScale = d3
  .scaleLinear()
  .range([0, legendWidth])
  .domain([3, 13])

const lAxis = d3
  .axisBottom(lScale)


l_group
  .append('g')
  .attr('transform', `translate(0, ${legendHeight})`)
  .call(lAxis)
  
