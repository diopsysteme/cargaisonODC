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
} else {
  http_response_code(405);
  echo json_encode(['message' => 'Method not allowed']);
}
