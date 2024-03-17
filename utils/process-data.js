let currentStudents = 0;
let maxStudents = 0;
let averageStudents = 0;

let presentStudentsHistory = [];
let maxStudentsHistory = [];
let averageStudentsHistory = [];

let labels = [];
let status = "empty";

let regions = [];


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

    status = "updated";
}

function updateRegions(data) {
    console.log("Processing regions...", data);

    data.regions.forEach((region) => {
        const id = region.id - 1;
        regions[id] = region;
    });
}

function getCurrentStatistics() {
    const statistics = {
        presentStudentsHistory,
        maxStudentsHistory,
        averageStudentsHistory,
        labels,
        status,
    };
    console.log("Sending statistics...", statistics);
    return statistics;
}

function getRegions() {
    console.log("Sending regions...", regions);
    return regions;
}

function resetData() {
    console.log("Resetting data...");
    currentStudents = 0;
    maxStudents = 0;
    averageStudents = 0;

    presentStudentsHistory = [];
    maxStudentsHistory = [];
    averageStudentsHistory = [];
    labels = [];
    status = "empty";

    regions = [];
}

module.exports = {
    updateData,
    getCurrentStatistics,
    updateRegions,
    getRegions,
    resetData,
};
