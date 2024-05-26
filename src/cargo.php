<?php
include('../config.php');
$jsonData = file_get_contents(DATAS);
// print_r($jsonData);
?>
 <script type="module" src="../dist/test.js"></script>
<script>
 var bd = <?php print_r($jsonData);?>

  function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
  }

  function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
  }
</script>
<?php

?>

<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gestion de Cargaisons</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.0.1/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css">
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
  </style>
</head>

<body class="bg-gray-100">

  <div class="container mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-4xl font-bold text-gray-800">Gestion de Cargaisons</h1>
      <button onclick="openModal('addCargaisonModal')" class="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Ajouter Cargaison</button>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="mb-2 flex space-x-4">
        <input type="text" placeholder="Lieu de départ" class="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        <input type="text" placeholder="Lieu d'arrivée" class="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        <input type="date" placeholder="Date de départ" class="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        <input type="date" placeholder="Date d'arrivée" class="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        <select class="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option>Type</option>
          <option value="Maritime">Maritime</option>
          <option value="Aérienne">Aérienne</option>
          <option value="Routière">Routière</option>
        </select>
        <button class="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Filtrer</button>
      </div>

      <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-3 text-left text-gray-600 font-semibold">Numéro</th>
            <th class="p-3 text-left text-gray-600 font-semibold">Lieu de départ</th>
            <th class="p-3 text-left text-gray-600 font-semibold">Lieu d'arrivée</th>
            <th class="p-3 text-left text-gray-600 font-semibold">Type</th>
            <th class="p-3 text-left text-gray-600 font-semibold">État</th>
            <th class="p-3 text-left text-gray-600 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="p-3 text-gray-700">CARG1234</td>
            <td class="p-3 text-gray-700">Paris</td>
            <td class="p-3 text-gray-700">New York</td>
            <td class="p-3 text-gray-700">Aérienne</td>
            <td class="p-3 text-gray-700">En attente</td>
            <td class="p-3 text-gray-700 flex space-x-2">
              <a href="details_cargaison.php?id=1" class="text-blue-500 hover:underline">Détails</a>
              <button onclick="openModal('addProductModal')" class="text-green-500 hover:underline">Ajouter Produit</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination flex justify-center items-center space-x-2 mt-4">
  <a href="#" class="page-link prev bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"><i class="fas fa-angle-left"></i></a>
  <!-- Page numbers will be dynamically inserted here -->
  <a href="#" class="page-link next bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"><i class="fas fa-angle-right"></i></a>
</div>

    </div>
  </div>



  <div id="addProductModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center hidden">
    <div class="bg-white rounded-lg shadow-lg p-6 w-1/2">
      <h2 class="text-2xl font-bold mb-2">Ajouter Produit</h2>
      <form action="create_produit.php" method="POST">
        <div class="mb-2">
          <label for="libelle" class="block text-gray-700">Code</label>
          <input type="text" id="libelle" name="libelle" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        </div>
        <div class="mb-4">
          <label for="poids" class="block text-gray-700">Poids</label>
          <input type="number" id="poids" name="poids" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        </div>
        <div class="mb-4">
          <label for="type_produit" class="block text-gray-700">Type de produit</label>
          <input type="text" id="type_produit" name="type_produit" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        </div>
        <div class="mb-4">
          <label for="etat" class="block text-gray-700">État</label>
          <select id="etat" name="etat" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="En attente">En attente</option>
            <option value="En cours">En cours</option>
            <option value="Arrivé">Arrivé</option>
            <option value="Récupéré">Récupéré</option>
            <option value="Perdu">Perdu</option>
            <option value="Archivé">Archivé</option>
          </select>
        </div>
        <div class="flex justify-end space-x-4">
          <button type="button" onclick="closeModal('addProductModal')" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Annuler</button>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Ajouter</button>
        </div>
      </form>
    </div>
  </div>

  <script>
    function openModal(modalId) {
      document.getElementById(modalId).classList.remove('hidden');
    }

    function closeModal(modalId) {
      document.getElementById(modalId).classList.add('hidden');
    }
  </script>
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
          <input  type="text" id="limiteVal" name="limiteVal" placeholder="Donner le poids max" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <div id="error-limiteVal" class="error"></div>
        </div>
        <div class="mb-2">
          <label for="lieu_depart" class="block text-gray-700">Lieu de départ</label>
          <input type="text" id="lieu_depart" name="lieu_depart" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <button type="button" onclick="openMapModal('depart')" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Sélectionner sur la carte</button>
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
          <button type="button" onclick="openMapModal('arrivee')" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Sélectionner sur la carte</button>
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
            <option value="Aerienne">Aérienne</option>
            <option value="Routiere">Routière</option>
          </select>
          <div id="error-type" class="error"></div>
        </div>
        <div class="flex justify-end space-x-4">
          <button type="button" onclick="closeModal('addCargaisonModal')" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Annuler</button>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Ajouter</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal for selecting coordinates on the map -->
  <div id="mapModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center hidden">
    <div class="bg-white rounded-lg shadow-lg p-6 w-1/2">
      <h2 class="text-2xl font-bold mb-2">Sélectionner sur la carte</h2>
      <div id="map" class="w-full h-64"></div>
      <input type="hidden" id="selectedType" value="">
      <div class="flex justify-end space-x-4 mt-4">
        <button type="button" onclick="closeMapModal()" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Fermer</button>
      </div>
    </div>
  </div>
 
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script>
    var map = L.map('map').setView([14.736370473758933, -17.45315551757813], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var marker;

    map.on('click', function(e) {
      if (marker) {
        map.removeLayer(marker);

      }
      marker = L.marker(e.latlng).addTo(map);

      let selectedType = document.getElementById('selectedType').value;
      let ele = document.getElementById('coord_' + selectedType)
      let lieu = document.getElementById('lieu_' + selectedType)
      console.log(lieu)
      fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.latlng.lat}&lon=${e.latlng.lng}`)
        .then(response => response.json())
        .then(data => {
          // Extract city name from response (assuming "address" object exists)
          let cityName = data.address?.city || data.address?.town || 'Unknown City'; // Handle cases where city/town is missing

          ele.value = `Lattitude: ${e.latlng.lat}, Longitude: ${e.latlng.lng}`;
          lieu.value = cityName
          ele.setAttribute("lat", e.latlng.lat);
          ele.setAttribute("lng", e.latlng.lng);
          putDistance()
        })
        .catch(error => {
          console.error("Error fetching city name:", error);
          ele.value = `Lattitude: ${e.latlng.lat}, Longitude: ${e.latlng.lng} - City: Unavailable`;
        });


      closeMapModal();

    });

    function openMapModal(type) {
      document.getElementById('mapModal').classList.remove('hidden');
      document.getElementById('selectedType').value = type;
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
      return distance.toFixed(2)
    }

    function genInp() {
      sele = event.target
      let input = sele.parentNode.querySelector("input")
      input.id = "sele.value"
      input.name = "sele.value"
      if (sele.value == "poids") {
        console.log()

        input.placeholder = "Donner le poids max"
      } else if (sele.value == "nbprod") {
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