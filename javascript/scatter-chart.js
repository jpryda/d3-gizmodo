var dataset_recirc = [];
var dataset_direct = [];

function initScatterChart() {

    for (i = 0; i < jsonArray.length; ++i) {
        dataset_recirc[i] = jsonArray[i].data.stats.recirc;
    }

    for (i = 0; i < jsonArray.length; ++i) {
        dataset_direct[i] = jsonArray[i].data.stats.direct;
    }


    var test3 = ["recirc"];
    var test4 = ["direct"];
    //initStackedBar();
    var chart = c3.generate({
        bindto: "#scatter",
        data: {
            xs: {
                "direct": "recirc",
            },
            // iris data from R
            columns: [
                test3.concat(dataset_recirc),
                test4.concat(dataset_direct),
            ],
            type: 'scatter'
        },
        size: {
            height: HEIGHT0,
            width: WIDTH1,
        },
        padding: {
            right: 5,
            top: 5,
        },
        legend: {
            show: false,
        },
        axis: {
            x: {
                label: {
                    text: 'Recircling Concurrents',
                    position: "outer-right"
                },
                tick: {
                    fit: false
                }
            },
            y: {
                label: {
                    text: "Direct Concurrents",
                    position: "outer-top",
                },
            },
        },
        transition: {
            duration: 0
        }
    });
}