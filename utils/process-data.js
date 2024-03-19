const Statistics = require('../models/statistics');
const documentId = '65f84592a0534b9ea2f24b02';

let regions = [];
let version = 0;
let presentStudentsHistory = [];
let maxStudentsHistory = [];
let averageStudentsHistory = [];
let labels = [];

let attendance = [];

function updateData(data) {
    console.log("Processing data...", data);
        Statistics.findById(documentId)
        .then(foundDocument => {
            if (foundDocument) {
                console.log('Found document:', foundDocument);
                foundDocument.currentStudents = data.totalNumber;
                presentStudentsHistory = foundDocument.presentStudentsHistory;
                presentStudentsHistory.push(data.totalNumber);
                maxStudentsHistory = foundDocument.maxStudentsHistory;
                if (maxStudentsHistory.length === 0) {
                    maxStudentsHistory.push(data.totalNumber);
                } else {
                    const maxStudents = Math.max(data.totalNumber, maxStudentsHistory[maxStudentsHistory.length - 1]);
                    maxStudentsHistory.push(maxStudents);
                }
                averageStudentsHistory = foundDocument.averageStudentsHistory;
                if (averageStudentsHistory.length === 0) {
                    averageStudentsHistory.push(data.totalNumber);
                } else {
                    const averageStudents = Math.round(
                        (averageStudentsHistory[averageStudentsHistory.length - 1] * (presentStudentsHistory.length - 1) + data.totalNumber) /
                            presentStudentsHistory.length,
                    );
                    averageStudentsHistory.push(averageStudents);
                }
                labels = foundDocument.labels;
                labels.push(new Date().toLocaleTimeString());
                version = foundDocument.version;
                foundDocument.version = version + 1;
                foundDocument.save();
                console.log('Document updated: ', foundDocument);
            } else {
                console.log('No document found with the provided ID');
            }
        })
        .catch(err => console.error('Error finding document:', err))
}

function updateRegions(data) {
    console.log("Processing regions...", data);

    data.regions.forEach((region) => {
        const id = region.id - 1;
        regions[id] = region;
    });
}

function getCurrentStatistics() {
    Statistics.findById(documentId)
        .then(foundDocument => {
            if (foundDocument) {
                console.log('Found document:', foundDocument);
                presentStudentsHistory = foundDocument.presentStudentsHistory;
                maxStudentsHistory = foundDocument.maxStudentsHistory;
                averageStudentsHistory = foundDocument.averageStudentsHistory;
                labels = foundDocument.labels;
                version = foundDocument.version;
            } else {
                console.log('No document found with the provided ID');
            }
        })
        .catch(err => console.error('Error finding document:', err))
    const statistics = {
        version,
        presentStudentsHistory,
        maxStudentsHistory,
        averageStudentsHistory,
        labels,
    };
    console.log("Sending statistics...", statistics);
    return statistics;
}

function getRegions() {
    console.log("Sending regions...", regions);
    return regions;
}

function updateAttendance(data) {
    console.log("Processing attendance...", data);
    attendance.push({
        "ist-number": data["ist-number"],
        "attendance": data["attendance"],
        "time": new Date().toLocaleTimeString(),
    });
}

function getAttendance() {
    console.log("Sending attendance...", attendance);
    return attendance;
}

function resetData() {
    console.log("Resetting data...");
    regions = [];

    Statistics.findById(documentId)
        .then(foundDocument => {
            if (foundDocument) {
                console.log('Found document to reset:', foundDocument);
                foundDocument.currentStudents = 0;
                foundDocument.presentStudentsHistory = [];
                foundDocument.maxStudentsHistory = [];
                foundDocument.averageStudentsHistory = [];
                foundDocument.labels = [];
                foundDocument.version = 0;
                foundDocument.save();
                console.log('Document reset');
            } else {
                console.log('No document found with the provided ID');
            }
        })
        .catch(err => console.error('Error finding document:', err))
}

module.exports = {
    updateData,
    getCurrentStatistics,
    updateRegions,
    getRegions,
    updateAttendance,
    getAttendance,
    resetData,
};
