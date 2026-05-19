<?php
/**
 * admin.php — Game Admin Panel
 * Place at: C:\xampp\htdocs\game\admin.php
 */

session_start();

// Restore flash from session (survives redirects)
$flash = ['type'=>'','msg'=>''];
if (!empty($_SESSION['flash'])) { $flash=$_SESSION['flash']; unset($_SESSION['flash']); }

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'cw02_game1');

// ── Erlang GM bridge ─────────────────────────────────────────────────────────
// Path to escript.exe — adjust if Erlang is installed elsewhere
define('ESCRIPT_EXE',  'C:\\Program Files\\erl9.0\\bin\\escript.exe');
define('GM_ESCRIPT',   'C:\\raconh5\\server_bin\\gm.escript');

// ── Translation file paths ────────────────────────────────────────────────────
define('CW_FILE',    __DIR__ . '/resource/res/cw.txt');
define('CW_ORIG',    __DIR__ . '/resource/res/cw.txt.original');
define('THM_FILE',   __DIR__ . '/resource/default.thm.json');
define('THM_ORIG',   __DIR__ . '/resource/default.thm.json.original');
define('TRANS_FILE', __DIR__ . '/cw_translations.json');

function gmExec(array $args) {
    if (!function_exists('shell_exec')) return 'error|shell_exec_disabled';
    $escript = ESCRIPT_EXE;
    $script  = GM_ESCRIPT;
    if (!file_exists($escript)) return 'error|escript_exe_not_found:'.ESCRIPT_EXE;
    if (!file_exists($script))  return 'error|gm_escript_not_found:'.GM_ESCRIPT;
    $safe = array_map('escapeshellarg', $args);
    $cmd  = "\"$escript\" \"$script\" " . implode(' ', $safe) . ' 2>&1';
    $out  = shell_exec($cmd);
    if ($out === null) return 'error|shell_exec_returned_null';
    return trim($out);
}

function gmGet($roleId) {
    $out = gmExec(['get', (string)(int)$roleId]);
    if (strpos($out, 'ok|') === 0) {
        $p = explode('|', $out);
        return ['lev'=>$p[1],'exp'=>$p[2],'gold'=>$p[3],'gold_bind'=>$p[4],'coin'=>$p[5],'vip_lev'=>$p[6],'online'=>$p[7]];
    }
    return null;
}

function gmFind($account) {
    $out = gmExec(['find', $account]);
    if (strpos($out, 'ok|') === 0) {
        $p = explode('|', $out);
        return ['id'=>$p[1],'name'=>$p[2],'lev'=>$p[3]];
    }
    return null;
}

function gmSet($roleId, $field, $value) {
    $allowed = ['lev','exp','gold','gold_bind','coin','vip_lev'];
    if (!in_array($field, $allowed)) return 'error|invalid_field';
    return gmExec(['set', (string)(int)$roleId, $field, (string)(int)$value]);
}

// ── DB ───────────────────────────────────────────────────────────────────────

