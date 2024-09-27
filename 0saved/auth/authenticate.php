<!-- authenticate.php -->
<?php
session_start();

// Definir la contraseña correcta
$correct_password = '1111'; // Reemplaza 'tucontraseña' con tu contraseña real

// Verificar si se envió la contraseña
if (isset($_POST['password'])) {
    $password = $_POST['password'];

    // Verificar si la contraseña es correcta
    if ($password === $correct_password) {
        // Crear una sesión para el usuario autenticado
        $_SESSION['authenticated'] = true;

        // Redirigir al usuario a la página protegida
        header('Location: protected.php');
        exit();
    } else {
        // Mostrar mensaje de error si la contraseña es incorrecta
        echo 'Contraseña incorrecta. <a href="login.html">Intentar de nuevo</a>';
    }
} else {
    echo 'Por favor, ingrese una contraseña. <a href="login.html">Intentar de nuevo</a>';
}
?>