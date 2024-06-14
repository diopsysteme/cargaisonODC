<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Produits</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">

  <div class="container mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-4xl font-bold text-gray-800">Produits</h1>
      <button onclick="openModal('addProductModal')" class="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Ajouter Produit</button>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-3 text-left text-gray-600 font-semibold">Code</th>
            <th class="p-3 text-left text-gray-600 font-semibold">Poids</th>
            <th class="p-3 text-left text-gray-600 font-semibold">Type de produit</th>
            <th class="p-3 text-left text-gray-600 font-semibold">État</th>
            <th class="p-3 text-left text-gray-600 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Example data -->
          <tr class="border-b">
            <td class="p-3 text-gray-700">PROD5678</td>
            <td class="p-3 text-gray-700">200 kg</td>
            <td class="p-3 text-gray-700">Électronique</td>
            <td class="p-3 text-gray-700">En attente</td>
            <td class="p-3 text-gray-700 flex space-x-2">
              <a href="details_produit.php?id=1" class="text-blue-500 hover:underline">Détails</a>
            </td>
          </tr>
          <!-- More data rows as needed -->
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal Ajouter Produit -->
  <div id="addProductModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center hidden">
    <div class="bg-white rounded-lg shadow-lg p-6 w-1/2">
      <h2 class="text-2xl font-bold mb-4">Ajouter Produit</h2>
      <form action="create_produit.php" method="POST">
        <div class="mb-4">
          <label for="code" class="block text-gray-700">Code</label>
          <input type="text" id="code" name="code" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
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
</body>
</html>
