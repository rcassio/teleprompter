document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("textInput");
    const fileInput = document.getElementById("fileInput");
    const startButton = document.getElementById("startTeleprompter");
    const teleprompter = document.getElementById("teleprompter");
    const scrollText = document.getElementById("scrollText");
    const fontSelect = document.getElementById("fontSelect");
    const fontSize = document.getElementById("fontSize");
    const speedSelect = document.getElementById("speedSelect");
    const pauseResume = document.getElementById("pauseResume");
    const toggleMode = document.getElementById("toggleMode");
    const mirrorMode = document.getElementById("mirrorMode");

    let isPaused = false;
    let scrollSpeed = 2;
    let interval;

    // Lógica de upload do arquivo TXT
    fileInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                textInput.value = e.target.result;
            };
            reader.readAsText(file);
        }
    });

    // Iniciar teleprompter
    startButton.addEventListener("click", () => {
        if (!textInput.value.trim()) return alert("Insira um texto!");
        
        scrollText.innerText = textInput.value;
        scrollText.style.fontFamily = fontSelect.value;
        scrollText.style.fontSize = `${fontSize.value}px`;

        teleprompter.classList.remove("hidden");

        let speed = speedSelect.value;
        scrollSpeed = speed === "slow" ? 1 : speed === "medium" ? 2 : 3;

        startScrolling();
    });

  function startScrolling() {
    clearInterval(interval);
    let speed = speedSelect.value;
    let scrollSpeed = speed === "slow" ? 0.5 : speed === "medium" ? 1 : 2;
    
    interval = setInterval(() => {
        if (!isPaused) {
            teleprompter.scrollTop += scrollSpeed; // Faz a rolagem vertical real
        }
    }, 30);
}

    // Pausar e retomar rolagem
    pauseResume.addEventListener("click", () => {
        isPaused = !isPaused;
        pauseResume.innerText = isPaused ? "Retomar" : "Pausar";
    });

    // Modo escuro/claro
    toggleMode.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Modo espelhado (invertendo horizontalmente)
    mirrorMode.addEventListener("click", () => {
        teleprompter.style.transform = teleprompter.style.transform === "scaleX(-1)" ? "scaleX(1)" : "scaleX(-1)";
    });

    // Atualizar fonte e tamanho da fonte em tempo real
    fontSelect.addEventListener("change", () => {
        scrollText.style.fontFamily = fontSelect.value;
    });

    fontSize.addEventListener("input", () => {
        scrollText.style.fontSize = `${fontSize.value}px`;
    });
});
