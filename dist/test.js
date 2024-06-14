var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Aerienne, Maritime, Routiere, Alimentaire, Chimique, Fragile, Incassable, client } from './models/Cargaison.js';
import { showNotification, showError, } from './funct.js';
// src/index.ts
function sendSMS(to, text) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('./message.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                to: to,
                text: text
            })
        });
        const data = yield response.json();
        if (data.status === 'success') {
            console.log(data.message);
        }
        else {
            console.error(data.message);
        }
    });
}
var cargaisons = bd.cargo;
var npage = 1;
var eleBypage = 4;
function sendMail(produit) {
    fetch('./msimple.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(produit),
    })
        .then(response => response.json())
        .then(jsonResponse => {
        if (jsonResponse.success) {
            console.log('E-mail envoyé pour le produit:', produit);
        }
        else {
            console.error('Erreur lors de l\'envoi de l\'e-mail:', jsonResponse.message);
        }
    })
        .catch(error => {
        console.error('Il y a eu un problème avec l\'opération fetch:', error);
    });
}
// // Utilisation de la fonction
// fetchGet('http://example.com/api/data')
//   .then(data => console.log(data))
//   .catch(error => console.error('Fetch error:', error));
function saveCargaison(bd) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('./save.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bd),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = yield response.json();
            console.log(result);
        }
        catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    });
}
function fetchCarg(bd) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('./mail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bd),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = yield response.json();
            console.log(result);
        }
        catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    });
}
function addTab(carg, cargaison) {
    const newId = carg.reduce((maxId, cargo) => Math.max(maxId, cargo.id), 0) + 1;
    cargaison.ids = newId;
    carg.unshift(cargaison.getObjet);
    console.log(bd);
    saveCargaison(bd);
    paginate(cargaisons, npage, 4, table, returCarg);
    showNotification('cargaison ajoutée avec succes.', 'classic');
    showNotification('cargaison ajoutée avec succes.', 'modern');
}
const aerienne = new Aerienne(1000, "air1", ["dakar", "2024/02/02"], ["dakar", "2024/02/02"], "poids", 22.9);
console.log(aerienne);
// addTab(cargaisons, aerienne)
const maritime = new Maritime(1500, "mare1", ["dakar", "2024/02/02"], ["dakar", "2024/02/02"], "poids", 22.9);
// addTab(cargaisons, maritime)
const routiere = new Routiere(800, "rout1", ["dakar", "2024/02/02"], ["dakar", "2024/02/02"], "poids", 22.9);
// addTab(cargaisons, routiere)
const clien = new client("nonm", "prenom", "dakar", "mail", 777777777);
const produit1 = new Alimentaire('Pomme', 2, clien, clien);
const produit2 = new Chimique('Acide', 2, 3, clien, clien);
const produit3 = new Fragile('Vase', 2, clien, clien);
const produit4 = new Incassable('Table', 2, clien, clien);
aerienne.ajouterProduit(produit1);
aerienne.ajouterProduit(produit2); // Doit afficher un message d'erreur
aerienne.ajouterProduit(produit3);
aerienne.ajouterProduit(produit4);
console.log(aerienne);
maritime.ajouterProduit(produit1);
maritime.ajouterProduit(produit2);
// maritime.ajouterProduit(produit3); // Doit afficher un message d'erreurs
maritime.ajouterProduit(produit4);
// routiere.ajouterProduit(produit1);
// routiere.ajouterProduit(produit2);
// routiere.ajouterProduit(produit3);
// routiere.ajouterProduit(produit4);
console.log(`Total Aerienne: ${aerienne.sommeTotale()}F, Nombre de produits: ${aerienne.nbProduit()}`);
console.log(`Total Maritime: ${maritime.sommeTotale()}F, Nombre de produits: ${maritime.nbProduit()}`);
console.log(`Total Routiere: ${routiere.sommeTotale()}F, Nombre de produits: ${routiere.nbProduit()}`);
function carg(cargaison) {
    const htCarg = `
<div class="bg-gray-200 p-4 rounded-lg">
<h3 class="text-xl font-semibold mb-2">${cargaison.getType}</h3>
<p>Distance: 3000 km</p>
<h4 class="text-lg font-semibold mt-4">Produits</h4>
<ul class="list-disc ml-5">
  <!-- <li>Produit Alimentaire - Libellé: Riz, Poids: 200kg</li>
  <li>Produit Chimique - Libellé: Acide, Poids: 50kg, Degré de toxicité: 3</li> -->
  <!-- Autres produits -->
</ul>
</div>
`;
    return htCarg;
}
function afficherCargaisonMaritime(container, where) {
    const divCargaison = document.createElement('div');
    divCargaison.classList.add('bg-gray-200', 'p-4', 'rounded-lg');
    const titre = document.createElement('h3');
    titre.classList.add('text-xl', 'font-semibold', 'mb-2');
    titre.textContent = "Cargaison " + container.getType;
    divCargaison.appendChild(titre);
    const distanceParagraphe = document.createElement('p');
    distanceParagraphe.textContent = `Distance: ${container.getdistance()} km`;
    divCargaison.appendChild(distanceParagraphe);
    if (container.nbProduit() > 0) {
        const titreProduits = document.createElement('h4');
        titreProduits.classList.add('text-lg', 'font-semibold', 'mt-4');
        titreProduits.textContent = 'Produits';
        divCargaison.appendChild(titreProduits);
        const listeProduits = document.createElement('ul');
        listeProduits.classList.add('list-disc', 'ml-5');
        container.getAllProduits().forEach(produit => {
            const produitLi = document.createElement('li');
            produitLi.textContent = ` Produit : ${produit.info()} Frais : ${container.calculerFrais(produit)}`;
            listeProduits.appendChild(produitLi);
        });
        divCargaison.appendChild(listeProduits);
        console.log(listeProduits);
    }
    else {
        const aucunProduit = document.createElement('p');
        aucunProduit.textContent = 'Aucun produit disponible pour cette cargaison.';
        divCargaison.appendChild(aucunProduit);
        console.log(aucunProduit);
    }
    where.appendChild(divCargaison);
}
function getFormData(form) {
    let inputs = form.elements;
    var formData = {};
    for (var i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        if (input.type != "button" && input.type !== "submit") {
            // console.log(input.name+":"+input.value)
            formData[input.name] = input.value;
        }
    }
    return formData;
}
let cargForm = document.getElementById("addCargForm");
if (cargForm) {
    cargForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let formData = getFormData(cargForm);
        let errors = validateForm(formData);
        clearErrors();
        if (errors.length > 0) {
            displayErrors(errors);
            showError("verifier les champs");
        }
        else {
            console.log(formData);
            let carga;
            if (formData.type === 'Aerienne') {
                carga = new Aerienne(parseFloat(formData.distance), formData.libelle, [formData.lieu_depart, formData.dateDep], [formData.lieu_arrivee, formData.dateAr], formData.limite, parseFloat(formData.limiteVal));
            }
            else if (formData.type === 'Maritime') {
                carga = new Maritime(parseFloat(formData.distance), formData.libelle, [formData.lieu_depart, formData.dateDep], [formData.lieu_arrivee, formData.dateAr], formData.limite, parseFloat(formData.limiteVal));
            }
            else if (formData.type === 'Routiere') {
                carga = new Routiere(parseFloat(formData.distance), formData.libelle, [formData.lieu_depart, formData.dateDep], [formData.lieu_arrivee, formData.dateAr], formData.limite, parseFloat(formData.limiteVal));
            }
            console.log(carga);
            addTab(cargaisons, carga);
            cargForm.reset();
        }
    });
}
function validateForm(data) {
    let errors = [];
    for (let key in data) {
        if (!data[key]) {
            errors.push({ field: key, message: `Le champ ${key} est requis.` });
        }
    }
    if (data.distance <= 0) {
        errors.push({ field: "distance", message: "La distance doit être supérieure à 0." });
    }
    const departureDate = data.dateDep ? new Date(data.dateDep) : new Date(data.dateDep2);
    const arrivalDate = data.dateAr ? new Date(data.dateAr) : new Date(data.dateAr2);
    const currentDate = new Date();
    console.log(departureDate, arrivalDate);
    const normalizeDate = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const normalizedDepartureDate = normalizeDate(departureDate);
    const normalizedArrivalDate = normalizeDate(arrivalDate);
    const normalizedCurrentDate = normalizeDate(currentDate);
    // console.log('Departure Date:', normalizedDepartureDate);
    // console.log('Arrival Date:', normalizedArrivalDate);
    // console.log('Current Date:', normalizedCurrentDate);
    let fielddep = data.dateDep ? "dateDep" : "dateDep2";
    let fieldAr = data.dateAr ? "dateAr" : "dateAr2";
    if (isNaN(departureDate.getTime())) {
        errors.push({ field: fielddep, message: "La date de départ n'est pas valide." });
    }
    else if (normalizedDepartureDate <= normalizedCurrentDate) {
        errors.push({ field: fielddep, message: "La date de départ doit être supérieure à la date d'aujourd'hui." });
    }
    if (isNaN(arrivalDate.getTime())) {
        errors.push({ field: fieldAr, message: "La date d'arrivée n'est pas valide." });
    }
    else if (normalizedArrivalDate <= normalizedDepartureDate) {
        errors.push({ field: fieldAr, message: "La date d'arrivée doit être supérieure à la date de départ." });
    }
    return errors;
}
function displayErrors(errors) {
    errors.forEach(error => {
        const errorElement = document.getElementById(`error-${error.field}`);
        console.log(errorElement);
        if (errorElement) {
            errorElement.textContent = error.message;
        }
    });
}
function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}
function afficherTr(tab, table, tr, index) {
    const tbody = table.querySelector('tbody');
    if (!tbody)
        return;
    tbody.innerHTML = ''; // Clear existing rows
    tab.forEach((item, ind) => {
        const row = tr(item, index + ind);
        tbody.insertAdjacentHTML('beforeend', row);
    });
}
function returCarg(cargaison, id) {
    // ${cargaison.etatAvencement != "attente" ? "hidden" : ""}
    let part1 = `
  <tr class="border-b">
    <td class="p-3 text-gray-700">${cargaison.libelle}</td>
    <td class="p-3 text-gray-700">${cargaison.depart[0]}</td>
    <td class="p-3 text-gray-700">${cargaison.arrive[0]}</td>
    <td class="p-3 text-gray-700">${cargaison.type}</td>
   
    <td class="p-3 text-gray-700">
     
        <input id="${id}" type="checkbox" class="form-checkbox etat " ${cargaison.etatCargaison === "ouverte" ? "checked" : ""} >
        <span class="ml-2 ">${cargaison.etatCargaison === "ouverte" ? "Ouvert" : "Fermé"}</span>
      
    </td>
    <td class="p-3 text-gray-700 flex space-x-2">
      <a id="${id}" href="#" class="text-blue-500 hover:underline details-btn">Détails</a>
      <button id="${cargaison.id}" onclick="openModal('addProductModal')" class="${cargaison.etatCargaison === "fermee" ? "desactive" : ""} addp text-green-500 hover:underline" name="${id}">Ajouter Produit</button>
    </td>`;
    let part2 = `
    <td class="p-3 text-gray-700">
    <select id="${id}" class="avance p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" >
      <option value="attente" ${cargaison.etatAvencement === "attente" ? "selected" : ""}>En attente</option>
      <option value="perdu" ${cargaison.etatAvencement === "perdu" ? "selected" : ""}>Perdu</option>
      <option value="en cours" ${cargaison.etatAvencement === "en cours" ? "selected" : ""}>En cours</option>
      <option value="arrive" ${cargaison.etatAvencement === "arrive" ? "selected" : ""}>Arrivé</option>
    </select>
    <span> ${cargaison.etatAvencement}</span>
  </td>
  </tr>
    `;
    console.log(id);
    let tr;
    if (cargaison.etatAvencement == "en cours") {
        part2 = `
    <td class="p-3 text-gray-700">
    <select id="${id}" class="avance p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" >
      <option value="perdu" ${cargaison.etatAvencement === "perdu" ? "selected" : ""}>Perdu</option>
      <option value="en cours" ${cargaison.etatAvencement === "en cours" ? "selected" : ""}>En cours</option>
      <option value="arrive" ${cargaison.etatAvencement === "arrive" ? "selected" : ""}>Arrivé</option>
      </select>
      <span> ${cargaison.etatAvencement}</span>
  </td>
  </tr>
    `;
    }
    else if (cargaison.etatAvencement == "arrive") {
        part2 = `
    <td class="p-3 text-gray-700">
    <select id="${id}" class="avance p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" >
      <option value="arrive" ${cargaison.etatAvencement === "arrive" ? "selected" : ""}>Arrivé</option>
    </select>
    <span> ${cargaison.etatAvencement}</span>
  </td>
  </tr>
    `;
    }
    else if (cargaison.etatAvencement === "perdu") {
        part2 = `
    <td class="p-3 text-gray-700">
    <select id="${id}" class="avance p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" >
      <option value="perdu" ${cargaison.etatAvencement === "perdu" ? "selected" : ""}>Perdu</option>
      <option value="en cours" ${cargaison.etatAvencement === "en cours" ? "selected" : ""}>En cours</option>
      <option value="arrive" ${cargaison.etatAvencement === "arrive" ? "selected" : ""}>Arrivé</option>
    </select>
    <span> ${cargaison.etatAvencement}</span>
  </td>
  </tr>
    `;
    }
    if (cargaison.etatAvencement == "attente") {
        part2 = `
    <td class="p-3 text-gray-700">
    <select id="${id}" class="avance p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" >
    <option value="attente" ${cargaison.etatAvencement === "attente" ? "selected" : ""}>En attente</option>
    <option value="en cours" ${cargaison.etatAvencement === "en cours" ? "selected" : ""}>En Cours</option>
    </select>
    <span> ${cargaison.etatAvencement}</span>
  </td>
  </tr>
    `;
    }
    if (cargaison.etatCargaison == "ouverte") {
        part2 = `
    <td class="p-3 text-gray-700">
    <select id="${id}" class="avance p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" >
    <option value="attente" ${cargaison.etatAvencement === "attente" ? "selected" : ""}>En attente</option>
    </select>
    <span> ${cargaison.etatAvencement}</span>
  </td>
  </tr>
    `;
    }
    tr = part1 + part2;
    return tr;
}
function alt() {
    alert("dd");
}
const table = document.querySelector('.min-w-full');
var idCarg = "";
// Display cargaisons in the table
function paginateDefault(tab, npage, nel, table, tr) {
    const nombrePage = Math.ceil(tab.length / nel);
    console.log(`Total pages: ${nombrePage}`);
    const deb = (npage - 1) * nel;
    console.log(`Displaying items from index ${deb}`);
    let paginationContainer = document.querySelector(".pagination");
    paginationContainer.innerHTML = generatePaginationLinks(nombrePage, npage);
    const links = paginationContainer.querySelectorAll(".page-link");
    links.forEach(link => {
        link.addEventListener('click', (event) => changePage(event, tab, nel, table, tr));
    });
    cargAct();
}
function paginate(tab, npage, nel, table, tr) {
    const nombrePage = Math.ceil(tab.length / nel);
    console.log(`Total pages: ${nombrePage}`);
    const deb = (npage - 1) * nel;
    console.log(`Displaying items from index ${deb}`);
    const etu = tab.slice(deb, deb + nel);
    afficherTr(etu, table, tr, deb);
    let paginationContainer = document.querySelector(".pagination");
    paginationContainer.innerHTML = generatePaginationLinks(nombrePage, npage);
    const links = paginationContainer.querySelectorAll(".page-link");
    links.forEach(link => {
        link.addEventListener('click', (event) => changePage(event, tab, nel, table, tr));
    });
    cargAct();
    listenAdd();
    details();
}
function generatePaginationLinks(nombrePage, currentPage) {
    let links = `<a href="#" id="${currentPage - 1}" class="page-link prev bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"><i class="fas fa-angle-left"></i></a>`;
    for (let i = 1; i <= nombrePage; i++) {
        links += `<a href="#" id="${i}" class="page-link ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">${i}</a>`;
    }
    links += `<a href="#" id="${currentPage + 1}" class="page-link next bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"><i class="fas fa-angle-right"></i></a>`;
    return links;
}
function changePage(event, tab, nel, table, tr) {
    event.preventDefault();
    const target = event.target;
    npage = parseInt(target.id);
    if (npage < 1 || npage > Math.ceil(tab.length / nel))
        return;
    paginate(tab, npage, nel, table, tr);
}
const filteInp = document.querySelectorAll(".filteInp");
// filteInp.forEach((el) =>{
//   el.addEventListener("input",(e)=>formFilter.submit)
// })
let formFilter = document.getElementById("filterForm");
if (formFilter) {
    formFilter.addEventListener("submit", function (event) {
        event.preventDefault(); // Empêcher le rechargement de la page
        let data = getFormData(formFilter);
        console.log(data);
        let filteredData = filterLD(cargaisons, data.l_depart, "depart");
        filteredData = filterLD(filteredData, data.d_depart, "depart");
        filteredData = filterLD(filteredData, data.l_arrivee, "arrive");
        filteredData = filterLD(filteredData, data.d_arrivee, "arrive");
        filteredData = filterData(filteredData, data.type, "type");
        console.log(filteredData);
        paginate(filteredData, npage, 4, table, returCarg);
    });
}
function listenAdd() {
    const addP = document.querySelectorAll('.addp');
    addP.forEach(element => {
        element.addEventListener('click', (event) => {
            let ele = event.target;
            idCarg = ele.id;
            //     const index = bd.cargo.findIndex((car: any) => car.id == idCarg);
            // // const cargoData = bd.cargo.find((c: any) => c.id == idCarg) as Cargaison;
            // const cargoData = findD(bd.cargo,"id",idCarg);
        });
    });
}
listenAdd();
function displayReceipt(prod) {
    const receipt = document.createElement('div');
    receipt.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg rounded-lg z-50 max-w-sm w-full';
    receipt.innerHTML = `
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-2xl font-bold text-gray-800">Reçu de Transport</h3>
      <button class="text-gray-500 hover:text-gray-700 close-btn focus:outline-none">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <div class="text-gray-700">
      <p><span class="font-semibold">Envoyeur:</span> ${prod.sender.nom} ${prod.sender.prenom}</p>
      <p><span class="font-semibold">Adresse:</span> ${prod.sender.adresse}</p>
      <p><span class="font-semibold">Email:</span> ${prod.sender.mail}</p>
      <p><span class="font-semibold">Téléphone:</span> ${prod.sender.telephone}</p>
      <p><span class="font-semibold">Destinataire:</span> ${prod.receiver.nom} ${prod.receiver.prenom}</p>
      <p><span class="font-semibold">Adresse:</span> ${prod.receiver.adresse}</p>
      <p><span class="font-semibold">Email:</span> ${prod.receiver.mail}</p>
      <p><span class="font-semibold">Téléphone:</span> ${prod.receiver.telephone}</p>
      <p><span class="font-semibold">Produit:</span> ${prod.libelle}</p>
      <p><span class="font-semibold">Poids:</span> ${prod.poids}</p>
      <p><span class="font-semibold">Tarif:</span> ${prod.tarif} F</p>
    </div>
  `;
    document.body.appendChild(receipt);
    const closeButton = receipt.querySelector('.close-btn');
    closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener('click', () => {
        document.body.removeChild(receipt);
    });
    setTimeout(() => {
        if (document.body.contains(receipt)) {
            document.body.removeChild(receipt);
        }
    }, 5000);
}
function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}
function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}
const addProduct = document.querySelector("#productForm");
addProduct === null || addProduct === void 0 ? void 0 : addProduct.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(bd.cargo);
    const index = bd.cargo.findIndex((car) => car.id == idCarg);
    // const cargoData = bd.cargo.find((c: any) => c.id == idCarg) as Cargaison;
    const cargoData = findD(bd.cargo, "id", idCarg);
    console.log(cargoData);
    const inst = makeInstance(cargoData);
    console.log(inst);
    console.log(cargoData);
    let data = getFormData(addProduct);
    console.log(data);
    let prod;
    if (data.type_produit == "Alimentaire") {
        prod = new Alimentaire(data.libelle, data.poids, new client(data.sender_nom, data.sender_prenom, data.sender_adresse, data.sender_mail, data.sender_telephone), new client(data.receiver_nom, data.receiver_prenom, data.receiver_adresse, data.receiver_mail, data.receiver_telephone));
    }
    else if (data.type_produit == "Incassable") {
        prod = new Incassable(data.libelle, data.poids, new client(data.sender_nom, data.sender_prenom, data.sender_adresse, data.sender_mail, data.sender_telephone), new client(data.receiver_nom, data.receiver_prenom, data.receiver_adresse, data.receiver_mail, data.receiver_telephone));
        // console.log(inst)
    }
    else if (data.type_produit == "Fragile") {
        prod = new Fragile(data.libelle, data.poids, new client(data.sender_nom, data.sender_prenom, data.sender_adresse, data.sender_mail, data.sender_telephone), new client(data.receiver_nom, data.receiver_prenom, data.receiver_adresse, data.receiver_mail, data.receiver_telephone));
        // console.log(inst)
    }
    else if (data.type_produit == "Chimique") {
        prod = new Chimique(data.libelle, data.poids, 1, new client(data.sender_nom, data.sender_prenom, data.sender_adresse, data.sender_mail, data.sender_telephone), new client(data.receiver_nom, data.receiver_prenom, data.receiver_adresse, data.receiver_mail, data.receiver_telephone));
        // console.log(inst)
    }
    console.log(prod);
    const newId = generateUniqueCode(4) + "-C" + cargoData.id;
    prod.setCode = newId;
    prod.starif = inst.calculerFrais(prod);
    prod.setEtat = "en cours";
    inst.ajouterProduit(prod);
    console.log(prod);
    if (cargoData.limite == "poids") {
        const poidsTotal = cargoData.produits.reduce((total, produit) => total + produit.poids, 0);
        const poidsNouveauProduit = data.poids;
        console.log(poidsTotal, poidsNouveauProduit);
        if (poidsTotal + poidsNouveauProduit > cargoData.limiteValue) {
            showError("Impossible d'ajouter le produit. La cargaison atteindra sa limite de poids.");
            return;
        }
    }
    else {
        console.log(cargoData.produits.length + "=" + cargoData.limiteValue);
        if (cargoData.produits.length >= cargoData.limiteValue) {
            showError("La cargaison est pleine. Impossible d'ajouter plus de produits.");
            return;
        }
    }
    if (inst.getObjet.produits.length == 0) {
        return;
    }
    closeModal("addProductModal");
    fetchCarg(prod);
    console.log(cargoData.id);
    console.log(inst.getObjet.produits.length);
    bd.cargo[index].produits.push(inst.getObjet.produits);
    console.log(bd.cargo[index].produits);
    saveCargaison(bd);
    displayReceipt(prod);
    showNotification("Le produit a été ajouté à la cargaison.", "classic");
});
console.log(bd.cargo[1].produits);
function generateUniqueCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
console.log(generateUniqueCode(5));
function findD(data, champs, value) {
    return data.find((c) => c[champs] == value);
}
function filterData(cargaisons, searchValue, field) {
    return cargaisons.filter(cargaison => {
        if (!cargaison[`${field}`].toLowerCase().includes(searchValue.toLowerCase())) {
            return false;
        }
        console.log(searchValue, cargaison[`${field}`], field);
        console.log("not filtred");
        return true;
    });
}
function filterLD(cargaisons, depart, champs) {
    return cargaisons.filter(cargaison => {
        if ((depart === null || depart === void 0 ? void 0 : depart.trim()) != "") {
            // Check if the `depart` string is present in the `cargaison[champs]` array ignoring case
            const isPresent = cargaison[`${champs}`].some((element) => element.toLowerCase().includes(depart.toLowerCase()));
            if (!isPresent) {
                return false;
            }
        }
        return true;
    });
}
function filterD(cargaisons, depart, champs) {
    return cargaisons.filter(cargaison => {
        if ((depart === null || depart === void 0 ? void 0 : depart.trim()) != "") {
            // Check if the `depart` string is present in the `cargaison[champs]` array ignoring case
            const isPresent = cargaison[`${champs}`].some((element) => element.includes(depart));
            if (!isPresent) {
                return false;
            }
        }
        return true;
    });
}
function makeInstance(tab) {
    let instance;
    if (tab.type == "Maritime") {
        instance = new Maritime(parseFloat(tab.distance), tab.libelle, tab.depart, tab.arrive, tab.limite, parseFloat(tab.limiteValue));
    }
    else if (tab.type == "Aerienne") {
        instance = new Aerienne(parseFloat(tab.distance), tab.libelle, tab.depart, tab.arrive, tab.limite, parseFloat(tab.limiteValue));
    }
    else {
        instance = new Routiere(parseFloat(tab.distance), tab.libelle, tab.depart, tab.arrive, tab.limite, parseFloat(tab.limiteValue));
    }
    return instance;
}
if (cargForm) {
    paginateDefault(cargaisons, 1, 4, table, returCarg);
}
// const divCargaison = document.getElementById("contCarg");
// if (divCargaison && divCargaison instanceof HTMLDivElement) {
//   afficherCargaisonMaritime(aerienne, divCargaison);
//   afficherCargaisonMaritime(routiere, divCargaison);
//   console.log(divCargaison);
// } else {
//   console.error("Element with id 'contCarg' is not a div element.");
// }
console.log(produit1.info());
// Assurez-vous que l'élément avec l'ID "type_produit" existe
// Assurez-vous que l'élément avec l'ID "type_produit" existe
// const sele1 = document.getElementById("type_produit") as HTMLSelectElement | null;
// const from = document.getElementById("ajouter_produit") as HTMLSelectElement | null;
// if (from) {
// }
// if (sele1) {
//   // Ajout de l'écouteur d'événements pour le changement de sélection
//   sele1.addEventListener("change", (event: Event) => {
//     // Utilisez "event.target" avec le bon type et vérifiez qu'il n'est pas nul
//     const target = event.target as HTMLSelectElement | null;
//     let tox = document.getElementById("toxicity")!
//     let parentTox = tox.parentNode! as HTMLDivElement
//     console.log(parentTox)
//     if (target) {
//       parentTox.classList.remove("disabled");
//       if (target.value == "Chimique") {
//         parentTox.classList.remove("disabled");
//       } else {
//         parentTox.classList.add("disabled");
//       }
//     } else {
//       console.error('Event target is null or not an HTMLSelectElement.');
//     }
//   });
// } else {
//   console.error('Element with id "type_produit" not found.');
// }
function cargAct() {
    const open = document.querySelectorAll(".etat");
    const avance = document.querySelectorAll(".avance");
    open.forEach(input => {
        input.addEventListener("change", () => {
            const idCargo = parseInt(input.id);
            // alert(idCargo)
            // concole.log(bd.cargo[idCargo].etatCargaison)
            if (bd.cargo[idCargo].etatAvencement != "attente") {
                showError("impossible d'ouvrir la cargaison elle est à :" + bd.cargo[idCargo].etatAvencement);
                paginate(bd.cargo, npage, 4, table, returCarg);
                return 2;
            }
            if (bd.cargo[idCargo].etatCargaison == "fermee") {
                bd.cargo[idCargo].etatCargaison = "ouverte";
            }
            else {
                bd.cargo[idCargo].etatCargaison = "fermee";
            }
            console.log(bd.cargo[idCargo]);
            saveCargaison(bd);
            paginate(bd.cargo, npage, 4, table, returCarg);
            showNotification("Mise à jour etat cargaison reussi", "modern");
        });
    });
    avance.forEach(sele => {
        sele.addEventListener("change", () => {
            const idCargo = parseInt(sele.id);
            console.log(bd.cargo[idCargo].produits.length);
            if (bd.cargo[idCargo].produits.length == 0) {
                showError("la cargaison est vide on ne peut le mettre à : " + sele.value);
                paginate(bd.cargo, npage, 4, table, returCarg);
                return 2;
            }
            bd.cargo[idCargo].etatAvencement = sele.value;
            paginate(bd.cargo, npage, 4, table, returCarg);
            bd.cargo[idCargo].produits.forEach((sousListe, sousListeIndex) => {
                sousListe.forEach((produit, produitIndex) => {
                    produit.etat = sele.value;
                    bd.cargo[idCargo].produits;
                    console.log(produit.code, produitIndex);
                });
            });
            saveCargaison(bd);
            showNotification("Mise à jour etat cargaison reussi", "modern");
            showNotification("envoie Mail au client reussi", "classic");
            console.log(bd);
            const produits = bd.cargo[idCargo].produits;
            produits.forEach((produit) => {
                sendMail(produit[0]);
                console.log(produit[0]);
            });
        });
    });
}
if (cargForm) {
    cargAct();
    details();
}
function details() {
    const cargoList = document.querySelector('.cargoList');
    const cargoDetails = document.getElementById('cargoDetails');
    const detailsContent = document.getElementById('detailsContent');
    const backToList = document.getElementById('backToList');
    const detailsButtons = document.querySelectorAll('.details-btn');
    detailsButtons.forEach(button => {
        button.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
            const id = event.currentTarget.getAttribute('id');
            idC = parseInt(id);
            if (id) {
                // Fetch details from server or local data
                displayDetails(bd.cargo[id], idC);
                cargoList.classList.add('hidden');
                cargoDetails.classList.remove('hidden');
            }
        }));
    });
    backToList.addEventListener('click', () => {
        cargoDetails.classList.add('hidden');
        cargoList.classList.remove('hidden');
    });
}
var idC = 0;
function displayDetails(details, id) {
    const detailsContent = document.getElementById('detailsContent');
    let part1 = `
    <div class="text-center">
        <h3 class="text-2xl font-bold mb-2">${details.libelle}</h3>
        <p class="text-gray-600">${details.description}</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h4 class="font-semibold text-lg mb-2">Informations de Transport</h4>
            <p><strong>Lieu de départ:</strong> ${details.depart[0]}</p>
            <p><strong>Lieu d'arrivée:</strong> ${details.arrive[0]}</p>
            <p><strong>Type:</strong> ${details.type}</p>
            <p><strong>Poids:</strong> ${details.limiteValue} kg</p>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h4 class="font-semibold text-lg mb-2">Statut et Dates</h4>
            <p><strong>État:</strong> ${details.etatCargaison === "ouverte" ? "Ouvert" : "Fermé"}</p>
            <p><strong>État d'avancement:</strong> ${details.etatAvencement}</p>
            <p><strong>Date d'expédition:</strong> ${details.depart[1]}</p>
            <p><strong>Date d'arrivée:</strong> ${details.arrive[1]}</p>
        </div>
    </div>
    <div class="mt-4">
        <h4 class="font-semibold text-lg mb-2">Produits</h4>
        <div class="bg-gray-100 p-4 rounded-lg shadow-sm">
            <table class="w-full border-collapse border border-gray-300">
                <thead>
                    <tr class="bg-gray-200">
                        <th class="border border-gray-300 px-4 py-2">Nom</th>
                        <th class="border border-gray-300 px-4 py-2">Poids</th>
                        <th class="border border-gray-300 px-4 py-2">Quantité</th>
                        <th class="border border-gray-300 px-4 py-2">Type</th>
                        <th class="border border-gray-300 px-4 py-2">Etat</th>
                        <th class="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>`;
    // Génère les lignes du tableau pour chaque produit
    let produitsHTML = '';
    details.produits.forEach((lot, lotIndex) => {
        lot.forEach((produit, produitIndex) => {
            const isDisabled = details.etatAvencement !== 'arrive' ? 'disabled' : '';
            produitsHTML += `
            <tr>
                <td class="border border-gray-300 px-4 py-2">${produit.libelle}</td>
                <td class="border border-gray-300 px-4 py-2">${produit.poids} kg</td>
                <td class="border border-gray-300 px-4 py-2">${produit.quantite}</td>
                <td class="border border-gray-300 px-4 py-2">${produit.type}</td>
                <td class="border border-gray-300 px-4 py-2">${produit.type}</td>
                <td class="border border-gray-300 px-4 py-2">
                    <select id="${lotIndex}" ${isDisabled} class="etatProd bg-yellow-500 text-white px-2 py-1 rounded-md shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
                        <option value="attente" disabled  ${produit.etat === 'attente' ? 'selected' : ''}>En attente</option>
                        <option value="en cours" disabled ${produit.etat === 'en cours' ? 'selected' : ''}>En cours</option>
                        <option value="arrive" ${produit.etat === 'arrive' ? 'selected' : ''}>Arrivé</option>
                        <option value="recupere" ${produit.etat === 'recupere' ? 'selected' : ''}>Récupèré</option>
                        <option value="archive" ${produit.etat === 'archive' ? 'selected' : ''}>Archivé</option>
                        <option value="perdu" ${produit.etat === 'perdu' ? 'selected' : ''}>Perdu</option>
                    </select>
                    <button id="${lotIndex}" class="deleProd bg-red-500 text-white px-2 py-1 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Supprimer</button>
                </td>
            </tr>`;
        });
    });
    // Fin du HTML
    const part2 = `
                </tbody>
            </table>
        </div>
    </div>
    <div class="mt-4 text-right">
        <button id="${id}" class="modifDC bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Modifier</button>
        <button class="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Supprimer</button>
    </div>`;
    // Ajoute le HTML complet à l'élément detailsContent
    detailsContent.innerHTML = part1 + produitsHTML + part2;
    console.log(idC);
    const delet = document.querySelectorAll(".deleProd");
    delet.forEach((button) => {
        button.addEventListener("click", () => {
            const id = (button.id);
            bd.cargo[idC].produits.splice(parseInt(id), 1);
            displayDetails(bd.cargo[idC], idC);
            console.log(bd.cargo[idC].produits);
            saveCargaison(bd);
            showNotification('suppression produit reussi.', 'classic');
        });
    });
    const modif = document.querySelectorAll(".etatProd");
    modif.forEach((select) => {
        select.addEventListener("change", () => {
            const id = (select.id);
            console.log(bd.cargo[idC].produits[id][0].etat);
            bd.cargo[idC].produits[id][0].etat = select.value;
            displayDetails(bd.cargo[idC], idC);
            console.log(bd.cargo[idC].produits[id][0].etat);
            sendMail(bd.cargo[idC].produits[id][0]);
            saveCargaison(bd);
            showNotification('mise a jour etat produit reussi.', 'classic');
            if (select.value == "recupere") {
                bd.cargo[idC].produits.splice(parseInt(id), 1);
                saveCargaison(bd);
            }
        });
    });
    const modifDC = document.querySelectorAll(".modifDC");
    modifDC.forEach((button) => {
        button.addEventListener("click", (e) => {
            idC = parseInt(button.id);
            console.log(idC);
            alert(idC);
            console.log(document.getElementById("editDatesModal"));
            const butto = editDatesForm.querySelector("button");
            console.log(butto);
            document.getElementById("editDatesModal").classList.remove('hidden');
            ouvreMod("editDatesModal");
            const dep = document.getElementById("dateDep2");
            const ar = document.getElementById("dateAr2");
            ar.classList.remove('desactive');
            dep.classList.remove('desactive');
            dep.value = bd.cargo[idC].depart[1];
            ar.value = bd.cargo[idC].arrive[1];
            if (bd.cargo[idC].etatAvencement == "arrive" || bd.cargo[idC].etatAvencement == "perdu") {
                dep.value = bd.cargo[idC].depart[1];
                ar.value = bd.cargo[idC].arrive[1];
                ar.classList.add('desactive');
                dep.classList.add('desactive');
                showError("impossible de faire une modification cargaison est à l'etat " + bd.cargo[idC].etatAvencement);
            }
            else if (bd.cargo[idC].etatAvencement == "en cours") {
                dep.classList.add('desactive');
            }
        });
    });
}
// function searchProductByCode() {
//   const formData = new FormData(document.getElementById('searchForm') as HTMLFormElement);
//   const params = new URLSearchParams(formData as any).toString();
//   const data= fetchGet("./search.php?code="+params)
//   console.log(data);
//     //  fetch(`./search.php?code=${params}`)
//     // .then(response => response.json())
//     // .then(data => displaySearchResults(data))
//     // .catch(error => console.error('Error searching product:', error));                                      
// }
function displaySearchResults(data) {
    const resultContainer = document.getElementById('resultContainer');
    if (resultContainer) {
        resultContainer.innerHTML = '';
        if (data.product && data.cargo) {
            const product = data.product;
            const cargo = data.cargo;
            const resultItem = document.createElement('div');
            resultItem.className = 'border p-4 mb-4 bg-white rounded';
            resultItem.innerHTML = `
        <h2 class="text-xl font-bold mb-2">Produit: ${product.libelle}</h2>
        <p><strong>Code:</strong> ${product.code}</p>
        <p><strong>Poids:</strong> ${product.poids} kg</p>
        <p><strong>Tarif:</strong> ${product.tarif} €</p>
        <p><strong>Etat:</strong> ${product.etat}</p>
        <h3 class="text-lg font-bold mt-4">Cargaison</h3>
        <p><strong>Libellé:</strong> ${cargo.libelle}</p>
        <p><strong>Type:</strong> ${cargo.type}</p>
        <p><strong>Etat de cargaison:</strong> ${cargo.etatCargaison}</p>
        <p><strong>Etat d'avancement:</strong> ${cargo.etatAvencement}</p>
        <p><strong>Distance:</strong> ${cargo.distance} km</p>
        <p><strong>Date d'arrivée:</strong> ${cargo.arrive[1]}</p>
      `;
            if (product.etat === 'en cours') {
                const today = new Date();
                const arrivalDate = new Date(cargo.arrive[1]);
                const timeDiff = arrivalDate.getTime() - today.getTime();
                const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                if (timeDiff > 0) {
                    resultItem.innerHTML += `<p><strong>Le produit arrivera dans:</strong> ${dayDiff} jour(s)</p>`;
                }
                else {
                    resultItem.innerHTML += `<p><strong>Le produit est en retard de:</strong> ${-dayDiff} jour(s)</p>`;
                }
            }
            resultContainer.appendChild(resultItem);
        }
        else {
            resultContainer.innerHTML = '<p>Aucun produit trouvé avec ce code.</p>';
        }
    }
}
// Expose functions globally (if needed)
window.displaySearchResults = displaySearchResults;
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('searchForm');
    if (form) {
        form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
            event.preventDefault();
            const formData = new FormData(form);
            const params = new URLSearchParams(formData).toString();
            const url = `./search.php?${params}`;
            try {
                const data = yield fetchGet(url);
                displaySearchResults(data);
                showNotification('Recherche effectuée avec succès.', 'modern');
                showError('Erreur lors de la recherche du produit.');
                showNotification('Recherche effectuée avec succès.', 'classic');
            }
            catch (error) {
                console.error('Error searching product:', error);
                showNotification('Erreur lors de la recherche du produit.', 'classic');
            }
        }));
    }
});
// function showError(message: string) {
//   const container = document.getElementById('notificationContainer');
//   if (container) {
//       const errorMessage = document.createElement('div');
//       errorMessage.className = 'error-message';
//       errorMessage.innerHTML = `
//           <span>${message}</span>
//           <span class="close">&times;</span>
//       `;
//       container.appendChild(errorMessage);
//       // Show error message
//       setTimeout(() => {
//           errorMessage.classList.add('show');
//       }, 10);
//       // Add close event
//       errorMessage.querySelector('.close')?.addEventListener('click', () => {
//           hideNotification(errorMessage);
//       });
//       // Auto-hide error message after 5 seconds
//       setTimeout(() => {
//           hideNotification(errorMessage);
//       }, 5000);
//   }
// }
function fetchGet(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            throw error;
        }
    });
}
const fermeModifCarg = document.getElementById("closeModEdit");
fermeModifCarg.addEventListener("click", () => fermMod("editDatesModal"));
// function showNotification(message: string, type: 'classic' | 'modern') {
//   const container = document.getElementById('notificationContainer');
//   if (container) {
//       const notification = document.createElement('div');
//       notification.className = `notification ${type}`;
//       notification.innerHTML = `
//           <span>${message}</span>
//           <span class="close">&times;</span>
//       `;
//       container.appendChild(notification);
//       // Show notification
//       setTimeout(() => {
//           notification.classList.add('show');
//       }, 10);
//       // Add close event
//       notification.querySelector('.close')?.addEventListener('click', () => {
//           hideNotification(notification);
//       });
//       // Auto-hide notification after 3 seconds
//       setTimeout(() => {
//           hideNotification(notification);
//       }, 3000);
//   }
// }
// function hideNotification(notification: HTMLElement) {
//   notification.classList.add('fade-out');
//   notification.addEventListener('animationend', () => {
//       notification.remove();
//   });
// }
function ouvreMod(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}
function fermMod(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}
const editDatesForm = document.getElementById('editDatesForm');
if (editDatesForm) {
    editDatesForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (bd.cargo[idC].etatAvencement == "arrive" || bd.cargo[idC].etatAvencement == "perdu") {
            showError("impossible de faire une modification cargaison est à l'etat " + bd.cargo[idC].etatAvencement);
            return 2;
        }
        paginate(bd.cargo, npage, 4, table, returCarg);
        let formData = getFormData(editDatesForm);
        let errors = validateForm(formData);
        if (bd.cargo[idC].etatAvencement != "attente") {
            if (errors.length > 1) {
                const dontDisplay = document.getElementById("error-dateDep2");
                displayErrors(errors);
                console.log(dontDisplay);
                dontDisplay.innerText = "";
                showError("verifier les champs");
                return 1;
            }
            bd.cargo[idC].arrive[1] = formData.dateAr2;
            saveCargaison(bd);
            fermMod("editDatesModal");
            displayDetails(bd.cargo[idC], idC);
            showNotification("modification cargaison reussi ", "classic");
            editDatesForm.reset();
            return 2;
        }
        clearErrors();
        if (errors.length > 0) {
            displayErrors(errors);
            showError("verifier les champs");
        }
        else {
            console.log(bd.cargo[idC].arrive[1]);
            console.log(bd.cargo[idC].depart[1]);
            bd.cargo[idC].arrive[1] = formData.dateAr2;
            bd.cargo[idC].depart[1] = formData.dateDep2;
            // sendMail(bd.cargo[idC].produits[id][0])
            console.log(bd.cargo[idC].arrive[1]);
            console.log(bd.cargo[idC].depart[1]);
            saveCargaison(bd);
            fermMod("editDatesModal");
            displayDetails(bd.cargo[idC], idC);
            showNotification("modification cargaison reussi ", "classic");
            editDatesForm.reset();
        }
    });
}
