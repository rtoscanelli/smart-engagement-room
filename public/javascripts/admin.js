function resetData() {
    fetch("/api/post-reset-data", {
        method: "POST",
    })
        .then((res) => {
            alert("Data has been reset");
        });
}
