setInterval(startListening, 1000);

function startListening() {
    fetch("/api/get-regions")
        .then(res=> res.json())
        .then((data) => {
            updateLights(data);
        })
}

function updateLights(data) {
    console.log(data);
    data.forEach((region) => {
        if (region.number > 0) {
            turnOnLight(region.id);
            if (region.question) {
                turnOnBlink(region.id);
            } else {
                turnOffBlink(region.id);
            }
        } else {
            turnOffLight(region.id);
            turnOffBlink(region.id);
        }
    });
}

function turnOnLight(lightId) {
    const light = document.getElementById(lightId);
    light.classList.add("on");
}

function turnOffLight(lightId) {
    const light = document.getElementById(lightId);
    light.classList.remove("on");
}

function turnOnBlink(lightId) {
    const light = document.getElementById(lightId);
    light.classList.add("blink");
    light.textContent = "🖐🏻";
}

function turnOffBlink(lightId) {
    const light = document.getElementById(lightId);
    light.classList.remove("blink");
    light.textContent = "";
}
