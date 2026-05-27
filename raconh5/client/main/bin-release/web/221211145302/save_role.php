<?php
/**
 * save_role.php — store Erlang role ID → web username mapping
 * Place at: C:\xampp\htdocs\game\save_role.php
 *
 * Called via XHR from translate.js when selectRoleLogin fires (character loaded).
 * Requires a valid PHP session; ignores calls without one.
 */
session_start();
header('Content-Type: application/json');

if (empty($_SESSION['game_user'])) {
    http_response_code(403);
    echo '{"error":"no session"}';
    exit;
}

$username = $_SESSION['game_user'];
$role_id  = $_POST['role_id'] ?? '';

if (!preg_match('/^\d{1,20}$/', $role_id)) {
    http_response_code(400);
    echo '{"error":"invalid role_id"}';
    exit;
}

try {
    $pdo = new PDO(
        'mysql:host=localhost;dbname=cw02_game1;charset=utf8',
        'root', '',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    // Safe migration — add column only if missing
    try {
        $pdo->exec("ALTER TABLE web_users ADD COLUMN erlang_role_id VARCHAR(32) NULL DEFAULT NULL");
    } catch (PDOException $e) {
        // Column already exists — safe to ignore
    }

    $pdo->prepare("UPDATE web_users SET erlang_role_id = ? WHERE username = ?")
        ->execute([$role_id, $username]);

    echo '{"ok":true}';
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
