import { getEvents } from "./Event.js";
import { renderEventCard } from "./ui/renderer.js";

const limit = 10;
let page = 7;

function getOffsetFromPage(page, limit) {
    return (page - 1) * limit;
}

async function loadPage(page, limit) {
    
    const eventListSection = document.getElementById("event-list");
    eventListSection.replaceChildren();


    const events = await getEvents(page, limit);

    if (!events || !events.items) {
        console.error("No se han podido cargar los eventos");
        return;
    }

        events.items.forEach(eventObj => {
        const card = renderEventCard(eventObj);
        eventListSection.append(card);
    });
}

loadPage(page, limit);