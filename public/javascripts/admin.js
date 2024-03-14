function resetData() {
    fetch("/reset-data", {
        method: "POST",
    })
    .then((res) => {
        console.log("Data reset");
    });
}
