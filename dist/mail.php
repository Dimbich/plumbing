<?php
// Файлы phpmailer
require 'PHPMailer/PHPMailerAutoload.php';

$mail->SMTPDebug = 2;                               // Enable verbose debug output

// json_encode($_POST, JSON_UNESCAPED_UNICODE);
$name = $_POST['username'];
$phone = $_POST['phone'];

// $email = $_POST['email'];

$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$mail->isSMTP(); 
$mail->Host = 'smtp.mail.ru'; 
$mail->SMTPAuth = true; 
$mail->Username = 'cilometr@mail.ru'; // Ваш логин в Яндексе. Именно логин, без @yandex.ru
$mail->Password = 'ljvljv007'; // Ваш пароль
$mail->SMTPSecure = 'ssl'; 
$mail->Port = 465;
$mail->setFrom('cilometr@mail.ru'); // Ваш Email
$mail->addAddress('superdimbich@yandex.ru'); // Email получателя

// Письмо
$mail->isHTML(true); 
$mail->Subject = 'Заявка с тестового сайта';
$mail->Body    = '' .$name . ' оставил заявку, его телефон ' .$phone;
$mail->AltBody = '';
// Результат
if(!$mail->send()) {
 http_response_code(400);
 echo 'Message could not be sent.';
 echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
 echo 'Ваша заявка принята!<br>В ближайшее время мы Вам перезвоним!';
}