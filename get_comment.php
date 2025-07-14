<?php

$dsn = 'mysql:host=localhost;dbname=portfolio';
$user = 'root';
$pass = '';
$pdo = new \PDO($dsn, $user, $pass);

function getComment($pdo)
{
    $sql = "select nom,prenom,date,commentaire 
    from commentaire
    where validation = '1' ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchALL(PDO::FETCH_ASSOC);
    return $result;
}

$comment = getComment($pdo);

echo json_encode($comment);
