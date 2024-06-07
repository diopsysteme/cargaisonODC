<?php
require '/var/www/html/prog1/vendor/autoload.php';
require '/var/www/html/prog1/vendor/tecnickcom/tcpdf/tcpdf.php';

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
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = file_get_contents('php://input');
    $data = json_decode($data, true);

    if ($data) {
        function createPDF($data) {
            $libelle = $data['libelle'];
            $poids = $data['poids'];
            $prix = $data['tarif']; // Ajout du prix
            $codeProduit = $data['code']; // Ajout du code du produit
            $senderNom = $data['sender']['nom'];
            $senderPrenom = $data['sender']['prenom'];
            $senderAdresse = $data['sender']['adresse'];
            $senderMail = $data['sender']['mail'];
            $senderTelephone = $data['sender']['telephone'];
            $receiverNom = $data['receiver']['nom'];
            $receiverPrenom = $data['receiver']['prenom'];
            $receiverAdresse = $data['receiver']['adresse'];
            $receiverMail = $data['receiver']['mail'];
            $receiverTelephone = $data['receiver']['telephone'];
        
            $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
            $pdf->SetCreator(PDF_CREATOR);
            $pdf->SetAuthor('Your Name');
            $pdf->SetTitle('Facture du produit');
            $pdf->SetSubject('Facture du produit');
            $pdf->SetKeywords('TCPDF, PDF, example, test, guide');
        
            $pdf->SetMargins(15, 15, 15);
            $pdf->SetHeaderMargin(10);
            $pdf->SetFooterMargin(10);
        
            $pdf->AddPage();
        
            $html = '
            <h1 style="text-align: center; color: #007BFF;">Facture du produit</h1>
            <br>
            <table border="1" cellpadding="5">
                <tr>
                    <td><strong>Nom du produit :</strong></td>
                    <td>' . $libelle . '</td>
                </tr>
                <tr>
                    <td><strong>Poids :</strong></td>
                    <td>' . $poids . ' kg</td>
                </tr>
                <tr>
                    <td><strong>Prix :</strong></td>
                    <td>' . $prix . ' €</td>
                </tr>
                <tr>
                    <td><strong>Code du produit :</strong></td>
                    <td>' . $codeProduit . '</td>
                </tr>
            </table>
            <br>
            <h2 style="color: #007BFF;">Informations de l\'expéditeur</h2>
            <p>' . $senderNom . ' ' . $senderPrenom . '<br>' . $senderAdresse . '<br>' . $senderMail . '<br>' . $senderTelephone . '</p>
            <br>
            <h2 style="color: #007BFF;">Informations du destinataire</h2>
            <p>' . $receiverNom . ' ' . $receiverPrenom . '<br>' . $receiverAdresse . '<br>' . $receiverMail . '<br>' . $receiverTelephone . '</p>
            <br>
            <h2 style="color: #007BFF;">Suivi de votre colis</h2>
            <p>Vous pouvez suivre votre colis en utilisant le code du produit sur notre plateforme à l\'adresse suivante :</p>
            <p><a href="http://www.mouhamadou.moustapha.diop:8082/prog1/src/index.php?page=suivi" style="color: #007BFF;">Suivi de colis</a></p>
            ';
        
            $pdf->writeHTML($html, true, false, true, false, '');
        
            $pdfData = $pdf->Output('', 'S');
            return $pdfData;
        }

        

        $pdfData = createPDF($data);

        if ($pdfData) {
            $subject = "Reçu pour le service de shipping";
            $body = '<h1>Reçu pour le service de shipping</h1>';

            sendEmail($data['sender']['mail'], $data['sender']['nom'], $subject, $body, $pdfData);
            sendEmail($data['receiver']['mail'], $data['receiver']['nom'], $subject, $body, $pdfData);
            
            echo json_encode(array('success' => true, 'pdfData' => base64_encode($pdfData)));
        } else {
            echo json_encode(array('success' => false, 'message' => 'Erreur lors de la génération du PDF.'));
        }
    } else {
        echo json_encode(array('success' => false, 'message' => 'Données non valides.'));
    }
} else {
    function generateMessage( $data) {
        $etat=$data['etat'];
        $sender = $data['sender'];
        $receiver = $data['receiver'];
        $codeProduit = $data['codeProduit'];
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
    $message = generateMessage($data);
    sendEmail($data['receiver']['mail'], $data['receiver']['nom'], 'État de votre colis', $message);
    sendEmail($data['sender']['mail'], $data['sender']['nom'], 'État de votre colis', $message);
    echo json_encode(array('success' => false, 'message' => 'Cette page ne peut être accédée que par une requête POST.'));
}
