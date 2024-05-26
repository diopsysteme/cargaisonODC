var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Aerienne, Maritime, Routiere, Alimentaire, Chimique, Fragile, Incassable } from './models/Cargaison.js';
var cargaisons = bd.cargo;
function addTab(carg, cargaison) {
    return __awaiter(this, void 0, void 0, function* () {
        cargaison.ids = carg.length + 1;
        carg.push(cargaison.getObjet);
        console.log(bd);
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
        afficherTr(carg, table, returCarg);
    });
}
const aerienne = new Aerienne(1000, "air1", ["dakar", "2024/02/02"], ["dakar", "2024/02/02"], "poids", 22.9);
console.log(aerienne);
addTab(cargaisons, aerienne);
const maritime = new Maritime(1500, "mare1", ["dakar", "2024/02/02"], ["dakar", "2024/02/02"], "poids", 22.9);
addTab(cargaisons, maritime);
const routiere = new Routiere(800, "rout1", ["dakar", "2024/02/02"], ["dakar", "2024/02/02"], "poids", 22.9);
addTab(cargaisons, routiere);
const produit1 = new Alimentaire('Pomme', 2);
const produit2 = new Chimique('Acide', 2, 3);
const produit3 = new Fragile('Vase', 2);
const produit4 = new Incassable('Table', 2);
aerienne.ajouterProduit(produit1);
aerienne.ajouterProduit(produit2); // Doit afficher un message d'erreur
aerienne.ajouterProduit(produit3);
aerienne.ajouterProduit(produit4);
console.log(aerienne);
maritime.ajouterProduit(produit1);
maritime.ajouterProduit(produit2);
maritime.ajouterProduit(produit3); // Doit afficher un message d'erreurs
maritime.ajouterProduit(produit4);
routiere.ajouterProduit(produit1);
routiere.ajouterProduit(produit2);
routiere.ajouterProduit(produit3);
routiere.ajouterProduit(produit4);
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
    // Création de l'élément div pour la cargaison maritime
    const divCargaison = document.createElement('div');
    divCargaison.classList.add('bg-gray-200', 'p-4', 'rounded-lg');
    // Ajout du titre "Cargaison Maritime"
    const titre = document.createElement('h3');
    titre.classList.add('text-xl', 'font-semibold', 'mb-2');
    titre.textContent = "Cargaison " + container.getType;
    divCargaison.appendChild(titre);
    // Ajout de la distance
    const distanceParagraphe = document.createElement('p');
    distanceParagraphe.textContent = `Distance: ${container.getdistance()} km`;
    divCargaison.appendChild(distanceParagraphe);
    // Si des produits sont disponibles, les ajouter à la liste
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
        // Si aucun produit n'est disponible, afficher un message
        const aucunProduit = document.createElement('p');
        aucunProduit.textContent = 'Aucun produit disponible pour cette cargaison.';
        divCargaison.appendChild(aucunProduit);
        console.log(aucunProduit);
    }
    // Ajout de la cargaison maritime à l'élément conteneur
    where.appendChild(divCargaison);
}
const divCargaison = document.getElementById("contCarg");
if (divCargaison && divCargaison instanceof HTMLDivElement) {
    afficherCargaisonMaritime(aerienne, divCargaison);
    afficherCargaisonMaritime(routiere, divCargaison);
    console.log(divCargaison);
}
else {
    console.error("Element with id 'contCarg' is not a div element.");
}
console.log(produit1.info());
// Assurez-vous que l'élément avec l'ID "type_produit" existe
// Assurez-vous que l'élément avec l'ID "type_produit" existe
const sele1 = document.getElementById("type_produit");
const from = document.getElementById("ajouter_produit");
if (from) {
}
if (sele1) {
    // Ajout de l'écouteur d'événements pour le changement de sélection
    sele1.addEventListener("change", (event) => {
        // Utilisez "event.target" avec le bon type et vérifiez qu'il n'est pas nul
        const target = event.target;
        let tox = document.getElementById("toxicity");
        let parentTox = tox.parentNode;
        console.log(parentTox);
        if (target) {
            parentTox.classList.remove("disabled");
            if (target.value == "Chimique") {
                parentTox.classList.remove("disabled");
            }
            else {
                parentTox.classList.add("disabled");
            }
        }
        else {
            console.error('Event target is null or not an HTMLSelectElement.');
        }
    });
}
else {
    console.error('Element with id "type_produit" not found.');
}
function getFormData(form) {
    let inputs = form.elements;
    var formData = {};
    for (var i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        if (input.type != "button" && input.type !== "submit") {
            formData[input.name] = input.value;
        }
    }
    return formData;
}
let cargForm = document.getElementById("addCargForm");
cargForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = getFormData(cargForm);
    let errors = validateForm(formData);
    clearErrors();
    if (errors.length > 0) {
        displayErrors(errors);
    }
    else {
        console.log(formData);
        // Ajout de la cargaison à la liste des cargaisons
        let carga;
        if (formData.type === 'Aerienne') {
            carga = new Aerienne(formData.distance, formData.libelle, [formData.lieu_depart, formData.dateDep], [formData.lieu_arrivee, formData.dateAr], formData.limite, formData.limite_value);
        }
        else if (formData.type === 'Maritime') {
            carga = new Maritime(formData.distance, formData.libelle, [formData.lieu_depart, formData.dateDep], [formData.lieu_arrivee, formData.dateAr], formData.limite, formData.limite_value);
        }
        else if (formData.type === 'Routiere') {
            carga = new Routiere(formData.distance, formData.libelle, [formData.lieu_depart, formData.dateDep], [formData.lieu_arrivee, formData.dateAr], formData.limite, formData.limite_value);
        }
        addTab(cargaisons, carga);
        // Vider le formulaire
        cargForm.reset();
    }
});
function validateForm(data) {
    let errors = [];
    // Check if distance is greater than 0
    if (data.distance <= 0) {
        errors.push({ field: "distance", message: "La distance doit être supérieure à 0." });
    }
    // Check if all fields are filled
    for (let key in data) {
        if (!data[key]) {
            errors.push({ field: key, message: `Le champ ${key} est requis.` });
        }
    }
    return errors;
}
function displayErrors(errors) {
    errors.forEach(error => {
        const errorElement = document.getElementById(`error-${error.field}`);
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
function afficherTr(tab, table, tr) {
    const tbody = table.querySelector('tbody');
    if (!tbody)
        return;
    tbody.innerHTML = ''; // Clear existing rows
    tab.forEach(item => {
        const row = tr(item);
        tbody.insertAdjacentHTML('beforeend', row);
    });
}
function returCarg(cargaison) {
    let tr = `<tr class="border-b">
  <td class="p-3 text-gray-700">${cargaison.libelle}</td>
  <td class="p-3 text-gray-700">${cargaison.depart}</td>
  <td class="p-3 text-gray-700">${cargaison.arrive}</td>
  <td class="p-3 text-gray-700">${cargaison.type}</td>
  <td class="p-3 text-gray-700">${cargaison.etatAvencement}</td>
  <td class="p-3 text-gray-700 flex space-x-2">
    <a href="details_cargaison.php?id=1" class="text-blue-500 hover:underline">Détails</a>
    <button id="${cargaison.idg}" onclick="openModal('addProductModal')" class="text-green-500 hover:underline">Ajouter Produit</button>
  </td>
</tr>`;
    return tr;
}
const table = document.querySelector('.min-w-full');
// Display cargaisons in the table
afficherTr(cargaisons, table, returCarg);
