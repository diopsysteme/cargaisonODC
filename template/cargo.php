<?php
include('../config.php');
$jsonData = file_get_contents(DATA);
$jsonContent = file_get_contents(DATA);

// Décoder le JSON en tableau PHP
$dataPH = json_decode($jsonContent, true);
// print_r($dataPH)["cargo"];
?>
<script type="module" src="../dist/test.js"></script>
<script>
  var bd = <?php print_r($jsonData);
            ?>
</script>
<?php ?>

<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gestion de Cargaisons</title>                                                                                                                                                                                                                                                                                                                                                   <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"> <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.0.1/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../src/output.css">
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css">
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css">
  <script src="https://kit.fontawesome.com/d2ba3c872c.js" crossorigin="anonymous"></script>
</head>

<body class="bg-gray-100">

  <div class="container mx-auto p-6 cargoList">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-4xl font-bold text-gray-800">Gestion de Cargaisons</h1>
      <button onclick="openModal('addCargaisonModal')" class="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Ajouter Cargaison</button>
    </div>

    <div class="bg-white p-7 rounded-lg shadow-md">
      <div class="mb-2 flex space-x-4">
        <form id="filterForm" method="get" action="?page=cargo">
          <input  type="text" placeholder="Lieu de départ" class="filteInp flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" name="l_depart">
          <input type="text" placeholder="Lieu d'arrivée" class="filteInp flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" name="l_arrivee">
          <input type="date" placeholder="Date de départ" class="filteInp flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" name="d_depart">
          <input type="date" placeholder="Date d'arrivée" class="filteInp flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" name="d_arrivee">
          <select name="type" class="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Type</option>
            <option value="Maritime">Maritime</option>
            <option value="Aerienne">Aérienne</option>
            <option value="Routiere">Routière</option>
          </select>
          <button class="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Filtrer</button>
        </form>
      </div>

      <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-3 text-left text-gray-600 font-semibold">Libelle</th>
            <th class="p-3 text-left text-gray-600 font-semibold">Lieu de départ</th>
            <th class="p-3 text-left text-gray-600 font-semibold">Lieu d'arrivée</th>
            <th class="p-3 text-left text-gray-600 font-semibold">Type</th>
            <th class="p-3 text-left text-gray-600 font-semibold">État</th>
            <th class="p-3 text-left text-gray-600 font-semibold">Actions</th>
            <th class="p-3 text-left text-gray-600 font-semibold">État d'avancement</th>
          </tr>
        </thead>
        <tbody>
          <?php
          foreach ($dataPH["cargo"] as $key => $value) {
          ?>
            <tr class="border-b ">
              <td class="p-3 text-gray-700"><?= $value["libelle"] ?></td>
              <td class="p-3 text-gray-700"><?= $value["depart"][0] ?></td>
              <td class="p-3 text-gray-700"><?= $value["arrive"][0] ?></td>
              <td class="p-3 text-gray-700"><?= $value["type"] ?></td>

              <td class="p-3 text-gray-700 ">
                <input id="<?= $key ?>" type="checkbox" class="form-checkbox etat <?php if ($value["etatAvencement"] != "attente") echo 'hidden' ?>" <?= $value["etatCargaison"] == "ouverte" ? "checked" : "" ?>>
                <span class="ml-2"><?= $value["etatCargaison"] == "ouverte" ? "Ouvert" : "Fermé" ?></span>
              </td>
              <td class="p-3 text-gray-700 flex space-x-2">
                <button onclick="openModal('addProductModal')" class="<?= $value["etatCargaison"] == "fermee" ? "desactive" : "" ?> text-green-500 addp hover:underline" id="<?= $value["id"] ?>">Ajouter Produit</button>
                <a href="#" id="<?= $key ?>" class="text-blue-500 hover:underline details-btn  ">Détails</a>
              </td>
              <td class="p-3 text-gray-700">
                <select id=" <?= $key ?>" class="avance p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <?php if ($value["etatAvencement"] == "attente") { ?> <option value="attente" <?= $value["etatAvencement"] == "en attente" ? "selected" : "" ?>>En attente</option> <?php }
                                                                                                                                                                                    if ($value["etatCargaison"] == "fermee") {  ?>
                    <?php if ($value["etatAvencement"] == "en cours" || $value["etatAvencement"] == "perdu") {  ?> <option value="perdu" <?= $value["etatAvencement"] == "perdu" ? "selected" : "" ?>>Perdu</option> <?php } ?>
                    <?php if ($value["etatAvencement"] == "attente" || $value["etatAvencement"] == "en cours" || $value["etatAvencement"] == "perdu") { ?> <option value="en cours" <?= $value["etatAvencement"] == "en cours" ? "selected" : "" ?>>En cours</option><?php }  ?>
                    <?php if ($value["etatAvencement"] == "arrive" || $value["etatAvencement"] == "en cours" || $value["etatAvencement"] == "arrive") { ?> <option value="arrive" <?= $value["etatAvencement"] == "arrive" ? "selected" : "" ?>>Arrivé</option><?php } ?>
                  <?php } ?>
                </select>
                <span> <?= $value["etatAvencement"] ?></span>
              </td>
            </tr>
          <?php
            if ($key == 3) {
              break;
            }
          } ?>
        </tbody>
      </table>
      <div class="pagination flex justify-center items-center space-x-2 mt-4">
        <a href="#" class="  page-link prev bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
          <i class="fas fa-angle-left"></i>
        </a>
        <a href="#" class="page-link next bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
          <i class="fas fa-angle-right"></i>
        </a>
      </div>

    </div>
  </div>



  <div id="addProductModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center hidden">
    <div class="bg-white rounded-lg shadow-lg p-6 w-1/2">
      <h2 class="text-2xl font-bold mb-4">Ajouter Produit</h2>
      <form id="productForm">
        <!-- Step 1: Product Information -->
        <div id="step1" class="step">
          <h3 class="text-xl font-bold mb-2">Informations sur le produit</h3>
          <div class="mb-4">
            <label for="libelle" class="block text-gray-700">Nom du produit</label>
            <input type="text" id="libelle" name="libelle" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div class="mb-4">
            <label for="poids" class="block text-gray-700">Poids</label>
            <input type="number" id="poids" name="poids" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div class="mb-4">
            <label for="nombre" class="block text-gray-700">Nombre de produits</label>
            <input type="number" id="nombre" name="nombre" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div class="mb-4">
            <label for="type_produit" class="block text-gray-700">Type de produit</label>
            <select id="type_produit" name="type_produit" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="Alimentaire">Alimentaire</option>
              <option value="Chimique">Chimique</option>
              <option value="Fragile">Fragile</option>
              <option value="Incassable">Incassable</option>
            </select>
          </div>
          <div class="flex justify-end space-x-4">
            <button type="button" onclick="nextStep('step1', 'step2')" class="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Suivant</button>
          </div>
        </div>

        <!-- Step 2: Sender Information -->
        <div id="step2" class="step hidden">
          <h3 class="text-xl font-bold mb-2">Informations sur l'expéditeur</h3>
          <div class="mb-4">
            <label for="sender_nom" class="block text-gray-700">Nom</label>
            <input type="text" id="sender_nom" name="sender_nom" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div class="mb-4">
            <label for="sender_prenom" class="block text-gray-700">Prénom</label>
            <input type="text" id="sender_prenom" name="sender_prenom" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div class="mb-4">
            <label for="sender_adresse" class="block text-gray-700">Adresse</label>
            <input type="text" id="sender_adresse" name="sender_adresse" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div class="mb-4">
            <label for="sender_mail" class="block text-gray-700">Email</label>
            <input type="email" id="sender_mail" name="sender_mail" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div class="mb-4">
            <label for="sender_telephone" class="block text-gray-700">Téléphone</label>
            <input type="tel" id="sender_telephone" name="sender_telephone" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div class="flex justify-between space-x-4">
            <button type="button" onclick="previousStep('step2', 'step1')" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Précédent</button>
            <button type="button" onclick="nextStep('step2', 'step3')" class="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Suivant</button>
          </div>
        </div>

        <!-- Step 3: Receiver Information -->
        <div id="step3" class="step hidden">
          <h3 class="text-xl font-bold mb-2">Informations sur le destinataire</h3>
          <div class="mb-4">
            <label for="receiver_nom" class="block text-gray-700">Nom</label>
            <input type="text" id="receiver_nom" name="receiver_nom" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div class="mb-4">
            <label for="receiver_prenom" class="block text-gray-700">Prénom</label>
            <input type="text" id="receiver_prenom" name="receiver_prenom" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div class="mb-4">
            <label for="receiver_adresse" class="block text-gray-700">Adresse</label>
            <input type="text" id="receiver_adresse" name="receiver_adresse" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div class="mb-4">
            <label for="receiver_mail" class="block text-gray-700">Email</label>
            <input type="email" id="receiver_mail" name="receiver_mail" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div class="mb-4">
            <label for="receiver_telephone" class="block text-gray-700">Téléphone</label>
            <input type="tel" id="receiver_telephone" name="receiver_telephone" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div class="flex justify-between space-x-4">
            <button type="button" onclick="previousStep('step3', 'step2')" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Précédent</button>
            <button type="submit" id="ajoutProduit" class="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Ajouter</button>
          </div>
        </div>
      </form>
      <div class="flex justify-end space-x-4">
        <button type="button" onclick="closeModal('addProductModal')" class="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Cancel</button>
      </div>
    </div>
  </div>


  
  <!-- Modal Ajouter Cargaison -->
  <div id="addCargaisonModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center hidden">
    <div class="bg-white rounded-lg shadow-lg p-6 w-1/2">
      <h2 class="text-2xl font-bold mb-2">Ajouter Cargaison</h2>
      <form id="addCargForm">
        <div class=".mb-2">
          <label for="libelle" class="block text-gray-700">Libelle</label>
          <input type="text" id="libelle" name="libelle" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <div id="error-libelle" class="error"></div>
        </div>
        <div class="mb-2">
          <label for="poids_max" class="block text-gray-700">Fixer Limite Par (Poids/nb produit)</label>
          <select name="limite" id="limite" onchange="genInp()" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="poids">Poids</option>
            <option value="nbprod">Nombre Produit</option>
          </select>
          <input type="text" id="limiteVal" name="limiteVal" placeholder="Donner le poids max" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <div id="error-limiteVal" class="error"></div>
        </div>
        <div class="mb-2">
          <label for="lieu_depart" class="block text-gray-700">Lieu de départ</label>
          <input type="text" id="lieu_depart" name="lieu_depart" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <div id="error-lieu_depart" class="error"></div>
        </div>
        <div class="mb-2 hidden">
          <label for="coord_depart" class="block text-gray-700">Coordonnées de départ</label>
          <input type="text" id="coord_depart" name="coord_depart" placeholder="cord" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2">
          <div id="error-coord_depart" class="error"></div>
        </div>
        <div class="mb-2">
          <label for="lieu_arrivee" class="block text-gray-700">Lieu d'arrivée</label>
          <input type="text" id="lieu_arrivee" name="lieu_arrivee" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <div id="error-lieu_arrivee" class="error"></div>
        </div>
        <div class="mb-2 hidden">
          <label for="coord_arrivee" class="block text-gray-700">Coordonnées d'arrivée</label>
          <input type="text" id="coord_arrivee" name="coord_arrivee" placeholder="cord" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2">
          <div id="error-coord_arrivee" class="error"></div>
        </div>
        <div class="mb-2">
          <label for="distance" class="block text-gray-700">Distance (km)</label>
          <input type="text" id="distance" name="distance" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <div id="error-distance" class="error"></div>
        </div>
        <div class="mb-2">
          <label for="dateDep" class="block text-gray-700">Date de depart</label>
          <input type="date" id="dateDep" name="dateDep" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <div id="error-dateDep" class="error"></div>
        </div>
        <div class="mb-2">
          <label for="dateAr" class="block text-gray-700">Date d'arrivée</label>
          <input type="date" id="dateAr" name="dateAr" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <div id="error-dateAr" class="error"></div>
        </div>
        <div class="mb-2">
          <label for="type" class="block text-gray-700">Type</label>
          <select id="type" name="type" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="Maritime">Maritime</option>
            <option value="Aerienne">Aerienne</option>
            <option value="Routiere">Routiere</option>
          </select>
          <div id="error-type" class="error"></div>
        </div>
        <div class="flex justify-end space-x-4">
          <button type="button" onclick="closeModal('addCargaisonModal')" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Annuler</button>
          <button type="button" onclick="openMapModal()" class="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Sélectionner sur la carte</button>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Ajouter</button>
        </div>
      </form>
    </div>
  </div>
  <div id="notificationContainer"></div>
  <!-- Map Modal -->
  <div id="mapModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center hidden">
    <div class="bg-white rounded-lg shadow-lg p-6 w-2/3">
      <h2 class="text-2xl font-bold mb-4">Sélectionner les localisations</h2>
      <div id="map" style="height: 400px;"></div>
      <div class="flex justify-end space-x-4 mt-4">
        <button type="button" onclick="closeMapModal()" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Fermer</button>
      </div>
    </div>
  </div>
  <div id="editDatesModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center hidden">
    <div class="bg-white rounded-lg shadow-lg p-6 w-1/2">
      <h2 class="text-2xl font-bold mb-2">Modifier les Dates</h2>
      <form id="editDatesForm">
      <div class="mb-2">
          <label for="dateDep2" class="block text-gray-700">Date de depart</label>
          <input type="date" id="dateDep2" name="dateDep2" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <div id="error-dateDep2" class="error"></div>
        </div>
        <div class="mb-2">
          <label for="dateAr2" class="block text-gray-700">Date d'arrivée</label>
          <input type="date" id="dateAr2" name="dateAr2" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <div id="error-dateAr2" class="error"></div>
        </div>
        <div class="flex justify-end space-x-4">
          <button type="button" id="closeModEdit" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Annuler</button>
          <button type="submit" class="btnSu bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Modifier</button>
        </div>
      </form>
    </div>
  </div>
  <div id="cargoDetails" class="hidden bg-white p-6 rounded-lg shadow-md">
    <button id="backToList" class="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-4">Retour à la liste</button>
    <div id="detailsContent" class="space-y-4">
      <!-- Contenu des détails de la cargaison sera injecté ici -->
    </div>
  </div>
  <style>
  /* Custom scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .error {
    width: auto;
    height: 10px;
    margin-bottom: 10px;
    color: red;
    font-size: 1rem;

  }
</style>
<style>
  #map {
    height: 300px;
  }

  .desactive {
    opacity: .5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* styles.css */
  #notificationContainer {
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 300px;
    z-index: 1000;
  }

  .notification {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    padding: 15px;
    border-radius: 8px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index:9999;
    z-index:99999;
  }

  .notification.show {
    opacity: 1;
    transform: translateY(0);
  }

  .notification.classic {
    background-color: #f8f9fa;
    color: #212529;
    z-index:99999;
    border-left: 4px solid #007bff;
  }

  .notification.modern {
    background-color: #333;
    color: #fff;
    border-left: 4px solid #17a2b8;
    z-index:99999;
  }

  .notification .close {
    cursor: pointer;
    font-size: 20px;
    margin-left: 20px;
  }

  @keyframes fadeOutUp {
    0% {
      opacity: 1;
      transform: translateY(0);
    }

    100% {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  .notification.fade-out {
    animation: fadeOutUp 1s forwards;
  }

  #notificationContainer {
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 300px;
    z-index: 1000;
    z-index:99999;
  }

  .notification,
  .error-message {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    padding: 15px;
    border-radius: 8px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index:99999;
  }

  .notification.show,
  .error-message.show {
    opacity: 1;
    transform: translateY(0);
  }

  .notification.classic {
    background-color: #f8f9fa;
    color: #212529;
    border-left: 4px solid #007bff;
  }

  .notification.modern {
    background-color: #333;
    color: #fff;
    border-left: 4px solid #17a2b8;
  }

  .error-message {
    background-color: #f8d7da;
    color: #721c24;
    border-left: 4px solid #f5c6cb;
  }

  .notification .close,
  .error-message .close {
    cursor: pointer;
    font-size: 20px;
    margin-left: 20px;
  }

  @keyframes fadeOutUp {
    0% {
      opacity: 1;
      transform: translateY(0);
    }

    100% {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  .notification.fade-out,
  .error-message.fade-out {
    animation: fadeOutUp 1s forwards;
  }
  #editDatesModal{
    z-index: 9999;
  }
</style>

 
  <script>









    function nextStep(currentStepId, nextStepId) {
      document.getElementById(currentStepId).classList.add('hidden');
      document.getElementById(nextStepId).classList.remove('hidden');
    }

    function previousStep(currentStepId, previousStepId) {
      document.getElementById(currentStepId).classList.add('hidden');
      document.getElementById(previousStepId).classList.remove('hidden');
    }
  </script>

  <script>
    function openModal(modalId) {
      document.getElementById(modalId).classList.remove('hidden');
    }

    function closeModal(modalId) {
      etElementById(modalId).classList.add('hidden');
    }
  </script>
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script>
    var map = L.map('map').setView([14.736370473758933, -17.45315551757813], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var markers = [];
    var currentSelection = 'depart';

    map.on('click', function(e) {
      if (markers.length >= 2) {
        map.removeLayer(markers[0]);
        markers.shift();
      }
      var marker = L.marker(e.latlng).addTo(map);
      markers.push(marker);

      fetch(`https://geocode.xyz/${e.latlng.lat},${e.latlng.lng}?json=1`)
        .then(response => response.json())
        .then(data => {
          let cityName = data.city || 'Unknown City';
          if (currentSelection === 'depart') {
            document.getElementById('coord_depart').value = `Latitude: ${e.latlng.lat}, Longitude: ${e.latlng.lng}`;
            document.getElementById('coord_depart').setAttribute("lat", e.latlng.lat);
            document.getElementById('coord_depart').setAttribute("lng", e.latlng.lng);
            document.getElementById('lieu_depart').value = cityName;
            currentSelection = 'arrivee';
          } else {
            document.getElementById('coord_arrivee').value = `Latitude: ${e.latlng.lat}, Longitude: ${e.latlng.lng}`;
            document.getElementById('coord_arrivee').setAttribute("lat", e.latlng.lat);
            document.getElementById('coord_arrivee').setAttribute("lng", e.latlng.lng);
            document.getElementById('lieu_arrivee').value = cityName;
            closeMapModal();
            putDistance();
          }
        })
        .catch(error => {
          console.error("Error fetching city name:", error);
        });
    });

    function openMapModal() {
      document.getElementById('mapModal').classList.remove('hidden');
      currentSelection = 'depart';
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    }

    function closeMapModal() {
      document.getElementById('mapModal').classList.add('hidden');
    }

    function putDistance() {
      let depInput = document.getElementById('coord_depart');
      let arrInput = document.getElementById('coord_arrivee');
      let distanceInput = document.getElementById('distance');

      let depLat = parseFloat(depInput.getAttribute('lat')) || 0;
      let depLng = parseFloat(depInput.getAttribute('lng')) || 0;
      let arrLat = parseFloat(arrInput.getAttribute('lat')) || 0;
      let arrLng = parseFloat(arrInput.getAttribute('lng')) || 0;

      if (depLat === 0 || depLng === 0 || arrLat === 0 || arrLng === 0) {
        distanceInput.value = '0.00';
        return;
      }

      const toRad = value => value * Math.PI / 180;
      const R = 6371; // Earth's radius in kilometers

      let dLat = toRad(arrLat - depLat);
      let dLng = toRad(arrLng - depLng);
      let lat1 = toRad(depLat);
      let lat2 = toRad(arrLat);

      let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let distance = R * c;

      distanceInput.value = distance.toFixed(2);
    }


    function genInp() {
      sele = event.target
      let input = sele.parentNode.querySelector("input")
      input.id = sele.value
      if (sele.value == "poids") {
        console.log()

        input.placeholder = "Donner le poids max"
        input.value = ""
      } else if (sele.value == "nbprod") {
        input.value = ""
        input.placeholder = "Donner le nombre de produit"
      }


    }
  </script>
</body>
<script type="module" src="../dist/test.js"></script>

</html>
<script>
  function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
  }

  function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
  }
</script>
