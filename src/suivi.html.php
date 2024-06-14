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
  <div id="notificationContainer"></div>
</body>
<script type="module" src="../dist/test.js"></script>
</html>

<style>
  /* styles.css */
  #notificationContainer {
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 300px;
    z-index: 1000;
}

.notification, .error-message {
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
}

.notification.show, .error-message.show {
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

.notification .close, .error-message .close {
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

.notification.fade-out, .error-message.fade-out {
    animation: fadeOutUp 1s forwards;
}
 
</style>