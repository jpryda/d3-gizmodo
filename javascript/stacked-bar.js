var stackedChart;

function initStackedBar() {

    var dataset_visits = jsonArray[jsonArray.length - 1].data.stats.visit.hist;
    var dataset_engaged_visits = jsonArray[jsonArray.length - 1].data.stats.engaged_visit.hist;
    var total_id = ["Total"];
    var engaged_id = ["Engaged"];
    var spline_id = ["spline_engaged"];

    console.log(d3.max(dataset_visits));
    //console.log(d3.max(dataset_engaged_visits));
    
    stackedChart = c3.generate({
        bindto: "#stacked-bar",
        data: {
            x: "x",
            columns: [
                    ["x", 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 10.0, 15.0, 30, "30.0+"],
                    total_id.concat(dataset_visits),
                    engaged_id.concat(dataset_engaged_visits),
                    spline_id.concat(dataset_engaged_visits),
                ],
            type: 'bar',
            colors: {
                Total: "#1f77b4",
                Engaged: "#ff7f0e",
                spline_engaged: "black",
            },
            types: {
                spline_engaged: "spline"
            },
//            groups: [
//                    ['Total', 'Engaged']
//                ],
            labels: {
                format: {
                    Total: function (v) {
                        return v;
                    },
                    Engaged: function (v) {
                        return v;
                    },
                    spline_engaged: function (v) {
                        return "";
                    },
                }
            }
        },
        axis: {
            x: {
                type: "category",
                label: {
                    text: "Quantized Time on Site / mins",
                    position: "outer-right"
                }
            },
            y: {
                label: {
                    text: "Visits",
                    position: "outer-top",
                },
                max: Math.ceil((d3.max(dataset_visits))/100)*100
            }
        },
        bar: {
            width: {
                ratio: 0.9,
            },
        },
        size: {
            width: WIDTH1,
            height: HEIGHT0,
        },
        grid: {
            y: {
                lines: [{
                    value: 0
                }]
            }
        },
        tooltip: {
            show: false
        },
        transition: {
            duration: 0
        },
        legend: {
            hide: "spline_engaged"
        }
    });
}