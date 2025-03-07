// Countdown Timer
const weddingDate = new Date("May 10, 2025 18:30:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    if (difference <= 0) {
        document.getElementById("timer").innerHTML = "¡Hora de celebrar! 🎉";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Actualiza solo los elementos correspondientes
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}, 1000);

let index = 0;
let autoSlideInterval;

function moveSlide(direction) {
    const slides = document.querySelectorAll(".carousel-item");
    const totalSlides = slides.length;
    
    index += direction;
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    updateCarousel();
}

function setSlide(newIndex) {
    index = newIndex;
    updateCarousel();
}

function updateCarousel() {
    const carousel = document.querySelector(".carousel");
    carousel.style.transform = `translateX(${-index * 100}%)`;

    // Update indicators
    const dots = document.querySelectorAll(".dot");
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");

    // Reset auto-slide
    resetAutoSlide();
}

// Auto-slide every 4 seconds
function autoSlide() {
    autoSlideInterval = setInterval(() => {
        moveSlide(1);
    }, 4000);
}

// Reset auto-slide when user interacts
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlide();
}

// Start auto-slide when page loads
document.addEventListener("DOMContentLoaded", () => {
    autoSlide();
    updateCarousel();
});

function toggleMenu() {
    let menu = document.getElementById("nav-menu");
    menu.classList.toggle("active");
}

function openModal() {
    document.getElementById("musicModal").style.display = "flex";
}
function closeModal() {
    document.getElementById("musicModal").style.display = "none";
}

const scriptURL = "https://script.google.com/macros/s/AKfycbx3Vdv2HuEooDLVb2vsmv1hPL1zu5qrLzQ2vRvVvRlgH3ia8tCTu5FxNFYLI9IojNl7Jg/exec";
const form = document.getElementById("musicForm");
const loadingMessage = document.getElementById("loadingMessage"); // Seleccionar el mensaje de carga

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Mostrar el mensaje de "Cargando respuestas..."
  loadingMessage.style.display = "block";

  var formData = new FormData(form);
  var song = document.getElementById("song").value;
  var artist = document.getElementById("artist").value;
  var youtube = document.getElementById("youtube").value;

  // Verificar y agregar campos al formData
  formData.append("song", song ? song : "No especificado");
  formData.append("artist", artist ? artist : "No especificado");
  formData.append("youtube", youtube ? youtube : "No proporcionado");

  fetch(scriptURL, { method: "POST", body: formData })
    .then((response) => {
      alert("¡Hecho! Sugerencia enviada con éxito.");
      form.reset();  // Limpiar el formulario después de enviar
      closeModal();  // Cerrar el modal después del envío exitoso
    })
    .catch((error) => {
      alert("Error: Algo salió mal, por favor intenta de nuevo.");
    })
    .finally(() => {
      // Ocultar el mensaje de "Cargando respuestas..." cuando se reciba la respuesta (éxito o error)
      loadingMessage.style.display = "none";
    });
});

function openAttendanceModal() {
    document.getElementById("attendanceModal").style.display = "flex";
}

function closeAttendanceModal() {
    document.getElementById("attendanceModal").style.display = "none";
}

// Mostrar detalles grupales solo si se elige "grupal"
document.getElementById("attendanceType").addEventListener("change", function() {
    const groupDetails = document.getElementById("groupDetails");
    groupDetails.style.display = this.value === "grupal" ? "block" : "none";
});

  const attendanceScriptURL = "https://script.google.com/macros/s/AKfycbyg6El3KFHzUvS_JPNCNMKyZ_Yr3r1S31jbHoZgsp5SyWeC979_FkHJAoR1uuW1CaM93A/exec"; // Cambia con tu script URL específico para asistencia

  const attendanceForm = document.getElementById("attendanceForm");

  attendanceForm.addEventListener("submit", (e) => {
    e.preventDefault();

    var formData = new FormData(attendanceForm);

    // Mostrar el mensaje de "Cargando respuestas..."
    loadingMessage1.style.display = "block";

    // Obtener los valores de los campos
    var attendanceType = document.getElementById("attendanceType").value; // Confirmación individual o grupal
    var mainGuest = document.getElementById("mainGuest").value; // Nombre del invitado principal
    var groupSize = document.getElementById("groupSize").value || "1"; // Tamaño del grupo
    var guestNames = document.getElementById("guestNames").value || "N/A"; // Nombres de los acompañantes
    var dietaryRestrictions = document.getElementById("dietaryRestrictions").value || "Ninguna"; // Restricciones alimentarias
    var wishes = document.getElementById("wishes").value || "¡Felicidades!"; // Mensaje o felicitaciones

    // Mapear los valores a nombres más descriptivos para la hoja de cálculo
    formData.append("Asistencia", attendanceType); // Asistencia (individual o grupal)
    formData.append("Nombre Principal", mainGuest); // Nombre principal del asistente
    formData.append("Total Asistentes", groupSize); // Número total de asistentes
    formData.append("Nombres Acompañantes", guestNames); // Nombres completos de los acompañantes
    formData.append("Restricciones Alimentarias", dietaryRestrictions); // Restricciones alimentarias o alergias
    formData.append("Mensaje", wishes); // Mensaje de felicitación para la quinceañera

    // Mostrar mensaje de "Cargando respuestas..." mientras se envía la solicitud
    alert("Cargando respuestas...");

    fetch(attendanceScriptURL, { method: "POST", body: formData })
      .then((response) => {
        alert("¡Hecho! Confirmación enviada con éxito.");
        attendanceForm.reset();  // Limpiar el formulario después de enviar
        closeAttendanceModal();  // Cerrar el modal después del envío exitoso
      })
      .catch((error) => {
        alert("Error: Algo salió mal, por favor intenta de nuevo.");
      })
      .finally(() => {
        // Ocultar el mensaje de "Cargando respuestas..." cuando se reciba la respuesta (éxito o error)
        loadingMessage1.style.display = "none";
    });

  });
