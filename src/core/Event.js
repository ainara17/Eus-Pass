import { API_URL } from "./services/api.js";

async function getEvents(limit = 10, page = 1) {
    try {
        const url = new URL(API_URL);
        url.searchParams.append("limit", limit);
        url.searchParams.append("page", page);

        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error("Unable to connect to API");
        }

        const result = await response.json();

        // Pasamos cada elemento por la función de limpieza
        if (result && result.items) {
            result.items = result.items.map(item => getCleanEvent(item));
            result.items = result.items.slice(0, limit);
        }

        return result;
    } catch (error) {
        console.error("Error al obtener los eventos:", error);
        return null;
    }
};

async function getEventData(eventId) {
    try {
        const url = new URL(`${API_URL}/${eventId}`);
        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error("Unable to connect to API");
        }

        const result = await response.json();
        return getCleanEvent(result);
    } catch (error) {
        console.error("Error al obtener el evento individual:", error);
        return null;
    }
};


function getCleanEvent(eventData) {
    let imagen = "";
    if (eventData.images) {
        imagen = eventData.images.imageUrl || (eventData.images[0] && eventData.images[0].imageUrl) || "";
    }

    return {
        id: eventData.id,
        name: eventData.nameEs || eventData.nameEu,
        imageUrl: imagen,
        type: eventData.typeEs || "General",
        description: eventData.descriptionEs || eventData.descriptionEu || ""
    };
};

export {
    getEvents,
    getEventData,
    getCleanEvent
}