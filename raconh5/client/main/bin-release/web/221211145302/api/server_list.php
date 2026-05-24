<?php
/**
 * Proxy: forwards server_list requests to the Erlang center API on localhost:8200
 * Allows external players to get server connection info through Apache (port 80)
 * instead of needing direct access to port 8200.
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$target = 'http://127.0.0.1:8200/api/server_list.php';
if (!empty($_SERVER['QUERY_STRING'])) {
    $target .= '?' . $_SERVER['QUERY_STRING'];
}

$postData = file_get_contents('php://input');

$ctx = stream_context_create([
    'http' => [
        'method'  => 'POST',
        'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content' => $postData,
        'timeout' => 5,
        'ignore_errors' => true,
    ]
]);

$response = @file_get_contents($target, false, $ctx);

if ($response === false) {
    // Center server unreachable — return static server info
    $host = $_SERVER['HTTP_HOST'] ?? '127.0.0.1';
    $host = explode(':', $host)[0]; // strip port if any
    echo json_encode([
        'items' => [[
            'list' => [[
                'name'     => 'Server 1',
                'host'     => $host,
                'port'     => 9002,
                'serverID' => 10001,
                'state'    => 0,
            ]]
        ]]
    ]);
} else {
    echo $response;
}
