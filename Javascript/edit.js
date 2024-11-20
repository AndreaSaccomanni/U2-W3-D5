const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzNiYTlkYmRkMDNhNjAwMTUwOWJhNTMiLCJpYXQiOjE3MzIwOTAzNzEsImV4cCI6MTczMzI5OTk3MX0.KbskWm5CKrW4GG7QJQm0ZBvoEzMTIAVLfe4qT5lqdDM";

document.addEventListener("DOMContentLoaded", () => {
  console.log("id", id);

  if (id) {
    getNewId(id);
  }
});

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
                  <p><strong class="text-muted">Brand:</strong> ${data.brand}</p>
                  <p><strong class="text-muted">Price:</strong> <span class="text-success">${data.price + "$"}</span></p>
              </div>
              <div class="col-6 col-sm-4">
              <div class="mb-3">
                <label for="name" class="form-label">Model</label>
                <input type="text" class="form-control" id="name" value="${data.name}" required />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <input type="text" class="form-control" id="description" value="${data.description}" required />
              </div>
              <div class="mb-3">
                <label for="brand" class="form-label">Brand</label>
                <input type="text" class="form-control" id="brand" value="${data.brand}" required />
              </div>
              <div class="mb-3">
                <label for="imageURL" class="form-label">Image URL</label>
                <input type="text" class="form-control" id="imageURL" value="${data.imageUrl}" required />
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="number" class="form-control" id="price" value="${data.price}" required />
              </div>
              <div class="d-flex justify-content-center mb-4">
                <button type="button" id="editBtn" onclick= "editBtn()" class="btn btn-primary px-3">Edit</button>
              </div>
              
              
              </div>
          </div>
      `;
};

const editBtn = function () {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const imageURL = document.getElementById("imageURL").value;
  const price = document.getElementById("price").value;

  const phoneEditated = {
    _id: id,
    name: name,
    description: description,
    brand: brand,
    imageUrl: imageURL,
    price: 100
  };

  fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(phoneEditated)
  })
    .then((resp) => {
      if (confirm("Sei sicuro di voler modificare questo elemento?")) {
        if (resp.ok) {
          alert("Prodotto modificato con successo!");
        } else {
          throw new Error("Errore nella modifica del prodotto");
        }
      }
    })

    .catch((error) => console.error("Errore:", error));
};
