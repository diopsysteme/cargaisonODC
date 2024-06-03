const config = {
  pra: 100,
  prm: 200,
  pam: 1000,
  paa: 300,
  pma: 90,
  pmc: 500,
  pmm: 400
};

export abstract class Cargaison {
  protected produits: Produit[] = [];

  protected id :number = 0;
  protected etatAvencement: string = "attente";
  protected etatCargaison: string = "ouverte";
  protected type : string = ""
  constructor
    (
      protected distance: number,
      protected libelle: string,
      protected depart: [lieu: string, jour: string],
      protected arrive: [lieu: string, jour: string],
      protected limite: string,
      protected limiteValue: number,
    ) { }
  get libell(): string { return this.libelle; }
  get depar(): any { return this.depart; }
  get arriv(): any { return this.arrive; }
  get limi(): string { return this.limite; }
  get limiValue(): number { return this.limiteValue; }
  get etatAv(): string { return this.etatAvencement; }
  get etatCarg(): string { return this.etatCargaison; }
  get getObjet(): any {
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
  set ids(id: number) { this.id = id; }
  get idg(): number { return this.id; }
  getdistance(): number { return this.distance; }
  protected abstract tarif: number;

  setTarif(value: number) {
    this.tarif = value;
  }
  abstract get getType(): string;
  ajouterProduit(produit: Produit): void {
    if (this.limite == "poids") {
      const poidsTotal = this.produits.reduce((total, produit) => total + produit.getPoids(), 0);
      const poidsNouveauProduit = produit.getPoids();
      console.log(poidsTotal);
      if (poidsTotal + poidsNouveauProduit > this.limiteValue) {
        alert("Impossible d'ajouter le produit. La cargaison atteindra sa limite de poids.");
        return;
      }
    } else if (this.produits.length >= this.limiteValue) {
      alert("La cargaison est pleine. Impossible d'ajouter plus de produits.");
      return;
    }
    

    const coutProduit = this.calculerFrais(produit);
    this.produits.push(produit);
    console.log(`Produit ajouté. Coût du produit: ${coutProduit}F. Montant total: ${this.sommeTotale()}F`);
  }

  abstract calculerFrais(produit: Produit): number;

  sommeTotale(): number {
    return this.produits.reduce((total, produit) => total + this.calculerFrais(produit), 0);
  }

  nbProduit(): number {
    return this.produits.length;
  }

  getAllProduits(): Produit[] {
    return this.produits;
  }
}


//
export class Aerienne extends Cargaison {
  protected tarif: number = 0;

  constructor(distance: number, libelle: string, depart: [lieu: string, jour: string], arrive: [lieu: string, jour: string], limite: string, limiteValue: number) {
    super(distance, libelle, depart, arrive, limite, limiteValue);
  }

  calculerFrais(produit: Produit): number {
    if (produit instanceof Alimentaire) {
      this.tarif = config.paa;
    } else if (produit instanceof Materiel) {
      this.tarif = config.pam;
    }
    return produit.getPoids() * this.distance * this.tarif;
  }

  ajouterProduit(produit: Produit): void {
    if (produit instanceof Chimique) {
      console.log("Les produits chimiques ne peuvent pas être transportés par voie aérienne.");
      return;
    }
    super.ajouterProduit(produit);
  }
  protected type = "Aerienne"
  get getType(): string {
    return this.type
  }
}

export class Maritime extends Cargaison {
  protected tarif: number = 0;

  constructor(distance: number, libelle: string, depart: [lieu: string, jour: string], arrive: [lieu: string, jour: string], protected limite: string, protected limiteValue: number) {
    super(distance, libelle, depart, arrive, limite, limiteValue);
  }
  calculerFrais(produit: Produit): number {
    if (produit instanceof Alimentaire) {
      this.tarif = config.pma;
    } else if (produit instanceof Materiel) {
      this.tarif = config.pmm;
    } else if (produit instanceof Chimique) {
      this.tarif = config.pmc * produit.getToxicite();
    }
    return produit.getPoids() * this.distance * this.tarif;
  }

