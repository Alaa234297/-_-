<form action="register.php" method="post" onsubmit="return validateForm()">
    <label for="fullname">الاسم الكامل:</label>
    <input type="text" id="fullname" name="fullname" required>

    <label for="email">البريد الإلكتروني:</label>
    <input type="email" id="email" name="email" required>

    <label for="password">كلمة المرور:</label>
    <input type="password" id="password" name="password" required>

    <label for="confirm_password">تأكيد كلمة المرور:</label>
    <input type="password" id="confirm_password" name="confirm_password" required>

    <button type="submit">تسجيل</button>
</form>

<script>
    function validateForm() {
        const password = document.getElementById('password').value;
        const confirm_password = document.getElementById('confirm_password').value;
        
        // التحقق من تطابق كلمة المرور
        if (password !== confirm_password) {
            alert("كلمة المرور وتأكيد كلمة المرور لا يتطابقان.");
            return false;
        }

        // التحقق من صحة البريد الإلكتروني
        const email = document.getElementById('email').value;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            alert("البريد الإلكتروني غير صحيح.");
            return false;
        }

        return true;
    }
</script>
