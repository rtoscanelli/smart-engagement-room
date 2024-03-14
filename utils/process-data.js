const fs = require("fs");

let currentStudents = 0;
let maxStudents = 0;
let averageStudents = 0;

let presentStudentsHistory = [];
let maxStudentsHistory = [];
let averageStudentsHistory = [];

let labels = [];


function updateData(data) {
    console.log("Processing data...", data);

    currentStudents = data.totalNumber;
    presentStudentsHistory.push(currentStudents);

    maxStudents = Math.max(maxStudents, currentStudents);
    maxStudentsHistory.push(maxStudents);

    averageStudents = Math.round(
        (averageStudents * (presentStudentsHistory.length - 1) + currentStudents) /
            presentStudentsHistory.length,
    );
    averageStudentsHistory.push(averageStudents);

    labels.push(new Date().toLocaleTimeString());

    saveDataToFile("utils/data.json");
}

function getCurrentStatistics() {
    const statistics = {
        presentStudentsHistory,
        maxStudentsHistory,
        averageStudentsHistory,
        labels,
    };
    return statistics;
}

function saveDataToFile(name) {
    const data = getCurrentStatistics();
    const dataString = JSON.stringify(data, null, 2);
    fs.writeFileSync(name, dataString);
}

function loadDataFromFile(name) {
    if (!fs.existsSync(name)) {
        return getCurrentStatistics();
    }
    const dataString = fs.readFileSync(name);
    const data = JSON.parse(dataString);
    presentStudentsHistory = data.presentStudentsHistory;
    maxStudentsHistory = data.maxStudentsHistory;
    averageStudentsHistory = data.averageStudentsHistory;
    labels = data.labels;
    return getCurrentStatistics();
}

module.exports = {
    updateData,
    getCurrentStatistics,
    loadDataFromFile,
};
