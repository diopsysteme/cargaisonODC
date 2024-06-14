<?php
require 'vendor/autoload.php';

use Vonage\Client\Credentials\Basic;
use Vonage\Client;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $apiKey = 'YOUR_API_KEY';
    $apiSecret = 'YOUR_API_SECRET';
    $from = 'VonageAPIs';
    $to = $_POST['to'];
    $text = $_POST['text'];

    $basic  = new Basic($apiKey, $apiSecret);
    $client = new Client($basic);

    try {
        $message = $client->message()->send([
            'to' => $to,
            'from' => $from,
            'text' => $text
        ]);

        echo json_encode([
            'status' => 'success',
            'message' => 'Message sent successfully.'
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'status' => 'error',
            'message' => $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
}
