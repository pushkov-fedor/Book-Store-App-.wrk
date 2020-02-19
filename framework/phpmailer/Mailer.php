<?php


namespace phpmailer;
use phpmailer\PHPMailer, phpmailer\SMTP;

class Mailer
{

    public static function send($to, $subject, $body){
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 587;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->SMTPAuth = true;
        $mail->Username = 'pushkedorr@gmail.com';
        $mail->Password = 'Drell753753';
        $mail->setFrom('from@example.com', 'My Book Store');
        $mail->addAddress($to);
        $mail->Subject = $subject;

        $mail->Body = $body;
        if (!$mail->send()) {
            echo 'Mailer Error: '. $mail->ErrorInfo;
        } else {
            echo 'Message sent!';
        }
    }

}