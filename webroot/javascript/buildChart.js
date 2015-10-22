
// globals
var refreshCounter = 0;
var numVisitors = [];
var pageString = [];
var maxVisitors;

// Width and height
var w = 280;
var h = 600;
var scalefactor = h / 2;
var barPadding = 2;

//Create SVG element and add to DOM
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

localStorage.clear();
buildChart();
var refreshId = setInterval(buildChart, 5000);


function buildChart() {
    // Load chartbeat data
    var jsonURL = "https://dashapi.chartbeat.com/live/quickstats/v4/?all_platforms=1&apikey=317a25eccba186e0f6b558f45214c0e7&host=gizmodo.com&loyalty=1&now_on=1&types=1";
    d3.json(jsonURL, function(error, json) {
        if (error) return console.warn(error);
        json.timestamp = Math.floor(Date.now() / 1000) % (24 * 3600);
        var jsonArray = JSON.parse(localStorage.getItem('gizmodoJsonArray')) || [];
        jsonArray.push(json);
        localStorage.setItem('gizmodoJsonArray', JSON.stringify(jsonArray));

        dataset = json.data.stats.toppages;
        for (i = 0; i < dataset.length; i++) {
            numVisitors[i] = dataset[i].visitors;
            pageString[i] = dataset[i].path;
        }
        maxVisitors = d3.max(numVisitors);


        // Draw rectangles
        var svgRectData = svg.selectAll("rect")
            .data(numVisitors);

        if (refreshCounter == 0) {
            var svgRectData = svgRectData.enter()
                .append("rect");
        }

        // Update rectangles
        svgRectData.attr("x", function(d, i) {
                return i * (w / numVisitors.length);
            })
            .attr("y", function(d) {
                return h / 2 - (d / maxVisitors) * scalefactor; // SVG draws downwards from y
            })
            .attr("width", w / numVisitors.length - barPadding)
            .attr("height", function(d) {
                return (d / maxVisitors) * scalefactor;
            });


        // Draw Text
        var svgTextData = svg.selectAll("text")
            .data(numVisitors);

        if (refreshCounter == 0) {
            var svgTextData = svgTextData.enter()
                .append("text");
            refreshCounter = refreshCounter + 1;
        }

        // Update text
        svgTextData.text(function(d) {
                return d;
            })
            .attr("x", function(d, i) {
                return i * (w / numVisitors.length) + 5;
            })
            .attr("y", function(d) {
                return h / 2 - (d / maxVisitors) * scalefactor + 15;
            })
            .attr("font-family", "Helvetica Neue")
            .attr("font-size", "12px")
            .attr("fill", "white");
    });

}