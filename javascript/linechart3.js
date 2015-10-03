function initLineChart3() {

    dataset_one.push(jsonArray[jsonArray.length - 1].data.stats.toppages[0].visitors);
    dataset_two.push(jsonArray[jsonArray.length - 1].data.stats.toppages[1].visitors);
    dataset_three.push(jsonArray[jsonArray.length - 1].data.stats.toppages[2].visitors);
    dataset_four.push(jsonArray[jsonArray.length - 1].data.stats.toppages[3].visitors);
    dataset_five.push(jsonArray[jsonArray.length - 1].data.stats.toppages[4].visitors);
    dataset_time.push(jsonArray[jsonArray.length - 1].timestamp_s);

    var pageName = [article[0]];
    var pageName2 = [article[1]];
    var pageName3 = [article[2]];
    var pageName4 = [article[3]];
    var pageName5 = [article[4]];
    var timeName = ["x"];

    var chart = c3.generate({
        bindto: "#line-chart",
        data: {
            x: 'x',
            //xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                    timeName.concat(dataset_time),
                    pageName.concat(dataset_one),
                    pageName2.concat(dataset_two),
                    pageName3.concat(dataset_three),
                    pageName4.concat(dataset_four),
                    pageName5.concat(dataset_five),
                ],
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%H:%M:%S',
                    rotate: 45,
                },
                label: {
                    text: "Time",
                    position: "outer-right",
                },
                max: d3.time.minute.ceil(dataset_time[dataset_time.length - 1])
            },
            y: {
                label: {
                    text: "Visitors",
                    position: "outer-top",
                },
            },
        },
        size: {
            width: WIDTH1,
            height: HEIGHT0,
        },
        tooltip: {
            show: true
        },
        transition: {
            duration: 0
        },
    });
}