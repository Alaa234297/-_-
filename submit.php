<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get data from form
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    // Simple validation
    if (!empty($name) && !empty($phone) && !empty($message)) {
        // Here you can save data to a database or send it via email
        // For demonstration, we'll echo the data
        echo "Emergency Alert Sent Successfully!<br>";
        echo "Name: $name<br>";
        echo "Phone: $phone<br>";
        echo "Message: $message<br>";
    } else {
        echo "All fields are required!";
    }
}
?>
