import { getEventData } from "../Event.js";

async function initDetail() {

    const eventJSON = localStorage.getItem("selectedEvent");


    if(!eventJSON){
        console.error("No se ha encontrado los datos del evento en el almacenamiento");
        return;
    }

    const event = JSON.parse(eventJSON);

    renderEventDetail(event);
    
}

function renderEventDetail(event){
    const title = document.getElementById("detail-title");
    const type = document.getElementById("detail-type")    
    const img = document.getElementById("detail-img");
    const date = document.getElementById("detail-date");
    const location = document.getElementById("detail-location");
    const description = document.getElementById("detail-description");


    if (title) title.textContent = event.name;
    
    if (img) {
        img.src = event.imageUrl;
        img.alt = event.name;
       
    }

    if (date) date.textContent = event.startDate;
    if (location) location.textContent = `${event.municipality} (${event.province})`;
    if (type) type.textContent = event.type;
    
    if (description) {
        description.textContent = event.description || "Este evento no dispone de una descripción detallada.";
    }
}



initDetail();