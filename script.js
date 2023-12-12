// access key of Unsplash API
const accessKey = "yKLBLx5bRvxtpp2NegjbCWLlP_HkU__Wx80hivzoFNo";

const form = document.querySelector("form");
const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchResult = document.querySelector(".search-results");
const showMoreBtn = document.getElementById("show-more-btn");

let inputData = "";
let pageNo = 1;

async function searchImages() {
  inputData = input.value;
  const url = `https://api.unsplash.com/search/photos?page=${pageNo}&query=${inputData}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (pageNo === 1) {
    searchResult.innerHTML = "";
  }

  //   console.log(results);

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResult.appendChild(imageWrapper);
  });

  pageNo++;

  if (pageNo > 1) {
    showMoreBtn.style.display = "block";
  }
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  pageNo = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchImages();
});
