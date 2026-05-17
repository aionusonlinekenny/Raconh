/**
 *author Anydo
 *create 2018-4-8
 *description
*/
var SoundManager3 = /** @class */ (function () {
    function SoundManager3() {
        this._openBgm = true;
        this._bgmSound = new egret.Sound();
        this._bgmSound.type = egret.Sound.MUSIC;
        this._bgmSound.addEventListener(egret.Event.COMPLETE, this.__bgmLoadCompleteHandler, this);
        this._bgmSound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.__bgmIoErrorHandler, this);
    }
    SoundManager3.prototype.playBGM = function (path) {
        if (this._path != null && this._path.url == path.url)
            return;
        this._path = path;
        if (this._bgmSoundChannel != null) {
            this._bgmSoundChannel.stop();
            this._bgmSoundChannel = null;
        }
        this.loadBGM();
    };
    SoundManager3.prototype.loadBGM = function () {
        this._bgmLoaded = false;
        this._bgmSound.close();
        this._bgmSound.load(this._path.url);
    };
    SoundManager3.prototype.__bgmLoadCompleteHandler = function (e) {
        this._bgmLoaded = true;
        if (this._openBgm && !Manager.global.lifecyclePause) {
            this._bgmSoundChannel = this._bgmSound.play();
        }
    };
    SoundManager3.prototype.__bgmIoErrorHandler = function (e) {
    };
    Object.defineProperty(SoundManager3.prototype, "openBgm", {
        get: function () { return this._openBgm; },
        set: function (value) {
            this._openBgm = value;
            this.webFocusListener();
        },
        enumerable: true,
        configurable: true
    });
    ;
    SoundManager3.prototype.webFocusListener = function () {
        if (this._openBgm && !Manager.global.lifecyclePause) {
            if (this._bgmSound && this._bgmLoaded) {
                this._bgmSoundChannel = this._bgmSound.play();
            }
        }
        else {
            if (this._bgmSoundChannel != null) {
                this._bgmSoundChannel.stop();
            }
        }
    };
    SoundManager3.prototype.playEffectMusic = function (path) {
        if (!this.openEffect)
            return;
        var effSound = new egret.Sound();
        effSound.type = egret.Sound.EFFECT;
        effSound.addEventListener(egret.Event.COMPLETE, this.__effectMusicLoadHandler, this);
        effSound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.__effectMusicErrorHandler, this);
        effSound.load(path.url);
    };
    SoundManager3.prototype.__effectMusicLoadHandler = function (e) {
        var effSound = e.target;
        effSound.removeEventListener(egret.Event.COMPLETE, this.__effectMusicLoadHandler, this);
        effSound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.__effectMusicErrorHandler, this);
        if (this.openEffect) {
            effSound.play(0, 1);
        }
    };
    SoundManager3.prototype.__effectMusicErrorHandler = function (e) {
        var effSound = e.target;
        effSound.removeEventListener(egret.Event.COMPLETE, this.__effectMusicLoadHandler, this);
        effSound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.__effectMusicErrorHandler, this);
    };
    return SoundManager3;
}());
//# sourceMappingURL=SoundManager3.js.map