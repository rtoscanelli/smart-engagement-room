let currentStudents = 0;
let presentStudentsHistory = [];
let maxStudents = 0;
let maxStudentsHistory = [];
let averageStudents = 0;
let averageStudentsHistory = [];
let labels = [];

function updateStatistics(data) {
    if (data.totalNumber === currentStudents || data.totalNumber === undefined) {
        console.log("No new data");
        return;
    }
    currentStudents = data.totalNumber ? data.totalNumber : 0;
    presentStudentsHistory.push(currentStudents);
    maxStudents = Math.max(maxStudents, currentStudents);
    maxStudentsHistory.push(maxStudents);
    averageStudents = Math.round(
        (averageStudents * (presentStudentsHistory.length - 1) + currentStudents) /
        presentStudentsHistory.length,
    );
    averageStudentsHistory.push(averageStudents);
    const presentStudentsCard = document.getElementById("present-students");
    presentStudentsCard.classList.add("animation");
    document.getElementById("present-students-number").innerText =
        currentStudents;
    const maxStudentsCard = document.getElementById("max-students");
    if (maxStudents == currentStudents) {
        maxStudentsCard.classList.add("animation");
    }
    document.getElementById("max-students-number").innerText = maxStudents;
    const averageStudentsCard = document.getElementById("average-students");
    averageStudentsCard.classList.add("animation");
    document.getElementById("average-students-number").innerText =
        averageStudents;
    setTimeout(() => {
        presentStudentsCard.classList.remove("animation");
        maxStudentsCard.classList.remove("animation");
        averageStudentsCard.classList.remove("animation");
    }, 300);
    labels.push(new Date().toLocaleTimeString());
    myChart.update();
}

function startListening() {
    fetch("/number")
        .then((res) => res.json())
        .then((data) => {
            updateStatistics(data);
        });
}

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

const myChart = new Chart(ctx, {
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

setInterval(startListening, 2000);
