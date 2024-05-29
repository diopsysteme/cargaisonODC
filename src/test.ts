
import { Cargaison, Aerienne, Maritime, Routiere, Alimentaire, Chimique, Materiel, Fragile, Incassable } from './models/Cargaison.js';
declare var bd: any;
var cargaisons: Cargaison[] = bd.cargo;
async function addTab(carg: any[], cargaison: any) {
  cargaison.ids = carg.length + 1;
  carg.unshift(cargaison.getObjet)
  console.log(bd);
  try {
    const response = await fetch('./save.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bd),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
  paginate(cargaisons, 1, 2, table, returCarg);
}
const aerienne = new Aerienne(1000, "air1", ["dakar", "2024/02/02"], ["dakar", "2024/02/02"], "poids", 22.9);
console.log(aerienne);

// addTab(cargaisons, aerienne)
const maritime = new Maritime(1500, "mare1", ["dakar", "2024/02/02"], ["dakar", "2024/02/02"], "poids", 22.9);
// addTab(cargaisons, maritime)
const routiere = new Routiere(800, "rout1", ["dakar", "2024/02/02"], ["dakar", "2024/02/02"], "poids", 22.9);
// addTab(cargaisons, routiere)

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

function carg(cargaison: Cargaison) {
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
`
  return htCarg;
}

function afficherCargaisonMaritime(container: Cargaison, where: HTMLDivElement) {
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
      produitLi.textContent = ` Produit : ${produit.info()} Frais : ${container.calculerFrais(produit)}`
      listeProduits.appendChild(produitLi);
    });
    divCargaison.appendChild(listeProduits);
    console.log(listeProduits);
  } else {
    // Si aucun produit n'est disponible, afficher un message
    const aucunProduit = document.createElement('p');
    aucunProduit.textContent = 'Aucun produit disponible pour cette cargaison.';
    divCargaison.appendChild(aucunProduit);
    console.log(aucunProduit);
  }
  // Ajout de la cargaison maritime à l'élément conteneur
  where.appendChild(divCargaison);
}



function getFormData(form: HTMLFormElement) {
  let inputs = form.elements;
  var formData = {} as any;

  for (var i = 0; i < inputs.length; i++) {
    let input = inputs[i] as HTMLInputElement;

    if (input.type != "button" && input.type !== "submit") {
      formData[input.name] = input.value;
    }
  }

  return formData;
}

let cargForm = document.getElementById("addCargForm")! as HTMLFormElement; cargForm.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  let formData = getFormData(cargForm);
  let errors = validateForm(formData);

  clearErrors();

  if (errors.length > 0) {
    displayErrors(errors);
  } else {
    console.log(formData);
    // Ajout de la cargaison à la liste des cargaisons
    let carga;
    if (formData.type === 'Aerienne') {
      carga = new Aerienne(formData.distance, formData.libelle, [formData.lieu_depart, formData.dateDep], [formData.lieu_arrivee, formData.dateAr], formData.limite, formData.limite_value) as Aerienne;
    } else if (formData.type === 'Maritime') {
      carga = new Maritime(formData.distance, formData.libelle, [formData.lieu_depart, formData.dateDep], [formData.lieu_arrivee, formData.dateAr], formData.limite, formData.limite_value) as Maritime;
    } else if (formData.type === 'Routiere') {
      carga = new Routiere(formData.distance, formData.libelle, [formData.lieu_depart, formData.dateDep], [formData.lieu_arrivee, formData.dateAr], formData.limite, formData.limite_value) as Routiere;
    }
    addTab(cargaisons, carga);


    // Vider le formulaire
    cargForm.reset();


  }
});

function validateForm(data: { [key: string]: any }): { field: string, message: string }[] {
  let errors: { field: string, message: string }[] = [];

  // Check for non-empty fields
  for (let key in data) {
    if (!data[key]) {
      errors.push({ field: key, message: `Le champ ${key} est requis.` });
    }
  }

  // Check for positive distance
  if (data.distance <= 0) {
    errors.push({ field: "distance", message: "La distance doit être supérieure à 0." });
  }

  // Parse dates
  const departureDate = new Date(data.dateDep);
  const arrivalDate = new Date(data.dateAr);
  const currentDate = new Date();

  const normalizeDate = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const normalizedDepartureDate = normalizeDate(departureDate);
  const normalizedArrivalDate = normalizeDate(arrivalDate);
  const normalizedCurrentDate = normalizeDate(currentDate);

  // Log dates for debugging
  console.log('Departure Date:', normalizedDepartureDate);
  console.log('Arrival Date:', normalizedArrivalDate);
  console.log('Current Date:', normalizedCurrentDate);

  // Validate dates
  if (isNaN(departureDate.getTime())) {
    errors.push({ field: "dateDep", message: "La date de départ n'est pas valide." });
  } else if (normalizedDepartureDate <= normalizedCurrentDate) {
    errors.push({ field: "dateDep", message: "La date de départ doit être supérieure à la date d'aujourd'hui." });
  }

  if (isNaN(arrivalDate.getTime())) {
    errors.push({ field: "dateAr", message: "La date d'arrivée n'est pas valide." });
  } else if (normalizedArrivalDate <= normalizedDepartureDate) {
    errors.push({ field: "dateAr", message: "La date d'arrivée doit être supérieure à la date de départ." });
  }

  return errors;
}

function displayErrors(errors: { field: string, message: string }[]) {
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
function afficherTr(tab: any[], table: HTMLTableElement, tr: any) {
  const tbody = table.querySelector('tbody');
  if (!tbody) return;

  tbody.innerHTML = ''; // Clear existing rows

  tab.forEach(item => {
    const row = tr(item);
    tbody.insertAdjacentHTML('beforeend', row);
  });
}
function returCarg(cargaison: any): any {
  let tr = `<tr class="border-b">
  <td class="p-3 text-gray-700">${cargaison.libelle}</td>
  <td class="p-3 text-gray-700">${cargaison.depart[0]}</td>
  <td class="p-3 text-gray-700">${cargaison.arrive[0]}</td>
  <td class="p-3 text-gray-700">${cargaison.type}</td>
  <td class="p-3 text-gray-700">${cargaison.etatAvencement}</td>
  <td class="p-3 text-gray-700 flex space-x-2">
    <a href="details_cargaison.php?id=1" class="text-blue-500 hover:underline">Détails</a>
    <button id="${cargaison.idg}" onclick="openModal('addProductModal')" class="text-green-500 hover:underline">Ajouter Produit</button>
  </td>
</tr>`
  return tr
}
const table = document.querySelector('.min-w-full') as HTMLTableElement;

// Display cargaisons in the table
function paginateDefault(tab: Cargaison[], npage: number, nel: number, table: HTMLTableElement, tr: (cargaison: Cargaison) => string): void {
  const nombrePage = Math.ceil(tab.length / nel);
  console.log(`Total pages: ${nombrePage}`);

  const deb = (npage - 1) * nel;
  console.log(`Displaying items from index ${deb}`);


  let paginationContainer = document.querySelector(".pagination") as HTMLElement;
  paginationContainer.innerHTML = generatePaginationLinks(nombrePage, npage);

  const links = paginationContainer.querySelectorAll(".page-link");
  links.forEach(link => {
    link.addEventListener('click', (event: Event) => changePage(event, tab, nel, table, tr));
  });
}
function paginate(tab: Cargaison[], npage: number, nel: number, table: HTMLTableElement, tr: (cargaison: Cargaison) => string): void {
  const nombrePage = Math.ceil(tab.length / nel);
  console.log(`Total pages: ${nombrePage}`);

  const deb = (npage - 1) * nel;
  console.log(`Displaying items from index ${deb}`);

  const etu = tab.slice(deb, deb + nel);
  afficherTr(etu, table, tr);

  let paginationContainer = document.querySelector(".pagination") as HTMLElement;
  paginationContainer.innerHTML = generatePaginationLinks(nombrePage, npage);

  const links = paginationContainer.querySelectorAll(".page-link");
  links.forEach(link => {
    link.addEventListener('click', (event: Event) => changePage(event, tab, nel, table, tr));
  });
}
function generatePaginationLinks(nombrePage: number, currentPage: number): string {
  let links = `<a href="#" id="${currentPage - 1}" class="page-link prev bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"><i class="fas fa-angle-left"></i></a>`;
  for (let i = 1; i <= nombrePage; i++) {
    links += `<a href="#" id="${i}" class="page-link ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">${i}</a>`;
  }
  links += `<a href="#" id="${currentPage + 1}" class="page-link next bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"><i class="fas fa-angle-right"></i></a>`;
  return links;
}
function changePage(event: Event, tab: Cargaison[], nel: number, table: HTMLTableElement, tr: (cargaison: Cargaison) => string): void {
  event.preventDefault();
  const target = event.target as HTMLElement;
  const npage = parseInt(target.id);

  if (npage < 1 || npage > Math.ceil(tab.length / nel)) return;

  paginate(tab, npage, nel, table, tr);
}
// paginate(cargaisons, 1, 2, table, returCarg);

let formFilter = document.getElementById("filterForm")! as HTMLFormElement
formFilter.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêcher le rechargement de la page

  // Récupérer les valeurs des champs de formulaire
  let data = getFormData(formFilter)
  console.log(data)
  let filteredData: any[] = filterLD(cargaisons, data.l_depart, "depart");
  filteredData = filterLD(filteredData, data.d_depart, "depart");
  filteredData = filterLD(filteredData, data.l_arrivee, "arrive");
  filteredData = filterLD(filteredData, data.d_arrivee, "arrive");
  filteredData = filterData(filteredData, data.type, "type");
  console.log(filteredData)
  paginate(filteredData, 1, 2, table, returCarg);
});





function filterData(
  cargaisons: any[],
  searchValue?: string,
  field?: string
): any[] {
  return cargaisons.filter(cargaison => {

    if (!cargaison[`${field}`].toLowerCase().includes(searchValue!.toLowerCase())) {
      return false;
    }

    console.log(searchValue, cargaison[`${field}`], field);
    console.log("not filtred")
    return true;
  });
}



function filterLD(
  cargaisons: any[],
  depart?: string,
  champs?: string
): any[] {
  return cargaisons.filter(cargaison => {
    if (depart?.trim() != "") {
      // Check if the `depart` string is present in the `cargaison[champs]` array ignoring case
      const isPresent = cargaison[`${champs}`].some((element: string) =>
        element.toLowerCase().includes(depart!.toLowerCase())
      );
      if (!isPresent) {
        return false;
      }
    }
    return true;
  });
}
function filterD(
  cargaisons: any[],
  depart?: string,
  champs?: string
): any[] {
  return cargaisons.filter(cargaison => {
    if (depart?.trim() != "") {
      // Check if the `depart` string is present in the `cargaison[champs]` array ignoring case
      const isPresent = cargaison[`${champs}`].some((element: string) =>
        element.includes(depart!)
      );
      if (!isPresent) {
        return false;
      }
    }
    return true;
  });
}






paginateDefault(cargaisons, 1, 2, table, returCarg);

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
