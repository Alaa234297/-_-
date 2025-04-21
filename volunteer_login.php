<?php
session_start();

$servername = "localhost"; 
$username = "root";
$password = "";
$dbname = "rescue_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("فشل الاتصال: " . $conn->connect_error);
}

$loginMessage = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $passwordInput = $_POST['password'];

    $sql = "SELECT * FROM volunteers WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $volunteer = $result->fetch_assoc();
        if (password_verify($passwordInput, $volunteer['password'])) {
            $_SESSION['user_id'] = $volunteer['id'];
            $_SESSION['fullname'] = $volunteer['fullname'];
            header("Location: dashboard.php"); // توجيه لصفحة المتطوعين
            exit;
        } else {
            $loginMessage = "كلمة المرور غير صحيحة.";
        }
    } else {
        $loginMessage = "البريد الإلكتروني غير موجود.";
    }

    $stmt->close();
}
$conn->close();
?>
