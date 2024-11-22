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
        <div class="row d-flex ">
            <div class="col-12 col-sm-8 col-md-6 mx-auto">
            <img src="${data.imageUrl}" alt="${data.name}" class=" imgDim img-fluid ms-4 ">
         </div>
        <div class="col-12 col-sm-8 col-md-6 ">
                <h3 class=" text-dark mb-3 fs-1">${data.name}</h3>
                <p><strong class="text-dark fs-3">Description:<br/></strong><span class="spanEdit fs-4"> ${data.description}</span></p>
                <p><strong class="text-dark fs-3">Brand:</strong> <span class="spanEdit fs-4">${data.brand}</span></p>
                <p><strong class="text-dark fs-3">Price:</strong> <span class="spanEdit fs-4">${data.price + "$"}</span></p>
            </div>
        </div>
    `;
};
