<?php
/**
 * index.php — game entry point
 * Place at: C:\xampp\htdocs\game\index.php
 *
 * No mandatory login redirect.  Authentication happens inside the game via
 * the translate.js password overlay → auth.php.
 *
 * If a PHP session already exists (returning player) the username is injected
 * directly so translate.js skips the overlay and the player goes straight to
 * server selection.
 */
session_start();
$username = $_SESSION['game_user'] ?? '';

// Returning player: ensure ?username= is in the URL so PlatformManager picks it up
if ($username) {
    $urlUser = $_GET['username'] ?? '';
    if ($urlUser !== $username) {
        header('Location: ./?username=' . rawurlencode($username));
        exit;
    }
}

$username_json = json_encode($username); // '' for guests; filled for session users
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
        // Injected by PHP: non-empty only when a valid session exists.
        // translate.js reads this — if set, the password overlay is skipped.
        window._cwGameUser = <?php echo $username_json; ?>;
    </script>

    <script type="text/javascript" src="Loading.js"></script>
    <script type="text/javascript" src="translate.js?v=58"></script>
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
