let eventSource;

function addFact(data) {
    if (data.info == undefined) {
        totalStudents = 0;
    } else {
        totalStudents = data.info;
        const totalStudentsCard = document.getElementById("total-students");
        totalStudentsCard.classList.add("animation");
        document.getElementById("total-students-number").innerText = totalStudents;
        setTimeout(() => {
            totalStudentsCard.classList.remove("animation");
        }, 300);
    }

}

function startListening() {
    if (!eventSource) {
        console.log("Starting to listen for events");
        eventSource = new EventSource("/events");

        eventSource.onmessage = (event) => {
            console.log("Received event", event);
            const data = JSON.parse(event.data);
            addFact(data);
        };
    }
}

startListening();
