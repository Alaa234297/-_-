<?php
session_start();

$host = "localhost";
$user = "root";
$pass = "";
$db = "rescue_db";

// الاتصال بقاعدة البيانات
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
}

$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // تشفير كلمة المرور

    // التحقق من عدم تكرار البريد
    $check_sql = "SELECT id FROM volunteers WHERE email = ?";
    $check_stmt = $conn->prepare($check_sql);
    $check_stmt->bind_param("s", $email);
    $check_stmt->execute();
    $check_stmt->store_result();

    if ($check_stmt->num_rows > 0) {
        $message = "⚠️ البريد الإلكتروني مسجل مسبقًا.";
    } else {
        $sql = "INSERT INTO volunteers (fullname, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $fullname, $email, $password);

        if ($stmt->execute()) {
            $message = "✅ تم إنشاء الحساب بنجاح! <a href='login.php'>تسجيل الدخول</a>";
        } else {
            $message = "❌ حدث خطأ أثناء التسجيل: " . $stmt->error;
        }

        $stmt->close();
    }

    $check_stmt->close();
}

$conn->close();
?>
