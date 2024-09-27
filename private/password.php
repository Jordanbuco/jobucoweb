<?php
// Cargar la configuración con la contraseña
$config = include('config.php'); // Ajusta la ruta si es necesario

// Leer la contraseña enviada a través de la petición POST
$enteredPassword = $_POST['password'] ?? '';

// Verificar si la contraseña ha sido enviada correctamente
if (empty($enteredPassword)) {
    echo json_encode(['success' => false, 'message' => 'Contraseña no enviada.']);
    exit;
}

// Comparar la contraseña ingresada con la almacenada en el archivo config.php
if ($enteredPassword === $config['password']) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta.']);
}
?>