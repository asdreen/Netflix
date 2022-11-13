const BASE_URL = "https://striveschool-api.herokuapp.com/api/movies/";
const headers = new Headers({
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZkMGE2N2Q0YmUzZDAwMTU4NDYwYjIiLCJpYXQiOjE2NjgxNjI2NzksImV4cCI6MTY2OTM3MjI3OX0.6OjKO7dmaKz-AecUVKIxy2KqIywFUijp6HbfRPVcutc",
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
