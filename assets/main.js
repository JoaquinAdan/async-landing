// https://rapidapi.com/ytdlfree/api/youtube-v31/
// Buscar 'twitter:url' para conseguir el id de un canal de youtube
// si funciona también podes buscar "nonce"
// otro metodo https://commentpicker.com/youtube-channel-id.php

const API =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UCFR2oaNj02WnXkOgLH0iqOA&part=snippet%2Cid&order=date&maxResults=9";

const content = null || document.getElementById("content");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "8f82b6a9a5mshc6ee0ab4688a2c1p15758fjsn53956e666c55",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};
async function fetchDate(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

//estructura de funcion que se invoca a si misma sin necesidad de llamarla nuevamente
(async () => {
  try {
    const videos = await fetchDate(API);
    let view = `
    ${videos.items
      .map(
        (video) => `
      <div class="group relative">  
        <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src=${video.snippet.thumbnails.high.url} alt=${video.snippet.description}  class="w-full" />
        </div>
        <div class="mt-4 flex justify-between">
        <h3 class="text-sm text-gray-700">
          <span aria-hidden="true" class="absolute inset-0"></span>
          ${video.snippet.title}
        </h3>
      </div>
     </div>
    `
      )
      .slice(0, 8)
      .join("")}
    `;
    content.innerHTML = view;
  } catch (error) {
    console.log(error);
  }
})();
