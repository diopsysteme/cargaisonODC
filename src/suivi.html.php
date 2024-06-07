<?php
include('../config.php');
include('../config.php');
$jsonData = file_get_contents(DATA);
$jsonContent = file_get_contents(DATA);

// Décoder le JSON en tableau PHP
$dataPH = json_decode($jsonContent, true);
// print_r($dataPH)["cargo"];
?>

<script>
  var bd = <?php print_r($jsonData);?>
</script>
<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recherche de Produits par Code</title>
  <link href="dist/styles.css" rel="stylesheet">
  <script src="dist/index.js" defer></script>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <script src="https://kit.fontawesome.com/d2ba3c872c.js" crossorigin="anonymous"></script>
</head>

<body class="bg-gray-100">
  <div class="container mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-4xl font-bold text-gray-800">Recherche de Produits par Code</h1>
    </div>

    <div class="bg-white p-7 rounded-lg shadow-md">
      <div class="mb-2">
        <form id="searchForm" class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <input type="text" placeholder="Code du produit" class="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" name="code" required>
          </div>
          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Rechercher</button>
        </form>
      </div>

      <div id="resultContainer" class="mt-6 space-y-4">
        <!-- Les résultats de la recherche seront affichés ici -->
      </div>
    </div>
  </div>
</body>
<script type="module" src="../dist/test.js"></script>
</html>
