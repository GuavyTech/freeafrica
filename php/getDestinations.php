<?php
header('Content-Type: application/json');

$query = $_POST['query'] ?? '';

// Example array of destinations
$destinations = ["Maasai Mara", "Serengeti", "Ngorongoro", "Mount Kilimanjaro", "Zanzibar", "Murchison Falls", "Bwindi Impenetrable Forest"];
$result = [];

if ($query) {
    foreach ($destinations as $destination) {
        if (stripos($destination, $query) !== false) {
            $result[] = $destination;
        }
    }
}

echo json_encode($result);
