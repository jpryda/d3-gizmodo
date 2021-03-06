<?php 
    if (!session_id()) session_start();  // Must include session_start when READING back vars
    if (!$_SESSION['loggedIn']){ 
                header("Location: login.php");
                die();
        }

    if(isset($_POST['unsubmit'])){
        $_SESSION = array();
        session_destroy();
        header("Location: login.php");
        die();
    }

/*
The location of the $_SESSION variable storage is on the server, determined by the session.save_path config. However the *browser* session is identified by a session-id, which is stored at the client, usually as a cookie, and sent with each request. (PHPSESSID)
*/

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Gizmodo Top Pages (Chartbeat Data)</title>
    <script type="text/javascript" src="javascript/d3.v3.js"></script>
    <script type="text/javascript" src="javascript/c3.js"></script>
    <script type="text/javascript" src="javascript/linechart3.js"></script>
    <script type="text/javascript" src="javascript/piechart.js"></script>
    <script type="text/javascript" src="javascript/stacked-bar.js"></script>
    <script type="text/javascript" src="javascript/scatter-chart.js"></script>
    <script type="text/javascript" src="javascript/donutchart.js"></script>
    <script type="text/javascript" src="javascript/piechart2.js"></script>


    <link rel="icon" href="favicon.ico" type="image/x-icon" />
    <link type="text/css" href="stylesheets/c3.css" rel="stylesheet">
    <link type="text/css" href="stylesheets/custom.css" rel="stylesheet">
</head>

