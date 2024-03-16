window.onload = () => {
    loadRecentData();
}
setInterval(startListening, 1000);

function loadRecentData() {
    const recentLightsData = JSON.parse(localStorage.getItem('recentLightsData'));
    if (recentLightsData) {
        console.log('Data loaded from Local Storage:', recentLightsData);
        updateLights(recentLightsData);
    }
}

function startListening() {
    fetch("/regions-data")
        .then(res=> res.json())
        .then((data) => {
            localStorage.setItem('recentLightsData', JSON.stringify(data));
            console.log('Data saved to Local Storage:', data);
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
