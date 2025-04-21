-- إنشاء قاعدة البيانات إذا لم تكن موجودة
CREATE DATABASE IF NOT EXISTS rescue_db;

-- استخدام قاعدة البيانات التي تم إنشاؤها
USE rescue_db;

-- إنشاء جدول المتطوعين إذا لم يكن موجوداً
CREATE TABLE IF NOT EXISTS volunteers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدخال بيانات المتطوعين في الجدول
INSERT INTO volunteers (fullname, email, password)
VALUES
    ('أحمد خالد', 'ahmad@example.com', 'password123'),
    ('سارة علي', 'sara@example.com', 'password456'),
    ('محمد يوسف', 'mohammad@example.com', 'password789');
