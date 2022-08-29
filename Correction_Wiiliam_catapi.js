const apiKey = "Your API key here" // api key de Clément
const dislike = document.getElementById("dislike")
const like = document.getElementById("like")
const favsEl = document.getElementById("favs")
let imageId;

// affichage d'une image au centre
function displayCat() {
  axios.get("https://api.thecatapi.com/v1/images/search").then(function (response) {
    console.log(response.data[0].url)
    const image = document.getElementById("picture")
    image.src = response.data[0].url
    imageId = response.data[0].id
  })
}

dislike.addEventListener("click", displayCat)

displayCat()

// ajout aux favoris
like.addEventListener("click", function () {
  axios.post(
    "https://api.thecatapi.com/v1/favourites",
    {
      image_id: imageId
    },
    {
      headers: {
        "x-api-key": apiKey
      }
    }
  ).then(function () {
    // on affiche les favoris APRES avoir ajouté le dernier favori
    displayFavs()
    displayCat()
  })
})


function displayFavs() {
  axios.get(
    "https://api.thecatapi.com/v1/favourites",
    {
      headers: {
        "x-api-key": apiKey
      }
    }
  ).then(function (response) {
    favsEl.innerHTML = ""
    for (let favourite of response.data) {
      const baliseImg = document.createElement("img")
      baliseImg.src = favourite.image.url
      baliseImg.className = "fav"
      favsEl.appendChild(baliseImg)
    }
  })
}

displayFavs()

// TODO: add a delete link to favorited pics.