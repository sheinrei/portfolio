<?php


require("mailer.php");
$conf = require __DIR__ . "/config.php";


$dsn = $conf['dsn'];
$user = $conf['user'];
$pass = $conf['password'];
$pdo = new \PDO($dsn, $user, $pass);

$today = date("Y-m-j");

function getComment($pdo, $today)
{
    $sql = "select * 
    from commentaire
    where date = :today";

    $stmt = $pdo->prepare($sql);
    $stmt->execute( ["today" => $today]);
    $result = $stmt->fetchALL(PDO::FETCH_ASSOC);
    return $result;
}
$comment = getComment($pdo, $today);


$count = count($comment);
$new_comment = false;
$catch_comment = [];
$catch_email= [];

if (empty($comment)) {

    $body_mail = "<h2>Mon chère maître.<h2> 
    <p>Je vous rapporte aujourd'hui le rapport des commentaires posté sur votre portfolio en ligne: \n
    En date de $today vous n'avez pas reçu de nouveaux commentaires \n</p>
    ";

} else {
    for ($i = 0; $i < $count; $i++) {
        array_push($catch_comment, $comment[$i]["commentaire"]);
    }
    $count_new = count($catch_comment);

    
    $body_mail = "<h2>Mon chère maître.<h2> 
<p>Je vous rapporte aujourd'hui le rapport des commentaires posté sur votre portfolio en ligne: \n
Vous avez eu $count_new commentaires : </p> \n";

    foreach($catch_comment as $row){

        $body_mail .= "<p>Commentaire : '" .  $row . "'</p>";
    }
}


sendMail("l.beaute@laposte.net", $body_mail);