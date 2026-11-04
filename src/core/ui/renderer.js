import { isInFavorites, toggleFavorite } from "../localStorage.js";

function renderEventCard(event, onFavorite = () => { }) {
   const article = document.createElement("article");
   article.classList.add("event", "event-card");
   article.dataset.id = event.id;

   const eventTitle = document.createElement("h3");
   eventTitle.textContent = event.name;
   eventTitle.classList.add("event-name");

   const eventImage = document.createElement("img");
   eventImage.setAttribute("src", event.imageUrl);
   eventImage.setAttribute("alt", event.name);

   const category = document.createElement("p");
   category.textContent = event.type;

   const location = document.createElement("p");
   location.classList.add("location")
   location.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${event.municipality}`;

   const date = document.createElement("p");
   date.classList.add("date")
   date.innerHTML = `<i class="fa-solid fa-calendar"></i> ${event.startDate}`;

   const favBtnCard = document.createElement("button");
   const icon = document.createElement("i");



   // =========== Favoritos ========== //
   const favoriteStatus = isInFavorites(event);
   if (favoriteStatus) {
      favBtnCard.classList.add("favorite");
      icon.className = "fa-solid fa-heart";
   } else {
      icon.className = "fa-regular fa-heart";
   }

   favBtnCard.addEventListener("click", () => {
      const isFavorite = toggleFavorite(event);
      if (isFavorite) {
         favBtnCard.classList.add("favorite");
         icon.className = "fa-solid fa-heart";
         onFavorite(event, true);

      } else {
         favBtnCard.classList.remove("favorite");
         icon.className = "fa-regular fa-heart";
         onFavorite(event, false);
      }
   })

   favBtnCard.append(icon);

   article.append(eventTitle, eventImage, category, location, date, favBtnCard);
   return article;
}

//========== Botones de filtros por categoria ========//

function renderTypeFilterButtons(types, activeTypes, onToggleType) {
   const container = document.getElementById("type-filters-container");
   if (!container) return;

   container.replaceChildren();

   const allBtn = document.createElement("button");
   allBtn.textContent = "Todos";
   allBtn.classList.add("type-filter-btn");

   if (activeTypes.size === 0) {
      allBtn.classList.add("active");
   }
   container.append(allBtn);


   allBtn.addEventListener("click", () => {
      onToggleType("Todos");
   });

   types.forEach(type => {
      const btn = document.createElement("button");
      btn.textContent = type;
      btn.classList.add("type-filter-btn");

      if (activeTypes.has(type)) {
         btn.classList.add("active");
      }

      btn.addEventListener("click", () => {
         onToggleType(type);
      });

      container.append(btn);
   });
}

export {
   renderEventCard,
   renderTypeFilterButtons

};