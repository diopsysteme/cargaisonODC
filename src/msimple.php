<?php
require '/var/www/html/prog1/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
function sendEmail($recipientEmail, $recipientName, $subject, $body, $pdfContent = null) {
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'diopmail.test@gmail.com';
        $mail->Password = 'anfg kvwo qjof tled'; // Remplacez par le mot de passe correct
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('diopmail.test@gmail.com', 'Mouhamed');
        $mail->addAddress($recipientEmail, $recipientName);

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $body;
        $mail->AltBody = strip_tags($body);

        if ($pdfContent != null) {
            $mail->addStringAttachment($pdfContent, 'facture_produit.pdf');
        }

        $mail->send();
        echo 'L\'e-mail a été envoyé avec succès.';
    } catch (Exception $e) {
        echo 'Erreur lors de l\'envoi de l\'e-mail : ', $mail->ErrorInfo;
    }
}
function generateMessage( $data) {
    $etat=$data['etat'];
    $sender = $data['sender'];
    $receiver = $data['receiver'];
    $codeProduit = $data['code'];
    $lienSuivi = "http://www.mouhamadou.moustapha.diop:8082/prog1/src/index.php?page=suivi&code=$codeProduit";

    $headerStyle = "background-color: #4CAF50; color: white; padding: 10px; text-align: center;";
    $sectionStyle = "border: 1px solid #ddd; padding: 10px; margin: 10px 0;";
    $linkStyle = "color: #4CAF50; text-decoration: none; font-weight: bold;";

    $message = '';
    switch ($etat) {
        case 'en cours':
            $message = "
            <div style='$headerStyle'><h1>État de votre colis : En cours</h1></div>
            <div style='$sectionStyle'>
                <p>Votre colis est actuellement en cours de traitement.</p>
                <p><strong>Code du produit :</strong> $codeProduit</p>
                <p><strong>Expéditeur :</strong> {$sender['nom']} {$sender['prenom']}<br>{$sender['adresse']}<br>{$sender['mail']}<br>{$sender['telephone']}</p>
                <p><strong>Destinataire :</strong> {$receiver['nom']} {$receiver['prenom']}<br>{$receiver['adresse']}<br>{$receiver['mail']}<br>{$receiver['telephone']}</p>
                <p>Vous pouvez suivre votre colis en utilisant le code du produit sur notre plateforme à l'adresse suivante :</p>
                <p><a href='$lienSuivi' style='$linkStyle'>Suivi de colis</a></p>
            </div>";
            break;
        case 'arrive':
            $message = "
            <div style='$headerStyle'><h1>État de votre colis : Arrivé</h1></div>
            <div style='$sectionStyle'>
                <p>Votre colis est arrivé à destination.</p>
                <p><strong>Code du produit :</strong> $codeProduit</p>
                <p>Vous pouvez suivre l'état final de votre colis en utilisant le code du produit sur notre plateforme à l'adresse suivante :</p>
                <p><a href='$lienSuivi' style='$linkStyle'>Suivi de colis</a></p>
            </div>";
            break;
        case 'recupere':
            $message = "
            <div style='$headerStyle'><h1>État de votre colis : Récupéré</h1></div>
            <div style='$sectionStyle'>
                <p>Votre colis a été récupéré par le destinataire.</p>
                <p><strong>Code du produit :</strong> $codeProduit</p>
                <p>Vous pouvez vérifier les détails de la livraison en utilisant le code du produit sur notre plateforme à l'adresse suivante :</p>
                <p><a href='$lienSuivi' style='$linkStyle'>Suivi de colis</a></p>
            </div>";
            break;
        case 'perdu':
            $message = "
            <div style='$headerStyle'><h1>État de votre colis : Perdu</h1></div>
            <div style='$sectionStyle'>
                <p>Nous sommes désolés, mais votre colis a été perdu.</p>
                <p><strong>Code du produit :</strong> $codeProduit</p>
                <p>Pour plus d'informations, veuillez contacter notre service clientèle.</p>
            </div>";
            break;
        case 'archive':
            $message = "
            <div style='$headerStyle'><h1>État de votre colis : Archivé</h1></div>
            <div style='$sectionStyle'>
                <p>Votre colis a été archivé. Veuillez venir le récupérer.</p>
                <p><strong>Code du produit :</strong> $codeProduit</p>
                <p>Pour organiser la récupération de votre colis, veuillez nous contacter.</p>
            </div>";
            break;
        default:
            $message = "<div style='$headerStyle'><h1>État de votre colis : Inconnu</h1></div>";
            break;
    }
    return $message;
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = file_get_contents('php://input');
    $data = json_decode($data, true);

    if ((true)) {
        // $senderMail = $data['senderMail'];
        // $senderNom = $data['senderNom'];
        // $receiverMail = $data['receiverMail'];
        // $receiverNom = $data['receiverNom'];
        // $subject = $data['subject'];
        // $body = $data['body'];

        
        $message = generateMessage($data);
        sendEmail($data['receiver']['mail'], $data['receiver']['nom'], 'État de votre colis', $message);
        sendEmail($data['sender']['mail'], $data['sender']['nom'], 'État de votre colis', $message);

        echo json_encode(array('success' => true, 'message' => 'E-mails envoyés avec succès.'));
       
       
    } else {
        echo json_encode(array('success' => false, 'message' => 'Paramètres manquants.'));
    }
} else {
    echo json_encode(array('success' => false, 'message' => 'Cette page ne peut être accédée que par une requête POST.'));
}