  ajouterProduit(produit: Produit): void {
    if (produit instanceof Fragile) {
      console.log("Les produits fragiles ne peuvent pas être transportés par voie maritime.");
      return;
    }
    super.ajouterProduit(produit);
  }
 
  protected type = "Maritime"
  get getType(): string {
    return this.type
  }
}
//

export class Routiere extends Cargaison {
  protected tarif: number = 0;

  constructor(distance: number, libelle: string, depart: [lieu: string, jour: string], arrive: [lieu: string, jour: string], protected limite: string, protected limiteValue: number) {
    super(distance, libelle, depart, arrive, limite, limiteValue);
  }

  calculerFrais(produit: Produit): number {
    if (produit instanceof Alimentaire) {
      this.tarif = config.pra;
    } else if (produit instanceof Materiel) {
      this.tarif = config.prm;
    }
    return produit.getPoids() * this.distance * this.tarif;
  }

  ajouterProduit(produit: Produit): void {
    if (produit instanceof Chimique) {
      console.log("Les produits chimiques ne peuvent pas être transportés par voie terrestre.");
      return;
    }
    super.ajouterProduit(produit);
  }
  protected type = "Routiere"
  get getType(): string {
    return this.type
  }

 
}
//


export abstract class Produit {
 
  protected code: string=""
  protected id = 0;
  set ids(id: number) { this.id = id; }
  get idg(): number { return this.id; }
  get getCode(): string { return this.code; }
  set setCode(code: string) { this.code = code; }
  constructor(protected libelle: string, protected poids: number,protected sender :client,protected receiver:client) { }

  abstract info(): string;

  getLibelle(): string {
    return this.libelle;
  }

  getPoids(): number {
    return this.poids;
  }


  setLibelle(libelle: string): void {
    this.libelle = libelle;
  }

  setPoids(poids: number): void {
    this.poids = poids;
  }
  set setSender(sender: client) {
    this.sender = sender;
  }
  get getSender(): client {
    return this.sender;
  }
  set setReceiver(receiver: client) {
    this.receiver = receiver;
  }
  getReceiver(): client {
    return this.receiver;
  }
}
//


export class Alimentaire extends Produit {
  info(): string {

    let inf = `Alimentaire: ${this.libelle}, Poids: ${this.poids}`;
    return inf;
  }
}
//

export class Chimique extends Produit {
  private toxicite: number;

  constructor(libelle: string, poids: number, toxicite: number,sender: client,receiver: client) {
    super(libelle, poids,sender,receiver);
    this.toxicite = toxicite;
  }

  getToxicite(): number {
    return this.toxicite;
  }

  setToxicite(toxicite: number): void {
    this.toxicite = toxicite;
  }
  info(): string {
    let inf = `Chimique: ${this.libelle}, Poids: ${this.poids}, Toxicité: ${this.toxicite}`
    console.log(`Chimique: ${this.libelle}, Poids: ${this.poids}, Toxicité: ${this.toxicite}`);
    return inf;
  }
}
//

export abstract class Materiel extends Produit {
  constructor(libelle: string, poids: number, sender: client, receiver: client) {
    super(libelle, poids, sender, receiver);
  }

  abstract info(): string;
}
//

export class Fragile extends Materiel {
  info(): string {
    let inf = `Fragile: ${this.libelle}, Poids: ${this.poids}`;

    return inf;
    console.log(`Fragile: ${this.libelle}, Poids: ${this.poids}`);
  }
}

//

export class Incassable extends Materiel {
  info(): string {
    let inf = `Incassable: ${this.libelle}, Poids: ${this.poids}`;
    return inf;
    console.log(`Incassable: ${this.libelle}, Poids: ${this.poids}`);
  }
}

export class client {
 
  constructor( 
    private nom: string,
    private prenom: string,
    private adresse: string,
    private mail: string,
    private telephone: number) {
    
  }
  get getObjet(): object {
    return {
      nom: this.nom,
      prenom: this.prenom,
      adresse: this.adresse,
      mail: this.mail,
      telephone: this.telephone,
    }
  }

}
