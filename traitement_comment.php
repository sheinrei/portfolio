<?php

$config = require __DIR__ . '/config.php';

require ("mailer.php");

$nom = $_POST["nom"];
$prenom = $_POST["prenom"];
$email = $_POST["email"];
$commentaire = $_POST["commentaire"];
$stars = $_POST["stars"];
$valid = false;



$dsn = $config["dsn"];
$user = $config['user'];
$pass = $config["password"];
$pdo = new \PDO($dsn, $user, $pass);


addComment($nom, $prenom, $email, $commentaire, $valid, $stars,$pdo);


// Ajouter un commentaire dans db
function addComment($nom, $prenom, $email, $commentaire, $valid, $stars, $pdo)
{
    $sql = "INSERT INTO commentaire (nom,prenom,email,date,commentaire,validation,notation) 
    VALUES (:nom, :prenom, :email, NOW(), :commentaire, :valid, :stars)";

    $params = [
        'nom' => $nom,
        'prenom' => $prenom,
        'email' => $email,
        'commentaire' => $commentaire,
        'valid' => $valid,
        'stars' =>$stars,

    ];

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    
    $body = "
    <p>Bonjour $prenom, merci d'avoir déposé un commentaire sur <a href=\"http://portfolio.sc5huynh.universe.wf\">portfolio.sc5huynh</a></p>
    <p> Vous avez déposé ce commentaire :</p>
    <i>\" $commentaire \" </i> 
    <p>Votre commentaire sera affiché dés validation de la censure</p>";
    
    sendMail($email, $body);
    
}

