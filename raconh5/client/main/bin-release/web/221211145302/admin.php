<?php
/**
 * Game Translation Admin
 * Place in game root folder (same folder as index.html / main.min.js)
 * URL: http://localhost/[game_folder]/admin.php
 * Password: admin888
 */

session_start();
header('Content-Type: text/html; charset=utf-8');

define('ADMIN_PASS', 'admin888');
define('CW_FILE',   __DIR__ . '/resource/res/cw.txt');
define('CW_ORIG',   __DIR__ . '/resource/res/cw.txt.original');
define('THM_FILE',  __DIR__ . '/resource/default.thm.json');
define('THM_ORIG',  __DIR__ . '/resource/default.thm.json.original');
define('TRANS_FILE',__DIR__ . '/cw_translations.json');

// ── Auth ──────────────────────────────────────────────────────────────────────
if (isset($_POST['pass'])) {
    if ($_POST['pass'] === ADMIN_PASS) $_SESSION['auth'] = true;
    else $authErr = 'Sai mật khẩu';
}
if (isset($_GET['logout'])) { session_destroy(); header('Location: admin.php'); exit; }
$ok = !empty($_SESSION['auth']);

// ── Binary helpers ────────────────────────────────────────────────────────────
function ru16(string $d, int &$p): int { $v=(ord($d[$p])<<8)|ord($d[$p+1]); $p+=2; return $v; }
function ri32(string $d, int &$p): int { $v=unpack('N',substr($d,$p,4))[1]; $p+=4; return $v; }
function rutf(string $d, int &$p): string { $l=ru16($d,$p); $s=substr($d,$p,$l); $p+=$l; return $s; }
function wu16(int $v): string { return chr($v>>8).chr($v&255); }
function wi32(int $v): string { return pack('N',$v); }
function wutf(string $s): string { return wu16(strlen($s)).$s; }

// ── cw.txt outer parse/build ──────────────────────────────────────────────────
function cwParse(string $d): array {
    $p=0; $c=ord($d[$p++]); $r=[];
    for($i=0;$i<$c;$i++){
        $n=rutf($d,$p); $l=ri32($d,$p);
        $r[]=['name'=>$n,'data'=>substr($d,$p,$l)]; $p+=$l;
    }
    return $r;
}
function cwBuild(array $s): string {
    $o=chr(count($s));
    foreach($s as $x){ $o.=wutf($x['name']); $o.=wi32(strlen($x['data'])); $o.=$x['data']; }
    return $o;
}

// ── Language section parse/build ──────────────────────────────────────────────
function langParse(string $d): array {
    $p=0; $tc=ord($d[$p++]); $r=[];
    for($t=0;$t<$tc;$t++){
        $tn=rutf($d,$p); $ec=ru16($d,$p); $e=[];
        for($i=0;$i<$ec;$i++){ $id=ru16($d,$p); $e[$id]=rutf($d,$p); }
        $r[$tn]=$e;
    }
    return $r;
}
function langBuild(array $tbls): string {
    $o=chr(count($tbls));
    foreach($tbls as $tn=>$ents){
        $o.=wutf($tn); $o.=wu16(count($ents));
        foreach($ents as $id=>$v){ $o.=wu16($id); $o.=wutf($v); }
    }
    return $o;
}

// ── CJK detection ─────────────────────────────────────────────────────────────
function hasCJK(string $s): bool {
    return (bool)preg_match('/[\x{4E00}-\x{9FFF}\x{3400}-\x{4DBF}]/u', $s);
}
function scanCJK(string $buf): array {
    $r=[]; $len=strlen($buf);
    for($i=0;$i<$len-2;$i++){
        $sl=(ord($buf[$i])<<8)|ord($buf[$i+1]);
        if($sl<1||$sl>512||$i+2+$sl>$len) continue;
        $c=substr($buf,$i+2,$sl);
        if(@mb_check_encoding($c,'UTF-8')&&hasCJK($c)){
            $r[$i]=$c; $i+=1+$sl;
        }
    }
    return $r;
}

