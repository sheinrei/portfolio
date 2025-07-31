<?php

$config = require 'config.php';

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
}

