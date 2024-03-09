function toggleLights(sectionId) {
    const section = document.getElementById(sectionId);
    section.classList.toggle("lights-on");
}

function manualBlink(subSectionId) {
    var lightsInSection1Sub1 = document.querySelectorAll("#section1-sub1 .light");
    if (subSectionId === "section1-sub1") {
        lightsInSection1Sub1.forEach(light => {
            light.classList.add("blink");
        }
        );
    }
    setTimeout(() => {
        lightsInSection1Sub1.forEach(light => {
            light.classList.remove("blink");
        }
        );
    }, 1000); // Adjust the duration of the blink as needed
}
