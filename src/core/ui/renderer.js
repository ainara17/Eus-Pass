import { addToFavorites, isInFavorites, toggleFavorite } from "../localStorage.js";

function renderEventCard(event, onFavorite = () => {}) {
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
   
   const favBtnCard = document.createElement("button");
   const icon = document.createElement("i");
   
   
   
   // Usamos la función importada isInFavorites
   const favoriteStatus = isInFavorites(event);
   if (favoriteStatus) {
      favBtnCard.classList.add("favorite");
      icon.className = "fa-solid fa-heart";
   } else {
      icon.className = "fa-regular fa-heart";
   }

   favBtnCard.addEventListener("click", ()=>{
      const isFavorite = toggleFavorite(event);
      if(isFavorite){
         favBtnCard.classList.add("favorite");
         icon.className = "fa-solid fa-heart";
         onFavorite(event, true);
         
      }else{
         favBtnCard.classList.remove("favorite");
         icon.className = "fa-regular fa-heart";
         onFavorite(event, false);
      }
   })
   
   favBtnCard.append(icon);
   
   article.append(eventTitle, eventImage, category, favBtnCard); 
   return article;
}

export {
   renderEventCard
};