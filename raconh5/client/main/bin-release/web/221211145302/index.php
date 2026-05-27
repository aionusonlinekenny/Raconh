<?php
/**
 * index.php — game entry point
 * Place at: C:\xampp\htdocs\game\index.php
 *
 * If no PHP session → show inline login form (same URL, no redirect).
 * After AJAX auth → PHP session is set → page reloads → game loads.
 * window._cwGameUser is injected for translate.js so it skips in-game re-auth.
 */
session_start();
$username = $_SESSION['game_user'] ?? '';

// ── No session: show inline login form ──────────────────────────────────────
if (!$username):
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>RaconH v6 — Login</title>
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <style>
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{height:100%;background:#1a1a2e;display:flex;align-items:center;justify-content:center;font-family:'Microsoft YaHei',Arial,sans-serif}
        .box{background:#16213e;border:1px solid #0f3460;border-radius:12px;padding:36px 32px;width:340px;box-shadow:0 8px 32px rgba(0,0,0,.6)}
        h2{color:#e94560;text-align:center;font-size:22px;margin-bottom:6px;letter-spacing:1px}
        .sub{color:#888;text-align:center;font-size:13px;margin-bottom:28px}
        label{display:block;color:#aaa;font-size:13px;margin-bottom:5px}
        input{width:100%;background:#0f3460;border:1px solid #1a4a7a;border-radius:6px;padding:10px 12px;color:#fff;font-size:15px;outline:none;transition:border .2s}
        input:focus{border-color:#e94560}
        .field{margin-bottom:18px}
        .btn{width:100%;background:#e94560;border:none;border-radius:6px;padding:12px;color:#fff;font-size:16px;font-weight:bold;cursor:pointer;letter-spacing:1px;transition:background .2s;margin-top:4px}
        .btn:hover{background:#c73652}
        .btn:disabled{background:#555;cursor:not-allowed}
        #msg{min-height:20px;text-align:center;font-size:13px;margin-top:14px;color:#e94560}
        #msg.ok{color:#4caf50}
    </style>
</head>
<body>
<div class="box">
    <h2>RaconH</h2>
    <p class="sub">Enter your account to play</p>
    <div class="field">
        <label for="u">Account</label>
        <input id="u" type="text" maxlength="20" autocomplete="username" placeholder="3–20 chars">
    </div>
    <div class="field">
        <label for="p">Password</label>
        <input id="p" type="password" maxlength="64" autocomplete="current-password" placeholder="min 6 chars">
    </div>
    <button class="btn" id="btn" onclick="doLogin()">Sign In / Register</button>
    <div id="msg"></div>
</div>
<script>
document.getElementById('p').addEventListener('keydown',function(e){if(e.key==='Enter')doLogin();});
document.getElementById('u').addEventListener('keydown',function(e){if(e.key==='Enter')document.getElementById('p').focus();});
function doLogin(){
    var u=document.getElementById('u').value.trim();
    var p=document.getElementById('p').value;
    var btn=document.getElementById('btn');
    var msg=document.getElementById('msg');
    msg.className='';msg.textContent='';
    if(!u||!p){msg.textContent='Please fill in both fields.';return;}
    btn.disabled=true;btn.textContent='...';
    var xr=new XMLHttpRequest();
    xr.open('POST','auth.php',true);
    xr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xr.onload=function(){
        try{
            var r=JSON.parse(xr.response);
            if(r.ok){
                msg.className='ok';
                msg.textContent='Welcome, '+r.username+'! Loading game...';
                setTimeout(function(){location.reload();},600);
            }else{
                msg.textContent=r.error||'Login failed.';
                btn.disabled=false;btn.textContent='Sign In / Register';
            }
        }catch(e){
            msg.textContent='Server error.';
            btn.disabled=false;btn.textContent='Sign In / Register';
        }
    };
    xr.onerror=function(){
        msg.textContent='Connection error.';
        btn.disabled=false;btn.textContent='Sign In / Register';
    };
    xr.send('username='+encodeURIComponent(u)+'&password='+encodeURIComponent(p));
}
</script>
</body>
</html>
<?php
exit;
endif;

// ── Valid session: ensure ?username= is in the URL so PlatformManager picks it up ─
$urlUser = $_GET['username'] ?? '';
if ($urlUser !== $username) {
    header('Location: ./?username=' . rawurlencode($username));
    exit;
}

$username_json = json_encode($username);
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>RaconH v6</title>
    <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="full-screen" content="true" />
    <meta name="screen-orientation" content="portrait" />
    <meta name="x5-fullscreen" content="true" />
    <meta name="360-fullscreen" content="true" />

    <style>
        html, body {
            -ms-touch-action: auto;
            background: #888888;
            padding: 0; border: 0; margin: 0;
            height: 100%;
        }
    </style>

    <script>
        // Non-empty only when a valid PHP session exists.
        // translate.js reads this — sets _cwAuthed=true, skips in-game password prompt.
        window._cwGameUser = <?php echo $username_json; ?>;
    </script>

    <script type="text/javascript" src="Loading.js"></script>
    <script type="text/javascript" src="translate.js?v=63"></script>
    <audio id="1002" class="media-audio" src="resource/res/sound/1002.mp3" preload loop="loop"></audio>
    <audio id="1001" class="media-audio" src="resource/res/sound/1001.mp3" preload loop="loop"></audio>
    <script>
        var version = Math.random();
        function showLoading()  { Loading.init(version); }
        function setLoading(cur){ Loading.updateProgress(cur, 8); }
        function cleanLoading() { Loading.cleanAll(); }

        var curAudio;
        function audioAutoPlay(callback){
            callback();
            var play = function(){
                callback();
                document.removeEventListener("touchstart", play, false);
            };
            document.addEventListener("touchstart", play, false);
        }
    </script>
</head>
<body>
    <div id="egret-player"
         style="margin:auto;width:100%;height:100%;"
         class="egret-player"
         data-entry-class="Main"
         data-orientation="auto"
         data-scale-mode="showAll"
         data-content-width="720"
         data-content-height="1280"
         data-show-paint-rect="false"
         data-multi-fingered="2"
         data-show-fps="false"
         data-show-log="false"
         data-show-fps-style="x:0,y:200,size:12,textColor:0xffffff,bgAlpha:0.5">
    </div>
    <script>
        showLoading();
        var playerObj = document.getElementById("egret-player");
        var os = navigator.userAgent.toLowerCase();
        var isMobile = (os.indexOf('mobile') >= 0 || os.indexOf('android') >= 0);
        playerObj.setAttribute("data-frame-rate", isMobile ? "30" : "60");

        var loadScript = function(list, callback) {
            var loaded = 0;
            var loadNext = function() {
                loadSingleScript(list[loaded], function() {
                    loaded++;
                    if (loaded >= list.length) callback();
                    else loadNext();
                });
            };
            loadNext();
        };

        var loadSingleScript = function(src, callback) {
            var s = document.createElement('script');
            s.async = false;
            s.src = src + "?v=" + Math.random();
            s.addEventListener('load', function() {
                s.parentNode.removeChild(s);
                s.removeEventListener('load', arguments.callee, false);
                callback();
            }, false);
            document.body.appendChild(s);
        };

        var xhr = new XMLHttpRequest();
        xhr.open('GET', './manifest.json?v=' + version, true);
        xhr.addEventListener("load", function() {
            var manifest = JSON.parse(xhr.response);
            var list = manifest.initial.concat(manifest.game);
            loadScript(list, function() {
                setLoading(1);
                egret.runEgret({ renderMode: "webgl", audioType: 3, screenAdapter: new ScreenAdapter() });
            });
        });
        xhr.send(null);
    </script>
</body>
</html>