function getDB() {
    static $pdo = null;
    if ($pdo) return $pdo;
    $pdo = new PDO(
        'mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8',
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS web_users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(32) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        CREATE TABLE IF NOT EXISTS web_admins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(32) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    ");
    return $pdo;
}

function isLoggedIn()   { return !empty($_SESSION['admin_user']); }
function requireLogin() { if (!isLoggedIn()) { header('Location: admin.php'); exit; } }
function noAdmins()     { return getDB()->query('SELECT COUNT(*) FROM web_admins')->fetchColumn() == 0; }
function safeName($s)   { return preg_replace('/[^a-zA-Z0-9_]/', '', $s); }

// Safe query — returns rows or empty array on any error
function safeQuery($sql, $params = []) {
    try {
        $st = getDB()->prepare($sql);
        $st->execute($params);
        return $st->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        return ['__error__' => $e->getMessage()];
    }
}

// ── Translation binary helpers ────────────────────────────────────────────────

function trRu8($buf,&$pos){return ord($buf[$pos++]);}
function trRu16($buf,&$pos){$v=unpack('n',substr($buf,$pos,2))[1];$pos+=2;return $v;}
function trRu32($buf,&$pos){$v=unpack('N',substr($buf,$pos,4))[1];$pos+=4;return $v;}
function trRstr($buf,&$pos,$len){$s=substr($buf,$pos,$len);$pos+=$len;return $s;}

function cwParse($data){
    $pos=0;$cnt=trRu8($data,$pos);$secs=[];
    for($i=0;$i<$cnt;$i++){
        $nl=trRu16($data,$pos);$nm=trRstr($data,$pos,$nl);
        $dl=trRu32($data,$pos);$sd=trRstr($data,$pos,$dl);
        $secs[]=[$nm,$sd];
    }
    return $secs;
}

function cwBuild($secs){
    $out=chr(count($secs));
    foreach($secs as[$nm,$sd]){$out.=pack('n',strlen($nm)).$nm.pack('N',strlen($sd)).$sd;}
    return $out;
}

function langParse($sec){
    $pos=0;$tc=trRu8($sec,$pos);$tbls=[];
    for($i=0;$i<$tc;$i++){
        $nl=trRu16($sec,$pos);$tn=trRstr($sec,$pos,$nl);
        $ec=trRu16($sec,$pos);$ents=[];
        for($j=0;$j<$ec;$j++){
            $sid=trRu16($sec,$pos);$sl=trRu16($sec,$pos);$sv=trRstr($sec,$pos,$sl);
            $ents[]=[$sid,$sv];
        }
        $tbls[]=[$tn,$ents];
    }
    return $tbls;
}

function langBuild($tbls){
    $out=chr(count($tbls));
    foreach($tbls as[$tn,$ents]){
        $out.=pack('n',strlen($tn)).$tn.pack('n',count($ents));
        foreach($ents as[$sid,$sv]){$out.=pack('n',$sid).pack('n',strlen($sv)).$sv;}
    }
    return $out;
}

function hasCJK($s){return(bool)preg_match('/[\x{4e00}-\x{9fff}\x{3400}-\x{4dbf}]/u',$s);}

function scanCJK($sec){
    $found=[];$len=strlen($sec);$i=0;
    while($i<$len-2){
        $sl=unpack('n',substr($sec,$i,2))[1];
        if($sl>=1&&$sl<=512&&$i+2+$sl<=$len){
            $s=substr($sec,$i+2,$sl);
            if(mb_check_encoding($s,'UTF-8')&&strlen($s)===$sl&&hasCJK($s)){
                $found[]=[$i,$s];$i+=2+$sl;continue;
            }
        }
        $i++;
    }
    return $found;
}

function loadTrans(){
    if(!file_exists(TRANS_FILE))return[];
    $j=json_decode(file_get_contents(TRANS_FILE),true);
    return is_array($j)?$j:[];
}

function saveTrans($t){
    file_put_contents(TRANS_FILE,json_encode($t,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
}

function extractCW(){
    $src=file_exists(CW_ORIG)?CW_ORIG:CW_FILE;
    if(!file_exists($src))return['error'=>'cw.txt not found at '.$src];
    $data=file_get_contents($src);
    $secs=cwParse($data);
    $result=[];
    foreach($secs as[$nm,$sd]){
        if($nm==='language'){
            foreach(langParse($sd)as[$tn,$ents]){
                foreach($ents as[$sid,$sv]){
                    if(hasCJK($sv)){
                        $result["lang|$tn|$sid"]=['cn'=>$sv,'en'=>'','section'=>'language','table'=>$tn,'id'=>$sid];
                    }
                }
            }
        }else{
            foreach(scanCJK($sd)as[$off,$txt]){
                $result["$nm|$off"]=['cn'=>$txt,'en'=>'','section'=>$nm,'offset'=>$off];
            }
        }
    }
    return $result;
}

function applyAllCW($trans){
    $src=file_exists(CW_ORIG)?CW_ORIG:CW_FILE;
    if(!file_exists($src))return'cw.txt not found';
    if(!file_exists(CW_ORIG))copy(CW_FILE,CW_ORIG);
    $secs=cwParse(file_get_contents($src));
    $newSecs=[];$cnt=0;
    foreach($secs as[$nm,$sd]){
        if($nm==='language'){
            $nTbls=[];
            foreach(langParse($sd)as[$tn,$ents]){
                $nEnts=[];
                foreach($ents as[$sid,$sv]){
                    $k="lang|$tn|$sid";
                    if(isset($trans[$k])&&$trans[$k]['en']!==''){$nEnts[]=[$sid,$trans[$k]['en']];$cnt++;}
                    else $nEnts[]=[$sid,$sv];
                }
                $nTbls[]=[$tn,$nEnts];
            }
            $sd=langBuild($nTbls);
        }else{
            $tmap=[];
            foreach(scanCJK($sd)as[$off,$txt]){
                $k="$nm|$off";
                if(isset($trans[$k])&&$trans[$k]['en']!==''&&$trans[$k]['en']!==$txt)
                    $tmap[$off]=[$txt,$trans[$k]['en']];
            }
            if($tmap){
                ksort($tmap);$nd='';$cur=0;
                foreach($tmap as$off=>[$ot,$et]){
                    $sl=unpack('n',substr($sd,$off,2))[1];
                    if($sl!==strlen($ot))continue;
                    $nd.=substr($sd,$cur,$off-$cur).pack('n',strlen($et)).$et;
                    $cur=$off+2+strlen($ot);$cnt++;
                }
                $sd=$nd.substr($sd,$cur);
            }
        }
        $newSecs[]=[$nm,$sd];
    }
    $out=cwBuild($newSecs);
    file_put_contents(CW_FILE,$out);
    return"Applied $cnt translations. New size: ".number_format(strlen($out))." bytes.";
}

function applyThmTrans($trans){
    $src=file_exists(THM_ORIG)?THM_ORIG:THM_FILE;
    if(!file_exists($src))return'thm.json not found';
    if(!file_exists(THM_ORIG))copy(THM_FILE,THM_ORIG);
    $data=json_decode(file_get_contents($src),true);
    if(!is_array($data))return'Invalid thm.json';
    $cnt=0;
    foreach($data as$k=>$v){
        $tk="thm|$k";
        if(isset($trans[$tk])&&$trans[$tk]['en']!==''){$data[$k]=$trans[$tk]['en'];$cnt++;}
    }
    file_put_contents(THM_FILE,json_encode($data,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
    return"Applied $cnt thm.json translations.";
}

// ── POST handler ──────────────────────────────────────────────────────────────

if (empty($flash['msg'])) $flash = ['type' => '', 'msg' => ''];
$action = $_POST['action'] ?? '';

if ($action === 'setup') {
    $u=$_POST['username']??''; $p=$_POST['password']??''; $c=$_POST['confirm']??'';
    if (!preg_match('/^[a-zA-Z0-9_]{3,20}$/',$u))
        $flash=['type'=>'error','msg'=>'Username: 3–20 chars, letters/numbers/underscore.'];
    elseif (strlen($p)<6)
        $flash=['type'=>'error','msg'=>'Password must be at least 6 characters.'];
    elseif ($p!==$c)
        $flash=['type'=>'error','msg'=>'Passwords do not match.'];
    else {
        getDB()->prepare('INSERT INTO web_admins(username,password_hash) VALUES(?,?)')
               ->execute([$u,password_hash($p,PASSWORD_BCRYPT)]);
        $flash=['type'=>'success','msg'=>'Admin created. Please log in.'];
    }

} elseif ($action === 'login') {
    $u=$_POST['username']??''; $p=$_POST['password']??'';
    $st=getDB()->prepare('SELECT password_hash FROM web_admins WHERE username=?');
    $st->execute([$u]); $row=$st->fetch(PDO::FETCH_ASSOC);
    if ($row && password_verify($p,$row['password_hash'])) {
        $_SESSION['admin_user']=$u; header('Location: admin.php?tab=players'); exit;
    }
    $flash=['type'=>'error','msg'=>'Incorrect username or password.'];

} elseif ($action === 'logout') {
    session_destroy(); header('Location: admin.php'); exit;

} elseif ($action === 'delete_player') {
    requireLogin();
    getDB()->prepare('DELETE FROM web_users WHERE id=?')->execute([(int)$_POST['id']]);
    header('Location: admin.php?tab=players&ok=deleted'); exit;

} elseif ($action === 'reset_password') {
    requireLogin();
    $np=$_POST['new_password']??'';
    if (strlen($np)<6) $flash=['type'=>'error','msg'=>'Password must be at least 6 characters.'];
    else { getDB()->prepare('UPDATE web_users SET password_hash=? WHERE id=?')
                  ->execute([password_hash($np,PASSWORD_BCRYPT),(int)$_POST['id']]);
           header('Location: admin.php?tab=players&ok=reset'); exit; }

} elseif ($action === 'add_admin') {
    requireLogin();
    $u=$_POST['username']??''; $p=$_POST['password']??''; $c=$_POST['confirm']??'';
    if (!preg_match('/^[a-zA-Z0-9_]{3,20}$/',$u)) $flash=['type'=>'error','msg'=>'Username: 3–20 chars.'];
    elseif (strlen($p)<6) $flash=['type'=>'error','msg'=>'Password min 6 chars.'];
    elseif ($p!==$c) $flash=['type'=>'error','msg'=>'Passwords do not match.'];
    else {
        try { getDB()->prepare('INSERT INTO web_admins(username,password_hash) VALUES(?,?)')
                     ->execute([$u,password_hash($p,PASSWORD_BCRYPT)]);
              header('Location: admin.php?tab=admins&ok=added'); exit;
        } catch (PDOException $e) { $flash=['type'=>'error','msg'=>'Username already exists.']; }
    }

} elseif ($action === 'delete_admin') {
    requireLogin();
    $id=(int)$_POST['id'];
    $st=getDB()->prepare('SELECT username FROM web_admins WHERE id=?'); $st->execute([$id]);
    $target=$st->fetchColumn();
    if ($target===$_SESSION['admin_user']) $flash=['type'=>'error','msg'=>'Cannot delete yourself.'];
    elseif (getDB()->query('SELECT COUNT(*) FROM web_admins')->fetchColumn()<=1)
        $flash=['type'=>'error','msg'=>'Cannot delete the last admin.'];
    else { getDB()->prepare('DELETE FROM web_admins WHERE id=?')->execute([$id]);
           header('Location: admin.php?tab=admins&ok=deleted'); exit; }

} elseif ($action === 'gm_set_stat') {
    requireLogin();
    $rid   = (int)($_POST['rid']   ?? 0);
    $field = $_POST['field'] ?? '';
    $val   = (int)($_POST['value'] ?? 0);
    if ($rid && $field) {
        $out = gmSet($rid, $field, $val);
        if ($out === 'ok') {
            $flash = ['type'=>'success','msg'=>"Saved: $field = ".number_format($val)];
        } else {
            $p = explode('|', $out);
            $reason = $p[1] ?? $out;
            if ($reason === 'player_must_be_offline')
                $flash = ['type'=>'error','msg'=>'Player is currently online — log out first, then edit.'];
            elseif ($reason === 'escript_not_found')
                $flash = ['type'=>'error','msg'=>'gm.escript not found. Copy it to C:\\raconh5\\server_bin\\'];
            else
                $flash = ['type'=>'error','msg'=>'GM error: '.$reason];
        }
    }
    $_SESSION['flash'] = $flash;
    header('Location: admin.php?tab=player&rid='.$rid); exit;

} elseif ($action === 'update_role_field') {
    requireLogin();
    $rid  = (int)($_POST['rid'] ?? 0);
    $col  = safeName($_POST['col'] ?? '');
    $val  = $_POST['val'] ?? '';
    $rtbl = safeName($_POST['rtbl'] ?? 't_role');
    $rpk  = safeName($_POST['rpk']  ?? 'rid');
    if ($rid && $col && $rtbl) {
        try {
            getDB()->prepare("UPDATE `$rtbl` SET `$col`=? WHERE `$rpk`=?")
                   ->execute([$val, $rid]);
            $flash = ['type'=>'success', 'msg'=>"Updated `$col` for $rpk=$rid"];
        } catch (PDOException $e) {
            $flash = ['type'=>'error', 'msg'=>'Update failed: '.$e->getMessage()];
        }
    }
    header('Location: admin.php?tab=player&rtbl='.urlencode($rtbl).'&search='.urlencode($_POST['search']??'').'&ok_field=1');
    exit;

} elseif ($action === 'db_update_row') {
    requireLogin();
    $tbl=safeName($_POST['tbl']??''); $pk=safeName($_POST['pk']??'');
    $col=safeName($_POST['col']??''); $pkv=$_POST['pkv']??''; $val=$_POST['val']??'';
    if ($tbl&&$pk&&$col) {
        try { getDB()->prepare("UPDATE `$tbl` SET `$col`=? WHERE `$pk`=?")->execute([$val,$pkv]);
              $flash=['type'=>'success','msg'=>"Updated `$tbl`.`$col`"];
        } catch (PDOException $e) { $flash=['type'=>'error','msg'=>'Update failed: '.$e->getMessage()]; }
    }
    header('Location: admin.php?tab=gamedb&tbl='.$tbl.'&pk='.$pk.'&search='.urlencode($pkv)); exit;

} elseif ($action === 'tr_extract') {
    requireLogin();
    $extracted = extractCW();
    if (isset($extracted['error'])) {
        $_SESSION['flash'] = ['type'=>'error','msg'=>$extracted['error']];
    } else {
        $existing = loadTrans();
        $added = 0;
        foreach ($extracted as $k => $v) {
            if (!isset($existing[$k])) { $existing[$k] = $v; $added++; }
        }
        saveTrans($existing);
        $total = count($extracted);
        $_SESSION['flash'] = ['type'=>'success','msg'=>"Extracted $total strings ($added new). Ready to translate."];
    }
    header('Location: admin.php?tab=translation'); exit;

} elseif ($action === 'tr_save') {
    requireLogin();
    $trans = loadTrans();
    $edits = $_POST['tr'] ?? [];
    $saved = 0;
    foreach ($edits as $k => $en) {
        $k = base64_decode($k);
        if (isset($trans[$k])) { $trans[$k]['en'] = trim($en); $saved++; }
    }
    saveTrans($trans);
    $_SESSION['flash'] = ['type'=>'success','msg'=>"Saved $saved translations."];
    $redir = 'admin.php?tab=translation';
    if (!empty($_POST['tsec']))    $redir .= '&tsec='.urlencode($_POST['tsec']);
    if (!empty($_POST['tsearch'])) $redir .= '&tsearch='.urlencode($_POST['tsearch']);
    if (!empty($_POST['tpage']))   $redir .= '&tpage='.intval($_POST['tpage']);
    header('Location: '.$redir); exit;

} elseif ($action === 'tr_apply') {
    requireLogin();
    $msg = applyAllCW(loadTrans());
    $_SESSION['flash'] = ['type'=>'success','msg'=>$msg];
    header('Location: admin.php?tab=translation'); exit;

} elseif ($action === 'tr_applythm') {
    requireLogin();
    $msg = applyThmTrans(loadTrans());
    $_SESSION['flash'] = ['type'=>'success','msg'=>$msg];
    header('Location: admin.php?tab=translation'); exit;

} elseif ($action === 'tr_restore') {
    requireLogin();
    if (file_exists(CW_ORIG)) {
        copy(CW_ORIG, CW_FILE);
        $_SESSION['flash'] = ['type'=>'success','msg'=>'cw.txt restored from original backup.'];
    } else {
        $_SESSION['flash'] = ['type'=>'error','msg'=>'No backup found (cw.txt.original missing).'];
    }
    header('Location: admin.php?tab=translation'); exit;

} elseif ($action === 'tr_clear') {
    requireLogin();
    if (file_exists(TRANS_FILE)) unlink(TRANS_FILE);
    $_SESSION['flash'] = ['type'=>'success','msg'=>'Translation data cleared.'];
    header('Location: admin.php?tab=translation'); exit;
}

// URL flash
if (empty($flash['msg'])&&isset($_GET['ok'])) {
    $m=['deleted'=>'Deleted.','reset'=>'Password reset.','added'=>'Admin added.'];
    if(isset($m[$_GET['ok']])) $flash=['type'=>'success','msg'=>$m[$_GET['ok']]];
}
if (empty($flash['msg'])&&isset($_GET['ok_field'])) {
    $flash=['type'=>'success','msg'=>'Field updated successfully.'];
}

// ── Page data ─────────────────────────────────────────────────────────────────

$activeTab = $_GET['tab'] ?? 'players';
$trTrans = []; $trSections = []; $trRows = []; $trFilter = ''; $trSearch = '';
$trPage = 1; $trTotal = 0; $trDone = 0; $trPageCount = 1;
$trCwExists = file_exists(CW_FILE); $trOrigExists = file_exists(CW_ORIG);
$setupMode = noAdmins();

$players=$admins=$stats=[];
$dbTables=$tableColumns=$tableRows=[];
$tablePK=''; $editRow=null;
$dbSearch=trim($_GET['search']??'');
$dbSelTbl=safeName($_GET['tbl']??'');

// Player tab
$playerSearch = trim($_GET['search'] ?? '');

if (isLoggedIn()) {
    $db = getDB();
    $players = $db->query('SELECT id,username,created_at FROM web_users ORDER BY created_at DESC')
                  ->fetchAll(PDO::FETCH_ASSOC);
    $admins  = $db->query('SELECT id,username,created_at FROM web_admins ORDER BY created_at ASC')
                  ->fetchAll(PDO::FETCH_ASSOC);
    $stats = ['total_players'=>count($players), 'total_admins'=>count($admins),
              'newest'=>$players?$players[0]['username']:'—'];

    // ── Player tab ──
    if ($activeTab === 'player') {
        try {
            $allTables = $db->query('SHOW TABLES')->fetchAll(PDO::FETCH_COLUMN);
        } catch (PDOException $e) { $allTables = []; }

        // Player data is in Mnesia (memory), not MySQL columns.
        // Read-only info available from t_log_register + activity logs.
        $logRegCols  = [];
        $logRegRows  = [];
        $logLvlRows  = [];   // recent level-ups
        $logGoldRows = [];   // recent gold gains
        $hasLogReg   = in_array('t_log_register', $allTables);
        $hasLogLv    = in_array('t_log_level',    $allTables);
        $hasLogGold  = in_array('t_log_gold_add', $allTables);

        if ($hasLogReg) {
            $lrc = safeQuery("DESCRIBE `t_log_register`");
            if (!isset($lrc['__error__'])) $logRegCols = array_column($lrc, 'Field');

            if ($playerSearch !== '') {
                $parts=[]; $prms=[];
                foreach (['account','name','nick_name','role_name'] as $c) {
                    if (in_array($c,$logRegCols)) { $parts[]="`$c` LIKE ?"; $prms[]='%'.$playerSearch.'%'; }
                }
                $logRegRows = $parts
                    ? safeQuery("SELECT * FROM t_log_register WHERE ".implode(' OR ',$parts)." ORDER BY id DESC LIMIT 20",$prms)
                    : safeQuery("SELECT * FROM t_log_register ORDER BY id DESC LIMIT 20");
            } else {
                $logRegRows = safeQuery("SELECT * FROM t_log_register ORDER BY id DESC LIMIT 50");
            }
            if (isset($logRegRows['__error__'])) $logRegRows = [];

            // For searched player, get latest level-up and gold activity
            if ($playerSearch && $hasLogLv) {
                $ridField = in_array('rid',$logRegCols) ? 'rid' : null;
                $accField = in_array('account',$logRegCols) ? 'account' : null;
                $lvCols = safeQuery("DESCRIBE `t_log_level`");
                if (!isset($lvCols['__error__'])) {
                    $lvColNames = array_column($lvCols, 'Field');
                    $wp=[]; $wv=[];
                    foreach (['account','name'] as $c) {
                        if(in_array($c,$lvColNames)){$wp[]="`$c` LIKE ?";$wv[]='%'.$playerSearch.'%';}
                    }
                    if ($wp) $logLvlRows = safeQuery("SELECT * FROM t_log_level WHERE ".implode(' OR ',$wp)." ORDER BY id DESC LIMIT 10",$wv);
                    if (isset($logLvlRows['__error__'])) $logLvlRows = [];
                }
            }
            if ($playerSearch && $hasLogGold) {
                $goldCols = safeQuery("DESCRIBE `t_log_gold_add`");
                if (!isset($goldCols['__error__'])) {
                    $gcns = array_column($goldCols,'Field');
                    $wp=[]; $wv=[];
                    foreach (['account','name'] as $c) {
                        if(in_array($c,$gcns)){$wp[]="`$c` LIKE ?";$wv[]='%'.$playerSearch.'%';}
                    }
                    if ($wp) $logGoldRows = safeQuery("SELECT * FROM t_log_gold_add WHERE ".implode(' OR ',$wp)." ORDER BY id DESC LIMIT 10",$wv);
                    if (isset($logGoldRows['__error__'])) $logGoldRows = [];
                }
            }
        }

        // ── GM stat editor (lookup by account or direct role ID) ──
        $gmRoleId   = (int)($_GET['rid'] ?? 0);
        $gmStats    = null;
        $gmFoundRole = null;
        if ($gmRoleId) {
            $gmStats = gmGet($gmRoleId);
        } elseif ($playerSearch) {
            // Try to find role ID by account name via escript
            $found = gmFind($playerSearch);
            if ($found) {
                $gmFoundRole = $found;
                $gmRoleId    = (int)$found['id'];
                $gmStats     = gmGet($gmRoleId);
            }
        }
    }

    // ── Translation tab ──
    if ($activeTab === 'translation') {
        $trTrans  = loadTrans();
        $trFilter = $_GET['tsec']    ?? '';
        $trSearch = trim($_GET['tsearch'] ?? '');
        $trPage   = max(1, (int)($_GET['tpage'] ?? 1));
        $perPage  = 100;

        $secMap = [];
        foreach ($trTrans as $k => $v) {
            $s = $v['section'];
            if (!isset($secMap[$s])) $secMap[$s] = ['total'=>0,'done'=>0];
            $secMap[$s]['total']++;
            if ($v['en'] !== '') $secMap[$s]['done']++;
        }
        ksort($secMap);
        $trSections = $secMap;
        $trTotal    = count($trTrans);
        $trDone     = count(array_filter($trTrans, fn($r)=>$r['en']!==''));

        $filtered = [];
        foreach ($trTrans as $k => $v) {
            if ($trFilter && $v['section'] !== $trFilter) continue;
            if ($trSearch !== '' && stripos($v['cn'],$trSearch)===false && stripos($v['en'],$trSearch)===false) continue;
            $filtered[$k] = $v;
        }
        $trPageCount = max(1, (int)ceil(count($filtered)/$perPage));
        $trPage = min($trPage, $trPageCount);
        $trRows = array_slice($filtered, ($trPage-1)*$perPage, $perPage, true);
    }

    // ── Game DB tab ──
    if ($activeTab === 'gamedb') {
        // SHOW TABLES — safe
        try {
            $dbTables = $db->query('SHOW TABLES')->fetchAll(PDO::FETCH_COLUMN);
        } catch (PDOException $e) { $dbTables = []; }

        if ($dbSelTbl) {
            $cols = safeQuery("DESCRIBE `$dbSelTbl`");
            if (isset($cols['__error__'])) {
                $flash = ['type'=>'error','msg'=>"Cannot read table `$dbSelTbl`: ".$cols['__error__']];
                $dbSelTbl = '';
            } else {
                $tableColumns = $cols;
                foreach ($cols as $c) { if ($c['Key']==='PRI') { $tablePK=$c['Field']; break; } }
                if (!$tablePK && $cols) $tablePK=$cols[0]['Field'];
                $colNames = array_column($cols,'Field');

                if ($dbSearch !== '') {
                    $parts=[]; $params=[];
                    foreach ($colNames as $cn) { $parts[]="`$cn` LIKE ?"; $params[]='%'.$dbSearch.'%'; }
                    $tableRows = safeQuery("SELECT * FROM `$dbSelTbl` WHERE ".implode(' OR ',$parts)." LIMIT 100",$params);
                } else {
                    $tableRows = safeQuery("SELECT * FROM `$dbSelTbl` LIMIT 100");
                }
                if (isset($tableRows['__error__'])) {
                    $flash=['type'=>'error','msg'=>"Cannot read `$dbSelTbl`: ".$tableRows['__error__']];
                    $tableRows=[];
                }

                $editPKval=$_GET['pk']??null;
                if ($editPKval!==null && $tablePK) {
                    $r=safeQuery("SELECT * FROM `$dbSelTbl` WHERE `$tablePK`=? LIMIT 1",[$editPKval]);
                    if(!empty($r)&&!isset($r['__error__'])) $editRow=$r[0];
                }
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
.auth-wrap{display:flex;align-items:center;justify-content:center;min-height:100vh;
  background-image:radial-gradient(ellipse at 20% 50%,rgba(80,20,120,.3) 0%,transparent 60%),
                   radial-gradient(ellipse at 80% 20%,rgba(20,60,120,.3) 0%,transparent 60%)}
.auth-card{width:100%;max-width:380px;padding:16px}
.auth-card h1{text-align:center;font-size:22px;letter-spacing:2px;color:#f0c060;margin-bottom:6px}
.auth-card .sub{text-align:center;font-size:12px;color:#6070a0;margin-bottom:22px}
.box{background:rgba(255,255,255,.05);border:1px solid rgba(240,180,60,.2);border-radius:10px;padding:24px}
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
.page-title{font-size:19px;font-weight:600;color:#e0e8f8;margin-bottom:4px}
.page-sub{font-size:13px;color:#5a6880;margin-bottom:22px}
.alert{padding:10px 14px;border-radius:6px;font-size:13px;margin-bottom:18px}
.alert-error{background:rgba(180,40,40,.2);border:1px solid rgba(200,60,60,.4);color:#f08080}
.alert-success{background:rgba(40,140,60,.2);border:1px solid rgba(60,180,80,.4);color:#80d090}
.alert-info{background:rgba(40,80,160,.15);border:1px solid rgba(60,120,200,.3);color:#90b8f0}
.form-group{margin-bottom:14px}
.form-group label{display:block;font-size:12px;color:#8898b0;margin-bottom:5px}
input[type=text],input[type=password],input[type=search],input[type=number],select,textarea{
  padding:8px 11px;background:rgba(0,0,10,.5);border:1px solid rgba(240,180,60,.2);
  border-radius:6px;color:#dde0e8;font-size:13px;outline:none;transition:border-color .2s}
input:focus,select:focus,textarea:focus{border-color:#f0c060}
.btn{display:inline-flex;align-items:center;gap:5px;padding:8px 15px;border:none;border-radius:6px;
  cursor:pointer;font-size:13px;font-weight:600;transition:opacity .15s;text-decoration:none}
.btn:hover{opacity:.85}
.btn-gold{background:linear-gradient(135deg,#a06818,#d09828);color:#1a0f00}
.btn-gold-w{width:100%;justify-content:center;padding:11px;font-size:15px}
.btn-sm{padding:4px 10px;font-size:12px;border-radius:4px}
.btn-red{background:rgba(160,40,40,.8);color:#ffd0d0}
.btn-blue{background:rgba(40,80,160,.8);color:#d0e0ff}
.btn-green{background:rgba(30,120,60,.8);color:#b0f0c0}
.btn-gray{background:rgba(60,70,90,.8);color:#c0c8d8}
.stats{display:flex;gap:14px;margin-bottom:24px;flex-wrap:wrap}
.stat-box{background:rgba(255,255,255,.04);border:1px solid rgba(240,180,60,.15);
  border-radius:8px;padding:14px 20px;min-width:140px}
.stat-box .val{font-size:26px;font-weight:700;color:#f0c060}
.stat-box .lbl{font-size:12px;color:#607090;margin-top:2px}
.table-wrap{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);
  border-radius:8px;overflow:auto;max-height:500px}
table{width:100%;border-collapse:collapse;font-size:13px}
thead{background:rgba(240,180,60,.08);position:sticky;top:0;z-index:1}
th{padding:9px 11px;text-align:left;font-size:11px;color:#8090a8;font-weight:600;
  letter-spacing:.5px;text-transform:uppercase;white-space:nowrap}
td{padding:8px 11px;border-top:1px solid rgba(255,255,255,.05);vertical-align:middle}
tr:hover td{background:rgba(255,255,255,.03)}
.tab-panel{display:none}
.tab-panel.active{display:block}
.add-form{background:rgba(255,255,255,.03);border:1px solid rgba(240,180,60,.14);
  border-radius:8px;padding:20px;max-width:600px;margin-bottom:20px}
.add-form h3{font-size:14px;color:#c8d0e0;margin-bottom:14px}
.row-flex{display:flex;gap:10px;flex-wrap:wrap}
.row-flex .form-group{flex:1;min-width:120px}
.row-flex input{width:100%}
.you-badge{font-size:10px;background:rgba(240,180,60,.15);color:#a07820;padding:1px 6px;border-radius:8px;margin-left:6px}
.reset-form{display:flex;gap:5px;align-items:center}
.reset-form input{width:120px}

/* ── Player tab specific ── */
.search-box{display:flex;gap:8px;margin-bottom:20px;align-items:center}
.search-box input{flex:1;max-width:360px;font-size:14px;padding:9px 13px}
.player-card{background:rgba(20,30,55,.7);border:1px solid rgba(240,180,60,.25);
  border-radius:10px;padding:20px;margin-bottom:20px}
.player-card .player-name{font-size:16px;font-weight:700;color:#f0c060;margin-bottom:4px}
.player-card .player-meta{font-size:12px;color:#6070a0;margin-bottom:16px}
.stat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px}
.stat-item{background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.07);border-radius:6px;padding:10px 12px}
.stat-item .stat-label{font-size:11px;color:#7080a0;margin-bottom:4px}
.stat-item .stat-value{font-size:16px;font-weight:600;color:#d0e0a0;font-family:monospace}
.stat-item.editable .stat-value{color:#e0c060}
.edit-row-inline{display:flex;gap:6px;margin-top:6px;align-items:center}
.edit-row-inline input{flex:1;padding:5px 8px;font-size:13px}
.all-fields{margin-top:16px;border-top:1px solid rgba(255,255,255,.06);padding-top:14px}
.all-fields summary{font-size:12px;color:#6070a0;cursor:pointer;margin-bottom:8px}
.all-fields-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;margin-top:8px}
.field-pair{display:flex;flex-direction:column;gap:2px}
.field-pair .fn{font-size:11px;color:#5060a0}
.field-pair .fv{font-size:12px;color:#909898;font-family:monospace;
  background:rgba(0,0,0,.3);padding:3px 6px;border-radius:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

/* ── Game DB tab ── */
.db-table-grid{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:22px}
.db-tbl-btn{padding:6px 13px;background:rgba(40,60,100,.5);border:1px solid rgba(100,140,200,.2);
  border-radius:6px;color:#90a8d0;font-size:12px;text-decoration:none;transition:all .15s}
.db-tbl-btn:hover,.db-tbl-btn.sel{background:rgba(240,180,60,.15);border-color:rgba(240,180,60,.4);color:#f0c060}
.db-toolbar{display:flex;gap:10px;align-items:center;margin-bottom:12px;flex-wrap:wrap}
.db-toolbar strong{color:#e0c060;font-size:14px}
td.num{color:#90d0a0;font-family:monospace}
td.trunc{max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#8090a8;font-size:12px}
.edit-panel{background:rgba(20,30,60,.5);border:1px solid rgba(240,180,60,.2);
  border-radius:8px;padding:20px;margin-bottom:18px}
.edit-panel h3{font-size:14px;color:#f0c060;margin-bottom:14px}
.edit-fields-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px}
.ef{display:flex;flex-direction:column;gap:3px}
.ef label{font-size:11px;color:#6070a0}
.ef input{font-size:12px;padding:5px 8px}

/* ── Translation tab ── */
.tr-toolbar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:16px}
.tr-sec-list{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
.tr-sec-btn{padding:4px 11px;background:rgba(40,60,100,.5);border:1px solid rgba(100,140,200,.2);
  border-radius:14px;color:#90a8d0;font-size:12px;cursor:pointer;text-decoration:none;white-space:nowrap}
.tr-sec-btn:hover,.tr-sec-btn.sel{background:rgba(240,180,60,.15);border-color:rgba(240,180,60,.4);color:#f0c060}
.tr-progress{height:6px;background:rgba(255,255,255,.07);border-radius:3px;margin-bottom:14px}
.tr-progress-bar{height:100%;background:linear-gradient(90deg,#a06818,#d09828);border-radius:3px;transition:width .3s}
.tr-table td{padding:6px 8px;vertical-align:top}
.tr-cn{color:#a0b0c0;font-size:12px;max-width:280px;word-break:break-all}
.tr-key{color:#405060;font-size:10px;font-family:monospace;max-width:140px;overflow:hidden;
  text-overflow:ellipsis;white-space:nowrap}
.tr-input{width:100%;min-width:200px;padding:5px 8px;font-size:12px;background:rgba(0,0,10,.5);
  border:1px solid rgba(240,180,60,.2);border-radius:4px;color:#dde0e8}
.tr-input:focus{border-color:#f0c060;outline:none}
.tr-input.has-val{border-color:rgba(60,180,80,.4);color:#b0e8b0}
.tr-stats{display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap}
.tr-stat{background:rgba(255,255,255,.04);border:1px solid rgba(240,180,60,.12);
  border-radius:6px;padding:10px 16px}
.tr-stat .v{font-size:22px;font-weight:700;color:#f0c060}
.tr-stat .l{font-size:11px;color:#607090}
.tr-pager{display:flex;gap:6px;align-items:center;margin-top:12px;flex-wrap:wrap}
.tr-pager a,.tr-pager span{padding:4px 10px;background:rgba(40,60,100,.4);border:1px solid rgba(100,140,200,.2);
  border-radius:4px;color:#90a8d0;font-size:12px;text-decoration:none}
.tr-pager a:hover{border-color:rgba(240,180,60,.4);color:#f0c060}
.tr-pager span.cur{background:rgba(240,180,60,.15);border-color:rgba(240,180,60,.4);color:#f0c060}
</style>
</head>
<body>

<?php if ($setupMode): ?>
<div class="auth-wrap"><div class="auth-card">
  <h1>⚙ FIRST-TIME SETUP</h1><p class="sub">Create the first admin account.</p>
  <?php if($flash['msg']): ?><div class="alert alert-<?=$flash['type']?>"><?=htmlspecialchars($flash['msg'])?></div><?php endif; ?>
  <div class="box"><form method="POST"><input type="hidden" name="action" value="setup">
    <div class="form-group"><label>Admin Username</label><input type="text" name="username" required style="width:100%" value="<?=htmlspecialchars($_POST['username']??'')?>"></div>
    <div class="form-group"><label>Password (min 6)</label><input type="password" name="password" required style="width:100%"></div>
    <div class="form-group"><label>Confirm Password</label><input type="password" name="confirm" required style="width:100%"></div>
    <button type="submit" class="btn btn-gold btn-gold-w">CREATE ADMIN</button>
  </form></div>
</div></div>

<?php elseif (!isLoggedIn()): ?>
<div class="auth-wrap"><div class="auth-card">
  <h1>🛡 ADMIN PANEL</h1><p class="sub">Game management portal</p>
  <?php if($flash['msg']): ?><div class="alert alert-<?=$flash['type']?>"><?=htmlspecialchars($flash['msg'])?></div><?php endif; ?>
  <div class="box"><form method="POST"><input type="hidden" name="action" value="login">
    <div class="form-group"><label>Username</label><input type="text" name="username" autofocus required style="width:100%" value="<?=htmlspecialchars($_POST['username']??'')?>"></div>
    <div class="form-group"><label>Password</label><input type="password" name="password" required style="width:100%"></div>
    <button type="submit" class="btn btn-gold btn-gold-w">LOGIN</button>
  </form>
  <div style="text-align:center;margin-top:14px"><a href="login.php" style="font-size:12px;color:#506080;text-decoration:none">← Player Login</a></div>
  </div>
</div></div>

<?php else: ?>
<div class="layout">
  <aside class="sidebar">
    <div class="brand">⚔ GAME ADMIN<small><?=htmlspecialchars($_SESSION['admin_user'])?></small></div>
    <a href="admin.php?tab=players" class="nav-item <?=$activeTab==='players'?'active':''?>">👥 Player Accounts</a>
    <a href="admin.php?tab=player"  class="nav-item <?=$activeTab==='player' ?'active':''?>">⚔ Player Stats</a>
    <a href="admin.php?tab=admins"  class="nav-item <?=$activeTab==='admins' ?'active':''?>">🛡 Admin Accounts</a>
    <a href="admin.php?tab=gamedb"       class="nav-item <?=$activeTab==='gamedb'      ?'active':''?>">🗄 Game Database</a>
    <a href="admin.php?tab=translation"  class="nav-item <?=$activeTab==='translation' ?'active':''?>">🌐 Translation</a>
    <div class="sidebar-footer">
      <a href="login.php" class="nav-item" style="border-left:none;font-size:12px;padding:8px 0">🎮 Player Login</a>
      <form method="POST" style="margin-top:6px"><input type="hidden" name="action" value="logout">
        <button type="submit" class="btn btn-gray" style="width:100%;font-size:12px">Logout</button>
      </form>
    </div>
  </aside>

  <main class="main">
    <?php if($flash['msg']): ?><div class="alert alert-<?=$flash['type']?>"><?=htmlspecialchars($flash['msg'])?></div><?php endif; ?>

    <!-- ══ PLAYER ACCOUNTS ══ -->
    <div class="tab-panel <?=$activeTab==='players'?'active':''?>">
      <div class="page-title">Player Accounts</div>
      <div class="page-sub">Web portal login accounts</div>
      <div class="stats">
        <div class="stat-box"><div class="val"><?=$stats['total_players']?></div><div class="lbl">Total Players</div></div>
        <div class="stat-box"><div class="val" style="font-size:17px"><?=htmlspecialchars($stats['newest'])?></div><div class="lbl">Newest Player</div></div>
      </div>
      <?php if(empty($players)): ?><p style="color:#506080;font-size:14px">No accounts yet.</p>
      <?php else: ?>
      <div class="table-wrap"><table>
        <thead><tr><th>#</th><th>Username</th><th>Registered</th><th>Reset Password</th><th>Delete</th></tr></thead>
        <tbody>
        <?php foreach($players as $i=>$p): ?>
        <tr>
          <td style="color:#5a6880"><?=$i+1?></td>
          <td><strong><?=htmlspecialchars($p['username'])?></strong></td>
          <td style="color:#6070a0;font-size:12px"><?=$p['created_at']?></td>
          <td><form method="POST" class="reset-form">
            <input type="hidden" name="action" value="reset_password">
            <input type="hidden" name="id" value="<?=$p['id']?>">
            <input type="password" name="new_password" placeholder="New password" minlength="6">
            <button type="submit" class="btn btn-blue btn-sm">Reset</button>
          </form></td>
          <td><form method="POST" onsubmit="return confirm('Delete \'<?=htmlspecialchars($p['username'],ENT_QUOTES)?>\'?')">
            <input type="hidden" name="action" value="delete_player">
            <input type="hidden" name="id" value="<?=$p['id']?>">
            <button type="submit" class="btn btn-red btn-sm">Delete</button>
          </form></td>
        </tr>
        <?php endforeach; ?>
        </tbody>
      </table></div>
      <?php endif; ?>
    </div>

    <!-- ══ PLAYER STATS ══ -->
    <div class="tab-panel <?=$activeTab==='player'?'active':''?>">
      <div class="page-title">⚔ Player Stats</div>
      <div class="page-sub">Search by account name to view and edit Mnesia stats. Player must be <strong>offline</strong> to save changes.</div>

      <!-- Search form -->
      <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:20px;align-items:flex-end">
        <form method="GET" style="display:flex;gap:8px;align-items:center">
          <input type="hidden" name="tab" value="player">
          <div>
            <div style="font-size:11px;color:#6070a0;margin-bottom:4px">Account name</div>
            <input type="search" name="search" value="<?=htmlspecialchars($playerSearch)?>"
                   placeholder="e.g. clientName, Kenny…" style="width:220px;padding:9px 12px;font-size:13px">
          </div>
          <button type="submit" class="btn btn-gold" style="margin-top:14px">Load</button>
          <?php if($playerSearch): ?><a href="admin.php?tab=player" class="btn btn-gray" style="margin-top:14px">✕</a><?php endif; ?>
        </form>
        <form method="GET" style="display:flex;gap:8px;align-items:center">
          <input type="hidden" name="tab" value="player">
          <div>
            <div style="font-size:11px;color:#6070a0;margin-bottom:4px">Role ID (direct)</div>
            <input type="number" name="rid" value="<?=$gmRoleId?:''?>"
                   placeholder="e.g. 100010000012" style="width:200px;padding:9px 12px;font-size:13px">
          </div>
          <button type="submit" class="btn btn-blue" style="margin-top:14px">Load</button>
        </form>
      </div>

      <!-- ── Stat editor (shown when gmStats loaded) ── -->
      <?php if($gmStats): ?>
        <?php $online = (int)$gmStats['online']; ?>
        <div class="player-card" style="margin-bottom:20px">
          <div class="player-name">
            <?=htmlspecialchars($gmFoundRole['name'] ?? $playerSearch)?>
            <?php if($online): ?>
              <span style="font-size:12px;background:rgba(60,200,80,.15);border:1px solid rgba(60,200,80,.4);color:#60d070;padding:2px 9px;border-radius:10px;margin-left:8px">● Online</span>
            <?php else: ?>
              <span style="font-size:12px;background:rgba(100,100,100,.2);border:1px solid rgba(160,160,160,.3);color:#8090a0;padding:2px 9px;border-radius:10px;margin-left:8px">○ Offline</span>
            <?php endif; ?>
          </div>
          <div class="player-meta">
            Account: <strong><?=htmlspecialchars($playerSearch)?></strong>
            &nbsp;|&nbsp; Role ID: <code><?=$gmRoleId?></code>
            &nbsp;|&nbsp; Level: <?=$gmStats['lev']?>
            &nbsp;|&nbsp; EXP: <?=number_format($gmStats['exp'])?>
          </div>

          <?php if($online): ?>
            <div class="alert alert-error" style="margin-top:14px;margin-bottom:0">
              ⚠ Player is currently <strong>online</strong>. Have them log out first, then reload this page to edit stats.
            </div>
          <?php else: ?>
          <!-- Stat edit grid -->
          <div class="stat-grid" style="margin-top:16px">
            <?php
              $fields = [
                'lev'       => ['Level',             $gmStats['lev']],
                'exp'       => ['EXP',                $gmStats['exp']],
                'gold'      => ['Gold (元宝)',         $gmStats['gold']],
                'gold_bind' => ['Bound Gold (绑元)',   $gmStats['gold_bind']],
                'coin'      => ['Coin (铜钱)',         $gmStats['coin']],
                'vip_lev'   => ['VIP Level',           $gmStats['vip_lev']],
              ];
            ?>
            <?php foreach($fields as $fkey => [$flabel, $fval]): ?>
            <div class="stat-item editable">
              <div class="stat-label"><?=htmlspecialchars($flabel)?></div>
              <div class="stat-value"><?=number_format((int)$fval)?></div>
              <form method="POST" class="edit-row-inline">
                <input type="hidden" name="action" value="gm_set_stat">
                <input type="hidden" name="rid"   value="<?=$gmRoleId?>">
                <input type="hidden" name="field" value="<?=$fkey?>">
                <input type="number" name="value" value="<?=(int)$fval?>" min="0" style="width:100%">
                <button type="submit" class="btn btn-green btn-sm">Save</button>
              </form>
            </div>
            <?php endforeach; ?>
          </div>
          <?php endif; ?>
        </div>

      <?php elseif($playerSearch): ?>
        <?php if(!file_exists('C:\\raconh5\\server_bin\\gm.escript')): ?>
          <div class="alert alert-error">
            <strong>gm.escript not found.</strong> Copy <code>gm.escript</code> from the repo to <code>C:\raconh5\server_bin\gm.escript</code> and make sure escript.exe path in admin.php is correct.
          </div>
        <?php else: ?>
          <p style="color:#806040;font-size:13px">Account "<strong><?=htmlspecialchars($playerSearch)?></strong>" not found in Mnesia. Check the account name spelling.</p>
        <?php endif; ?>
      <?php else: ?>
        <p style="color:#506080;font-size:13px">Enter an account name above to load live stats from Mnesia.</p>
      <?php endif; ?>

      <!-- ── Registration log ── -->
      <?php if(!empty($logRegRows)): ?>
      <details style="margin-top:18px">
        <summary style="font-size:13px;color:#6070a0;cursor:pointer;padding:8px 0">
          📋 Recent registrations (t_log_register) — <?=count($logRegRows)?> rows
        </summary>
        <div class="table-wrap" style="margin-top:8px">
          <table>
            <thead><tr><?php foreach($logRegCols as $c): ?><th><?=htmlspecialchars($c)?></th><?php endforeach; ?></tr></thead>
            <tbody>
            <?php foreach($logRegRows as $lr): ?>
              <tr><?php foreach($lr as $v): ?>
                <td style="font-size:12px;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"
                    title="<?=htmlspecialchars((string)$v)?>"><?=htmlspecialchars(strlen((string)$v)>28?substr((string)$v,0,26).'…':(string)$v)?></td>
              <?php endforeach; ?></tr>
            <?php endforeach; ?>
            </tbody>
          </table>
        </div>
      </details>
      <?php endif; ?>

      <!-- ── Setup instructions ── -->
      <details style="margin-top:18px">
        <summary style="font-size:13px;color:#507050;cursor:pointer;padding:8px 0">🖥 Setup: enable the stat editor (gm.escript)</summary>
        <div style="background:rgba(20,40,20,.4);border:1px solid rgba(60,160,80,.2);border-radius:8px;padding:16px;margin-top:8px;font-size:12px;color:#7a9070">
          <strong>1.</strong> Copy <code>gm.escript</code> (from repo <code>raconh5/server_bin/</code>) to <code>C:\raconh5\server_bin\gm.escript</code><br><br>
          <strong>2.</strong> Find your <code>escript.exe</code> — usually at:<br>
          <code>C:\Program Files\erl9.0\bin\escript.exe</code><br><br>
          <strong>3.</strong> Edit the two constants at the top of <code>admin.php</code>:<br>
          <code>define('ESCRIPT_EXE', 'C:\\Program Files\\erl9.0\\bin\\escript.exe');</code><br>
          <code>define('GM_ESCRIPT',  'C:\\raconh5\\server_bin\\gm.escript');</code><br><br>
          <strong>4.</strong> Make sure PHP's <code>shell_exec</code> is not disabled in <code>php.ini</code> (check <code>disable_functions</code>).
        </div>
      </details>
    </div>

    <!-- ══ ADMINS ══ -->
    <div class="tab-panel <?=$activeTab==='admins'?'active':''?>">
      <div class="page-title">Admin Accounts</div><div class="page-sub">Accounts with access to this panel</div>
      <div class="add-form"><h3>➕ Add New Admin</h3>
        <form method="POST"><input type="hidden" name="action" value="add_admin">
          <div class="row-flex">
            <div class="form-group"><label>Username</label><input type="text" name="username" required value="<?=htmlspecialchars($_POST['username']??'')?>"></div>
            <div class="form-group"><label>Password</label><input type="password" name="password" required></div>
            <div class="form-group"><label>Confirm</label><input type="password" name="confirm" required></div>
          </div>
          <button type="submit" class="btn btn-gold">Create Admin</button>
        </form>
      </div>
      <div class="table-wrap"><table>
        <thead><tr><th>#</th><th>Username</th><th>Created</th><th>Remove</th></tr></thead>
        <tbody>
        <?php foreach($admins as $i=>$a): ?>
        <tr>
          <td style="color:#5a6880"><?=$i+1?></td>
          <td><strong><?=htmlspecialchars($a['username'])?></strong><?php if($a['username']===$_SESSION['admin_user']): ?><span class="you-badge">YOU</span><?php endif; ?></td>
          <td style="color:#6070a0;font-size:12px"><?=$a['created_at']?></td>
          <td><?php if($a['username']!==$_SESSION['admin_user']): ?>
            <form method="POST" onsubmit="return confirm('Remove \'<?=htmlspecialchars($a['username'],ENT_QUOTES)?>\'?')">
              <input type="hidden" name="action" value="delete_admin">
              <input type="hidden" name="id" value="<?=$a['id']?>">
              <button type="submit" class="btn btn-red btn-sm">Remove</button>
            </form>
          <?php else: ?><span style="font-size:12px;color:#405060">—</span><?php endif; ?></td>
        </tr>
        <?php endforeach; ?>
        </tbody>
      </table></div>
    </div>

    <!-- ══ GAME DATABASE ══ -->
    <div class="tab-panel <?=$activeTab==='gamedb'?'active':''?>">
      <div class="page-title">Game Database</div>
      <div class="page-sub">Raw table browser for <code style="color:#d0a040"><?=DB_NAME?></code>.
        <span style="color:#804040;font-size:11px;margin-left:8px">⚠ Edits are immediate. Restart server after editing.</span></div>

      <?php if(!$dbSelTbl): ?>
        <p style="font-size:12px;color:#6070a0;margin-bottom:12px">Click a table to browse:</p>
        <div class="db-table-grid">
          <?php foreach($dbTables as $t): ?>
            <a class="db-tbl-btn" href="admin.php?tab=gamedb&tbl=<?=urlencode($t)?>"><?=htmlspecialchars($t)?></a>
          <?php endforeach; ?>
        </div>
      <?php else: ?>
        <div class="db-toolbar">
          <a href="admin.php?tab=gamedb" class="db-tbl-btn">← All tables</a>
          <strong><?=htmlspecialchars($dbSelTbl)?></strong>
          <span style="color:#6070a0;font-size:12px"><?=count($tableRows)?> rows</span>
        </div>
        <form method="GET" style="display:flex;gap:8px;margin-bottom:12px">
          <input type="hidden" name="tab" value="gamedb">
          <input type="hidden" name="tbl" value="<?=htmlspecialchars($dbSelTbl)?>">
          <input type="search" name="search" placeholder="Search..." value="<?=htmlspecialchars($dbSearch)?>" style="max-width:300px">
          <button type="submit" class="btn btn-blue btn-sm">Search</button>
          <?php if($dbSearch): ?><a href="admin.php?tab=gamedb&tbl=<?=urlencode($dbSelTbl)?>" class="btn btn-gray btn-sm">Clear</a><?php endif; ?>
        </form>

        <?php if($editRow && $tablePK): ?>
        <div class="edit-panel">
          <h3>✏ Edit — <?=htmlspecialchars($tablePK)?>=<?=htmlspecialchars($editRow[$tablePK])?></h3>
          <form method="POST">
            <input type="hidden" name="action" value="db_update_row">
            <input type="hidden" name="tbl"    value="<?=htmlspecialchars($dbSelTbl)?>">
            <input type="hidden" name="pk"     value="<?=htmlspecialchars($tablePK)?>">
            <input type="hidden" name="pkv"    value="<?=htmlspecialchars($editRow[$tablePK])?>">
            <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;margin-bottom:14px">
              <div class="form-group" style="margin:0"><label>Column</label>
                <select name="col" style="width:200px">
                  <?php foreach(array_keys($editRow) as $cn): ?>
                    <?php if($cn===$tablePK) continue; ?>
                    <option value="<?=htmlspecialchars($cn)?>"><?=htmlspecialchars($cn)?></option>
                  <?php endforeach; ?>
                </select>
              </div>
              <div class="form-group" style="margin:0;flex:1;min-width:180px"><label>New value</label>
                <input type="text" name="val" placeholder="Enter new value" style="width:100%">
              </div>
              <button type="submit" class="btn btn-green">Save</button>
              <a href="admin.php?tab=gamedb&tbl=<?=urlencode($dbSelTbl)?>&search=<?=urlencode($dbSearch)?>" class="btn btn-gray">Cancel</a>
            </div>
          </form>
          <div class="edit-fields-grid">
            <?php foreach($editRow as $cn=>$cv): ?>
            <div class="ef"><label><?=htmlspecialchars($cn)?><?=$cn===$tablePK?' (PK)':''?></label>
              <input type="text" value="<?=htmlspecialchars((string)$cv)?>" readonly style="background:rgba(0,0,0,.3);color:<?=$cn===$tablePK?'#8090a8':'#c0d0e0'?>">
            </div>
            <?php endforeach; ?>
          </div>
        </div>
        <?php endif; ?>

        <?php if(empty($tableRows)): ?>
          <p style="color:#506080;margin-top:10px">No rows<?=$dbSearch?' matching search':''?>.</p>
        <?php else: ?>
        <div class="table-wrap"><table>
          <thead><tr>
            <th>Edit</th>
            <?php foreach(array_keys($tableRows[0]) as $cn): ?><th title="<?=htmlspecialchars($cn)?>"><?=htmlspecialchars(strlen($cn)>14?substr($cn,0,13).'…':$cn)?></th><?php endforeach; ?>
          </tr></thead>
          <tbody>
          <?php foreach($tableRows as $row): ?>
            <?php $pkv=$tablePK?($row[$tablePK]??''):''; ?>
            <tr>
              <td><a href="admin.php?tab=gamedb&tbl=<?=urlencode($dbSelTbl)?>&pk=<?=urlencode($pkv)?>&search=<?=urlencode($dbSearch)?>" class="btn btn-blue btn-sm">Edit</a></td>
              <?php foreach($row as $cn=>$cv): ?>
                <?php $cv=(string)$cv; $isN=is_numeric($cv); $isL=strlen($cv)>28; ?>
                <td class="<?=$isN?'num':($isL?'trunc':'')?>" title="<?=htmlspecialchars($cv)?>"><?=htmlspecialchars($isL?substr($cv,0,26).'…':$cv)?></td>
              <?php endforeach; ?>
            </tr>
          <?php endforeach; ?>
          </tbody>
        </table></div>
        <?php endif; ?>
      <?php endif; ?>
    </div>

    <!-- ══ TRANSLATION ══ -->
    <div class="tab-panel <?=$activeTab==='translation'?'active':''?>">
      <div class="page-title">🌐 Translation Editor</div>
      <div class="page-sub">Extract Chinese strings from cw.txt / thm.json, add English translations, then apply.</div>

      <!-- File status -->
      <div style="margin-bottom:14px;font-size:12px;color:#6070a0">
        <span style="color:<?=$trCwExists?'#60d070':'#d06060'?>"><?=$trCwExists?'✔':'✘'?> cw.txt</span>
        &nbsp;&nbsp;
        <span style="color:<?=$trOrigExists?'#60d070':'#a07040'?>"><?=$trOrigExists?'✔':'⚠'?> cw.txt.original<?=$trOrigExists?'':' (will be created on first apply)'?></span>
        &nbsp;&nbsp;
        <span style="color:<?=file_exists(TRANS_FILE)?'#60d070':'#a07040'?>"><?=file_exists(TRANS_FILE)?'✔':'⚠'?> cw_translations.json<?=file_exists(TRANS_FILE)?'':' (run Extract first)'?></span>
      </div>

      <!-- Toolbar -->
      <div class="tr-toolbar">
        <form method="POST" style="display:inline">
          <input type="hidden" name="action" value="tr_extract">
          <button type="submit" class="btn btn-gold">⬇ Extract Strings</button>
        </form>
        <form method="POST" style="display:inline" onsubmit="return confirm('Apply translations to cw.txt now?')">
          <input type="hidden" name="action" value="tr_apply">
          <button type="submit" class="btn btn-green">✔ Apply to cw.txt</button>
        </form>
        <form method="POST" style="display:inline" onsubmit="return confirm('Apply translations to thm.json now?')">
          <input type="hidden" name="action" value="tr_applythm">
          <button type="submit" class="btn btn-blue">🎨 Apply to thm.json</button>
        </form>
        <?php if($trOrigExists): ?>
        <form method="POST" style="display:inline" onsubmit="return confirm('Restore original cw.txt? This undoes Apply.')">
          <input type="hidden" name="action" value="tr_restore">
          <button type="submit" class="btn btn-gray">↩ Restore Original</button>
        </form>
        <?php endif; ?>
        <?php if(file_exists(TRANS_FILE)): ?>
        <form method="POST" style="display:inline" onsubmit="return confirm('Clear ALL translation data? This cannot be undone.')">
          <input type="hidden" name="action" value="tr_clear">
          <button type="submit" class="btn btn-red btn-sm">🗑 Clear</button>
        </form>
        <?php endif; ?>
      </div>

      <?php if($trTotal > 0): ?>
      <!-- Stats -->
      <div class="tr-stats">
        <div class="tr-stat"><div class="v"><?=number_format($trTotal)?></div><div class="l">Total strings</div></div>
        <div class="tr-stat"><div class="v"><?=number_format($trDone)?></div><div class="l">Translated</div></div>
        <div class="tr-stat"><div class="v"><?=number_format($trTotal-$trDone)?></div><div class="l">Remaining</div></div>
        <div class="tr-stat"><div class="v"><?=count($trSections)?></div><div class="l">Sections</div></div>
      </div>

      <!-- Progress bar -->
      <div class="tr-progress" title="<?=$trDone?>/<?=$trTotal?>">
        <div class="tr-progress-bar" style="width:<?=$trTotal?round(100*$trDone/$trTotal):0?>%"></div>
      </div>

      <!-- Filter form -->
      <form method="GET" style="display:flex;gap:8px;align-items:center;margin-bottom:10px;flex-wrap:wrap">
        <input type="hidden" name="tab" value="translation">
        <input type="search" name="tsearch" value="<?=htmlspecialchars($trSearch)?>"
               placeholder="Search strings…" style="max-width:220px;font-size:13px">
        <button type="submit" class="btn btn-blue btn-sm">Search</button>
        <?php if($trSearch||$trFilter): ?>
          <a href="admin.php?tab=translation" class="btn btn-gray btn-sm">✕ Clear</a>
        <?php endif; ?>
      </form>

      <!-- Section filter buttons -->
      <div class="tr-sec-list">
        <a href="admin.php?tab=translation<?=$trSearch?'&tsearch='.urlencode($trSearch):''?>"
           class="tr-sec-btn <?=$trFilter===''?'sel':''?>">All (<?=$trTotal?>)</a>
        <?php foreach($trSections as $sn=>$si): ?>
          <a href="admin.php?tab=translation&tsec=<?=urlencode($sn)?><?=$trSearch?'&tsearch='.urlencode($trSearch):''?>"
             class="tr-sec-btn <?=$trFilter===$sn?'sel':''?>">
            <?=htmlspecialchars($sn)?> (<?=$si['done']?>/<?=$si['total']?>)
          </a>
        <?php endforeach; ?>
      </div>

      <!-- Translation form -->
      <?php if(!empty($trRows)): ?>
      <form method="POST">
        <input type="hidden" name="action" value="tr_save">
        <input type="hidden" name="tsec"    value="<?=htmlspecialchars($trFilter)?>">
        <input type="hidden" name="tsearch" value="<?=htmlspecialchars($trSearch)?>">
        <input type="hidden" name="tpage"   value="<?=$trPage?>">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <span style="font-size:12px;color:#607090">
            Showing <?=count($trRows)?> strings (page <?=$trPage?>/<?=$trPageCount?>)
          </span>
          <button type="submit" class="btn btn-gold btn-sm">💾 Save Page</button>
        </div>

        <div class="table-wrap" style="max-height:600px">
        <table class="tr-table">
          <thead><tr>
            <th style="min-width:100px">Section</th>
            <th style="min-width:200px">Chinese (source)</th>
            <th style="min-width:240px">English translation</th>
          </tr></thead>
          <tbody>
          <?php foreach($trRows as $key => $row): ?>
          <tr>
            <td><div style="color:#8090a0;font-size:11px"><?=htmlspecialchars($row['section'])?></div>
                <?php if(isset($row['table'])): ?>
                  <div style="color:#506070;font-size:10px;font-family:monospace"><?=htmlspecialchars($row['table'])?>·<?=$row['id']?></div>
                <?php elseif(isset($row['offset'])): ?>
                  <div class="tr-key">@<?=$row['offset']?></div>
                <?php endif; ?>
            </td>
            <td><div class="tr-cn"><?=htmlspecialchars($row['cn'])?></div></td>
            <td>
              <input type="text" name="tr[<?=base64_encode($key)?>]"
                     value="<?=htmlspecialchars($row['en'])?>"
                     class="tr-input<?=$row['en']!==''?' has-val':''?>"
                     placeholder="Enter English…">
            </td>
          </tr>
          <?php endforeach; ?>
          </tbody>
        </table>
        </div>

        <!-- Pager -->
        <?php if($trPageCount > 1): ?>
        <div class="tr-pager" style="margin-top:10px">
          <?php
            $pBase = 'admin.php?tab=translation';
            if ($trFilter) $pBase .= '&tsec='.urlencode($trFilter);
            if ($trSearch) $pBase .= '&tsearch='.urlencode($trSearch);
          ?>
          <?php if($trPage>1): ?>
            <a href="<?=$pBase?>&tpage=<?=$trPage-1?>">‹ Prev</a>
          <?php endif; ?>
          <?php for($p=max(1,$trPage-3);$p<=min($trPageCount,$trPage+3);$p++): ?>
            <?php if($p===$trPage): ?>
              <span class="cur"><?=$p?></span>
            <?php else: ?>
              <a href="<?=$pBase?>&tpage=<?=$p?>"><?=$p?></a>
            <?php endif; ?>
          <?php endfor; ?>
          <?php if($trPage<$trPageCount): ?>
            <a href="<?=$pBase?>&tpage=<?=$trPage+1?>">Next ›</a>
          <?php endif; ?>
          <span style="color:#506070;font-size:11px">&nbsp;<?=count(array_filter($trTrans,fn($r)=>($trFilter?$r['section']===$trFilter:true)&&$r['en']!==''))?> / <?=count(array_filter($trTrans,fn($r)=>$trFilter?$r['section']===$trFilter:true))?> translated</span>
        </div>
        <?php endif; ?>

        <div style="margin-top:12px">
          <button type="submit" class="btn btn-gold">💾 Save Page</button>
        </div>
      </form>

      <?php elseif($trTotal > 0): ?>
        <p style="color:#607090;font-size:13px">No strings match the current filter.</p>
      <?php endif; ?>

      <?php else: ?>
      <div class="alert alert-info">
        No strings extracted yet. Click <strong>⬇ Extract Strings</strong> to scan cw.txt for Chinese text.
      </div>
      <?php endif; ?>

      <!-- Instructions -->
      <details style="margin-top:18px">
        <summary style="font-size:12px;color:#507050;cursor:pointer;padding:6px 0">📖 How to use</summary>
        <div style="background:rgba(20,40,20,.4);border:1px solid rgba(60,160,80,.2);border-radius:8px;padding:14px;margin-top:6px;font-size:12px;color:#7a9070;line-height:1.7">
          <strong>1. Extract</strong> — scans cw.txt for Chinese strings and saves them to <code>cw_translations.json</code> next to admin.php.<br>
          <strong>2. Translate</strong> — select a section, fill in English translations, click Save Page.<br>
          <strong>3. Apply to cw.txt</strong> — rewrites cw.txt with your translations. Original is backed up as <code>cw.txt.original</code>.<br>
          <strong>4. Apply to thm.json</strong> — same but for <code>default.thm.json</code> (UI theme strings).<br>
          <strong>5. Copy to XAMPP</strong> — copy the updated <code>cw.txt</code> and <code>default.thm.json</code> to your XAMPP game folder.<br>
          <strong>Note:</strong> Open the game in an incognito window (Ctrl+Shift+N) to bypass browser cache.
        </div>
      </details>
    </div>

  </main>
</div>
<?php endif; ?>
</body>
</html>
