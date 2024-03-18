const mongoose = require('mongoose');

const StatisticsSchema = new mongoose.Schema({
    version: Number,
    currentStudents: Number,
    presentStudentsHistory: [Number],
    maxStudentsHistory: [Number],
    averageStudentsHistory: [Number],
    labels: [String],
});

module.exports = mongoose.model('Statistics', StatisticsSchema);
