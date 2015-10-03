function initDonutChart() {

    var dataset_direct = jsonArray[jsonArray.length - 1].data.stats.direct;
    var dataset_social = jsonArray[jsonArray.length - 1].data.stats.social;
    var dataset_links = jsonArray[jsonArray.length - 1].data.stats.links;
    var dataset_internal = jsonArray[jsonArray.length - 1].data.stats.internal;
    var dataset_social = jsonArray[jsonArray.length - 1].data.stats.social;

    var donut_chart = c3.generate({
        bindto: "#donut",
        data: {
            columns: [
                        ['Direct', dataset_direct],
                        ['Links', dataset_social],
                        ['Search', dataset_links],
                        ['Internal', dataset_internal],
                        ['Social', dataset_social],
                    ],
            type: 'donut',
            onclick: function (d, i) {
                console.log("onclick", d, i);
            },
            onmouseover: function (d, i) {
                console.log("onmouseover", d, i);
            },
            onmouseout: function (d, i) {
                console.log("onmouseout", d, i);
            }
        },
        donut: {
            title: "Traffic Breakdown"
        },
        size: {
            width: WIDTH0,
            height: HEIGHT0,
        },
        transition: {
            duration: 0
        },
        tooltip: {
            show: false
        }
    });
}