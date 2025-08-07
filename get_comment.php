<?php



$conf = require __DIR__ . "/config.php";


$dsn = $conf['dsn'];
$user = $conf['user'];
$pass = $conf['password'];
$pdo = new \PDO($dsn, $user, $pass);

function getComment($pdo)
{
    $sql = "select nom,prenom,date,commentaire,notation 
    from commentaire
    where validation = '1' ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchALL(PDO::FETCH_ASSOC);
    return $result;
}


$comment = getComment($pdo);


header('Content-Type: application/json; charset=UTF-8');
echo json_encode($comment, JSON_UNESCAPED_UNICODE);

