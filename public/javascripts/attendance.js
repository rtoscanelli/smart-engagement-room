let versions = [0,0,0,0,0];

window.onload = () => {
    startListening();
}
setInterval(startListening, 2000);

function startListening() {
    fetch("/api/get-attendance")
        .then((res) => res.json())
        .then((data) => {
            console.log("Received attendance:", data);
            updateAttendance(data);
        })
    .catch((err) => console.error("Error fetching attendance:", err));
}

function updateAttendance(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].version != versions[i]) {
            versions[i] = data[i].version;
            updateAttendanceRow(data[i]);
        }
    }
}

function updateAttendanceRow(data) {
    const id = data["istNumber"];
    const status = data["attendance"];
    const time = data["time"];
    const tableRow = document.getElementById(id);

    if (tableRow) {
        const attendanceCol = tableRow.querySelector('div[data-label="Attendance"]');
        const timeCol = tableRow.querySelector('div[data-label="Time of Entry"]');

        if (attendanceCol) {
            const attendanceIcon = attendanceCol.querySelector("img.attendance-icon");
            if (status) {
                console.log("Present");
                attendanceIcon.src = "images/check.png";
                attendanceIcon.alt = "present";
                timeCol.textContent = time;
            } else {
                console.log("Absent");
                attendanceIcon.src = "images/wrong.png";
                attendanceIcon.alt = "absent";
                timeCol.textContent = "---";
            }
        } else {
            console.error("Attendance column not found!");
        }
    } else {
        console.error("Table row with ID " + id + " not found!");
    }
}
