const config = {
    pra: 100,
    prm: 200,
    pam: 1000,
    paa: 300,
    pma: 90,
    pmc: 500,
    pmm: 400
};
export class Cargaison {
    constructor(distance, libelle, depart, arrive, limite, limiteValue) {
        this.distance = distance;
        this.libelle = libelle;
        this.depart = depart;
        this.arrive = arrive;
        this.limite = limite;
        this.limiteValue = limiteValue;
        this.produits = [];
        this.id = 0;
        this.etatAvencement = "attente";
        this.etatCargaison = "ouverte";
        this.type = "";
    }
    get libell() { return this.libelle; }
    get depar() { return this.depart; }
    get arriv() { return this.arrive; }
    get limi() { return this.limite; }
    get limiValue() { return this.limiteValue; }
    get etatAv() { return this.etatAvencement; }
    get etatCarg() { return this.etatCargaison; }
    get getObjet() {
        return {
            libelle: this.libelle,
            depart: this.depart,
            arrive: this.arrive,
            limite: this.limite,
            limiteValue: this.limiteValue,
            etatAvencement: this.etatAvencement,
            etatCargaison: this.etatCargaison,
            distance: this.distance,
            tarif: this.tarif,
            produits: this.produits,
            id: this.id,
            type: this.type
        };
    }
    set ids(id) { this.id = id; }
    get idg() { return this.id; }
    getdistance() { return this.distance; }
    setTarif(value) {
        this.tarif = value;
    }
    ajouterProduit(produit) {
        if (this.limite == "poids") {
            const poidsTotal = this.produits.reduce((total, produit) => total + produit.getPoids(), 0);
            const poidsNouveauProduit = produit.getPoids();
            console.log(poidsTotal);
            if (poidsTotal + poidsNouveauProduit > this.limiteValue) {
                alert("Impossible d'ajouter le produit. La cargaison atteindra sa limite de poids.");
                return;
            }
        }
        else if (this.produits.length >= this.limiteValue) {
            alert("La cargaison est pleine. Impossible d'ajouter plus de produits.");
            return;
        }
        const coutProduit = this.calculerFrais(produit);
        this.produits.push(produit);
        console.log(`Produit ajouté. Coût du produit: ${coutProduit}F. Montant total: ${this.sommeTotale()}F`);
    }
    sommeTotale() {
        return this.produits.reduce((total, produit) => total + this.calculerFrais(produit), 0);
    }
    nbProduit() {
        return this.produits.length;
    }
    getAllProduits() {
        return this.produits;
    }
}
//
export class Aerienne extends Cargaison {
    constructor(distance, libelle, depart, arrive, limite, limiteValue) {
        super(distance, libelle, depart, arrive, limite, limiteValue);
        this.tarif = 0;
        this.type = "Aerienne";
    }
    calculerFrais(produit) {
        if (produit instanceof Alimentaire) {
            this.tarif = config.paa;
        }
        else if (produit instanceof Materiel) {
            this.tarif = config.pam;
        }
        return produit.getPoids() * this.distance * this.tarif;
    }
    ajouterProduit(produit) {
        if (produit instanceof Chimique) {
            console.log("Les produits chimiques ne peuvent pas être transportés par voie aérienne.");
            return;
        }
        super.ajouterProduit(produit);
    }
    get getType() {
        return this.type;
    }
}
export class Maritime extends Cargaison {
    constructor(distance, libelle, depart, arrive, limite, limiteValue) {
        super(distance, libelle, depart, arrive, limite, limiteValue);
        this.limite = limite;
        this.limiteValue = limiteValue;
        this.tarif = 0;
        this.type = "Maritime";
    }
    calculerFrais(produit) {
        if (produit instanceof Alimentaire) {
            this.tarif = config.pma;
        }
        else if (produit instanceof Materiel) {
            this.tarif = config.pmm;
        }
        else if (produit instanceof Chimique) {
            this.tarif = config.pmc * produit.getToxicite();
        }
        return produit.getPoids() * this.distance * this.tarif;
    }
    ajouterProduit(produit) {
        if (produit instanceof Fragile) {
            console.log("Les produits fragiles ne peuvent pas être transportés par voie maritime.");
            return;
        }
        super.ajouterProduit(produit);
    }
    get getType() {
        return this.type;
    }
}
//
export class Routiere extends Cargaison {
    constructor(distance, libelle, depart, arrive, limite, limiteValue) {
        super(distance, libelle, depart, arrive, limite, limiteValue);
        this.limite = limite;
        this.limiteValue = limiteValue;
        this.tarif = 0;
        this.type = "Routiere";
    }
    calculerFrais(produit) {
        if (produit instanceof Alimentaire) {
            this.tarif = config.pra;
        }
        else if (produit instanceof Materiel) {
            this.tarif = config.prm;
        }
        return produit.getPoids() * this.distance * this.tarif;
    }
    ajouterProduit(produit) {
        if (produit instanceof Chimique) {
            console.log("Les produits chimiques ne peuvent pas être transportés par voie terrestre.");
            return;
        }
        super.ajouterProduit(produit);
    }
    get getType() {
        return this.type;
    }
}
//
export class Produit {
    set ids(id) { this.id = id; }
    get idg() { return this.id; }
    get getCode() { return this.code; }
    set setCode(code) { this.code = code; }
    constructor(libelle, poids, sender, receiver) {
        this.libelle = libelle;
        this.poids = poids;
        this.sender = sender;
        this.receiver = receiver;
        this.code = "";
        this.id = 0;
    }
    getLibelle() {
        return this.libelle;
    }
    getPoids() {
        return this.poids;
    }
    setLibelle(libelle) {
        this.libelle = libelle;
    }
    setPoids(poids) {
        this.poids = poids;
    }
    set setSender(sender) {
        this.sender = sender;
    }
    get getSender() {
        return this.sender;
    }
    set setReceiver(receiver) {
        this.receiver = receiver;
    }
    getReceiver() {
        return this.receiver;
    }
}
//
export class Alimentaire extends Produit {
    info() {
        let inf = `Alimentaire: ${this.libelle}, Poids: ${this.poids}`;
        return inf;
    }
}
//
export class Chimique extends Produit {
    constructor(libelle, poids, toxicite, sender, receiver) {
        super(libelle, poids, sender, receiver);
        this.toxicite = toxicite;
    }
    getToxicite() {
        return this.toxicite;
    }
    setToxicite(toxicite) {
        this.toxicite = toxicite;
    }
    info() {
        let inf = `Chimique: ${this.libelle}, Poids: ${this.poids}, Toxicité: ${this.toxicite}`;
        console.log(`Chimique: ${this.libelle}, Poids: ${this.poids}, Toxicité: ${this.toxicite}`);
        return inf;
    }
}
//
export class Materiel extends Produit {
    constructor(libelle, poids, sender, receiver) {
        super(libelle, poids, sender, receiver);
    }
}
//
export class Fragile extends Materiel {
    info() {
        let inf = `Fragile: ${this.libelle}, Poids: ${this.poids}`;
        return inf;
        console.log(`Fragile: ${this.libelle}, Poids: ${this.poids}`);
    }
}
//
export class Incassable extends Materiel {
    info() {
        let inf = `Incassable: ${this.libelle}, Poids: ${this.poids}`;
        return inf;
        console.log(`Incassable: ${this.libelle}, Poids: ${this.poids}`);
    }
}
export class client {
    constructor(nom, prenom, adresse, mail, telephone) {
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.mail = mail;
        this.telephone = telephone;
    }
    get getObjet() {
        return {
            nom: this.nom,
            prenom: this.prenom,
            adresse: this.adresse,
            mail: this.mail,
            telephone: this.telephone,
        };
    }
}
