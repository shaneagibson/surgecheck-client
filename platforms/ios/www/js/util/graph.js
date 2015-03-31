define('util/graph', function(require) {

  var d3 = require('d3');

  var exports = {};

  exports.destroy = function(selector) {
    $(selector).empty();
  };

  exports.render = function(selector, data) {

    var svgWidth  = document.body.clientWidth,
      svgHeight = document.body.clientHeight / 3,
      margin = { top: 0, right: 0, bottom: 40, left: 0 },
      chartWidth  = svgWidth  - margin.left - margin.right,
      chartHeight = svgHeight - margin.top  - margin.bottom;

    var x = d3.time.scale().range([0, chartWidth]).domain(d3.extent(data, function (d) { return d.timestamp; }));
    var y = d3.scale.linear().range([chartHeight,0]).domain([0.8, d3.max(data, function (d) { return d.high; })]);

    var xAxis = d3.svg.axis().scale(x).ticks(d3.time.hours, 1).orient('bottom').innerTickSize(-chartHeight).outerTickSize(0).tickPadding(10).tickFormat(d3.time.format("%H:%M"));

    var svg = d3.select(selector).append('svg')
      .attr('width',  svgWidth)
      .attr('height', svgHeight)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // clipping to start chart hidden and slide it in later
    var rectClip = svg.append('clipPath')
      .attr('id', 'rect-clip')
      .append('rect')
      .attr('width', 0)
      .attr('height', chartHeight);

    addAxes(svg, xAxis, chartHeight);
    drawPaths(svg, data, x, y);
    startTransitions(svg, chartHeight, chartWidth, rectClip, x);

  };

  function addAxes (svg, xAxis, chartHeight) {

    var axes = svg.append('g')
      .attr('clip-path', 'url(#axes-clip)');

    axes.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + chartHeight + ')')
      .call(xAxis);

  }

  function drawPaths (svg, data, x, y) {

    var upperArea = d3.svg.area()
      .interpolate('basis')
      .x (function (d) { return x(new Date(d.timestamp)) || 1; })
      .y0(function (d) { return y(d.high); })
      .y1(function (d) { return y(d.avg); });

    var medianLine = d3.svg.line()
      .interpolate('basis')
      .x(function (d) { return x(new Date(d.timestamp)); })
      .y(function (d) { return y(d.avg); });

    var lowerArea = d3.svg.area()
      .interpolate('basis')
      .x (function (d) { return x(new Date(d.timestamp)) || 1; })
      .y0(function (d) { return y(d.avg); })
      .y1(function (d) { return y(d.low); });

    svg.datum(data);

    svg.append('path')
      .attr('class', 'area upper')
      .attr('d', upperArea)
      .attr('clip-path', 'url(#rect-clip)');

    svg.append('path')
      .attr('class', 'area lower')
      .attr('d', lowerArea)
      .attr('clip-path', 'url(#rect-clip)');

    svg.append('path')
      .attr('class', 'median-line')
      .attr('d', medianLine)
      .attr('clip-path', 'url(#rect-clip)');
  }

  function addMarker (svg, chartHeight, x) {

    var xPos = x(Date.now()),
      yPosStart = chartHeight,
      yPosEnd = 140;

    var markerG = svg.append('g')
      .attr('class', 'marker')
      .attr('transform', 'translate(' + xPos + ', ' + yPosStart + ')')
      .attr('opacity', 0);

    markerG.transition()
      .duration(1000)
      .attr('transform', 'translate(' + xPos + ', ' + yPosEnd + ')')
      .attr('opacity', 1);

    markerG.append('path').attr('d', 'M0,'+yPosEnd+'L0,0');
    markerG.append('text').attr('x', -12).attr('y', -8).text("NOW");

  }

  function startTransitions (svg, chartHeight, chartWidth, rectClip, x) {

    rectClip.transition()
      .duration(2000)
      .attr('width', chartWidth);

    setTimeout(function () {
      addMarker(svg, chartHeight, x);
    }, 1000);
  }

  return exports;

});