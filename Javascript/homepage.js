const cardRow = document.querySelector(".products .container .row");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzNiYTlkYmRkMDNhNjAwMTUwOWJhNTMiLCJpYXQiOjE3MzIwODczMzEsImV4cCI6MTczMzI5NjkzMX0.QI7nwob-4zyZTuzb_9xTPit_Ymm6Fxe1oBYwla-THjs";

const handlePhoneApi = () => {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json(); // Converte la risposta in JSON
      } else {
        throw new Error("Errore nella richiesta");
      }
    })
    .then((phones) => {
      // Cicla attraverso tutti gli elementi ricevuti
      phones.forEach((phone) => {
        console.log(phone);
        const col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML = `
        
        <div class="card mb-4 shadow-sm">
                <img src=${phone.imageUrl} class="imgDim card-img-top" />
                <div class="card-body">
                  <h5 class="card-title">${phone.name}</h5>
                  <p class="card-text">
                        ${phone.description}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small class="text-muted">${phone.brand}</small>
                    <small class="text-muted">${phone.price + "$"}</small>
                    </div>
                </div>
              </div>
            
        
        
        `;
        cardRow.appendChild(col);
      });
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  const cardRow = document.querySelector(".products .container .row");

  const newPhone = sessionStorage.getItem("newPhone");

  if (newPhone) {
    const phone = JSON.parse(newPhone); // Convertiamo il JSON in un oggetto JavaScript

    // Creiamo una nuova colonna per la card
    const col = document.createElement("div");
    col.className = "col-12 col-md-4";

    col.innerHTML = `
    
      <div class="card mb-4 shadow-sm">
        <img src="${phone.imageUrl}" class="card-img-top imgDim " alt="${phone.name}" />
        <div class="card-body">
          <h5 class="card-title">${phone.name}</h5>
          <p class="card-text">${phone.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
              <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
            </div>
            <small class="text-muted">${phone.brand}</small>
            <small class="text-muted">${phone.price + "$"}</small>
          </div>
        </div>
      </div>
    `;
    cardRow.appendChild(col);

    sessionStorage.removeItem("newPhone");
  }

  handlePhoneApi();
});
