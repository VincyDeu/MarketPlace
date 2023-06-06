const resultsBox = document.getElementById("results-box");
// const apiUrl = "https://striveschool-api.herokuapp.com/api/agenda";

const nameInput = document.getElementById("name-field");
const descInput = document.getElementById("desc-field");
const priceInput = document.getElementById("price-field");
const createBtn = document.getElementById("create-btn");
const emptyFields = document.getElementById("empty-fields");

function myFunction(x) {
    x.classList.toggle("change");
  }

window.onload = getPosts();

// Recupero la lista di tutti i posts:
async function getPosts() {
    resultsBox.innerHTML = "";
    const res = await fetch(apiUrl); // Restituisce una promise
    const json = await res.json(); // Restituisce una promise

    json.forEach((element) => {
        // Per ogni elemento creo un tr con opportuni td sulla base delle chiavi dell'oggetto relativo al singolo post:
        createPostTemplate(element);
    });
}

// Listener di tipo click sul tasto per la create di un nuovo post:
createBtn.addEventListener("click", addNewPost);

// Funzione per creare un nuovo post:
async function addNewPost() {
    if(nameInput.value && descInput.value && priceInput.value) {
        const payload = {
            "name": nameInput.value,
            "description": descInput.value,
            "price": priceInput.value,
            "time": new Date()
        };
        const createResult = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        });
        // Recupero la lista aggiornata dei posts dopo una create: 
        getPosts();
        // Inizializzare i campi input della create:
        nameInput.value = "";
        descInput.value = "";
        priceInput.value = "";
    } else {
        // console.log("Valorizza tutti i campi richiesti!");
        emptyFields.classList.toggle("d-none");
        setTimeout(() => {
            emptyFields.classList.toggle("d-none");
        }, 5000);
    }
}

// Funzione per creare il template per l'oggetto post:
function createPostTemplate(element) {
    const myTr = document.createElement("tr");
    const myName = document.createElement("td");
    myName.innerText = element.name;
    const myDesc = document.createElement("td");
    myDesc.innerText = element.description;
    const myPrice = document.createElement("td");
    myPrice.innerText = element.price;
    const myBtns = document.createElement("td");
    // <button type="button" class="btn btn-primary">Edit</button>
    // <i class="fa-solid fa-pencil"></i>
    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-sm", "mx-1", "btn-primary");
    const editImg = document.createElement("i");
    editImg.classList.add("fa-solid", "fa-pencil", "me-1");
    const editTxt = document.createElement("span");
    editTxt.innerText = "Edit";
    editBtn.append(editImg, editTxt);
    // <button type="button" class="btn btn-primary">Delete</button>
    // <i class="fa-solid fa-trash"></i>
    const delBtn = document.createElement("button");
    delBtn.classList.add("btn", "btn-sm", "mx-1", "btn-danger");
    const delImg = document.createElement("i");
    delImg.classList.add("fa-solid", "fa-trash", "me-1");
    const delTxt = document.createElement("span");
    delTxt.innerText = "Delete";
    delBtn.append(delImg, delTxt);

    myBtns.append(editBtn, delBtn);

    myTr.append(myName, myDesc, myPrice, myBtns);
    resultsBox.appendChild(myTr);

   
}