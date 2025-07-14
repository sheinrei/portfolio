<?php

$nom = $_POST["nom"];
$prenom = $_POST["prenom"];
$email = $_POST["email"];
$commentaire = $_POST["commentaire"];
$valid = false;



$dsn = 'mysql:host=localhost;dbname=portfolio';
$user = 'root';
$pass = '';
$pdo = new \PDO($dsn, $user, $pass);


addComment($nom, $prenom, $email, $commentaire, $valid, $pdo);


// Ajouter un commentaire dans db
function addComment($nom, $prenom, $email, $commentaire, $valid, $pdo)
{
    $sql = "INSERT INTO commentaire (nom,prenom,email,date,commentaire,validation) 
    VALUES (:nom, :prenom, :email, NOW(), :commentaire, :valid)";

    $params = [
        'nom' => $nom,
        'prenom' => $prenom,
        'email' => $email,
        'commentaire' => $commentaire,
        'valid' => $valid,

    ];

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
}

header("Location:index.html");