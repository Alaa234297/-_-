<?php
session_start();

$host = "localhost";
$user = "root";
$pass = "";
$db = "rescue_db";

// الاتصال بقاعدة البيانات
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("فشل الاتصال: " . $conn->connect_error);
}

$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $inputPassword = $_POST['password'];

    $sql = "SELECT * FROM volunteers WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        if (password_verify($inputPassword, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['fullname'] = $user['fullname'];
            header("Location: dashboard.php");
            exit;
        } else {
            $message = "❌ كلمة المرور غير صحيحة.";
        }
    } else {
        $message = "❌ البريد الإلكتروني غير مسجل.";
    }

    $stmt->close();
}
$conn->close();
?>
