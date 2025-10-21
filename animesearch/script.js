const anime_container = document.querySelector(".anime_container");

function findanime() {
  const animeInput = document.querySelector(".anime-name");
  const animeName = animeInput.value.trim();
  const request_url = `https://api.jikan.moe/v4/anime?q=${animeName}&sfw`;

  fetch(request_url)
    .then((response) => {
      if (!response.ok) throw new Error("Not able to fetch");
      return response.json();
    })
    .then((animeData) => {
    console.log(animeData);
      const animeList = animeData.data;
      anime_container.innerHTML = ""; // clear previous results

      if (!animeList || animeList.length === 0) {
        anime_container.innerHTML = "<p>No anime found</p>";
        return;
      }

      animeList.forEach((element) => {
        const card = document.createElement("div");
        card.className = "anime-card";

        card.innerHTML = `
            <h2>${element.title}</h2>
            <p>Total episode : ${element.episodes}</p>
            <img src="${element.images.jpg.image_url}" width="200">
            <p>${element.synopsis || "No synopsis available."}</p>
        `;

        anime_container.appendChild(card);
      });
    })
    .catch((e) => {
      console.error(e);
      anime_container.innerHTML = "<p>Something went wrong</p>";
    });
}
