<?php
session_start();
$host = "localhost";       // Servidor de base de datos
$dbname = "dnd_game";      // Nombre de la base de datos
$username = "root";        // Usuario de la base de datos
$password = "";            // Contraseña de la base de datos

// Conectar a la base de datos
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error al conectar a la base de datos: " . $e->getMessage());
}

// Procesar login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['username']) && isset($_POST['password']) && !isset($_POST['email'])) {
        // Login de usuario existente
        $nombre_usuario = $_POST['username'];
        $password = $_POST['password'];

        // Verificar las credenciales del usuario
        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE nombre_usuario = :username AND password = :password");
        $stmt->execute(['username' => $nombre_usuario, 'password' => $password]);
        $user = $stmt->fetch();

        if ($user) {
            // Login exitoso - Guardar sesión y redirigir
            $_SESSION['id_usuario'] = $user['id_usuario'];
            header("Location: rol.html");
            exit();
        } else {
            echo "Usuario o contraseña incorrectos.";
        }
    } elseif (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['email'])) {
        // Crear nueva cuenta
        $nombre_usuario = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Insertar nuevo usuario
        $stmt = $pdo->prepare("INSERT INTO usuarios (nombre_usuario, email, password) VALUES (:username, :email, :password)");
        try {
            $stmt->execute(['username' => $nombre_usuario, 'email' => $email, 'password' => $password]);
            echo "Cuenta creada exitosamente. Redirigiendo a la página de Rol...";
            header("Location: rol.html"); // Redirigir a rol.html después de crear la cuenta
            exit();
        } catch (PDOException $e) {
            echo "Error al crear la cuenta: " . $e->getMessage();
        }
    }
}
?>
