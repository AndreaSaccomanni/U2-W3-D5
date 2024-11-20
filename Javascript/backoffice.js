const submitBtn = document.getElementById("submitBtn");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzNiYTlkYmRkMDNhNjAwMTUwOWJhNTMiLCJpYXQiOjE3MzIwOTAzNzEsImV4cCI6MTczMzI5OTk3MX0.KbskWm5CKrW4GG7QJQm0ZBvoEzMTIAVLfe4qT5lqdDM";

submitBtn.addEventListener("click", function () {
  // Raccogliamo i dati dal form
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const imageURL = document.getElementById("imageURL").value;
  const price = document.getElementById("price").value;

  // oggetto phone con i dati raccolti
  const phone = {
    name: name,
    description: description,
    brand: brand,
    imageUrl: imageURL,
    price: price
  };

  // Eseguiamo la richiesta POST per inviare i dati
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(phone) // Converto l'oggetto phone in JSON per inviarlo al server
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json(); // Converte la risposta in JSON
      } else {
        throw new Error("Errore nella richiesta");
      }
    })

    .then((data) => {
      console.log("Telefono aggiunto:", data);

      // Aggiorniamo la homepage utilizzando sessionStorage
      sessionStorage.setItem("newPhone", JSON.stringify(data));

      //ritorna alla homepage
      window.location.href = "../homepage.html";
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
});
