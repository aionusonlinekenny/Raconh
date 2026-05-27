<?php
/**
 * login.php — Player registration & login portal
 * Place at: C:\xampp\htdocs\game\login.php
 *
 * Flow: register/login here → set sessionStorage → game auto-connects
 */

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'cw02_game1');

// ── DB connection ─────────────────────────────────────────────────────────────
function getDB() {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8',
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS web_users (
            id           INT AUTO_INCREMENT PRIMARY KEY,
            username     VARCHAR(32) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    ");
    return $pdo;
}

// ── Validate username: 3-20 chars, letters/numbers/underscore ─────────────────
function validUsername($u) {
    return preg_match('/^[a-zA-Z0-9_]{3,20}$/', $u);
}

// ── Launch the game: write username to sessionStorage then redirect ───────────
// Using JS bridge instead of Location header — sessionStorage survives the
// redirect and is more reliable than URL params crossing the Egret loader.
function launchGame($username) {
    $u = json_encode($username);
    echo '<!DOCTYPE html><html><head><meta charset="utf-8">';
    echo '<script>';
    echo 'sessionStorage.setItem("cw_game_user",' . $u . ');';
    echo 'window.location.replace("./?username=" + encodeURIComponent(' . $u . '));';
    echo '</script></head><body></body></html>';
    exit;
}

$error   = '';
$success = '';
$tab     = isset($_POST['tab']) ? $_POST['tab'] : (isset($_GET['tab']) ? $_GET['tab'] : 'login');

// ── Handle POST ───────────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tab      = $_POST['tab'] ?? 'login';
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    try {
        $db = getDB();

        if ($tab === 'register') {
            $confirm = $_POST['confirm'] ?? '';
            if (!validUsername($username))
                $error = 'Username must be 3–20 characters (letters, numbers, underscore only).';
            elseif (strlen($password) < 6)
                $error = 'Password must be at least 6 characters.';
            elseif ($password !== $confirm)
                $error = 'Passwords do not match.';
            else {
                $stmt = $db->prepare('SELECT id FROM web_users WHERE username = ?');
                $stmt->execute([$username]);
                if ($stmt->fetch())
                    $error = 'Username already taken. Please choose another.';
                else {
                    $hash = password_hash($password, PASSWORD_BCRYPT);
                    $db->prepare('INSERT INTO web_users (username, password_hash) VALUES (?, ?)')
                       ->execute([$username, $hash]);
                    launchGame($username);
                }
            }
        } else {
            // Login
            if (empty($username) || empty($password)) {
                $error = 'Please enter username and password.';
            } else {
                $stmt = $db->prepare('SELECT password_hash FROM web_users WHERE username = ?');
                $stmt->execute([$username]);
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                if (!$row || !password_verify($password, $row['password_hash']))
                    $error = 'Incorrect username or password.';
                else {
                    launchGame($username);
                }
            }
        }
    } catch (PDOException $e) {
        $error = 'Database error: ' . $e->getMessage();
    }
}

$tabLogin    = ($tab !== 'register') ? 'active' : '';
$tabRegister = ($tab === 'register') ? 'active' : '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Login — Game Portal</title>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
    background: #0d0d1a;
    background-image:
        radial-gradient(ellipse at 20% 50%, rgba(80,20,120,0.3) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 20%, rgba(20,60,120,0.3) 0%, transparent 60%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Segoe UI', Arial, sans-serif;
    color: #e8d8b0;
}

.container {
    width: 100%;
    max-width: 420px;
    padding: 16px;
}

.logo {
    text-align: center;
    margin-bottom: 28px;
}
.logo h1 {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 3px;
    color: #f0c060;
    text-shadow: 0 0 20px rgba(240,180,60,0.5);
}
.logo p {
    font-size: 13px;
    color: #8890a0;
    margin-top: 4px;
}

.card {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(240,180,60,0.2);
    border-radius: 12px;
    padding: 28px;
    backdrop-filter: blur(10px);
}

