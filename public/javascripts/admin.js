function resetData() {
    fetch("/reset-data", {
        method: "POST",
    })
    .then((res) => {
        console.log("Data reset");
    });
    localStorage.removeItem("recentStatistics");
    localStorage.removeItem("recentLightsData");

    alert("Data has been reset");
}
