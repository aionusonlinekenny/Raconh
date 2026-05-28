<?php
/**
 * login.php — Web portal: register + login before entering the game.
 * Place at: C:\xampp\htdocs\game\login.php
 *
 * Flow:
 *   1. User registers or logs in here.
 *   2. On success: shown a "Start Game" button.
 *   3. Button click: sets sessionStorage.cw_game_user → loads index.html.
 *   4. translate.js reads sessionStorage, skips the in-game password screen.
 */
session_start();
mb_internal_encoding('UTF-8');
header('Content-Type: text/html; charset=utf-8');

// Logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: login.php');
    exit;
}

$error      = '';
$success    = '';
$tab        = 'login';
$authedUser = !empty($_SESSION['portal_user']) ? $_SESSION['portal_user'] : null;

function portalDB() {
    $pdo = new PDO(
        'mysql:host=localhost;dbname=cw02_game1;charset=utf8',
        'root', '',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    $pdo->exec("CREATE TABLE IF NOT EXISTS web_users (
        id             INT AUTO_INCREMENT PRIMARY KEY,
        username       VARCHAR(32) COLLATE utf8_bin NOT NULL UNIQUE,
        password_hash  VARCHAR(255) NOT NULL,
        erlang_role_id VARCHAR(32)  NULL DEFAULT NULL,
        created_at     DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8");
    try { $pdo->exec("ALTER TABLE web_users ADD COLUMN erlang_role_id VARCHAR(32) NULL DEFAULT NULL"); } catch (PDOException $ex) {}
    return $pdo;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && !$authedUser) {
    $action   = $_POST['action']   ?? 'login';
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    $tab      = ($action === 'register') ? 'register' : 'login';

    if (!preg_match('/^[a-zA-Z0-9_]{3,20}$/', $username)) {
        $error = 'Username: 3–20 chars, letters/numbers/underscore only.';
    } elseif (strlen($password) < 6) {
        $error = 'Password must be at least 6 characters.';
    } else {
        try {
            $pdo = portalDB();
            if ($action === 'register') {
                $confirm = $_POST['confirm'] ?? '';
                if ($password !== $confirm) {
                    $error = 'Passwords do not match.';
                } else {
                    $chk = $pdo->prepare('SELECT id FROM web_users WHERE BINARY username = ?');
                    $chk->execute([$username]);
                    if ($chk->fetch()) {
                        $error = 'Username already taken. Please choose another.';
                    } else {
                        $pdo->prepare('INSERT INTO web_users (username, password_hash) VALUES (?,?)')
                            ->execute([$username, password_hash($password, PASSWORD_DEFAULT)]);
                        $_SESSION['portal_user'] = $username;
                        $authedUser = $username;
                        $success = 'Account created!';
                    }
                }
            } else {
                $st = $pdo->prepare('SELECT password_hash FROM web_users WHERE BINARY username = ?');
                $st->execute([$username]);
                $row = $st->fetch(PDO::FETCH_ASSOC);
                if (!$row) {
                    $error = 'Account not found. Please register first.';
                } elseif (!password_verify($password, $row['password_hash'])) {
                    $error = 'Incorrect password.';
                } else {
                    $_SESSION['portal_user'] = $username;
                    $authedUser = $username;
                }
            }
        } catch (PDOException $e) {
            $error = 'Database error: ' . $e->getMessage();
        }
    }
}

$safeUser = $authedUser ? json_encode($authedUser) : 'null';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>RaconH</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;font-family:'Segoe UI',Arial,sans-serif;color:#e8d8b0}
body{
    background:#0d0d1a;
    background-image:
        radial-gradient(ellipse at 20% 50%,rgba(80,20,120,.35) 0%,transparent 60%),
        radial-gradient(ellipse at 80% 20%,rgba(20,60,120,.3) 0%,transparent 60%);
    min-height:100vh;display:flex;align-items:center;justify-content:center
}
.container{width:100%;max-width:420px;padding:16px}
.logo{text-align:center;margin-bottom:28px}
.logo h1{font-size:32px;font-weight:800;letter-spacing:4px;color:#f0c060;text-shadow:0 0 30px rgba(240,180,60,.6)}
.logo p{font-size:12px;color:#606878;margin-top:6px;letter-spacing:2px;text-transform:uppercase}
.card{background:rgba(255,255,255,.05);border:1px solid rgba(240,180,60,.2);border-radius:14px;padding:30px;backdrop-filter:blur(10px)}
/* tabs */
.tabs{display:flex;border-bottom:1px solid rgba(240,180,60,.2);margin-bottom:24px}
.tab{flex:1;padding:10px;background:none;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;color:#8890a0;font-size:15px;cursor:pointer;transition:all .2s}
.tab.active{color:#f0c060;border-bottom-color:#f0c060}
.tab:hover:not(.active){color:#c4a040}
/* form */
.fg{margin-bottom:16px}
.fg label{display:block;font-size:12px;color:#808898;margin-bottom:5px;letter-spacing:.5px;text-transform:uppercase}
.fg input{width:100%;padding:11px 14px;background:rgba(0,0,10,.5);border:1px solid rgba(240,180,60,.2);border-radius:7px;color:#e8d8b0;font-size:14px;outline:none;transition:border-color .2s}
.fg input:focus{border-color:#f0c060;box-shadow:0 0 0 3px rgba(240,180,60,.08)}
.fg input::placeholder{color:#404858}
.hint{font-size:11px;color:#505868;margin-top:4px}
.btn{width:100%;padding:13px;border:none;border-radius:8px;font-size:15px;font-weight:700;letter-spacing:1px;cursor:pointer;transition:opacity .2s,transform .1s;margin-top:4px}
.btn-login{background:linear-gradient(135deg,#8b6010,#c89b3c);color:#100800}
.btn-login:hover,.btn-register:hover{opacity:.88}
.btn-login:active,.btn-register:active,.btn-start:active{transform:scale(.98)}
.btn-register{background:linear-gradient(135deg,#1e3a6e,#2e5aae);color:#d0e4ff}
.msg-err{background:rgba(160,30,30,.25);border:1px solid rgba(200,60,60,.35);border-radius:7px;padding:10px 14px;font-size:13px;color:#e07878;margin-bottom:18px}
.msg-ok{background:rgba(30,130,60,.25);border:1px solid rgba(60,180,80,.35);border-radius:7px;padding:10px 14px;font-size:13px;color:#70d880;margin-bottom:20px;text-align:center}
.hidden{display:none}
/* welcome / start screen */
.welcome{text-align:center;margin-bottom:28px}
.welcome .ident{font-size:13px;color:#707888;margin-bottom:6px;letter-spacing:.5px}
.welcome .uname{font-size:22px;font-weight:700;color:#f0d080;text-shadow:0 0 16px rgba(240,180,60,.4)}
.btn-start{width:100%;padding:20px;background:linear-gradient(135deg,#3a1870,#6a30c0);border:none;border-radius:12px;color:#fff;font-size:22px;font-weight:800;letter-spacing:3px;cursor:pointer;transition:all .2s;box-shadow:0 6px 28px rgba(100,60,200,.45)}
.btn-start:hover{box-shadow:0 10px 40px rgba(120,80,220,.65);background:linear-gradient(135deg,#4a20a0,#8040e0)}
.logout{display:block;text-align:center;margin-top:14px;font-size:12px;color:#404858;text-decoration:none;transition:color .2s}
.logout:hover{color:#808898}
</style>
</head>
<body>
<div class="container">
  <div class="logo">
    <h1>RaconH</h1>
    <p>Online</p>
  </div>
  <div class="card">

<?php if ($authedUser): ?>

    <?php if ($success): ?>
      <p class="msg-ok"><?=htmlspecialchars($success)?></p>
    <?php endif; ?>
    <div class="welcome">
      <p class="ident">Logged in as</p>
      <p class="uname"><?=htmlspecialchars($authedUser)?></p>
    </div>
    <button class="btn btn-start" onclick="startGame()">▶ &nbsp;Start Game</button>
    <a class="logout" href="login.php?logout=1">Switch account</a>

    <script>
    function startGame(){
      sessionStorage.setItem('cw_game_user',<?=$safeUser?>);
      window.location.href='index.html?username='+encodeURIComponent(<?=$safeUser?>);
    }
    </script>

<?php else: ?>

    <div class="tabs">
      <button class="tab <?=$tab==='login'?'active':''?>" onclick="switchTab('login')">Login</button>
      <button class="tab <?=$tab==='register'?'active':''?>" onclick="switchTab('register')">Register</button>
    </div>

    <?php if ($error): ?><p class="msg-err"><?=htmlspecialchars($error)?></p><?php endif; ?>

    <!-- Login -->
    <div id="pLogin" <?=$tab!=='login'?'class="hidden"':''?>>
      <form method="POST">
        <input type="hidden" name="action" value="login">
        <div class="fg">
          <label>Username</label>
          <input type="text" name="username" placeholder="Enter username" autocomplete="username"
                 value="<?=htmlspecialchars($tab==='login' ? ($_POST['username'] ?? '') : '')?>" required>
        </div>
        <div class="fg">
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter password" autocomplete="current-password" required>
        </div>
        <button type="submit" class="btn btn-login">Login</button>
      </form>
    </div>

    <!-- Register -->
    <div id="pRegister" <?=$tab!=='register'?'class="hidden"':''?>>
      <form method="POST">
        <input type="hidden" name="action" value="register">
        <div class="fg">
          <label>Username</label>
          <input type="text" name="username" placeholder="Choose a username" autocomplete="username"
                 value="<?=htmlspecialchars($tab==='register' ? ($_POST['username'] ?? '') : '')?>" required>
          <p class="hint">3–20 chars · letters, numbers, underscore · case-sensitive</p>
        </div>
        <div class="fg">
          <label>Password</label>
          <input type="password" name="password" placeholder="Min 6 characters" autocomplete="new-password" required>
        </div>
        <div class="fg">
          <label>Confirm Password</label>
          <input type="password" name="confirm" placeholder="Re-enter password" autocomplete="new-password" required>
        </div>
        <button type="submit" class="btn btn-register">Create Account</button>
      </form>
    </div>

    <script>
    function switchTab(t){
      document.getElementById('pLogin').className    = t==='login'    ? '' : 'hidden';
      document.getElementById('pRegister').className = t==='register' ? '' : 'hidden';
      document.querySelectorAll('.tab').forEach(function(b){b.classList.remove('active');});
      document.querySelector(t==='login'?'.tab:first-child':'.tab:last-child').classList.add('active');
    }
    </script>

<?php endif; ?>

  </div>
</div>
</body>
</html>
