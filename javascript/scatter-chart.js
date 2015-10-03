var dataset_recirc = [];
var dataset_direct = [];

function initScatterChart() {
    
    dataset_recirc.push(jsonArray[jsonArray.length-1].data.stats.recirc);
    dataset_direct.push(jsonArray[jsonArray.length-1].data.stats.direct);

//    for (i = 0; i < jsonArray.length; ++i) {
//        dataset_recirc[i] = jsonArray[i].data.stats.recirc;
//    }
//
//    for (i = 0; i < jsonArray.length; ++i) {
//        dataset_direct[i] = jsonArray[i].data.stats.direct;
//    }


    var scatter_id1 = ["recirc"];
    var scatter_id2 = ["direct"];
    //initStackedBar();
    var chart = c3.generate({
        bindto: "#scatter",
        data: {
            xs: {
                "direct": "recirc",
            },
            // iris data from R
            columns: [
                scatter_id1.concat(dataset_recirc),
                scatter_id2.concat(dataset_direct),
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
                },
                max: Math.ceil(d3.max(dataset_recirc)/25)*25,
                min: Math.floor(d3.min(dataset_recirc)/25)*25
            },
            y: {
                label: {
                    text: "Direct Concurrents",
                    position: "outer-top",
                },
                max: Math.ceil(d3.max(dataset_direct)/25)*25,
                min: Math.floor(d3.min(dataset_direct)/25)*25
            },
        },
        transition: {
            duration: 0
        },
        tooltip: {
            show: false
        },
    });
}