<?php
/**
 * auth.php — AJAX credential endpoint called by the in-game overlay
 * Place at: C:\xampp\htdocs\game\auth.php
 *
 * POST params: username, password
 * Response JSON:
 *   {ok:true,  username:"xxx"}  — authenticated (or new account created)
 *   {error:"message"}          — wrong password / validation error
 *
 * Auto-registration: first time a username is used, the account is created
 * with that password.  Subsequent logins require the same password.
 */
header('Content-Type: application/json');
session_start();

$username = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';

if (!preg_match('/^[a-zA-Z0-9_]{3,20}$/', $username)) {
    echo json_encode(['error' => 'Username: 3–20 chars, letters/numbers/underscore only.']);
    exit;
}
if (strlen($password) < 6) {
    echo json_encode(['error' => 'Password must be at least 6 characters.']);
    exit;
}

try {
    $pdo = new PDO(
        'mysql:host=localhost;dbname=cw02_game1;charset=utf8',
        'root', '',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $pdo->exec("CREATE TABLE IF NOT EXISTS web_users (
        id             INT AUTO_INCREMENT PRIMARY KEY,
        username       VARCHAR(32)  NOT NULL UNIQUE,
        password_hash  VARCHAR(255) NOT NULL,
        erlang_role_id VARCHAR(32)  NULL DEFAULT NULL,
        created_at     DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8");

    try {
        $pdo->exec("ALTER TABLE web_users ADD COLUMN erlang_role_id VARCHAR(32) NULL DEFAULT NULL");
    } catch (PDOException $e) {}

    $stmt = $pdo->prepare('SELECT password_hash FROM web_users WHERE username = ?');
    $stmt->execute([$username]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        if (!password_verify($password, $row['password_hash'])) {
            echo json_encode(['error' => 'Incorrect password.']);
            exit;
        }
    } else {
        $hash = password_hash($password, PASSWORD_BCRYPT);
        $pdo->prepare('INSERT INTO web_users (username, password_hash) VALUES (?, ?)')
            ->execute([$username, $hash]);
    }

    $_SESSION['game_user'] = $username;
    echo json_encode(['ok' => true, 'username' => $username]);

} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
