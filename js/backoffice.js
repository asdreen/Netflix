const params = new URLSearchParams(location.search);
const id = params.get("id");
const BASE_URL = "https://striveschool-api.herokuapp.com/api/movies/";
const headers = new Headers({
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZkMGE2N2Q0YmUzZDAwMTU4NDYwYjIiLCJpYXQiOjE2NjkzODQ5NjMsImV4cCI6MTY3MDU5NDU2M30.pODP8-CJ7V9U2SeEdT2Jmr88AEnWka41a8AfrL1_i-4",
});
const method = id ? "PUT" : "POST";

const postMovie = (movie, callback) => {
  const endpoint = id ? BASE_URL + id : BASE_URL;
  fetch(endpoint, { headers, method, body: JSON.stringify(movie) })
    .then((res) => res.json())
    .then((data) => callback(null, data))
    .catch((error) => callback(error, null));

  fetch(endpoint, { headers, method, body: JSON.stringify(movie) })
    .then((res) => res.json())
    .then((data) => callback(null, data))
    .catch((error) => callback(error, null));
};

const formOnSubmit = function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const imageUrl = document.getElementById("imageUrl").value;
  const movie = { name, description, category, imageUrl };
  postMovie(movie, (error, data) => {
    if (error) {
      alert(error.message);
    } else {
      e.target.reset();
      alert("Movie is edited");
      location.assign("index.html");
    }
  });
};

async function getMovieDetails(id) {
  try {
    const response = await fetch(BASE_URL + "id/" + id, { headers });
    const movie = await response.json();

    Object.keys(movie).forEach((key) => {
      const field = document.querySelector(`#${key}`);
      if (field) field.value = movie[key];
    });
  } catch (error) {
    alert(error.message);
  }
}

window.onload = function () {
  const form = document.getElementById("form");
  form.onsubmit = formOnSubmit;

  if (id) {
    getMovieDetails(id);
  }
};

async function omFormSubmit(event) {
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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZkMGE2N2Q0YmUzZDAwMTU4NDYwYjIiLCJpYXQiOjE2NjkzODQ5NjMsImV4cCI6MTY3MDU5NDU2M30.pODP8-CJ7V9U2SeEdT2Jmr88AEnWka41a8AfrL1_i-4",
    },
  };
  try {
    const endpoint = "https://striveschool-api.herokuapp.com/api/movies";
    const response = await fetch(endpoint, options);

    if (response.ok) {
      alert("Movie is added finally");
      location.assign("index.html");
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error(error);
  }
}
