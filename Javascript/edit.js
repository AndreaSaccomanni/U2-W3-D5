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

    <div class="container mt-5">
    <div class="row">
        <!-- Card -->
        <div class="col-md-6 mb-4">
            <div class="card shadow-lg mt-5">
                <img src="${data.imageUrl}" class="card-img-top imgDim mt-3" alt="${data.name}" />
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${data.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        
                        <small class="text-muted">${data.brand}</small>
                        <small class="text-muted">${data.price + "$"}</small>
                    </div>
                </div>
            </div>
        </div>

        <!-- Input Fields -->
        <div class="col-md-6">
            <h3 class="text-center text-dark mb-0 fs-1">${data.name}</h3>
            <div class="mb-3">
                <label for="name" class="form-label fs-5">Model:</label>
                <input type="text" class="form-control" id="name" value="${data.name}" required />
            </div>
            <div class="mb-3">
                <label for="description" class="form-label fs-5">Description:</label>
                <input type="text" class="form-control" id="description" value="${data.description}" required />
            </div>
            <div class="mb-3">
                <label for="brand" class="form-label fs-5">Brand:</label>
                <input type="text" class="form-control" id="brand" value="${data.brand}" required />
            </div>
            <div class="mb-3">
                <label for="imageURL" class="form-label fs-5">Image URL:</label>
                <input type="text" class="form-control" id="imageURL" value="${data.imageUrl}" required />
            </div>
            <div class="mb-3">
                <label for="price" class="form-label fs-5">Price:</label>
                <input type="number" class="form-control" id="price" value="${data.price}" required />
            </div>
            <div class="d-flex justify-content-center">
                <button type="button" id="editBtn" onclick="editBtn()" class="btn btn-dark px-4 mb-4">Edit</button>
            </div>
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
    price: price
  };

  if (confirm("Sei sicuro di voler modificare questo elemento?")) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(phoneEditated)
    })
      .then((resp) => {
        // Se la risposta è ok, mostra l'alert
        if (resp.ok) {
          alert("Prodotto modificato con successo!");
          location.reload();
        } else {
          throw new Error("Errore nella modifica del prodotto");
        }
      })
      .catch((error) => console.error("Errore:", error));
  }
};
