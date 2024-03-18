let currentStudents = 0;
let presentStudentsHistory = [];
let maxStudents = 0;
let maxStudentsHistory = [];
let averageStudents = 0;
let averageStudentsHistory = [];
let labels = [];
let version = 0;

let myChart;

createGraph();
window.onload = () => {
    loadRecentData();
}
setInterval(startListening, 2000);

function loadRecentData() {
    startListening(true);
}

function startListening(load = false) {
    fetch("/number")
        .then((res) => res.json())
        .then((data) => {
            updateStatistics(data, load);
        });
}

function updateStatistics(data, load = false) {
    if (version === data.version) {
        console.log("No new data, with version: ", data.version);
        return;
    }
    if (load) {
        console.log("Loading data... with version: ", data.version);
        presentStudentsHistory = data.presentStudentsHistory;
        maxStudentsHistory = data.maxStudentsHistory;
        averageStudentsHistory = data.averageStudentsHistory;
        labels = data.labels;
        version = data.version;
    } else {
        console.log("Updating data... with version: ", data.version);
        presentStudentsHistory.push(data.presentStudentsHistory[data.presentStudentsHistory.length - 1]);
        maxStudentsHistory.push(data.maxStudentsHistory[data.maxStudentsHistory.length - 1]);
        averageStudentsHistory.push(data.averageStudentsHistory[data.averageStudentsHistory.length - 1]);
        labels.push(data.labels[data.labels.length - 1]);
    }

    console.log(presentStudentsHistory, maxStudentsHistory, averageStudentsHistory, labels);

    let presentStudents = presentStudentsHistory ? presentStudentsHistory[presentStudentsHistory.length - 1] : 0;
    let maxStudents = maxStudentsHistory ? maxStudentsHistory[maxStudentsHistory.length - 1] : 0;
    let averageStudents = averageStudentsHistory ? averageStudentsHistory[averageStudentsHistory.length - 1] : 0;

    updateCards("present-students", presentStudents);
    updateCards("max-students", maxStudents);
    updateCards("average-students", averageStudents);
    updateGraph();
    setTimeout(() => {
        document.getElementById("present-students").classList.remove("animation");
        document.getElementById("max-students").classList.remove("animation");
        document.getElementById("average-students").classList.remove("animation");
    }, 300);
}

function updateCards(card, info) {
    document.getElementById(card).classList.add("animation");
    document.getElementById(card + "-number").innerText = info;
}

function updateGraph() {
    myChart.data.datasets[0].data = maxStudentsHistory;
    myChart.data.datasets[1].data = presentStudentsHistory;
    myChart.data.datasets[2].data = averageStudentsHistory;
    myChart.data.labels = labels;
    myChart.update();
}

function createGraph() {
    const ctx = document.getElementById("chart").getContext("2d");
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Max Students",
                data: maxStudentsHistory,
                fill: false,
                backgroundColor: "rgba(7, 176, 255, 0.2)",
                borderColor: "rgba(7, 176, 255, 1)",
                pointRadius: 5,
                pointHoverRadius: 8,
                pointHitRadius: 5,
            },
            {
                label: "Present Students",
                data: presentStudentsHistory,
                fill: false,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                pointRadius: 5,
                pointHoverRadius: 8,
                pointHitRadius: 5,
            },
            {
                label: "Average Students",
                data: averageStudentsHistory,
                fill: false,
                backgroundColor: "rgba(0, 184, 148, 0.2)",
                borderColor: "rgba(0, 184, 148, 1)",
                pointRadius: 5,
                pointHoverRadius: 8,
                pointHitRadius: 5,
            },
        ],
    };

    myChart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    });
}