<body>

    <table id="maintable">
    
        <tr>
            <td id="title"><div><h2> Gizmodo Real-Time Stats</h2></div>    </td>
        </tr>
            <td>
                <h4> Current Visitors to Top Pages</h4>
                <br>
                <div id="bar1">
                </div>
            </td>
            <td class="secondcol">
                <h4>Real-Time Visitors to Top Pages</h4>
                <br>
                <div id="line-chart"></div>
                <!-- <svg id="line-chart" width="700" height="450"></svg> -->
            </td>
            <br>
            <tr>
                <td>
                    <h4>Platforms Engaged</h4>
                    <br>
                    <div id="pie"></div>
                </td>

                <td class="secondcol">
                    <div tooltip="Recircling concurrents have moved on to a second page from an article page" tooltip-persistent>
                        <h4>Direct vs Recircling Sources</h4></div>
                    <br>
                    <div id="scatter"></div>
                </td>

            </tr>

            <tr>
                <td>
                    <h4>Traffic Sources</h4>
                    <div id="donut"></div>
                </td>

                <td class="secondcol">
                    <h4>Proportion of Engaged Visits</h4>
                    <div id="stacked-bar"></div>
                </td>
            </tr>        
    </table>
    <br>
    <div align="center"> Metric data pulled from <a href="https://dashapi.chartbeat.com/live/quickstats/v4/?all_platforms=1&apikey=317a25eccba186e0f6b558f45214c0e7&host=gizmodo.com&loyalty=1&now_on=1&types=1">Chartbeat API</a>
    
    <form name="form" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
        <input type="submit" name="unsubmit" value="Logout" /></p>
    </form>
    
    </div>

    
    
    
    <script type="text/javascript">
        // globals
        var numVisitors = [];
        var pageString = [];
        var maxVisitors;
        var jsonArray;
        var color = d3.scale.category10();
        var dataset_toppages = [];
        var article = [];
        
        var dataset_one = [];
        var dataset_two = [];
        var dataset_three = [];
        var dataset_four = [];
        var dataset_five = [];
        var dataset_time = [];

        // 1st column dimensions
        var WIDTH0 = 250; 
        var HEIGHT0 = 350;
        var scalefactor = 3 / 4 * HEIGHT0;
        var barPadding = 2;

        // 2nd column dimensions
        var WIDTH1 = 680,
            HEIGHT1 = HEIGHT0 - 40,
            
        // Margins for custom line graph
            MARGINS = {
                top: 20,
                right: 20,
                bottom: 20,
                left: 40
            };

        //Create SVG element and add to DOM
        var svg = d3.select("#bar1")
            .append("svg")
            .attr("width", WIDTH0 + 20) //Add 20 padding so rotated text stays within svg
            .attr("height", HEIGHT0);

        localStorage.clear();
        buildCharts();
        var refreshId = setInterval(buildCharts, 4000);


        function buildCharts() {
            // Load chartbeat data
            jsonURL = "https://dashapi.chartbeat.com/live/quickstats/v4/?all_platforms=1&apikey=317a25eccba186e0f6b558f45214c0e7&host=gizmodo.com&loyalty=1&now_on=1&types=1";
            d3.json(jsonURL, function (error, json) {
                if (error) return console.warn(error);

                // Add timestamps to object
                json.timestamp_s = Math.floor(Date.now());

                jsonArray = JSON.parse(localStorage.getItem('gizmodoJsonArray')) || [];
                jsonArray.push(json);
                localStorage.setItem('gizmodoJsonArray', JSON.stringify(jsonArray));

                dataset_toppages = json.data.stats.toppages;
                
                maxVisitors = d3.max(dataset_toppages, function (d) {
                    return d.visitors
                });
                
                for (i=0; i<dataset_toppages.length; ++i) {
                    var split_path = dataset_toppages[i].path.split("-");
                    if (split_path[split_path.length - 1] == "/") {
                            article[i] = "Home";
                        } else {
                            article[i] = "/" + split_path[split_path.length - 1];
                        }
                }    
                
                // Clean all SVG canvases before updating. N.B Sometimes svg iteslef needs removing.
                d3.selectAll("svg > *").remove();

                // Draw rectangles
                var svgRectData = svg.selectAll("rect")
                    .data(dataset_toppages)
                    .enter()
                    .append("rect");

                svgRectData.attr("x", function (d, i) {
                        return i * (WIDTH0 / dataset_toppages.length);
                    })
                    .attr("y", function (d) {
                        return scalefactor - (d.visitors / maxVisitors) * scalefactor; // SVG draws downwards from y
                    })
                    .attr("width", WIDTH0 / dataset_toppages.length - barPadding)
                    .attr("height", function (d) {
                        return (d.visitors / maxVisitors) * scalefactor;
                    })
                    .attr("fill", function (d, i) {
                        return color(i);
                    });

                // Add Numbers
                var svgNumText = svg.selectAll("text")
                    .data(dataset_toppages)
                    .enter()
                    .append("text")
                    .text(function (d) {
                        return d.visitors;
                    })
                    .attr("x", function (d, i) {
                        return i * (WIDTH0 / dataset_toppages.length) + 5;
                    })
                    .attr("y", function (d) {
                        return scalefactor - (d.visitors / maxVisitors) * scalefactor + 15;
                    })
                    .attr("font-family", "Helvetica Neue")
                    .attr("font-size", "12px")
                    .attr("fill", "white");

                svg.selectAll()
                    .data(dataset_toppages)
                    .enter()
                    .append("text")
                    .text(function (d, i) {
                        return article[i];
                    })
                    //                        .attr("fill", function(d, i) {
                    //                            return color(i);
                    //                        })
                    .attr("font-size", "11px")
                    .attr("transform", function (d, i) { // All transfomrations done under transform if introduced
                        return "translate(" + // Translate
                            (i * (WIDTH0 / dataset_toppages.length) + 20) + "," + (scalefactor + 10) + ") " +
                            "rotate(45)" // Then Rotate
                    });

                // Add the text label for the x axis
                svg.append("text")
                    .attr("transform", "translate(" + (WIDTH0 / 2) + " ," + (scalefactor + 82) + ")")
                    .style("text-anchor", "middle")
                    .text("Page")
                    .attr("font-size", "12px");


                // Line Graph
                initLineChart3();

                // Pie Chart
                //initPieChart();\
                initPieChart2();

                // Scatter Chart
                initScatterChart();

                // Stacked Bar Chart
                initStackedBar();

                // Donut Chart
                initDonutChart();
            

            });

        }
    </script>

</body>

</html>