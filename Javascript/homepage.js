const cardRow = document.querySelector(".products .container .row");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzNiYTlkYmRkMDNhNjAwMTUwOWJhNTMiLCJpYXQiOjE3MzIwOTAzNzEsImV4cCI6MTczMzI5OTk3MX0.KbskWm5CKrW4GG7QJQm0ZBvoEzMTIAVLfe4qT5lqdDM";

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
      // Cicla tutti gli elementi ricevuti
      phones.forEach((phone) => {
        console.log(phone);
        const col = document.createElement("div");
        col.className = "col-md-4";
        col.id = `col${phone._id}`;
        col.innerHTML = `
        
        <div class="card mb-4 shadow-sm">
                <img src=${phone.imageUrl} class="imgDim card-img-top mt-3" />
                <div class="card-body">
                  <h5 class="card-title">${phone.name}</h5>
                  <p class="card-text">
                        ${phone.description}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" id = "${phone._id}" onclick = editPage(event) class="btn btn-sm btn-outline-secondary px-3">Edit</button>
                      <button type="button" id = "${phone._id}" onclick = detailsPage(event) class="btn btn-sm btn-outline-secondary">Details</button>
                      <button type="button" id = "${phone._id}"  onclick = deleteCard(event) class="btn btn-sm btn-outline-secondary">Delete</button>
                    </div>
                    <small class="text-muted">${phone.brand}</small>
                    <small class="text-muted">${phone.price + "$"}</small>
                    </div>
                </div>
              </div>
            
        
        
        `;
        cardRow.appendChild(col);

        const detailsBtn = document.getElementById("details");
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
    const phone = JSON.parse(newPhone); // JSON in un oggetto JavaScript

    //nuova colonna per la card generate dinamicamente dall'input

    const col = document.createElement("div");
    col.className = "col-12 col-md-4";

    col.id = `col${phone._id}`;

    col.innerHTML = `
    
      <div class="card mb-4 shadow-sm">
        <img src="${phone.imageUrl}" class="card-img-top imgDim " alt="${phone.name}" />
        <div class="card-body">
          <h5 class="card-title">${phone.name}</h5>
          <p class="card-text">${phone.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" id = "${phone._id}" onclick = detailsPage(event) class="btn btn-sm btn-outline-secondary">Details</button>
              <button type="button" id = "${phone._id}"  onclick = deleteCard(event) class="btn btn-sm btn-outline-secondary">Delete</button>
            </div>
            <small class="text-muted">${phone.brand}</small>
            <small class="text-muted">${phone.price + "$"}</small>
          </div>
        </div>
      </div>
    `;

    sessionStorage.removeItem("newPhone");
  }

  handlePhoneApi();
});

const deleteCard = (event) => {
  console.log(event);

  fetch(`https://striveschool-api.herokuapp.com/api/product/${event.target.id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then((resp) => {
      if (confirm("Sei sicuro di voler eliminare questo elemento?")) {
        if (resp.ok) {
          alert("Prodotto eliminato con successo!");

          const col = document.getElementById(`col${event.target.id}`);
          col.remove();
        } else {
          throw new Error("Errore nell'eliminazione del prodotto");
        }
      }
    })
    .catch((error) => console.error("Errore:", error));
};

const detailsPage = (event) => {
  console.log(event);

  console.log(window.location);
  // Ottieni l'URL corrente
  const url = new URL(window.location);

  // Modifica o aggiungi il parametro "page"
  url.searchParams.set("id", event.target.id);

  const newUrl = "../details.html?" + url.searchParams;

  // Aggiorna l'URL e ricarica la pagina
  window.location.href = newUrl;
};

const editPage = (event) => {
  console.log(event);

  console.log(window.location);
  // Ottieni l'URL corrente
  const url = new URL(window.location);

  // Modifica o aggiungi il parametro "page"
  url.searchParams.set("id", event.target.id);

  const newUrl = "../edit.html?" + url.searchParams;

  // Aggiorna l'URL e ricarica la pagina
  window.location.href = newUrl;
};
