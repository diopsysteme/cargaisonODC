"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('link', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        const data = yield response.json();
        console.log('Données récupérées:', data);
    }
    catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
});
fetchData();
const saveData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        const responseData = yield response.json();
        console.log('Réponse du serveur:', responseData);
    }
    catch (error) {
        console.error('Erreur lors de la sauvegarde des données:', error);
    }
});
const dataToSave = {
    key: 'value',
    anotherKey: 'anotherValue'
};
saveData(dataToSave);
