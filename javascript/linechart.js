function initLineChart() {

    //Create SVG element and add to DOM
    d3.selectAll("#line-chart > *").remove();

    var svgLine = d3.select("#line-chart")
        .append("svg")
        .attr("width", WIDTH1)
        .attr("height", HEIGHT1 + 40);

    xRange = d3.scale.linear().range([MARGINS.left, WIDTH1 - MARGINS.right])
        .domain([jsonArray[0].timestamp_s, Math.ceil(d3.max(jsonArray, function (d) {
                return d.timestamp_s;
            }) / 150) * 150
        ]),

        //        xRange2 = d3.time.scale.rangeRound([MARGINS.left, WIDTH1 - MARGINS.right])
        //                    .domain([jsonArray[0].timestamp_utc, Math.ceil(d3.max(jsonArray, function (d) {
        //                        return d.timestamp_utc; 
        //                    })/150) * 150
        //        ]),    

        yRange = d3.scale.linear().range([HEIGHT1 - MARGINS.top, MARGINS.bottom])
        .domain([Math.floor(d3.min(jsonArray, function (d) {
                return d.data.stats.toppages[4].visitors;
            }) / 100) * 100, Math.ceil(d3.max(jsonArray, function (d) {
                return d.data.stats.toppages[0].visitors;
            }) / 100) * 100
        ]),

        xAxis = d3.svg.axis()
        .scale(xRange)
        .tickSize(5)
        .tickSubdivide(true),

        yAxis = d3.svg.axis()
        .scale(yRange)
        .tickSize(5)
        .orient("left")
        .tickSubdivide(true);

    svgLine.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (HEIGHT1 - MARGINS.bottom) + ")")
        .call(xAxis);

    svgLine.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);

    svgLine.append("text")
        .attr("transform", "translate(" + (WIDTH1 - 60) + " ," + (scalefactor + 75) + ")")
        .style("text-anchor", "middle")
        .text("Time / seconds")
        .attr("font-size", "12px");

    // Line generator function    
    var lineFunc0 = d3.svg.line()
        .x(function (d) {
            return xRange(d.timestamp_s);
        })
        .y(function (d) {
            return yRange(d.data.stats.toppages[0].visitors);
        })
        .interpolate('linear');

    var lineFunc1 = d3.svg.line()
        .x(function (d) {
            return xRange(d.timestamp_s);
        })
        .y(function (d) {
            return yRange(d.data.stats.toppages[1].visitors);
        })
        .interpolate('linear');

    var lineFunc2 = d3.svg.line()
        .x(function (d) {
            return xRange(d.timestamp_s);
        })
        .y(function (d) {
            return yRange(d.data.stats.toppages[2].visitors);
        })
        .interpolate('linear');

    var lineFunc3 = d3.svg.line()
        .x(function (d) {
            return xRange(d.timestamp_s);
        })
        .y(function (d) {
            return yRange(d.data.stats.toppages[3].visitors);
        })
        .interpolate('linear');

    var lineFunc4 = d3.svg.line()
        .x(function (d) {
            return xRange(d.timestamp_s);
        })
        .y(function (d) {
            return yRange(d.data.stats.toppages[4].visitors);
        })
        .interpolate('linear');

    //alert(color(0) + " " + color(1));    

    svgLine.append("path")
        .attr("d", lineFunc0(jsonArray))
        .attr("stroke", color(0))
        .attr("stroke-width", 3)
        .attr("fill", "none");

    svgLine.append("path")
        .attr("d", lineFunc1(jsonArray))
        .attr("stroke", color(1))
        .attr("stroke-width", 3)
        .attr("fill", "none");

    svgLine.append("path")
        .attr("d", lineFunc2(jsonArray))
        .attr("stroke", color(2))
        .attr("stroke-width", 3)
        .attr("fill", "none");

    svgLine.append("path")
        .attr("d", lineFunc3(jsonArray))
        .attr("stroke", color(3))
        .attr("stroke-width", 3)
        .attr("fill", "none");

    svgLine.append("path")
        .attr("d", lineFunc4(jsonArray))
        .attr("stroke", color(4))
        .attr("stroke-width", 3)
        .attr("fill", "none");

    // function for the x grid lines
    function make_x_axis() {
        return d3.svg.axis()
            .scale(xRange)
            .orient("bottom")
            .ticks(5)
    }

    // function for the y grid lines
    function make_y_axis() {
        return d3.svg.axis()
            .scale(yRange)
            .orient("left")
            .ticks(5)
    }

    // Draw the x Grid lines
    svgLine.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + HEIGHT1 + ")")
        .call(make_x_axis()
            .tickSize(-HEIGHT1, 0, 0)
            .tickFormat("")
        )

    // Draw the y Grid lines
    svgLine.append("g")
        .attr("class", "grid")
        .call(make_y_axis()
            .tickSize(-WIDTH1, 0, 0)
            .tickFormat("")
        )

    // Add the text label for the Y axis
    //    svgLine.append("text")
    //        .attr("transform", "rotate(-90)")
    //        .attr("y", 0 - MARGINS.left)
    //        .attr("x",0 - (HEIGHT1 / 2))
    //        .attr("dy", "1em")
    //        .style("text-anchor", "middle")
    //        .text("Number of Visitors");

}