import { getEvents } from "./Event.js";
import { renderEventCard } from "./ui/renderer.js";
import { setProvinceOptions, setTypeFilters, setSearch } from "./utils/filters.js";

let limit = 5; // eventos por pagina y btn cargar más
let allEvents = [];
let lastFilteredEvents = [];



// ========== Pintar tarjetas en la lista de eventos ======= //
function displayEvents(eventsToRender) {
    const eventListSection = document.getElementById("event-list");
    if (!eventListSection) return;

    lastFilteredEvents = eventsToRender;
    
    eventListSection.replaceChildren();
    
    lastFilteredEvents.slice(0, limit).forEach(eventObj => {
        const card = renderEventCard(eventObj);
        eventListSection.append(card);
    });

    if(loadMoreBtn){
        if(limit < lastFilteredEvents.length){
            loadMoreBtn.style.display = "block";
        }else{
            loadMoreBtn.style.display = "none";
        }
    }
}



async function init() {
         
    
    const data = await getEvents(50, 1);
    
    if (!data || !data.items) {
        console.error("No se han podido cargar los eventos");
        return;
    }

    allEvents = data.items; 
    
    displayEvents(allEvents);

        const handleFilterUpdate = (filteredEvents) => {
            displayEvents(filteredEvents);
    }
        setProvinceOptions(allEvents, handleFilterUpdate);
        setTypeFilters(allEvents, handleFilterUpdate);
        setSearch(allEvents, handleFilterUpdate);
    }


// ========== Botón cargar más eventos ========== //

const loadMoreBtn = document.getElementById("load-more-btn");
    if(loadMoreBtn){
        loadMoreBtn.addEventListener("click", () => {
            limit += 7;
            displayEvents(lastFilteredEvents);
        });
    }





init();