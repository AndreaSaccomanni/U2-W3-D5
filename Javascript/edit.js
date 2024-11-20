document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  console.log("id", id);

  if (id) {
    getNewId(id);
  }
});
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzNiYTlkYmRkMDNhNjAwMTUwOWJhNTMiLCJpYXQiOjE3MzIwOTAzNzEsImV4cCI6MTczMzI5OTk3MX0.KbskWm5CKrW4GG7QJQm0ZBvoEzMTIAVLfe4qT5lqdDM";

const getNewId = (id) => {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then((response) => response.json())

    .then((data) => {
      console.log("Dati recuperati:", data);

      generateDetails(data);
    })

    .catch((error) => console.error("Errore durante il fetch:", error));
};

const generateDetails = (data) => {
  const element = document.getElementById("element");
  element.innerHTML = `
        
          <div class="row mt-4">
              <div class="col-6 col-sm-4 mx-auto">
                  <h3 class="text-center text-dark mb-3">${data.name}</h3>
                  <img src="${data.imageUrl}" alt="${data.name}" class=" imgDim img-fluid rounded shadow-sm mb-3">
                  <p><strong class="text-muted">Description:</strong> ${data.description}</p>
                  <p><strong class="text-muted">Price:</strong> <span class="text-success">${data.price + "$"}</span></p>
              </div>
              <div class="col-6 col-sm-4">
              <div class="mb-3">
                <label for="name" class="form-label">Model</label>
                <input type="text" class="form-control" id="name" required />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <input type="text" class="form-control" id="description" required />
              </div>
              <div class="mb-3">
                <label for="brand" class="form-label">Brand</label>
                <input type="text" class="form-control" id="brand" required />
              </div>
              <div class="mb-3">
                <label for="imageURL" class="form-label">Image URL</label>
                <input type="text" class="form-control" id="imageURL" required />
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="number" class="form-control" id="price" required />
              </div>
              <div class="d-flex justify-content-center mb-4">
                <button type="button" id="submitBtn" class="btn btn-primary">Add Phone</button>
              </div>
              
              
              </div>
          </div>
      `;
};
