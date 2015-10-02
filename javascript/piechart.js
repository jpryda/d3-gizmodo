function initPieChart() {


    var radius = WIDTH0 / 2;
    var pie_color = d3.scale.category20c();
    d3.select("#pie > *").remove();

    var svgPie = d3.select('#pie')
        .append('svg')
        .attr('width', WIDTH0)
        .attr('height', HEIGHT0)
        .append('g')
        .attr('transform', 'translate(' + radius + ',' + radius + ')');

    var arc = d3.svg.arc()
        .outerRadius(radius);

    var pie = d3.layout.pie()
        .value(function (d) {
            return d.count;
        })
        .sort(null);

    var dataset_platform_engaged = jsonArray[jsonArray.length - 1].data.stats.platform_engaged;
    var devices = [
        {
            Device: "Mobile",
            count: dataset_platform_engaged.m
        },
        {
            Device: "Desktop",
            count: dataset_platform_engaged.d
        },
        {
            Device: "Tablet",
            count: dataset_platform_engaged.t
        }
                    ];

    var path = svgPie.selectAll('path')
        .data(pie(devices))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) {
            return pie_color(i);
        });

    svgPie.selectAll('path')
        .append("svg:text")
        .attr("transform", function (d) { //set the label's origin to the center of the arc
            //we have to make sure to set these before calling arc.centroid
            d.outerRadius = radius + 50; // Set Outer Coordinate
            d.innerRadius = radius + 45; // Set Inner Coordinate
            return "translate(" + arc.centroid(d) + ")";
        })
        .data(devices)
        .attr("text-anchor", "middle") //center the text on it's origin
        .text(function (d, i) {
            return d.Device;
        }); //get the label from our original data array

}