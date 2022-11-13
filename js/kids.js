const BASE_URL = "https://striveschool-api.herokuapp.com/api/movies/";
const headers = new Headers({
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZmYzEyYTNmYmEwNDAwMTU4NGJkNmEiLCJpYXQiOjE2NjgyNjgzMzEsImV4cCI6MTY2OTQ3NzkzMX0.UPkM3m6ZqNdpZWYtf4enTWPHSEeDlLI324_KQedAJo8",
});
arrayOfMovies = [];
const getMovies = (callback) => {
  fetch(BASE_URL, { headers })
    .then((res) => res.json())
    .then((data) => callback(null, data))
    .catch((error) => callback(error, null));
};

window.onload = function () {
  getMovies((error, data) => {
    if (error) {
      console.log({ error });
    } else {
      const container = document.getElementById("main");
      container.innerHTML = "";
      data.forEach((category) => {
        container.innerHTML += `<div class="movie-gallery m-2">
                <h5 class="text-light mt-2 mb-2">${category}</h5>
                <div class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div class="movie-row">
                                <div class="row" id="${category}">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
      });
      data.forEach((category) => {
        fetch(BASE_URL + "/" + category, { headers })
          .then((response) => {
            return response.json();
          })
          .then((movies) => {
            let row = document.getElementById(`${category}`);
            console.log(movies);
            movies.forEach((movie) => {
              row.innerHTML += `<div class="col-md-2">
                        <a id="edit" href="details.html?id=${movie._id}"><img class="movie-cover" src="${movie.imageUrl}"></a>
                    </div>`;
            });
          });
      });
    }
  });
};
async function formOnSubmit(event) {
  event.preventDefault();

  const newMovie = {
    name: document.getElementById("movie-name").value,
    description: document.getElementById("description").value,
    category: document.getElementById("genre").value,
    imageUrl: document.getElementById("image").value,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(newMovie),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZmYzEyYTNmYmEwNDAwMTU4NGJkNmEiLCJpYXQiOjE2NjgyNjgzMzEsImV4cCI6MTY2OTQ3NzkzMX0.UPkM3m6ZqNdpZWYtf4enTWPHSEeDlLI324_KQedAJo8",
    },
  };
  try {
    const endpoint = "https://striveschool-api.herokuapp.com/api/movies";
    const response = await fetch(endpoint, options);

    if (response.ok) {
      alert("Movie is added finally");
      location.assign("kids.html");
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error(error);
  }
}
