/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/models/Cargaison.ts":
/*!*********************************!*\
  !*** ./src/models/Cargaison.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Aerienne: () => (/* binding */ Aerienne),\n/* harmony export */   Alimentaire: () => (/* binding */ Alimentaire),\n/* harmony export */   Cargaison: () => (/* binding */ Cargaison),\n/* harmony export */   Chimique: () => (/* binding */ Chimique),\n/* harmony export */   Fragile: () => (/* binding */ Fragile),\n/* harmony export */   Incassable: () => (/* binding */ Incassable),\n/* harmony export */   Maritime: () => (/* binding */ Maritime),\n/* harmony export */   Materiel: () => (/* binding */ Materiel),\n/* harmony export */   Produit: () => (/* binding */ Produit),\n/* harmony export */   Routiere: () => (/* binding */ Routiere)\n/* harmony export */ });\nconst config = {\n    pra: 100,\n    prm: 200,\n    pam: 1000,\n    paa: 300,\n    pma: 90,\n    pmc: 500,\n    pmm: 400\n};\nclass Cargaison {\n    constructor(distance, libelle, depart, arrive) {\n        this.distance = distance;\n        this.libelle = libelle;\n        this.depart = depart;\n        this.arrive = arrive;\n        this.produits = [];\n        this.id = 0;\n    }\n    set ids(id) { this.id = id; }\n    get idg() { return this.id; }\n    getdistance() { return this.distance; }\n    setTarif(value) {\n        this.tarif = value;\n    }\n    ajouterProduit(produit) {\n        if (this.produits.length >= 10) {\n            console.log(\"La cargaison est pleine. Impossible d'ajouter plus de produits.\");\n            return;\n        }\n        const coutProduit = this.calculerFrais(produit);\n        this.produits.push(produit);\n        console.log(`Produit ajouté. Coût du produit: ${coutProduit}F. Montant total: ${this.sommeTotale()}F`);\n    }\n    sommeTotale() {\n        return this.produits.reduce((total, produit) => total + this.calculerFrais(produit), 0);\n    }\n    nbProduit() {\n        return this.produits.length;\n    }\n    getAllProduits() {\n        return this.produits;\n    }\n}\n//\nclass Aerienne extends Cargaison {\n    constructor(distance, libelle, depart, arrive) {\n        super(distance, libelle, depart, arrive);\n        this.tarif = 0;\n    }\n    calculerFrais(produit) {\n        if (produit instanceof Alimentaire) {\n            this.tarif = config.paa;\n        }\n        else if (produit instanceof Materiel) {\n            this.tarif = config.pam;\n        }\n        return produit.getPoids() * this.distance * this.tarif;\n    }\n    ajouterProduit(produit) {\n        if (produit instanceof Chimique) {\n            console.log(\"Les produits chimiques ne peuvent pas être transportés par voie aérienne.\");\n            return;\n        }\n        super.ajouterProduit(produit);\n    }\n    getType() {\n        return \"Aerienne\";\n    }\n}\n//\nclass Maritime extends Cargaison {\n    constructor(distance, libelle, depart, arrive) {\n        super(distance, libelle, depart, arrive);\n        this.tarif = 0;\n    }\n    calculerFrais(produit) {\n        if (produit instanceof Alimentaire) {\n            this.tarif = config.pma;\n        }\n        else if (produit instanceof Materiel) {\n            this.tarif = config.pmm;\n        }\n        else if (produit instanceof Chimique) {\n            this.tarif = config.pmc * produit.getToxicite();\n        }\n        return produit.getPoids() * this.distance * this.tarif;\n    }\n    ajouterProduit(produit) {\n        if (produit instanceof Fragile) {\n            console.log(\"Les produits fragiles ne peuvent pas être transportés par voie maritime.\");\n            return;\n        }\n        super.ajouterProduit(produit);\n    }\n    getType() {\n        return \"Maritime\";\n    }\n}\n//\nclass Routiere extends Cargaison {\n    constructor(distance, libelle, depart, arrive) {\n        super(distance, libelle, depart, arrive);\n        this.tarif = 0;\n    }\n    calculerFrais(produit) {\n        if (produit instanceof Alimentaire) {\n            this.tarif = config.pra;\n        }\n        else if (produit instanceof Materiel) {\n            this.tarif = config.prm;\n        }\n        return produit.getPoids() * this.distance * this.tarif;\n    }\n    ajouterProduit(produit) {\n        if (produit instanceof Chimique) {\n            console.log(\"Les produits chimiques ne peuvent pas être transportés par voie terrestre.\");\n            return;\n        }\n        super.ajouterProduit(produit);\n    }\n    getType() {\n        return \"Routiere\";\n    }\n}\n//\nclass Produit {\n    set ids(id) { this.id = id; }\n    get idg() { return this.id; }\n    constructor(libelle, poids) {\n        this.libelle = libelle;\n        this.poids = poids;\n        this.id = 0;\n    }\n    getLibelle() {\n        return this.libelle;\n    }\n    getPoids() {\n        return this.poids;\n    }\n    setLibelle(libelle) {\n        this.libelle = libelle;\n    }\n    setPoids(poids) {\n        this.poids = poids;\n    }\n}\n//\nclass Alimentaire extends Produit {\n    info() {\n        let inf = `Alimentaire: ${this.libelle}, Poids: ${this.poids}`;\n        return inf;\n    }\n}\n//\nclass Chimique extends Produit {\n    constructor(libelle, poids, toxicite) {\n        super(libelle, poids);\n        this.toxicite = toxicite;\n    }\n    getToxicite() {\n        return this.toxicite;\n    }\n    setToxicite(toxicite) {\n        this.toxicite = toxicite;\n    }\n    info() {\n        let inf = `Chimique: ${this.libelle}, Poids: ${this.poids}, Toxicité: ${this.toxicite}`;\n        console.log(`Chimique: ${this.libelle}, Poids: ${this.poids}, Toxicité: ${this.toxicite}`);\n        return inf;\n    }\n}\n//\nclass Materiel extends Produit {\n    constructor(libelle, poids) {\n        super(libelle, poids);\n    }\n}\n//\nclass Fragile extends Materiel {\n    info() {\n        let inf = `Fragile: ${this.libelle}, Poids: ${this.poids}`;\n        return inf;\n        console.log(`Fragile: ${this.libelle}, Poids: ${this.poids}`);\n    }\n}\n//\nclass Incassable extends Materiel {\n    info() {\n        let inf = `Incassable: ${this.libelle}, Poids: ${this.poids}`;\n        return inf;\n        console.log(`Incassable: ${this.libelle}, Poids: ${this.poids}`);\n    }\n}\n\n\n//# sourceURL=webpack://prog1/./src/models/Cargaison.ts?");

/***/ }),

/***/ "./src/test.ts":
/*!*********************!*\
  !*** ./src/test.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_Cargaison__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/Cargaison */ \"./src/models/Cargaison.ts\");\n\nlet tabCarg = [];\nfunction addTab(carg, cargaison) {\n    cargaison.ids = carg.length + 1;\n    carg.push(cargaison);\n}\nconst aerienne = new _models_Cargaison__WEBPACK_IMPORTED_MODULE_0__.Aerienne(1000, \"air1\", [\"dakar\", \"2024/02/02\"], [\"dakar\", \"2024/02/02\"]);\naddTab(tabCarg, aerienne);\nconst maritime = new _models_Cargaison__WEBPACK_IMPORTED_MODULE_0__.Maritime(1500, \"mare1\", [\"dakar\", \"2024/02/02\"], [\"dakar\", \"2024/02/02\"]);\naddTab(tabCarg, maritime);\nconst routiere = new _models_Cargaison__WEBPACK_IMPORTED_MODULE_0__.Routiere(800, \"rout1\", [\"dakar\", \"2024/02/02\"], [\"dakar\", \"2024/02/02\"]);\naddTab(tabCarg, routiere);\nconst produit1 = new _models_Cargaison__WEBPACK_IMPORTED_MODULE_0__.Alimentaire('Pomme', 2);\nconst produit2 = new _models_Cargaison__WEBPACK_IMPORTED_MODULE_0__.Chimique('Acide', 2, 3);\nconst produit3 = new _models_Cargaison__WEBPACK_IMPORTED_MODULE_0__.Fragile('Vase', 2);\nconst produit4 = new _models_Cargaison__WEBPACK_IMPORTED_MODULE_0__.Incassable('Table', 2);\naerienne.ajouterProduit(produit1);\naerienne.ajouterProduit(produit2); // Doit afficher un message d'erreur\naerienne.ajouterProduit(produit3);\naerienne.ajouterProduit(produit4);\nconsole.log(aerienne);\nmaritime.ajouterProduit(produit1);\nmaritime.ajouterProduit(produit2);\nmaritime.ajouterProduit(produit3); // Doit afficher un message d'erreurs\nmaritime.ajouterProduit(produit4);\nroutiere.ajouterProduit(produit1);\nroutiere.ajouterProduit(produit2);\nroutiere.ajouterProduit(produit3);\nroutiere.ajouterProduit(produit4);\nconsole.log(`Total Aerienne: ${aerienne.sommeTotale()}F, Nombre de produits: ${aerienne.nbProduit()}`);\nconsole.log(`Total Maritime: ${maritime.sommeTotale()}F, Nombre de produits: ${maritime.nbProduit()}`);\nconsole.log(`Total Routiere: ${routiere.sommeTotale()}F, Nombre de produits: ${routiere.nbProduit()}`);\nfunction carg(cargaison) {\n    const htCarg = `\n<div class=\"bg-gray-200 p-4 rounded-lg\">\n<h3 class=\"text-xl font-semibold mb-2\">${cargaison.getType()}</h3>\n<p>Distance: 3000 km</p>\n<h4 class=\"text-lg font-semibold mt-4\">Produits</h4>\n<ul class=\"list-disc ml-5\">\n  <!-- <li>Produit Alimentaire - Libellé: Riz, Poids: 200kg</li>\n  <li>Produit Chimique - Libellé: Acide, Poids: 50kg, Degré de toxicité: 3</li> -->\n  <!-- Autres produits -->\n</ul>\n</div>\n`;\n    return htCarg;\n}\nfunction afficherCargaisonMaritime(container, where) {\n    // Création de l'élément div pour la cargaison maritime\n    const divCargaison = document.createElement('div');\n    divCargaison.classList.add('bg-gray-200', 'p-4', 'rounded-lg');\n    // Ajout du titre \"Cargaison Maritime\"\n    const titre = document.createElement('h3');\n    titre.classList.add('text-xl', 'font-semibold', 'mb-2');\n    titre.textContent = \"Cargaison \" + container.getType();\n    divCargaison.appendChild(titre);\n    // Ajout de la distance\n    const distanceParagraphe = document.createElement('p');\n    distanceParagraphe.textContent = `Distance: ${container.getdistance()} km`;\n    divCargaison.appendChild(distanceParagraphe);\n    // Si des produits sont disponibles, les ajouter à la liste\n    if (container.nbProduit() > 0) {\n        const titreProduits = document.createElement('h4');\n        titreProduits.classList.add('text-lg', 'font-semibold', 'mt-4');\n        titreProduits.textContent = 'Produits';\n        divCargaison.appendChild(titreProduits);\n        const listeProduits = document.createElement('ul');\n        listeProduits.classList.add('list-disc', 'ml-5');\n        container.getAllProduits().forEach(produit => {\n            const produitLi = document.createElement('li');\n            produitLi.textContent = ` Produit : ${produit.info()} Frais : ${container.calculerFrais(produit)}`;\n            listeProduits.appendChild(produitLi);\n        });\n        divCargaison.appendChild(listeProduits);\n        console.log(listeProduits);\n    }\n    else {\n        // Si aucun produit n'est disponible, afficher un message\n        const aucunProduit = document.createElement('p');\n        aucunProduit.textContent = 'Aucun produit disponible pour cette cargaison.';\n        divCargaison.appendChild(aucunProduit);\n        console.log(aucunProduit);\n    }\n    // Ajout de la cargaison maritime à l'élément conteneur\n    where.appendChild(divCargaison);\n}\nconst divCargaison = document.getElementById(\"contCarg\");\nif (divCargaison && divCargaison instanceof HTMLDivElement) {\n    afficherCargaisonMaritime(aerienne, divCargaison);\n    afficherCargaisonMaritime(routiere, divCargaison);\n    console.log(divCargaison);\n}\nelse {\n    console.error(\"Element with id 'contCarg' is not a div element.\");\n}\nconsole.log(produit1.info());\n// Assurez-vous que l'élément avec l'ID \"type_produit\" existe\n// Assurez-vous que l'élément avec l'ID \"type_produit\" existe\nconst sele1 = document.getElementById(\"type_produit\");\nconst from = document.getElementById(\"ajouter_produit\");\nif (from) {\n}\nif (sele1) {\n    // Ajout de l'écouteur d'événements pour le changement de sélection\n    sele1.addEventListener(\"change\", (event) => {\n        // Utilisez \"event.target\" avec le bon type et vérifiez qu'il n'est pas nul\n        const target = event.target;\n        let tox = document.getElementById(\"toxicity\");\n        let parentTox = tox.parentNode;\n        console.log(parentTox);\n        if (target) {\n            parentTox.classList.remove(\"disabled\");\n            if (target.value == \"Chimique\") {\n                parentTox.classList.remove(\"disabled\");\n            }\n            else {\n                parentTox.classList.add(\"disabled\");\n            }\n        }\n        else {\n            console.error('Event target is null or not an HTMLSelectElement.');\n        }\n    });\n}\nelse {\n    console.error('Element with id \"type_produit\" not found.');\n}\n\n\n//# sourceURL=webpack://prog1/./src/test.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/test.ts");
/******/ 	
/******/ })()
;