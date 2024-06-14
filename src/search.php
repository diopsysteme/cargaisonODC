<?php
include('../config.php');
$jsonData = file_get_contents(DATA);
$dataPH = json_decode($jsonData, true);
$cargos = $dataPH["cargo"];
$productCode = isset($_GET['code']) ? $_GET['code'] : '';

$result = ['product' => null, 'cargo' => null];

foreach ($cargos as $cargo) {
  foreach ($cargo['produits'] as $produitArray) {
    foreach ($produitArray as $produit) {
      if ($produit['code'] === $productCode) {
        $result['product'] = $produit;
        $result['cargo'] = $cargo;
        break 3;
      }
    }
  }
}

header('Content-Type: application/json');
echo json_encode($result);
?>
