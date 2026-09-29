// ========================================
// ECOPUNTOS
// Sistema de puntos de reciclaje
// ========================================
// Obtener información guardada
let points = Number(localStorage.getItem("ecoPoints")) || 0;
let materials = Number(localStorage.getItem("ecoMaterials")) || 0;
// Elementos de la página
const pointsElement = document.getElementById("points");
const materialsElement = document.getElementById("materials");
const levelElement = document.getElementById("level");
const levelTextElement = document.getElementById("levelText");
const nextLevelElement = document.getElementById("nextLevel");
const progressElement = document.getElementById("progress");
const progressTextElement = document.getElementById("progressText");
const notification = document.getElementById("notification");
// ========================================
// ACTUALIZAR PÁGINA
// ========================================
function updatePage() {
    pointsElement.textContent = points;
    materialsElement.textContent = materials;
    // Determinar nivel
    let level;
    let nextPoints;
    let previousPoints;
    if (points < 100) {
        level = "Inicial";
        previousPoints = 0;
        nextPoints = 100;
    } else if (points < 250) {
        level = "Reciclador";
        previousPoints = 100;
        nextPoints = 250;
    } else if (points < 500) {
        level = "Eco-Activo";
        previousPoints = 250;
        nextPoints = 500;
    } else if (points < 1000) {
        level = "Eco-Héroe";
        previousPoints = 500;
        nextPoints = 1000;
    } else {
        level = "Leyenda Verde";
        previousPoints = 1000;
        nextPoints = points;
    }
    levelElement.textContent = level;
    levelTextElement.textContent = "Nivel " + level;
    // Progreso
    if (points >= 1000) {
        progressElement.style.width = "100%";
        progressTextElement.textContent = points + " puntos • ¡Nivel máximo alcanzado!";
        nextLevelElement.textContent = "¡Has alcanzado el nivel máximo! 🌎";
    } else {
        const progress =
            ((points - previousPoints) /
            (nextPoints - previousPoints)) * 100;
        progressElement.style.width =
            Math.max(0, Math.min(100, progress)) + "%";
        progressTextElement.textContent =
            points + " / " + nextPoints + " puntos";
        nextLevelElement.textContent =
            "Te faltan " + (nextPoints - points) +
            " puntos para subir de nivel.";
    }
}
// ========================================
// REGISTRAR RECICLAJE
// ========================================
function recycle(material, value) {
    points += value;
    materials += 1;
    // Guardar datos
    localStorage.setItem("ecoPoints", points);
    localStorage.setItem("ecoMaterials", materials);
    // Actualizar pantalla
    updatePage();
    // Mostrar mensaje
    showNotification(
        "♻️ " + material + " registrado: +" + value + " puntos"
    );
}
// ========================================
// NOTIFICACIÓN
// ========================================
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add("show");
    setTimeout(() => {
        notification.classList.remove("show");
    }, 2500);
}
// ========================================
// INICIAR
// ========================================
updatePage();