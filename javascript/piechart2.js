function initPieChart2() {
    var dataset_platform_engaged = jsonArray[jsonArray.length - 1].data.stats.platform_engaged;

    var pieChart = c3.generate({
        bindto: "#pie",
        data: {
            // iris data from R
            columns: [
                ['Mobile', dataset_platform_engaged.m],
                ['Desktop', dataset_platform_engaged.d],
                ['Tablet', dataset_platform_engaged.t],
            ],
            type: 'pie',
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
        size: {
            width: WIDTH0,
            height: HEIGHT0,
        },
        transition: {
            duration: 0
        },
        pie: {
            label: {
                threshold: 0.01,
            }
        },
        tooltip: {
            show: false
        },
    });
}