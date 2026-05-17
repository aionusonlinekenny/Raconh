var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2018-4-10
 *description
*/
var SoundManager = (function () {
    function SoundManager() {
        this._noMute = true;
        this._soundDic = {};
    }
    Object.defineProperty(SoundManager.prototype, "noMute", {
        get: function () { return this._noMute; },
        set: function (value) {
            if (this._noMute == value)
                return;
            this._noMute = value;
            if (this._bgmSound != null) {
                if (this._noMute) {
                    this._bgmSound.continue();
                }
                else {
                    this._bgmSound.pause();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    SoundManager.prototype.playBGM = function (path) {
        if (Manager.global.lifecyclePause)
            return;
        if (this._bgmSound != null && this._bgmSound.path.url == path.url)
            return;
        if (this._bgmSound != null)
            this._bgmSound.stop();
        this._bgmSound = this._soundDic[path.url];
        if (this._bgmSound == null) {
            this._bgmSound = new SoundObject(path);
            this._bgmSound.load(egret.Sound.MUSIC, path.url);
            this._soundDic[path.url] = this._bgmSound;
        }
        if (!this._noMute)
            return;
        this._bgmSound.play();
    };
    SoundManager.prototype.playEffect = function (path) {
        if (!this._noMute)
            return;
        if (Manager.global.lifecyclePause)
            return;
        var effct = this._soundDic[path.url];
        if (effct == null) {
            effct = new SoundObject(path);
            effct.load(egret.Sound.EFFECT, path.url);
            this._soundDic[path.url] = effct;
        }
        effct.play(1);
    };
    SoundManager.prototype.webFocusListener = function () {
        if (!this._noMute)
            return;
        if (this._bgmSound == null)
            return;
        if (Manager.global.lifecyclePause) {
            this._bgmSound.pause();
        }
        else {
            this._bgmSound.continue();
        }
    };
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
//# sourceMappingURL=SoundManager.js.map