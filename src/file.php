<?php
include('../config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = file_get_contents('php://input');
  $decoded = json_decode($data, true);

  if ($decoded === null) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid JSON']);
    exit;
  }

  $file = DATA;

  if (file_put_contents($file, json_encode($decoded, JSON_PRETTY_PRINT))) {
    echo json_encode(['message' => 'Data saved successfully']);
  } else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to save data']);
  }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $file = DATA;

  if (file_exists($file)) {
    $data = file_get_contents($file);
    $decoded = json_decode($data, true);

    if ($decoded === null) {
      http_response_code(500);
      echo json_encode(['message' => 'Error reading data']);
    } else {
      echo json_encode($decoded);
    }
  } else {
    http_response_code(404);
    echo json_encode(['message' => 'Data file not found']);
  }
} else {
  http_response_code(405);
  echo json_encode(['message' => 'Method not allowed']);
}
?>
