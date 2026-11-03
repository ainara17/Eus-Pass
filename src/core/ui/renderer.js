

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

   article.append(eventTitle, eventImage, category); 
   return article;
}

export {
   renderEventCard
};