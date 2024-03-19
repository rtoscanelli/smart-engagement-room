function resetData() {
    fetch("/reset-data", {
        method: "POST",
    })
        .then((res) => {
            alert("Data has been reset");
        });
}
