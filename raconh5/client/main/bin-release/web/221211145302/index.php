<?php
/**
 * index.php — PHP-gated game entry point
 * Place at: C:\xampp\htdocs\game\index.php
 *
 * Auth flow:
 *   1. No session         → redirect to login.php
 *   2. Session but no ?username in URL → redirect to ./?username=xxx
 *      (PlatformManager inside main.min.js reads only from URL params)
 *   3. URL has correct username → serve the game page
 *
 * The game then connects as that username; Erlang loads the existing
 * character or shows CreateRoleView for a new account.
 */
session_start();

// ── 1. Must be logged in ──────────────────────────────────────────────────────
if (empty($_SESSION['game_user'])) {
    header('Location: login.php');
    exit;
}

$username = $_SESSION['game_user'];

// ── 2. PlatformManager (compiled) reads only from URL params.
//       Make sure ?username= is present and matches the session so it picks it up.
$urlUser = $_GET['username'] ?? '';
if ($urlUser !== $username) {
    header('Location: ./?username=' . rawurlencode($username));
    exit;
}

// ── 3. Serve the game ─────────────────────────────────────────────────────────
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
        #cw-badge {
            position: fixed; top: 8px; right: 8px; z-index: 9999;
            background: rgba(0,0,0,.6);
            border: 1px solid rgba(240,180,60,.4);
            border-radius: 5px;
            padding: 5px 12px;
            font: 12px/1.4 Arial, sans-serif;
            color: #f0c060;
            text-decoration: none;
            letter-spacing: .5px;
            pointer-events: auto;
        }
        #cw-badge:hover { background: rgba(0,0,0,.85); }
    </style>

    <?php /* Two sources so translate.js has the username before AND after Egret loads */ ?>
    <script>
        // Primary: read by translate.js immediately (before Egret starts)
        window._cwGameUser = <?php echo $username_json; ?>;
    </script>

    <script type="text/javascript" src="Loading.js"></script>
    <script type="text/javascript" src="translate.js?v=53"></script>
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
    <a id="cw-badge" href="logout.php" title="Click to logout">
        &#9986; <?php echo htmlspecialchars($username); ?>
    </a>
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
