import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Games {
      constructor() {
         this.ui = new Ui();
         this.getGames("mmorpg");

         document.querySelectorAll(".nav-link").forEach((link) => {
               link.addEventListener("click", (e) => {
                  document.querySelector(".nav-link.active").classList.remove("active");
                  e.target.classList.add("active");
                  this.getGames(e.target.dataset.category);
               });
         });
      }

      async getGames(category) {
         const loading = document.querySelector(".loading");
         loading.classList.remove("d-none");
         const options = {
               method: "GET",
               headers: {
                  "X-RapidAPI-Key": "03003c0523mshd840cd004f06633p162e09jsn1ac4b3ef58a5",
                  "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
                  Accept: "application/json",
                  "Content-Type": "application/json",
               },
         };

         const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
         const response = await api.json();

         this.ui.displayDataGame(response);
         this.startEvent();
         loading.classList.add("d-none");
      }

      startEvent() {
         document.querySelectorAll(".card").forEach((item) => {
               item.addEventListener("click", () => {
                  const id = item.dataset.id;
                  this.showDetails(id);
               });
         });
      }

      showDetails(idGame) {
         new Details(idGame);
         document.querySelector("#Home").classList.add("d-none");
         document.querySelector("#detailsSection").classList.remove("d-none");
      }
}
