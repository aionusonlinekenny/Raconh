<?php
/**
 * admin.php — Game Admin Panel
 * Place at: C:\xampp\htdocs\game\admin.php
 * Access:   http://localhost/admin.php
 */

session_start();

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');          // empty = no password
define('DB_NAME', 'cw02_game1');

// ── DB ───────────────────────────────────────────────────────────────────────

function getDB() {
    static $pdo = null;
    if ($pdo) return $pdo;
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

        CREATE TABLE IF NOT EXISTS web_admins (
            id           INT AUTO_INCREMENT PRIMARY KEY,
            username     VARCHAR(32) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    ");
    return $pdo;
}

function isLoggedIn()  { return !empty($_SESSION['admin_user']); }
function requireLogin() { if (!isLoggedIn()) { header('Location: admin.php'); exit; } }
function noAdminsExist() { return getDB()->query('SELECT COUNT(*) FROM web_admins')->fetchColumn() == 0; }

// Safe table/column name (whitelist: only a-z, 0-9, underscore)
function safeName($s) { return preg_replace('/[^a-zA-Z0-9_]/', '', $s); }

// ── Handle POST actions ───────────────────────────────────────────────────────

$flash = ['type' => '', 'msg' => ''];
$action = $_POST['action'] ?? '';

if ($action === 'setup') {
    $u = trim($_POST['username'] ?? '');
    $p = $_POST['password'] ?? '';
    $c = $_POST['confirm'] ?? '';
    if (!preg_match('/^[a-zA-Z0-9_]{3,20}$/', $u))
        $flash = ['type'=>'error','msg'=>'Username: 3–20 chars, letters/numbers/underscore.'];
    elseif (strlen($p) < 6)
        $flash = ['type'=>'error','msg'=>'Password must be at least 6 characters.'];
    elseif ($p !== $c)
        $flash = ['type'=>'error','msg'=>'Passwords do not match.'];
    else {
        getDB()->prepare('INSERT INTO web_admins (username,password_hash) VALUES (?,?)')
               ->execute([$u, password_hash($p, PASSWORD_BCRYPT)]);
        $flash = ['type'=>'success','msg'=>'Admin account created. Please log in.'];
    }

} elseif ($action === 'login') {
    $u = trim($_POST['username'] ?? '');
    $p = $_POST['password'] ?? '';
    $stmt = getDB()->prepare('SELECT password_hash FROM web_admins WHERE username=?');
    $stmt->execute([$u]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($row && password_verify($p, $row['password_hash'])) {
        $_SESSION['admin_user'] = $u;
        header('Location: admin.php?tab=players');
        exit;
    }
    $flash = ['type'=>'error','msg'=>'Incorrect username or password.'];

} elseif ($action === 'logout') {
    session_destroy();
    header('Location: admin.php');
    exit;

} elseif ($action === 'delete_player') {
    requireLogin();
    getDB()->prepare('DELETE FROM web_users WHERE id=?')->execute([(int)$_POST['id']]);
    header('Location: admin.php?tab=players&ok=deleted'); exit;

} elseif ($action === 'reset_password') {
    requireLogin();
    $np = $_POST['new_password'] ?? '';
    if (strlen($np) < 6) {
        $flash = ['type'=>'error','msg'=>'New password must be at least 6 characters.'];
    } else {
        getDB()->prepare('UPDATE web_users SET password_hash=? WHERE id=?')
               ->execute([password_hash($np, PASSWORD_BCRYPT), (int)$_POST['id']]);
        header('Location: admin.php?tab=players&ok=reset'); exit;
    }

} elseif ($action === 'add_admin') {
    requireLogin();
    $u = trim($_POST['username'] ?? '');
    $p = $_POST['password'] ?? '';
    $c = $_POST['confirm'] ?? '';
    if (!preg_match('/^[a-zA-Z0-9_]{3,20}$/', $u))
        $flash = ['type'=>'error','msg'=>'Username: 3–20 chars.'];
    elseif (strlen($p) < 6)
        $flash = ['type'=>'error','msg'=>'Password must be at least 6 characters.'];
    elseif ($p !== $c)
        $flash = ['type'=>'error','msg'=>'Passwords do not match.'];
    else {
        try {
            getDB()->prepare('INSERT INTO web_admins (username,password_hash) VALUES (?,?)')
                   ->execute([$u, password_hash($p, PASSWORD_BCRYPT)]);
            header('Location: admin.php?tab=admins&ok=added'); exit;
        } catch (PDOException $e) {
            $flash = ['type'=>'error','msg'=>'Username already exists.'];
        }
    }

} elseif ($action === 'delete_admin') {
    requireLogin();
    $id = (int)$_POST['id'];
    $stmt = getDB()->prepare('SELECT username FROM web_admins WHERE id=?');
    $stmt->execute([$id]);
    $target = $stmt->fetchColumn();
    if ($target === $_SESSION['admin_user'])
        $flash = ['type'=>'error','msg'=>'You cannot delete your own account.'];
    elseif (getDB()->query('SELECT COUNT(*) FROM web_admins')->fetchColumn() <= 1)
        $flash = ['type'=>'error','msg'=>'Cannot delete the last admin account.'];
    else {
        getDB()->prepare('DELETE FROM web_admins WHERE id=?')->execute([$id]);
        header('Location: admin.php?tab=admins&ok=deleted'); exit;
    }

} elseif ($action === 'db_update_row') {
    // Update a cell value in any game table
    requireLogin();
    $tbl = safeName($_POST['tbl'] ?? '');
    $pk  = safeName($_POST['pk']  ?? '');
    $col = safeName($_POST['col'] ?? '');
    $pkv = $_POST['pkv'] ?? '';
    $val = $_POST['val'] ?? '';
    if ($tbl && $pk && $col) {
        try {
            getDB()->prepare("UPDATE `$tbl` SET `$col`=? WHERE `$pk`=?")
                   ->execute([$val, $pkv]);
            $flash = ['type'=>'success','msg'=>"Updated `$tbl`.`$col` for $pk=$pkv"];
        } catch (PDOException $e) {
            $flash = ['type'=>'error','msg'=>'Update failed: '.$e->getMessage()];
        }
    }
    header('Location: admin.php?tab=gamedb&tbl='.$tbl.'&pk='.$pk.'&search='.urlencode($pkv));
    exit;
}

// ── Flash from GET param ──────────────────────────────────────────────────────
if (empty($flash['msg']) && isset($_GET['ok'])) {
    $map = ['deleted'=>'Deleted.','reset'=>'Password reset.','added'=>'Admin added.'];
    if (isset($map[$_GET['ok']]))
        $flash = ['type'=>'success','msg'=>$map[$_GET['ok']]];
}

// ── Page data ─────────────────────────────────────────────────────────────────

$activeTab = $_GET['tab'] ?? 'players';
$setupMode = noAdminsExist();

$players = $admins = $stats = [];
$dbTables = $tableColumns = $tableRows = $tablePK = [];
$dbSearch  = trim($_GET['search'] ?? '');
$dbSelTbl  = safeName($_GET['tbl'] ?? '');
$editRow   = null;
$editPKcol = '';

if (isLoggedIn()) {
    $db = getDB();

    $players = $db->query('SELECT id,username,created_at FROM web_users ORDER BY created_at DESC')
                  ->fetchAll(PDO::FETCH_ASSOC);
    $admins  = $db->query('SELECT id,username,created_at FROM web_admins ORDER BY created_at ASC')
                  ->fetchAll(PDO::FETCH_ASSOC);
    $stats = [
        'total_players' => count($players),
        'total_admins'  => count($admins),
        'newest'        => $players ? $players[0]['username'] : '—',
    ];

    // ── Game DB tab data ──────────────────────────────────────────────────────
    if ($activeTab === 'gamedb') {
        // List all tables
        $dbTables = $db->query('SHOW TABLES')->fetchAll(PDO::FETCH_COLUMN);

        if ($dbSelTbl) {
            // Get columns
            $cols = $db->query("DESCRIBE `$dbSelTbl`")->fetchAll(PDO::FETCH_ASSOC);
            $tableColumns = $cols;

            // Find primary key
            foreach ($cols as $c) {
                if ($c['Key'] === 'PRI') { $tablePK = $c['Field']; break; }
            }
            if (!$tablePK && $cols) $tablePK = $cols[0]['Field']; // fallback

            // Build search query
            $colNames = array_column($cols, 'Field');
            if ($dbSearch !== '') {
                // Try to search text-like columns
                $whereParts = [];
                $params = [];
                foreach ($colNames as $cn) {
                    $whereParts[] = "`$cn` LIKE ?";
                    $params[] = '%'.$dbSearch.'%';
                }
                $where = implode(' OR ', $whereParts);
                $tableRows = $db->prepare("SELECT * FROM `$dbSelTbl` WHERE $where LIMIT 100");
                $tableRows->execute($params);
                $tableRows = $tableRows->fetchAll(PDO::FETCH_ASSOC);
            } else {
                $tableRows = $db->query("SELECT * FROM `$dbSelTbl` LIMIT 100")
                                ->fetchAll(PDO::FETCH_ASSOC);
            }

            // Single-row edit mode
            $editPKval = $_GET['pk'] ?? null;
            if ($editPKval !== null && $tablePK) {
                $stmt = $db->prepare("SELECT * FROM `$dbSelTbl` WHERE `$tablePK`=? LIMIT 1");
                $stmt->execute([$editPKval]);
                $editRow = $stmt->fetch(PDO::FETCH_ASSOC);
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Admin Panel</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0d0d1a;font-family:'Segoe UI',Arial,sans-serif;color:#c8d0e0;min-height:100vh}

/* ── Auth ── */
.auth-wrap{display:flex;align-items:center;justify-content:center;min-height:100vh;
  background-image:radial-gradient(ellipse at 20% 50%,rgba(80,20,120,.3) 0%,transparent 60%),
                   radial-gradient(ellipse at 80% 20%,rgba(20,60,120,.3) 0%,transparent 60%)}
.auth-card{width:100%;max-width:380px;padding:16px}
.auth-card h1{text-align:center;font-size:22px;letter-spacing:2px;color:#f0c060;margin-bottom:6px}
.auth-card .sub{text-align:center;font-size:12px;color:#6070a0;margin-bottom:22px}
.box{background:rgba(255,255,255,.05);border:1px solid rgba(240,180,60,.2);border-radius:10px;padding:24px}

/* ── Layout ── */
.layout{display:flex;min-height:100vh}
.sidebar{width:210px;flex-shrink:0;background:rgba(0,0,20,.7);
  border-right:1px solid rgba(240,180,60,.12);display:flex;flex-direction:column;padding:20px 0}
.brand{text-align:center;color:#f0c060;font-size:14px;font-weight:700;letter-spacing:2px;
  padding:0 16px 18px;border-bottom:1px solid rgba(255,255,255,.07);margin-bottom:14px}
.brand small{display:block;font-size:11px;color:#607090;letter-spacing:0;font-weight:400;margin-top:2px}
.nav-item{display:block;padding:10px 20px;color:#8090a8;text-decoration:none;font-size:14px;
  border-left:3px solid transparent;transition:all .15s}
.nav-item:hover{color:#c8d8f0;background:rgba(255,255,255,.04)}
.nav-item.active{color:#f0c060;border-left-color:#f0c060;background:rgba(240,180,60,.07)}
.sidebar-footer{margin-top:auto;padding:12px 16px}
.main{flex:1;padding:26px 30px;overflow-x:auto;max-width:calc(100vw - 210px)}

/* ── Common ── */
.page-title{font-size:19px;font-weight:600;color:#e0e8f8;margin-bottom:4px}
.page-sub{font-size:13px;color:#5a6880;margin-bottom:22px}
.alert{padding:10px 14px;border-radius:6px;font-size:13px;margin-bottom:18px}
.alert-error{background:rgba(180,40,40,.2);border:1px solid rgba(200,60,60,.4);color:#f08080}
.alert-success{background:rgba(40,140,60,.2);border:1px solid rgba(60,180,80,.4);color:#80d090}
.form-group{margin-bottom:14px}
.form-group label{display:block;font-size:12px;color:#8898b0;margin-bottom:5px}
input[type=text],input[type=password],input[type=search],select,textarea{
  padding:9px 12px;background:rgba(0,0,10,.5);border:1px solid rgba(240,180,60,.2);
  border-radius:6px;color:#dde0e8;font-size:13px;outline:none;transition:border-color .2s}
input:focus,select:focus,textarea:focus{border-color:#f0c060}
.btn{display:inline-block;padding:9px 16px;border:none;border-radius:6px;cursor:pointer;
  font-size:13px;font-weight:600;transition:opacity .15s}
.btn:hover{opacity:.85}
.btn-gold{background:linear-gradient(135deg,#a06818,#d09828);color:#1a0f00}
.btn-gold-wide{width:100%;padding:11px;font-size:15px}
.btn-sm{padding:4px 10px;font-size:12px;border-radius:4px}
.btn-red{background:rgba(160,40,40,.8);color:#ffd0d0}
.btn-blue{background:rgba(40,80,160,.8);color:#d0e0ff}
.btn-green{background:rgba(30,120,60,.8);color:#b0f0c0}
.btn-gray{background:rgba(60,70,90,.8);color:#c0c8d8}

/* ── Stats boxes ── */
.stats{display:flex;gap:14px;margin-bottom:24px;flex-wrap:wrap}
.stat-box{background:rgba(255,255,255,.04);border:1px solid rgba(240,180,60,.15);
  border-radius:8px;padding:14px 20px;min-width:140px}
.stat-box .val{font-size:26px;font-weight:700;color:#f0c060}
.stat-box .lbl{font-size:12px;color:#607090;margin-top:2px}

/* ── Table ── */
.table-wrap{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);
  border-radius:8px;overflow:auto;max-height:520px}
table{width:100%;border-collapse:collapse;font-size:13px}
thead{background:rgba(240,180,60,.08);position:sticky;top:0}
th{padding:9px 12px;text-align:left;font-size:11px;color:#8090a8;font-weight:600;
  letter-spacing:.5px;text-transform:uppercase;white-space:nowrap}
td{padding:8px 12px;border-top:1px solid rgba(255,255,255,.05);vertical-align:middle;
  max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
tr:hover td{background:rgba(255,255,255,.03)}
.actions{display:flex;gap:5px;align-items:center;flex-wrap:nowrap}
.reset-form{display:flex;gap:5px;align-items:center}
.reset-form input{width:120px;padding:4px 8px;font-size:12px}

/* ── Add-admin form ── */
.add-form{background:rgba(255,255,255,.03);border:1px solid rgba(240,180,60,.14);
  border-radius:8px;padding:20px;max-width:600px;margin-bottom:22px}
.add-form h3{font-size:14px;color:#c8d0e0;margin-bottom:14px}
.row-flex{display:flex;gap:10px;flex-wrap:wrap}
.row-flex .form-group{flex:1;min-width:120px}
.row-flex input{width:100%}

/* ── Tab panels ── */
.tab-panel{display:none}
.tab-panel.active{display:block}

/* ── Game DB tab ── */
.db-table-grid{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:22px}
.db-table-btn{padding:6px 14px;background:rgba(40,60,100,.5);border:1px solid rgba(100,140,200,.2);
  border-radius:6px;color:#90a8d0;font-size:12px;text-decoration:none;cursor:pointer;transition:all .15s}
.db-table-btn:hover,.db-table-btn.sel{background:rgba(240,180,60,.15);border-color:rgba(240,180,60,.4);color:#f0c060}
.search-bar{display:flex;gap:8px;margin-bottom:14px;align-items:center}
.search-bar input{flex:1;max-width:340px}
.search-bar select{max-width:200px}
.db-toolbar{display:flex;gap:10px;align-items:center;margin-bottom:14px;flex-wrap:wrap}
.db-toolbar strong{color:#e0c060;font-size:14px}
.db-toolbar .back-btn{color:#6080a0;font-size:12px;text-decoration:none}
.db-toolbar .back-btn:hover{color:#90b0d0}
td.numeric{color:#90d0a0;font-family:monospace}
td.long-text{max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#8090a8;font-size:12px}

/* ── Edit row panel ── */
.edit-panel{background:rgba(20,30,60,.5);border:1px solid rgba(240,180,60,.2);
  border-radius:8px;padding:20px;margin-bottom:20px}
.edit-panel h3{font-size:14px;color:#f0c060;margin-bottom:14px}
.edit-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px}
.edit-field{display:flex;flex-direction:column;gap:4px}
.edit-field label{font-size:11px;color:#7080a0}
.edit-field input,.edit-field textarea{font-size:13px;padding:6px 10px;width:100%}
.edit-field.pk-field input{color:#8090a8;background:rgba(0,0,0,.3)}
.you-badge{font-size:10px;background:rgba(240,180,60,.15);color:#a07820;padding:1px 6px;border-radius:8px;margin-left:6px}
</style>
</head>
<body>

<?php if ($setupMode): ?>
<!-- ══ SETUP ══ -->
<div class="auth-wrap"><div class="auth-card">
  <h1>⚙ FIRST-TIME SETUP</h1>
  <p class="sub">Create the first admin account.</p>
  <?php if($flash['msg']): ?><div class="alert alert-<?=$flash['type']?>"><?=htmlspecialchars($flash['msg'])?></div><?php endif; ?>
  <div class="box">
    <form method="POST">
      <input type="hidden" name="action" value="setup">
      <div class="form-group"><label>Admin Username</label>
        <input type="text" name="username" required value="<?=htmlspecialchars($_POST['username']??'')?>" style="width:100%">
      </div>
      <div class="form-group"><label>Password (min 6 chars)</label>
        <input type="password" name="password" required style="width:100%">
      </div>
      <div class="form-group"><label>Confirm Password</label>
        <input type="password" name="confirm" required style="width:100%">
      </div>
      <button type="submit" class="btn btn-gold btn-gold-wide">CREATE ADMIN ACCOUNT</button>
    </form>
  </div>
</div></div>

<?php elseif (!isLoggedIn()): ?>
<!-- ══ LOGIN ══ -->
<div class="auth-wrap"><div class="auth-card">
  <h1>🛡 ADMIN PANEL</h1>
  <p class="sub">Game management portal</p>
  <?php if($flash['msg']): ?><div class="alert alert-<?=$flash['type']?>"><?=htmlspecialchars($flash['msg'])?></div><?php endif; ?>
  <div class="box">
    <form method="POST">
      <input type="hidden" name="action" value="login">
      <div class="form-group"><label>Username</label>
        <input type="text" name="username" autofocus required style="width:100%" value="<?=htmlspecialchars($_POST['username']??'')?>">
      </div>
      <div class="form-group"><label>Password</label>
        <input type="password" name="password" required style="width:100%">
      </div>
      <button type="submit" class="btn btn-gold btn-gold-wide">LOGIN</button>
    </form>
    <div style="text-align:center;margin-top:14px">
      <a href="login.php" style="font-size:12px;color:#506080;text-decoration:none">← Back to player login</a>
    </div>
  </div>
</div></div>

<?php else: ?>
<!-- ══ PANEL ══ -->
<div class="layout">
  <aside class="sidebar">
    <div class="brand">⚔ GAME ADMIN<small><?=htmlspecialchars($_SESSION['admin_user'])?></small></div>
    <a href="admin.php?tab=players"  class="nav-item <?=$activeTab==='players'?'active':''?>">👥 Player Accounts</a>
    <a href="admin.php?tab=admins"   class="nav-item <?=$activeTab==='admins' ?'active':''?>">🛡 Admin Accounts</a>
    <a href="admin.php?tab=gamedb"   class="nav-item <?=$activeTab==='gamedb' ?'active':''?>">🗄 Game Database</a>
    <div class="sidebar-footer">
      <a href="login.php" class="nav-item" style="border-left:none;font-size:12px;padding:8px 0">🎮 Player Login</a>
      <form method="POST" style="margin-top:6px">
        <input type="hidden" name="action" value="logout">
        <button type="submit" class="btn btn-gray" style="width:100%;font-size:12px">Logout</button>
      </form>
    </div>
  </aside>

  <main class="main">
    <?php if($flash['msg']): ?><div class="alert alert-<?=$flash['type']?>"><?=htmlspecialchars($flash['msg'])?></div><?php endif; ?>

    <!-- ══════ PLAYERS TAB ══════ -->
    <div class="tab-panel <?=$activeTab==='players'?'active':''?>">
      <div class="page-title">Player Accounts</div>
      <div class="page-sub">Registered web portal accounts</div>
      <div class="stats">
        <div class="stat-box"><div class="val"><?=$stats['total_players']?></div><div class="lbl">Total Players</div></div>
        <div class="stat-box"><div class="val" style="font-size:17px"><?=htmlspecialchars($stats['newest'])?></div><div class="lbl">Newest Player</div></div>
      </div>
      <?php if(empty($players)): ?>
        <p style="color:#506080;font-size:14px">No player accounts yet.</p>
      <?php else: ?>
      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>Username</th><th>Registered</th><th>Reset Password</th><th>Delete</th></tr></thead>
          <tbody>
          <?php foreach($players as $i=>$p): ?>
          <tr>
            <td style="color:#5a6880"><?=$i+1?></td>
            <td><strong><?=htmlspecialchars($p['username'])?></strong></td>
            <td style="color:#6070a0;font-size:12px"><?=$p['created_at']?></td>
            <td>
              <form method="POST" class="reset-form">
                <input type="hidden" name="action" value="reset_password">
                <input type="hidden" name="id" value="<?=$p['id']?>">
                <input type="password" name="new_password" placeholder="New password" minlength="6">
                <button type="submit" class="btn btn-blue btn-sm">Reset</button>
              </form>
            </td>
            <td>
              <form method="POST" onsubmit="return confirm('Delete player \'<?=htmlspecialchars($p['username'],ENT_QUOTES)?>\'?')">
                <input type="hidden" name="action" value="delete_player">
                <input type="hidden" name="id" value="<?=$p['id']?>">
                <button type="submit" class="btn btn-red btn-sm">Delete</button>
              </form>
            </td>
          </tr>
          <?php endforeach; ?>
          </tbody>
        </table>
      </div>
      <?php endif; ?>
    </div>

    <!-- ══════ ADMINS TAB ══════ -->
    <div class="tab-panel <?=$activeTab==='admins'?'active':''?>">
      <div class="page-title">Admin Accounts</div>
      <div class="page-sub">Accounts with access to this panel</div>
      <div class="add-form">
        <h3>➕ Add New Admin</h3>
        <form method="POST">
          <input type="hidden" name="action" value="add_admin">
          <div class="row-flex">
            <div class="form-group"><label>Username</label>
              <input type="text" name="username" placeholder="admin2" required value="<?=htmlspecialchars($_POST['username']??'')?>">
            </div>
            <div class="form-group"><label>Password</label>
              <input type="password" name="password" placeholder="Min 6 chars" required>
            </div>
            <div class="form-group"><label>Confirm</label>
              <input type="password" name="confirm" placeholder="Confirm" required>
            </div>
          </div>
          <button type="submit" class="btn btn-gold" style="padding:9px 22px">Create Admin</button>
        </form>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>Username</th><th>Created</th><th>Remove</th></tr></thead>
          <tbody>
          <?php foreach($admins as $i=>$a): ?>
          <tr>
            <td style="color:#5a6880"><?=$i+1?></td>
            <td><strong><?=htmlspecialchars($a['username'])?></strong>
              <?php if($a['username']===$_SESSION['admin_user']): ?><span class="you-badge">YOU</span><?php endif; ?>
            </td>
            <td style="color:#6070a0;font-size:12px"><?=$a['created_at']?></td>
            <td>
              <?php if($a['username']!==$_SESSION['admin_user']): ?>
              <form method="POST" onsubmit="return confirm('Remove admin \'<?=htmlspecialchars($a['username'],ENT_QUOTES)?>\'?')">
                <input type="hidden" name="action" value="delete_admin">
                <input type="hidden" name="id" value="<?=$a['id']?>">
                <button type="submit" class="btn btn-red btn-sm">Remove</button>
              </form>
              <?php else: ?><span style="font-size:12px;color:#405060">—</span><?php endif; ?>
            </td>
          </tr>
          <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ══════ GAME DATABASE TAB ══════ -->
    <div class="tab-panel <?=$activeTab==='gamedb'?'active':''?>">
      <div class="page-title">Game Database</div>
      <div class="page-sub">Browse and edit tables in <code style="color:#d0a040"><?=DB_NAME?></code>
        — <?=count($dbTables)?> tables total.
        <span style="color:#804040;font-size:11px;margin-left:8px">⚠ Edits are immediate. Server may overwrite on next save.</span>
      </div>

      <!-- Table list -->
      <?php if(!$dbSelTbl): ?>
        <p style="font-size:12px;color:#6070a0;margin-bottom:12px">Click a table to browse its data:</p>
        <div class="db-table-grid">
          <?php foreach($dbTables as $t): ?>
            <a class="db-table-btn" href="admin.php?tab=gamedb&tbl=<?=urlencode($t)?>"><?=htmlspecialchars($t)?></a>
          <?php endforeach; ?>
        </div>

      <?php else: ?>
        <!-- Selected table view -->
        <div class="db-toolbar">
          <a href="admin.php?tab=gamedb" class="db-table-btn">← All tables</a>
          <strong><?=htmlspecialchars($dbSelTbl)?></strong>
          <span style="color:#6070a0;font-size:12px"><?=count($tableRows)?> rows shown (max 100)</span>
        </div>

        <!-- Search bar -->
        <form method="GET" class="search-bar">
          <input type="hidden" name="tab" value="gamedb">
          <input type="hidden" name="tbl" value="<?=htmlspecialchars($dbSelTbl)?>">
          <input type="search" name="search" placeholder="Search any column..." value="<?=htmlspecialchars($dbSearch)?>" style="width:100%;max-width:320px">
          <button type="submit" class="btn btn-blue btn-sm">Search</button>
          <?php if($dbSearch): ?><a href="admin.php?tab=gamedb&tbl=<?=urlencode($dbSelTbl)?>" class="btn btn-gray btn-sm">Clear</a><?php endif; ?>
        </form>

        <!-- Edit panel (single row) -->
        <?php if($editRow && $tablePK): ?>
        <div class="edit-panel">
          <h3>✏ Edit row — <?=htmlspecialchars($tablePK)?> = <?=htmlspecialchars($editRow[$tablePK])?></h3>
          <form method="POST">
            <input type="hidden" name="action" value="db_update_row">
            <input type="hidden" name="tbl"    value="<?=htmlspecialchars($dbSelTbl)?>">
            <input type="hidden" name="pk"     value="<?=htmlspecialchars($tablePK)?>">
            <input type="hidden" name="pkv"    value="<?=htmlspecialchars($editRow[$tablePK])?>">
            <!-- Select which column+value to update -->
            <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end">
              <div class="form-group" style="margin:0">
                <label>Column to edit</label>
                <select name="col" style="width:200px">
                  <?php foreach(array_keys($editRow) as $cn): ?>
                    <?php if($cn===$tablePK) continue; // can't edit PK ?>
                    <option value="<?=htmlspecialchars($cn)?>"><?=htmlspecialchars($cn)?></option>
                  <?php endforeach; ?>
                </select>
              </div>
              <div class="form-group" style="margin:0;flex:1;min-width:180px">
                <label>New value</label>
                <input type="text" name="val" placeholder="Enter new value" style="width:100%">
              </div>
              <button type="submit" class="btn btn-green" style="margin-bottom:0">Save</button>
              <a href="admin.php?tab=gamedb&tbl=<?=urlencode($dbSelTbl)?>&search=<?=urlencode($dbSearch)?>" class="btn btn-gray">Cancel</a>
            </div>
          </form>
          <!-- Show all current values read-only -->
          <div class="edit-grid" style="margin-top:16px">
            <?php foreach($editRow as $cn=>$cv): ?>
            <div class="edit-field <?=$cn===$tablePK?'pk-field':''?>">
              <label><?=htmlspecialchars($cn)?><?=$cn===$tablePK?' (PK)':''?></label>
              <input type="text" value="<?=htmlspecialchars((string)$cv)?>" readonly style="background:rgba(0,0,0,.3);color:<?=$cn===$tablePK?'#8090a8':'#c0d0e0'?>">
            </div>
            <?php endforeach; ?>
          </div>
        </div>
        <?php endif; ?>

        <!-- Data table -->
        <?php if(empty($tableRows)): ?>
          <p style="color:#506080;margin-top:12px">No rows found<?=$dbSearch?' matching "'.htmlspecialchars($dbSearch).'"':''?>.</p>
        <?php else: ?>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Edit</th>
                <?php foreach(array_keys($tableRows[0]) as $cn): ?>
                  <th title="<?=htmlspecialchars($cn)?>"><?=htmlspecialchars(strlen($cn)>16?substr($cn,0,14).'…':$cn)?></th>
                <?php endforeach; ?>
              </tr>
            </thead>
            <tbody>
            <?php foreach($tableRows as $row): ?>
              <?php $pkv = $tablePK ? ($row[$tablePK] ?? '') : ''; ?>
              <tr>
                <td>
                  <a href="admin.php?tab=gamedb&tbl=<?=urlencode($dbSelTbl)?>&pk=<?=urlencode($pkv)?>&search=<?=urlencode($dbSearch)?>"
                     class="btn btn-blue btn-sm">Edit</a>
                </td>
                <?php foreach($row as $cn=>$cv): ?>
                  <?php
                    $cv = (string)$cv;
                    $isNum = is_numeric($cv);
                    $isLong = strlen($cv) > 30;
                    $cls = $isNum ? 'numeric' : ($isLong ? 'long-text' : '');
                  ?>
                  <td class="<?=$cls?>" title="<?=htmlspecialchars($cv)?>"><?=htmlspecialchars(strlen($cv)>30?substr($cv,0,28).'…':$cv)?></td>
                <?php endforeach; ?>
              </tr>
            <?php endforeach; ?>
            </tbody>
          </table>
        </div>
        <?php endif; ?>
      <?php endif; ?>
    </div>

  </main>
</div>
<?php endif; ?>
</body>
</html>
