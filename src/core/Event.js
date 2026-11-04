import { API_URL } from "./services/api.js";

class Event {
    constructor(eventData) {
        this.id = eventData.id;
        this.name = eventData.nameEs;
        this.imageUrl = this._extractImage(eventData);
        this.type = eventData.typeEs;
        this.description = eventData.descriptionEs;
        this.province = this._calculateProvince(eventData.provinceNoraCode);
        this.municipality = eventData.municipalityEs;
        this.startDate = this._cleanDate(eventData.startDate)
    }


    _extractImage(eventData) {
        const defaultImage = "https://placehold.co/400"; //imagen de recurso por si no la da la api

        if (!eventData.images) return defaultImage;

        const imageUrl = eventData.images.imageUrl || (eventData.images[0] && eventData.images[0].imageUrl) || "";

        return imageUrl ? imageUrl : defaultImage;
    }

    //para sacar los numero provinceNoraCode de la API y convertirlos a su texto correspondiente
    _calculateProvince(code) {
        if (code === "48") return "Bizkaia";
        if (code === "20") return "Gipuzkoa";
        if (code === "1") return "Araba";
        return "Todos";
    }


    //Fecha limpia sin horas
    _cleanDate(rawDate) {
        if (!rawDate) return "";
        return rawDate.split("T")[0].split(" ")[0];
    }
};



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
        if (result && result.items) {
            result.items = result.items.map(item => new Event(item));
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
        return new Event(result);
    } catch (error) {
        console.error("Error al obtener el evento individual:", error);
        return null;
    }
};


export {
    Event,
    getEvents,
    getEventData,
}