<?php

include('../config.php');
$jsonData = file_get_contents(DATA);
$jsonContent = file_get_contents(DATA);

// Décoder le JSON en tableau PHP
$dataPH = json_decode($jsonContent, true);
    include("/var/www/html/prog1/config.php");
    session_start();
//  session_destroy();  
if (!isset($_SESSION["user"])) {
    include("./login.php");
    if (isset($_POST["login"])) {
        echo'dd';
        
        unset($_SESSION["error"]["password"]);
        unset($_SESSION["error"]["mail"]);
        unset($_SESSION["error"]["all"]);

        $username = $_POST["mail"];
        $password = $_POST["password"];
        if (empty($username) || empty($password)) {
            var_dump($username,$password);
            
            $_SESSION["error"]["all"] = "Veuillez remplir tous les champs";
            if (empty($_POST["password"])) {
                $_SESSION["error"]["password"] = "Veuillez remplir ce champ";
            }
            if (empty($_POST["mail"])) {
                $_SESSION["error"]["mail"] = "Veuillez remplir ce champ";
            }
            header("Location:?page=cargo");
        } else {
            $etudiants = $dataPH["users"];
            var_dump($etudiants);
           
            foreach ($etudiants as $user) {
                var_dump($user['password']."=".$password,$user['mail']."=" .$username);
                if ($user['password'] == $password && $user['mail'] == $username) {
                    $_SESSION["user"] = $user;
                    echo "Password changed";
                    header("Location:?page=cargo");
                    break;
                }
            }
            die();
            $_SESSION["error"]["all"] = "Login et/ou mot de passe incorrect(s)";
            header("Location:?page=cargo");
        }
    }
    die();
}
        if (isset($_GET['page'])){
            
            $pages=["cargo","produits","details","suivi"];
            $page = $_GET['page'];
            if(in_array($page,$pages)){
                include_once(FILE.$page.'.php');
            }
        }else{
            echo 'ddd';
        }