.tabs {
    display: flex;
    border-bottom: 1px solid rgba(240,180,60,0.2);
    margin-bottom: 24px;
}
.tab-btn {
    flex: 1;
    padding: 10px;
    background: none;
    border: none;
    color: #8890a0;
    font-size: 15px;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: all 0.2s;
}
.tab-btn.active {
    color: #f0c060;
    border-bottom-color: #f0c060;
}
.tab-btn:hover { color: #d4a840; }

.form-group { margin-bottom: 18px; }
.form-group label {
    display: block;
    font-size: 13px;
    color: #a0a8b8;
    margin-bottom: 6px;
}
.form-group input {
    width: 100%;
    padding: 11px 14px;
    background: rgba(0,0,10,0.4);
    border: 1px solid rgba(240,180,60,0.25);
    border-radius: 6px;
    color: #e8d8b0;
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s;
}
.form-group input:focus { border-color: #f0c060; }
.form-group input::placeholder { color: #505868; }

.hint {
    font-size: 11px;
    color: #606878;
    margin-top: 4px;
}

.btn-submit {
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, #b07820, #d4a030);
    border: none;
    border-radius: 6px;
    color: #1a1000;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 1px;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.1s;
    margin-top: 4px;
}
.btn-submit:hover { opacity: 0.9; }
.btn-submit:active { transform: scale(0.98); }

.alert {
    padding: 10px 14px;
    border-radius: 6px;
    font-size: 13px;
    margin-bottom: 18px;
}
.alert-error {
    background: rgba(180,40,40,0.2);
    border: 1px solid rgba(200,60,60,0.4);
    color: #f08080;
}
.alert-success {
    background: rgba(40,140,60,0.2);
    border: 1px solid rgba(60,180,80,0.4);
    color: #80d090;
}

.panel { display: none; }
.panel.active { display: block; }
</style>
</head>
<body>
<div class="container">
    <div class="logo">
        <h1>⚔ GAME PORTAL</h1>
        <p>Login to access your character</p>
    </div>

    <div class="card">
        <!-- Tab navigation -->
        <div class="tabs">
            <button class="tab-btn <?= $tabLogin ?>"
                    onclick="switchTab('login')" type="button">Login</button>
            <button class="tab-btn <?= $tabRegister ?>"
                    onclick="switchTab('register')" type="button">Register</button>
        </div>

        <?php if ($error): ?>
            <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>
        <?php if ($success): ?>
            <div class="alert alert-success"><?= htmlspecialchars($success) ?></div>
        <?php endif; ?>

        <!-- Login form -->
        <div id="panel-login" class="panel <?= $tabLogin ?>">
            <form method="POST">
                <input type="hidden" name="tab" value="login">
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Your username"
                           value="<?= htmlspecialchars($_POST['username'] ?? '') ?>"
                           autocomplete="username" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Your password"
                           autocomplete="current-password" required>
                </div>
                <button type="submit" class="btn-submit">ENTER GAME</button>
            </form>
        </div>

        <!-- Register form -->
        <div id="panel-register" class="panel <?= $tabRegister ?>">
            <form method="POST">
                <input type="hidden" name="tab" value="register">
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Choose a username"
                           value="<?= htmlspecialchars($_POST['username'] ?? '') ?>"
                           autocomplete="username" required>
                    <div class="hint">3–20 characters, letters/numbers/underscore only</div>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Create a password"
                           autocomplete="new-password" required>
                    <div class="hint">Minimum 6 characters</div>
                </div>
                <div class="form-group">
                    <label>Confirm Password</label>
                    <input type="password" name="confirm" placeholder="Re-enter password"
                           autocomplete="new-password" required>
                </div>
                <button type="submit" class="btn-submit">CREATE ACCOUNT</button>
            </form>
        </div>
    </div>
</div>

<script>
function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
    document.querySelectorAll('.panel').forEach(function(p) { p.classList.remove('active'); });
    document.getElementById('panel-' + tab).classList.add('active');
    event.target.classList.add('active');
}
</script>
</body>
</html>
