var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2018-4-10
 *description
*/
var SoundObject = (function () {
    function SoundObject(path) {
        this.path = path;
        this._startTime = 0;
        this._loops = 1;
        this._playFlag = 0;
        this._isLoaded = false;
    }
    SoundObject.prototype.load = function (soundType, soundUrl) {
        if (this._soundType == soundType && soundUrl == this._soundUrl)
            return;
        this._soundType = soundType;
        this._soundUrl = soundUrl;
        if (this._sound == null) {
            try {
                this._sound = new egret.Sound();
                this._sound.type = this._soundType;
                this._sound.addEventListener(egret.Event.COMPLETE, this.soundLoadComplete, this);
                this._sound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.soundLoadError, this);
                this._sound.load(this._soundUrl);
            }
            catch (e) {
                console.log("声音音频问题！");
            }
        }
    };
    SoundObject.prototype.play = function (loops) {
        if (loops === void 0) { loops = 0; }
        this._playFlag = 3;
        this._loops = loops;
        this.startPlay();
    };
    SoundObject.prototype.continue = function () {
        if (!this._isLoaded)
            return;
        this.stopChannel();
        this._playFlag = 3;
        this.startPlay();
    };
    SoundObject.prototype.pause = function () {
        this._playFlag = 2;
        this._startTime = (this._soundChannel != null) ? this._soundChannel.position : 0;
        if (this._isLoaded && (this._sound.length - this._startTime) < 10) {
            this._startTime = 0;
        }
        this.stopChannel();
    };
    SoundObject.prototype.stop = function () {
        this.stopChannel();
        this._playFlag = 1;
        this._startTime = 0;
    };
    SoundObject.prototype.soundLoadComplete = function (e) {
        this._isLoaded = true;
        if (this._playFlag == 3) {
            this.startPlay();
        }
    };
    SoundObject.prototype.soundLoadError = function (e) {
        Trace.error("Sound Error:", this._soundUrl);
        this._isLoaded = false;
    };
    SoundObject.prototype.startPlay = function () {
        if (!this._isLoaded)
            return;
        if (this._soundChannel == null) {
            this._soundChannel = this._sound.play(this._startTime, this._loops);
            this._soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
        }
    };
    SoundObject.prototype.stopChannel = function () {
        if (this._soundChannel != null) {
            this._soundChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
            try {
                this._soundChannel.stop();
            }
            catch (e) {
                Trace.error("声音停止报错：", e);
            }
            this._soundChannel = null;
        }
    };
    SoundObject.prototype.onPlayComplete = function (e) {
        this.stopChannel();
        this._playFlag = 1;
        this._startTime = 0;
    };
    return SoundObject;
}());
__reflect(SoundObject.prototype, "SoundObject");
//# sourceMappingURL=SoundObject.js.map