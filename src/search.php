
<?php
include('../config.php');
$jsonData = file_get_contents(DATA);
$dataPH = json_decode($jsonData, true);
$cargos = $dataPH["cargo"];
// var_dump($dataPH["cargo"]);
$productCode = isset($_GET['code']) ? $_GET['code'] : '';

$result = ['product' => null, 'cargo' => null];

foreach ($cargos as $cargo) {
  foreach ($cargo['produits'] as $produitArray) {
    // echo $cargo['produits'];
    foreach ($produitArray as $produit) {
        echo $produit['code'];
      if ($produit['code'] === $productCode) {
        $result['product'] = $produit;
        $result['cargo'] = $cargo;
        break 3;
      }
    }
  }
}

echo json_encode($result);
?>