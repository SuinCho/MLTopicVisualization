// draw regression line
var drawline = function(data){

    var xValues = data.map(function(d){return d.x;});
    var yValues = data.map(function(d){return d.y;});
    var lsCoef = [LeastSquares(xValues, yValues)];
  
    var lineFunction = d3.svg.line()
      .x(function(d) { return d.x; })
      .y(function(d) { return d.y; });
  
    svg
      .append('path')
      .attr("d", lineFunction([{"x": 50, "y": lsCoef[0].m * 50 + lsCoef[0].b},{"x": 450, "y": lsCoef[0].m * 450 + lsCoef[0].b}]))
      .attr("stroke-width", 2)
      .attr("stroke", "black")
      .attr('id', 'regline');
  }

// change regression line
var transitionline = function(data){
    var xValues = data.map(function(d){return d.x;});
    var yValues = data.map(function(d){return d.y;});
    var lsCoef = [LeastSquares(xValues, yValues)];
  
    var lineFunction = d3.svg.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });
    
    d3.select('#regline')
      .transition()
      .attr('d', lineFunction([{"x": 50, "y": lsCoef[0].m * 50 + lsCoef[0].b},{"x": 450, "y": lsCoef[0].m * 450 + lsCoef[0].b}]));
  
  
  }
  
// draw residual lines
var drawresiduals = function(data){
    console.log("herecomes drawresiduals");
  //get least squares coeffs, great dotted red paths
    var xValues = data.map(function(d){return d.x;});
    var yValues = data.map(function(d){return d.y;});
    var lsCoef = [LeastSquares(xValues, yValues)];
  
    var lineFunction = d3.svg.line()
      .y(function(d) { return d.y;
      })
      .x(function(d) { return d.x; });
  
  
    var resids = data.map(function(d){
      return {"x0": d.x, "y0": d.y, "x1": d.x , "y1": lsCoef[0].m * d.x + lsCoef[0].b}
     })
    //console.log(resids);
  
    var halfcircles = function(d){
      var radius = r(200),
        padding = 10,
        radians = Math.PI;
  
      var dimension = (2 * radius) + (2 * padding),
          points = 50;
  
      var angle = d3.scale.linear()
          .domain([0, points-1])
          .range([ 0, radians]);
  
      var fullangle = d3.scale.linear()
          .domain([0, points-1])
          .range([ 0, 2*radians]);
  
      var line = d3.svg.line.radial()
          .interpolate("basis")
          .tension(0)
          .radius(radius)
          .angle(function(e, i) { 
            if(d.y0-d.y1 < -r(200)) {
              return angle(i) + Math.PI/2; 
            } else if (d.y0 - d.y1 > r(200)){
              return angle(i) + Math.PI*(3/2);
            } else {
              return fullangle(i);
            }
          })
  
  
      svg.append("path").datum(d3.range(points))
          .attr("class", "line")
          .attr("d", line)
          .attr("fill", 'none')
          .attr("transform", "translate(" + (d.x0) + ", " + (d.y0) + ")")
          .style("stroke-dasharray", ("1, 1"))
          .style("stroke", function(e){
            if(d.y0-d.y1 > -r(200) && d.y0 - d.y1 < r(200)){
              return "green";
            } else {
              return "red";
            }
          })
          .attr("class", "halfcirc");
      }
  
  
    svg.selectAll('path.resline').remove();
    svg.selectAll('path.halfcirc').remove();
    var selection = svg.selectAll('.resline').data(resids)
      
    selection.enter().append('path').transition()
      .attr("d", function(d){
        if(d.y0-d.y1 < -r(200)) {
          return lineFunction([{"x": d.x0, "y": d.y0 + r(200)},{"x": d.x1, "y": d.y1}]); 
        } else if (d.y0 - d.y1 > r(200)){
          return lineFunction([{"x": d.x0, "y": d.y0 - r(200)},{"x": d.x1, "y": d.y1}]);
        } 
      })
      .attr("stroke-width", 1)
      .attr("stroke", "red")
      .attr('class', 'resline')
  
  
    selection.exit().remove()
  
  
    selection.each(function(d){
      halfcircles(d);
    })
    return resids;
  }

  // mouse over event on circle
  function handleMouseOver(d, i) {
    console.log("haha")
    d3.select(this).transition().attr({
      fill: "orange",
      r: 7
    });

    // Specify where to put label of text
    svg.append("text").attr({
       id: "t" + d.x + "-" + d.y + "-" + i,  // Create an id for text so we can select it later for removing on mouseout
        x: function() { return xScale(d.x) - 30; },
        y: function() { return yScale(d.y) - 15; }
    })
    .text(function() {
      return [d.x, d.y];  // Value of the text
    });
  }

  // mouse out event on circle
  function handleMouseOut(d, i) {
    console.log("haha")
    //svg.selectAll('path').remove();
     // Use D3 to select element, change color back to normal
     d3.select(this).transition().attr({
      fill: "black",
      r: 3.5
    });
    // Select text by id and then remove
    d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
  }

  // mouse over event on line
  function handleMouseOverLine(d, i) {
    regression.transition().duration(200).style("opacity", "1");
  }

   // mouse out event
  function handleMouseOutLine(d, i) {
    regression.transition().duration(200).style("opacity", "0");
  }