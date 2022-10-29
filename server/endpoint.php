<?php
    header("Access-Control-Allow-Origin: *");
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    $sql = new mysqli("*", "*", "*", "*");

    $query = "INSERT INTO `sent_data` (query, url, result_order, x, y, judge) VALUES ('{$data["query"]}', '{$data["url"]}', {$data["order"]}, {$data["x"]}, {$data["y"]}, {$data["judge"]})";
    $query_result = $sql->query($query);
    
    $result = Array(
        "executed_query" => $query,
        "query_result" => $query_result
    );
    echo(json_encode($result));
?>