// ── Apply translations to a section buffer ────────────────────────────────────
function applySection(string $buf, array $trans): string {
    ksort($trans); $chunks=[]; $cur=0;
    foreach($trans as $off=>$eng){
        if($off<$cur) continue;
        $sl=(ord($buf[$off])<<8)|ord($buf[$off+1]);
        if($sl<1||$off+2+$sl>strlen($buf)) continue;
        $orig=substr($buf,$off+2,$sl);
        if(!hasCJK($orig)) continue;
        $chunks[]=substr($buf,$cur,$off-$cur);
        $chunks[]=wu16(strlen($eng)).$eng;
        $cur=$off+2+$sl;
    }
    $chunks[]=substr($buf,$cur);
    return implode('',$chunks);
}

// ── Translations JSON ─────────────────────────────────────────────────────────
function loadTrans(): array {
    if(!file_exists(TRANS_FILE)) return [];
    $d=json_decode(file_get_contents(TRANS_FILE),true);
    return is_array($d)?$d:[];
}
function saveTrans(array $t): void {
    file_put_contents(TRANS_FILE,json_encode($t,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
}

// ── Extract all Chinese from cw.txt ──────────────────────────────────────────
function extractCW(): array {
    if(!file_exists(CW_FILE)) return [];
    $src=file_exists(CW_ORIG)?file_get_contents(CW_ORIG):file_get_contents(CW_FILE);
    $secs=cwParse($src); $all=[];
    foreach($secs as $s){
        if($s['name']==='language'){
            $tbls=langParse($s['data']);
            foreach($tbls as $tn=>$ents)
                foreach($ents as $id=>$v)
                    if(hasCJK($v)) $all["language|{$tn}|{$id}"]=$v;
        } else {
            foreach(scanCJK($s['data']) as $off=>$txt)
                $all["{$s['name']}|{$off}"]=$txt;
        }
    }
    return $all;
}

// ── Apply all translations → cw.txt ──────────────────────────────────────────
function applyAll(array $trans): array {
    if(!file_exists(CW_FILE)) return ['err'=>'Không tìm thấy: '.CW_FILE];
    if(!file_exists(CW_ORIG)) copy(CW_FILE,CW_ORIG);
    $raw=file_get_contents(CW_ORIG);
    $secs=cwParse($raw); $rep=0; $newSecs=[];
    foreach($secs as $s){
        $nm=$s['name'];
        if($nm==='language'){
            $tbls=langParse($s['data']);
            foreach($tbls as $tn=>&$ents)
                foreach($ents as $id=>&$v){
                    $k="language|{$tn}|{$id}";
                    if(isset($trans[$k])&&$trans[$k]!==''&&!hasCJK($trans[$k])){
                        $v=$trans[$k]; $rep++;
                    }
                }
            $newSecs[]=['name'=>$nm,'data'=>langBuild($tbls)];
        } else {
            $st=[];
            foreach($trans as $k=>$eng){
                if($eng===''||hasCJK($eng)) continue;
                $p=explode('|',$k,2);
                if(count($p)!==2||$p[0]!==$nm) continue;
                $st[(int)$p[1]]=$eng;
            }
            $newSecs[]=['name'=>$nm,'data'=>$st?applySection($s['data'],$st):$s['data']];
            $rep+=count($st);
        }
    }
    $out=cwBuild($newSecs);
    file_put_contents(CW_FILE,$out);
    return ['ok'=>true,'rep'=>$rep,'size'=>strlen($out),'orig'=>strlen($raw)];
}

// ── Apply thm.json translations ───────────────────────────────────────────────
function applyThm(array $trans): string {
    if(!file_exists(THM_FILE)) return 'Không tìm thấy thm.json';
    if(!file_exists(THM_ORIG)) copy(THM_FILE,THM_ORIG);
    $c=file_get_contents(THM_ORIG); $rep=0;
    foreach($trans as $k=>$eng){
        if(strpos($k,'thm|')!==0) continue;
        $cn=base64_decode(substr($k,4));
        if($cn&&$eng!==''&&!hasCJK($eng)&&$cn!==$eng&&strpos($c,$cn)!==false){
            $c=str_replace($cn,$eng,$c); $rep++;
        }
    }
    file_put_contents(THM_FILE,$c);
    return "✓ Đã thay {$rep} chuỗi trong thm.json";
}

// ── Get THM Chinese strings ───────────────────────────────────────────────────
function getThmStrings(): array {
    $src=file_exists(THM_ORIG)?THM_ORIG:THM_FILE;
    if(!file_exists($src)) return [];
    $content=file_get_contents($src); $r=[];
    // Match all JSON string values (handle escaped chars)
    preg_match_all('/"((?:[^"\\\\]|\\\\.)*)"/u',$content,$m);
    foreach($m[1] as $s){
        $decoded=stripcslashes($s);
        if(hasCJK($decoded)&&strlen($decoded)>=2&&strlen($decoded)<=300) $r[]=$decoded;
    }
    return array_unique($r);
}

// ── Actions ───────────────────────────────────────────────────────────────────
$msg=''; $msgType='info';
$act=isset($_GET['action'])?$_GET['action']:'';

if($ok){
    if($act==='extract'){
        $cn=extractCW(); $t=loadTrans(); $added=0;
        foreach($cn as $k=>$v) if(!array_key_exists($k,$t)){ $t[$k]=$v; $added++; }
        saveTrans($t);
        $msg="✓ Tìm thấy ".count($cn)." chuỗi ({$added} mới). Sửa bản dịch rồi nhấn Apply.";
        $msgType='success';
    } elseif($act==='save'&&$_SERVER['REQUEST_METHOD']==='POST'){
        $t=loadTrans();
        foreach((isset($_POST['tr'])?$_POST['tr']:[]) as $kb64=>$eng){
            $k=base64_decode($kb64);
            if($k!==false) $t[$k]=trim($eng);
        }
        foreach((isset($_POST['thm'])?$_POST['thm']:[]) as $kb64=>$eng){
            $t['thm|'.$kb64]=trim($eng);
        }
        saveTrans($t);
        $msg='✓ Đã lưu bản dịch'; $msgType='success';
    } elseif($act==='apply'){
        $r=applyAll(loadTrans());
        if(isset($r['err'])){ $msg='❌ '.$r['err']; $msgType='danger'; }
        else { $msg="✓ Apply xong! Thay {$r['rep']} chuỗi | {$r['size']} bytes (gốc: {$r['orig']})"; $msgType='success'; }
    } elseif($act==='applythm'){
        $msg=applyThm(loadTrans()); $msgType='success';
    } elseif($act==='applyall'){
        $t=loadTrans();
        $r=applyAll($t);
        $m2=applyThm($t);
        if(isset($r['err'])){ $msg='❌ '.$r['err']; $msgType='danger'; }
        else { $msg="✓ cw.txt: {$r['rep']} chuỗi | {$m2}"; $msgType='success'; }
    } elseif($act==='export'){
        header('Content-Type: application/json; charset=utf-8');
        header('Content-Disposition: attachment; filename="cw_translations.json"');
        echo file_exists(TRANS_FILE)?file_get_contents(TRANS_FILE):'{}';
        exit;
    } elseif($act==='import'&&isset($_FILES['jf'])&&$_FILES['jf']['error']===0){
        $d=file_get_contents($_FILES['jf']['tmp_name']);
        $imp=json_decode($d,true);
        if(is_array($imp)){
            $t=loadTrans(); $c=0;
            foreach($imp as $k=>$v){ $t[$k]=$v; $c++; }
            saveTrans($t); $msg="✓ Đã nhập {$c} chuỗi"; $msgType='success';
        } else { $msg='❌ File JSON không hợp lệ'; $msgType='danger'; }
    } elseif($act==='restore'&&isset($_GET['yes'])){
        if(file_exists(CW_ORIG)){ copy(CW_ORIG,CW_FILE); $msg='✓ Đã khôi phục cw.txt gốc'; $msgType='warning'; }
        else { $msg='Không có backup'; $msgType='danger'; }
    } elseif($act==='restorethm'&&isset($_GET['yes'])){
        if(file_exists(THM_ORIG)){ copy(THM_ORIG,THM_FILE); $msg='✓ Đã khôi phục thm.json gốc'; $msgType='warning'; }
        else { $msg='Không có backup thm'; $msgType='danger'; }
    }
}

// ── Prepare view data ─────────────────────────────────────────────────────────
$trans=[]; $allCN=[]; $secStats=[]; $thmStrings=[]; $rows=[];
$totalStrings=0; $totalUntrans=0;
$curSec=''; $q=''; $tab='cw'; $showOnly='';

if($ok){
    $trans=loadTrans();
    $tab=isset($_GET['tab'])?$_GET['tab']:'cw';
    $curSec=isset($_GET['sec'])?$_GET['sec']:'';
    $q=strtolower(isset($_GET['q'])?$_GET['q']:'');
    $showOnly=isset($_GET['only'])?$_GET['only']:'';

    // Build display: use original Chinese from trans file, show English
    // First get all known keys from trans file (excludes thm keys)
    $display=[];
    foreach($trans as $k=>$v){
        if(strpos($k,'thm|')===0) continue;
        $p=explode('|',$k,2); $sn=$p[0];
        $eng=$v; $cn=$v; // CN might be same if untranslated
        $display[$k]=['cn'=>$cn,'eng'=>$eng,'sec'=>$sn,'untrans'=>hasCJK($eng)];
    }
    // Also extract from current original if available (to show original CN)
    $origCN=extractCW();
    foreach($origCN as $k=>$cn){
        $eng=isset($trans[$k])?$trans[$k]:$cn;
        $p=explode('|',$k,2); $sn=$p[0];
        $display[$k]=['cn'=>$cn,'eng'=>$eng,'sec'=>$sn,'untrans'=>hasCJK($eng)];
    }

    // Section stats
    foreach($display as $k=>$d){
        $sn=$d['sec'];
        if(!isset($secStats[$sn])) $secStats[$sn]=['tot'=>0,'un'=>0];
        $secStats[$sn]['tot']++;
        if($d['untrans']) $secStats[$sn]['un']++;
    }
    ksort($secStats);
    $totalStrings=array_sum(array_column($secStats,'tot'));
    $totalUntrans=array_sum(array_column($secStats,'un'));

    // Filter rows
    foreach($display as $k=>$d){
        if($curSec&&$d['sec']!==$curSec) continue;
        if($showOnly==='untrans'&&!$d['untrans']) continue;
        if($q&&mb_strpos(mb_strtolower($d['cn'],'UTF-8'),mb_strtolower($q,'UTF-8'),'UTF-8')===false
           &&mb_strpos(mb_strtolower($d['eng'],'UTF-8'),mb_strtolower($q,'UTF-8'),'UTF-8')===false) continue;
        $rows[$k]=$d;
    }

    $thmStrings=getThmStrings();
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<title>Translation Admin</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#12141c;color:#dde;font-size:14px}
a{color:inherit;text-decoration:none}
.topbar{background:#1a1d2e;padding:10px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid #2a2d4a;position:sticky;top:0;z-index:100;flex-wrap:wrap}
.topbar h1{font-size:15px;color:#7c84f0;font-weight:700;white-space:nowrap;margin-right:4px}
.btn{display:inline-flex;align-items:center;gap:4px;padding:5px 12px;border-radius:5px;border:none;cursor:pointer;font-size:12px;font-weight:600;transition:.15s}
.btn:hover{filter:brightness(1.2)}
.b-blue{background:#2a3a7a;color:#a0b4ff}
.b-green{background:#1a4a2a;color:#6fdc8c}
.b-orange{background:#4a2a00;color:#ffb347}
.b-red{background:#4a1a1a;color:#ff8080}
.b-gray{background:#2a2a3a;color:#aaa}
.alert{padding:8px 16px;font-size:13px;margin:8px 16px 0}
.alert-success{background:#1a3a2a;border-left:3px solid #2ecc71;color:#6fdc8c}
.alert-info{background:#1a2a3a;border-left:3px solid #3498db;color:#7ec8e3}
.alert-warning{background:#3a2a00;border-left:3px solid #f39c12;color:#ffb347}
.alert-danger{background:#3a1a1a;border-left:3px solid #e74c3c;color:#ff8080}
.layout{display:flex;height:calc(100vh - 50px);overflow:hidden}
.sidebar{width:200px;min-width:200px;background:#1a1d2e;border-right:1px solid #2a2d4a;overflow-y:auto;flex-shrink:0}
.sidebar h3{font-size:10px;text-transform:uppercase;color:#555;padding:10px 12px 4px;letter-spacing:.8px}
.slink{display:flex;justify-content:space-between;align-items:center;padding:5px 12px;cursor:pointer;border-left:3px solid transparent;color:#99a;font-size:12px}
.slink:hover,.slink.act{background:#1f2340;border-left-color:#7c84f0;color:#dde}
.badge{background:#3a3d6a;color:#aab;border-radius:8px;padding:1px 6px;font-size:10px;min-width:20px;text-align:center}
.badge.ok{background:#1a3a2a;color:#6fdc8c}
.badge.warn{background:#4a2a00;color:#ffb347}
.main{flex:1;overflow-y:auto;padding:12px 16px}
.toolbar{display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap}
.toolbar input[type=text]{padding:4px 10px;border-radius:4px;border:1px solid #2a2d4a;background:#1a1d2e;color:#dde;font-size:12px;width:180px}
.toolbar select{padding:4px 8px;border-radius:4px;border:1px solid #2a2d4a;background:#1a1d2e;color:#dde;font-size:12px}
.stats{font-size:11px;color:#555;margin-left:auto}
table{width:100%;border-collapse:collapse}
th{background:#1a1d2e;padding:7px 10px;text-align:left;font-size:11px;font-weight:700;color:#778;border-bottom:1px solid #2a2d4a;position:sticky;top:0;z-index:2;text-transform:uppercase;letter-spacing:.4px}
td{padding:5px 10px;border-bottom:1px solid #1e2030;vertical-align:top}
tr:hover td{background:#1a1d2e}
.cn{color:#ff9f69;font-size:12px}
.key{color:#444;font-size:10px;font-family:monospace;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
textarea.eng{width:100%;background:#141624;border:1px solid #2a3a6a;border-radius:3px;padding:3px 8px;color:#90ee90;font-size:12px;resize:vertical;min-height:26px;font-family:inherit;line-height:1.4}
textarea.eng.un{border-color:#6a3a00;color:#ffb347}
textarea.eng:focus{outline:none;border-color:#7c84f0}
.tag{display:inline-block;padding:1px 5px;border-radius:3px;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.3px}
.t-lang{background:#1a2a5a;color:#7ec8e3}
.t-item{background:#2a1a4a;color:#c4a0ff}
.t-scene{background:#1a3a1a;color:#90ee90}
.t-other{background:#2a2a1a;color:#d4c97a}
.progress-wrap{padding:4px 12px 8px}
.progress{background:#1f2340;border-radius:8px;height:4px;overflow:hidden}
.progress-bar{background:#7c84f0;height:100%}
.login-wrap{display:flex;align-items:center;justify-content:center;min-height:100vh}
.login-box{background:#1a1d2e;border:1px solid #2a2d4a;border-radius:8px;padding:32px;width:320px;text-align:center}
.login-box h2{color:#7c84f0;margin-bottom:20px;font-size:18px}
.login-box input{width:100%;padding:9px;margin-bottom:12px;background:#12141c;border:1px solid #2a3a6a;border-radius:4px;color:#dde;font-size:14px}
.info-box{background:#1a1d2e;border:1px solid #2a2d4a;border-radius:4px;padding:12px 16px;margin-bottom:12px;font-size:12px;line-height:2}
.info-box b{color:#7ec8e3}
.empty{text-align:center;padding:40px;color:#445;font-size:13px}
</style>
</head>
<body>
<?php if(!$ok): ?>
<div class="login-wrap">
  <div class="login-box">
    <h2>🎮 Translation Admin</h2>
    <?php if(isset($authErr)): ?><p style="color:#ff8080;font-size:12px;margin-bottom:10px"><?=htmlspecialchars($authErr)?></p><?php endif; ?>
    <form method="post">
      <input type="password" name="pass" placeholder="Mật khẩu" autofocus>
      <button type="submit" class="btn b-blue" style="width:100%;padding:10px;justify-content:center">Đăng nhập</button>
    </form>
    <p style="color:#444;font-size:11px;margin-top:14px">Default password: admin888</p>
  </div>
</div>
<?php else: ?>

<div class="topbar">
  <h1>🎮 Translation Admin</h1>
  <a href="?action=extract" class="btn b-blue">🔍 Extract</a>
  <a href="?action=applyall" class="btn b-green" onclick="return confirm('Apply tất cả bản dịch vào cw.txt + thm.json?')">⚡ Apply All</a>
  <a href="?action=apply" class="btn b-blue">→ cw.txt</a>
  <a href="?action=applythm" class="btn b-blue">→ thm.json</a>
  <a href="?action=export" class="btn b-gray">📥 Export</a>
  <form method="post" enctype="multipart/form-data" style="margin:0">
    <label class="btn b-gray" style="cursor:pointer">📤 Import<input type="file" name="jf" accept=".json" onchange="this.form.submit()" style="display:none"></label>
    <input type="hidden" name="action" value="import">
  </form>
  <a href="?logout" class="btn b-red" style="margin-left:auto" onclick="return confirm('Đăng xuất?')">↩ Logout</a>
</div>

<?php
// Handle form-submitted import
if($_SERVER['REQUEST_METHOD']==='POST'&&isset($_POST['action'])&&$_POST['action']==='import'&&isset($_FILES['jf'])&&$_FILES['jf']['error']===0){
    $imp=json_decode(file_get_contents($_FILES['jf']['tmp_name']),true);
    if(is_array($imp)){ $t=loadTrans();$c=0; foreach($imp as $k=>$v){$t[$k]=$v;$c++;} saveTrans($t); echo '<div class="alert alert-success">✓ Imported '.$c.' strings</div>'; }
}
?>

<?php if($msg): ?>
<div class="alert alert-<?=htmlspecialchars($msgType)?>"><?=htmlspecialchars($msg)?></div>
<?php endif; ?>

<div class="layout">
<div class="sidebar">
  <h3>Status</h3>
  <div style="padding:6px 12px 2px;font-size:11px;line-height:1.8;color:#556">
    <?php
    $cwEx=file_exists(CW_FILE); $tEx=file_exists(TRANS_FILE); $bEx=file_exists(CW_ORIG);
    echo '<div style="color:'.($cwEx?'#6fdc8c':'#ff8080').'">'.($cwEx?'✓':'✗').' cw.txt '.($cwEx?'('.round(filesize(CW_FILE)/1024).'KB)':'').'</div>';
    echo '<div style="color:'.($bEx?'#6fdc8c':'#778').'">'.($bEx?'✓ backup OK':'– no backup yet').'</div>';
    echo '<div style="color:'.($tEx?'#ffb347':'#778').'">'.($tEx?'✓ '.count($trans).' entries':'– no trans.json').'</div>';
    ?>
  </div>
  <?php if($totalStrings>0):
    $pct=round(100*($totalStrings-$totalUntrans)/max(1,$totalStrings)); ?>
  <div class="progress-wrap">
    <div style="font-size:10px;color:#556;margin-bottom:3px"><?=($totalStrings-$totalUntrans)?>/<?=$totalStrings?> (<?=$pct?>%)</div>
    <div class="progress"><div class="progress-bar" style="width:<?=$pct?>%"></div></div>
  </div>
  <?php endif; ?>

  <h3>cw.txt</h3>
  <?php
  $secUrl='?tab=cw';
  $allUn=$totalUntrans??0;
  $allBadge=$allUn>0?"<span class='badge warn'>{$allUn}</span>":"<span class='badge ok'>✓</span>";
  ?>
  <a href="<?=$secUrl?>" class="slink <?=(!$curSec&&$tab==='cw')?'act':''?>"><?=htmlspecialchars('Tất cả')?><?=$allBadge?></a>
  <?php foreach($secStats as $sn=>$st):
    $un=$st['un']; $tot=$st['tot'];
    $badge=$un>0?"<span class='badge warn'>{$un}</span>":"<span class='badge ok'>✓</span>";
  ?>
  <a href="?tab=cw&sec=<?=urlencode($sn)?>" class="slink <?=$curSec===$sn&&$tab==='cw'?'act':''?>" title="<?=htmlspecialchars($sn)?>">
    <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:130px"><?=htmlspecialchars($sn)?></span>
    <?=$badge?>
  </a>
  <?php endforeach; ?>

  <h3>Khác</h3>
  <a href="?tab=thm" class="slink <?=$tab==='thm'?'act':''?>">thm.json<span class="badge"><?=count($thmStrings)?></span></a>
  <a href="?tab=debug" class="slink <?=$tab==='debug'?'act':''?>">Debug</a>
  <?php if(file_exists(CW_ORIG)): ?>
  <a href="?action=restore&yes=1" class="slink" style="color:#ff8080" onclick="return confirm('Xóa bản dịch, khôi phục cw.txt gốc?')">↩ Restore cw.txt</a>
  <?php endif; ?>
  <?php if(file_exists(THM_ORIG)): ?>
  <a href="?action=restorethm&yes=1" class="slink" style="color:#ff8080" onclick="return confirm('Khôi phục thm.json gốc?')">↩ Restore thm</a>
  <?php endif; ?>
</div>

<div class="main">
<?php if($tab==='cw'): ?>
  <form method="post" action="?action=save&tab=cw<?=$curSec?'&sec='.urlencode($curSec):''?><?=$q?'&q='.urlencode($q):''?><?=$showOnly?'&only='.$showOnly:''?>">
  <div class="toolbar">
    <input type="text" placeholder="🔍 Tìm kiếm..." value="<?=htmlspecialchars($q)?>"
      onkeydown="if(event.key==='Enter'){location='?tab=cw<?=$curSec?'&sec='.urlencode($curSec):''?>&q='+encodeURIComponent(this.value);return false}">
    <select onchange="location='?tab=cw<?=$curSec?'&sec='.urlencode($curSec):''?><?=$q?'&q='.urlencode($q):''?>&only='+this.value">
      <option value="" <?=!$showOnly?'selected':''?>>Tất cả</option>
      <option value="untrans" <?=$showOnly==='untrans'?'selected':''?>>Chưa dịch</option>
    </select>
    <button type="submit" class="btn b-green">💾 Lưu</button>
    <a href="?action=apply&tab=cw<?=$curSec?'&sec='.urlencode($curSec):''?>" class="btn b-orange" onclick="return confirm('Apply vào cw.txt?')">⚡ Apply cw.txt</a>
    <span class="stats"><?=count($rows)?> rows | <?=$totalUntrans?> chưa dịch / <?=$totalStrings?> tổng</span>
  </div>
  <?php if(empty($rows)): ?>
  <div class="empty">
    <?php if(empty($trans)): ?>
    <b>Chưa có dữ liệu.</b><br><br>
    Nhấn <b>🔍 Extract</b> ở trên để đọc tất cả chuỗi tiếng Trung từ cw.txt.
    <?php else: ?>
    Không có chuỗi nào khớp.
    <?php endif; ?>
  </div>
  <?php else: ?>
  <table>
    <thead><tr>
      <th style="width:15%">Section</th>
      <th style="width:30%">Tiếng Trung</th>
      <th>Bản dịch tiếng Anh</th>
    </tr></thead>
    <tbody>
    <?php foreach($rows as $k=>$d):
      $kb64=base64_encode($k);
      $parts=explode('|',$k,3);
      $sn=$parts[0]; $subk=implode('|',array_slice($parts,1));
      $tc='t-other';
      if($sn==='language') $tc='t-lang';
      elseif(in_array($sn,['item_data','weapon_soul_data','fashion_data'])) $tc='t-item';
      elseif(in_array($sn,['scene_data','arena_data'])) $tc='t-scene';
    ?>
    <tr>
      <td>
        <span class="tag <?=$tc?>"><?=htmlspecialchars($sn)?></span>
        <div class="key" title="<?=htmlspecialchars($k)?>"><?=htmlspecialchars($subk)?></div>
      </td>
      <td class="cn"><?=htmlspecialchars(mb_substr($d['cn'],0,80,'UTF-8'))?></td>
      <td>
        <textarea class="eng <?=$d['untrans']?'un':''?>" name="tr[<?=htmlspecialchars($kb64)?>]" rows="1"><?=htmlspecialchars($d['eng'])?></textarea>
      </td>
    </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
  <?php endif; ?>
  </form>

<?php elseif($tab==='thm'): ?>
  <form method="post" action="?action=save&tab=thm">
  <div class="toolbar">
    <b style="color:#ffb347">default.thm.json</b> — <?=count($thmStrings)?> chuỗi CJK
    <button type="submit" class="btn b-green">💾 Lưu</button>
    <a href="?action=applythm&tab=thm" class="btn b-orange" onclick="return confirm('Apply vào thm.json?')">⚡ Apply thm.json</a>
  </div>
  <table>
    <thead><tr>
      <th style="width:45%">Tiếng Trung (gốc)</th>
      <th>Bản dịch tiếng Anh</th>
    </tr></thead>
    <tbody>
    <?php foreach($thmStrings as $cn):
      $kb64=base64_encode($cn);
      $k='thm|'.$kb64;
      $eng=isset($trans[$k])?$trans[$k]:$cn;
      $un=hasCJK($eng);
    ?>
    <tr>
      <td class="cn"><?=htmlspecialchars(mb_substr($cn,0,120,'UTF-8'))?></td>
      <td>
        <textarea class="eng <?=$un?'un':''?>" name="thm[<?=htmlspecialchars($kb64)?>]" rows="1"><?=htmlspecialchars($eng)?></textarea>
      </td>
    </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
  </form>

<?php elseif($tab==='debug'): ?>
  <div class="info-box">
    <b>Đường dẫn file:</b><br>
    cw.txt: <?=htmlspecialchars(CW_FILE)?><br>
    cw.txt.original: <?=file_exists(CW_ORIG)?'✓ exists':'– chưa có (tạo khi Apply lần đầu)'?><br>
    thm.json: <?=htmlspecialchars(THM_FILE)?><br>
    trans.json: <?=htmlspecialchars(TRANS_FILE)?><br>
    <br>
    <b>Kích thước file:</b><br>
    cw.txt: <?=file_exists(CW_FILE)?filesize(CW_FILE).' bytes (sửa: '.date('Y-m-d H:i:s',filemtime(CW_FILE)).')':'❌ không tìm thấy'?><br>
    cw.txt.original: <?=file_exists(CW_ORIG)?filesize(CW_ORIG).' bytes':'–'?><br>
    thm.json: <?=file_exists(THM_FILE)?filesize(THM_FILE).' bytes':'❌ không tìm thấy'?><br>
    <br>
    <b>PHP / Server:</b><br>
    PHP: <?=PHP_VERSION?> | mbstring: <?=extension_loaded('mbstring')?'✓':'❌'?> | Quyền ghi cw.txt: <?=is_writable(dirname(CW_FILE))?'✓':'❌ Cần chmod!'?><br>
    <br>
    <b>Kiểm tra bản dịch trong cw.txt hiện tại:</b><br>
    <?php if(file_exists(CW_FILE)):
      $raw=file_get_contents(CW_FILE);
      foreach(['ATK'=>'ATK (tốt)','DEF'=>'DEF (tốt)','Pen'=>'Pen (tốt)','Enh+'=>'Enh+ (tốt)','Sapphire'=>'Sapphire (tốt)'] as $w=>$lbl):
        $found=strpos($raw,$w)!==false;
    ?><span style="color:<?=$found?'#6fdc8c':'#ff8080'?>"><?=$found?'✓':'✗'?> <?=htmlspecialchars($lbl)?></span> &nbsp;
    <?php endforeach;
      foreach(['攻击','防御','破甲'] as $w):
        $cnt=substr_count($raw,$w);
    ?><br><span style="color:<?=$cnt===0?'#6fdc8c':'#ffb347'?>"><?=$cnt===0?'✓':'⚠ Còn '.$cnt.'x'?> "<?=$w?>"</span>
    <?php endforeach; ?>
    <?php endif; ?>
    <br><br>
    <b>Nếu game không thấy thay đổi sau khi copy file:</b><br>
    1. Mở game trong cửa sổ ẩn danh (Ctrl+Shift+N) — tránh browser cache<br>
    2. Hoặc: F12 → tab Network → tick "Disable cache" → F5<br>
    3. Kiểm tra đường dẫn cw.txt ở trên có trùng với thư mục XAMPP không<br>
    4. Sau khi Apply, kích thước cw.txt phải thay đổi (xem ở trên)
  </div>
<?php endif; ?>
</div>
</div>

<script>
function autoResize(ta){ta.style.height='auto';ta.style.height=Math.max(26,ta.scrollHeight)+'px';}
document.querySelectorAll('textarea.eng').forEach(function(t){
    autoResize(t);
    t.addEventListener('input',function(){
        autoResize(this);
        if(this.value&&!/[一-鿿]/.test(this.value)){
            this.classList.remove('un');
        }
    });
});
// Confirm before navigate away with unsaved changes
var dirty=false;
document.querySelectorAll('textarea.eng').forEach(function(t){t.addEventListener('input',function(){dirty=true;});});
window.onbeforeunload=function(e){if(dirty){return 'Có thay đổi chưa lưu. Bạn có chắc muốn rời trang?';}};
document.querySelectorAll('form').forEach(function(f){f.addEventListener('submit',function(){dirty=false;});});
document.querySelectorAll('.btn').forEach(function(b){if(b.href)b.addEventListener('click',function(){dirty=false;});});
</script>
<?php endif; ?>
</body>
</html>
