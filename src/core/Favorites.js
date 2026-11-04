import { renderEventCard } from "./ui/renderer.js";
import { getFavoritesFromLocalStorage, clearFavorites } from "./localStorage.js";
import { setProvinceOptions, setTypeFilters, setSearch } from "./utils/filters.js";



function loadFavorites(events = getFavoritesFromLocalStorage(), search = "", type = "all") {


    const filteredEvents = events.filter(event => {
        if (search) {
            matchesId = event.id && event.id.toString().includes(search);
            matchesName = event.name && event.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
            if (!matchesId && !matchesName) {
                return false;
            }
        }

        if (type !== "all") {
            if (event.type !== type) {
                return false
            }
        }
        return true;
    })

    const favSection = document.getElementById("favorites-list");
    favSection.replaceChildren();
    filteredEvents.forEach(event => {
        const card = renderEventCard(event, (e, isFavorite) => {
            if (!isFavorite) {
                const card = document.querySelector(`.event-card[data-id='${event.id}'] `);
                if (card) {

                    card.remove();
                }
            }

        });
        favSection.append(card);

    })
}

const favoriteEvents = getFavoritesFromLocalStorage();

const cleanFavorites = document.getElementById("clean-fav-btn");
if (cleanFavorites) {
    cleanFavorites.addEventListener("click", () => {
        clearFavorites();
        loadFavorites([]);
    })
}


loadFavorites(favoriteEvents);
setProvinceOptions(favoriteEvents, loadFavorites);
setTypeFilters(favoriteEvents, loadFavorites);
setSearch(favoriteEvents, loadFavorites);