// Toggle de pestañas 
const tabButtons = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".passport-content-section");

tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        sections.forEach(s => s.classList.remove("active"));

        btn.classList.add("active");
        const targetId = btn.getAttribute("data-target");
        document.getElementById(targetId).classList.add("active");
    });
});

//Boton QR
const openQrBtn = document.getElementById("open-qr-btn");
const qrModal = document.getElementById("qr-modal");
const closeQrModal = document.getElementById("close-qr-modal");
const simulateScanBtn = document.getElementById("simulate-scan-btn");

openQrBtn.addEventListener("click", () => {
    qrModal.style.display = "flex";
});

closeQrModal.addEventListener("click", () => {
    qrModal.style.display = "none";
});

