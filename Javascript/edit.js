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
                  
                  <div class="card mb-4 shadow-sm">
    <!-- Immagine del prodotto -->
    <img src="${data.imageUrl}" alt="${data.name}" class="imgDim img-fluid rounded shadow-sm mb-3 border-none">
    
    <div class="card-body">
        <!-- Titolo del prodotto -->
        <h5 class="card-title">${data.name}</h5>
        
        <!-- Descrizione del prodotto -->
        <p class="card-text">
            <strong class="text-dark fs-5">Description:<br/></strong>
            <span class="spanEdit fs-6">${data.description}</span>
        </p>
        
        
        <p><strong class="text-dark fs-5">Brand:</strong> <span class="spanEdit fs-6">${data.brand}</span></p>
        
       
        <p><strong class="text-dark fs-5">Price:</strong> <span class="spanEdit fs-6">${data.price + "$"}</span></p>

        
    </div>
</div>

              </div>
              <div class="col-6 col-sm-4 " style=" margin-right:100px ">
              <h3 class="text-center text-dark mb-3 fs-1">${data.name}</h3>
              <div class="mb-3">
                <label for="name" class="form-label fs-2">Model:</label>
                <input type="text" class="form-control fs-5" id="name" value="${data.name}" required />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label fs-2">Description:</label>
                <input type="text" class="form-control fs-5" id="description" value="${data.description}" required />
              </div>
              <div class="mb-3">
                <label for="brand" class="form-label fs-2">Brand:</label>
                <input type="text" class="form-control fs-5" id="brand" value="${data.brand}" required />
              </div>
              <div class="mb-3">
                <label for="imageURL" class="form-label fs-2">Image URL:</label>
                <input type="text" class="form-control fs-5" id="imageURL" value="${data.imageUrl}" required />
              </div>
              <div class="mb-3">
                <label for="price" class="form-label fs-2">Price:</label>
                <input type="number" class="form-control fs-5" id="price" value="${data.price}" required />
              </div>
              <div class="d-flex justify-content-center mb-4">
                <button type="button" id="editBtn" onclick= "editBtn()" class="btn btn-dark px-3">Edit</button>
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
