function toggleLight(lightId) {
    const light = document.getElementById(lightId);
    light.classList.toggle("on");
}

function blinkLight(lightId) {
    const light = document.getElementById(lightId);
    if (light.classList.contains("on")) {
        light.classList.toggle("blink");
        light.textContent = light.textContent === "" ? "🖐🏻" : "";
    }
}
