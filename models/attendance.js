const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    version: Number,
    istNumber: String,
    attendance: Boolean,
    time: String,
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
