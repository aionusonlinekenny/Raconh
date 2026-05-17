var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *author Anydo
 *create 2017-11-17
 *description
*/
var Animation = /** @class */ (function (_super) {
    __extends(Animation, _super);
    function Animation() {
        var _this = _super.call(this, true) || this;
        _this.touchChildren = false;
        _this.touchEnabled = false;
        return _this;
    }
    Object.defineProperty(Animation.prototype, "cvo", {
        get: function () { return this._cvo; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Animation.prototype, "currentFrame", {
        get: function () { return this._currentFrame; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Animation.prototype, "totalFrame", {
        get: function () { return this._cvo.totalFrame; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Animation.prototype, "url", {
        get: function () { return (this._path ? this._path.url : ""); },
        enumerable: true,
        configurable: true
    });
    Animation.prototype.reuse = function (path, cvo, loaderPriority, autoPlay, playCompleteDispose) {
        if (autoPlay === void 0) { autoPlay = true; }
        if (playCompleteDispose === void 0) { playCompleteDispose = true; }
        this._path = path;
        this._cvo = cvo;
        this._pause = !autoPlay;
        this._playCompleteDispose = playCompleteDispose;
        this._loaderPriority = loaderPriority;
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESOURCE_LOAD_FAIL, this.loadFail, this);
        this._curTime = 1;
        this._currentFrame = 1;
        this._loaderCompletes = [];
        this._nextFrame = 10000;
        this._currentTime = 0; //Manager.global.FRAME_TIME;
        this._repeate = (cvo.wrapMode <= 0) ? -1 : cvo.wrapMode;
        this._bitmap = Manager.pool.create(egret.Bitmap);
        this.addChild(this._bitmap);
        this.scaleX = this._cvo.scale;
        this.scaleY = this._cvo.scale;
        if (this.scaleX != 1 || this.scaleY != 1)
            this._bitmap.smoothing = true;
        _super.prototype.reuse.call(this);
    };
    Animation.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESOURCE_LOAD_FAIL, this.loadFail, this);
        if (this._path)
            Manager.loader.remove(this._path, this.loadSuccess, this);
        if (this._bitmap)
            Manager.pool.push(this._bitmap);
        this._bitmap = null;
        this.filters = null;
        this._cvo = null;
        this._data = null;
        this._path = null;
        this._loaderCompletes = null;
        this._pause = false;
        this._isInit = false;
        this._loadCompleteFlag = false;
        this._playCompleteDispose = false;
        this._repeate = 0;
        this._curTime = 0;
        this._nextFrame = 0;
        this._currentTime = 0;
        this._loaderPriority = 0;
        this.x = 0;
        this.y = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.skewX = 0;
        this.skewY = 0;
        this.touchChildren = false;
        this.touchEnabled = false;
    };
    Animation.prototype.__addedToStage = function (e) {
        _super.prototype.__addedToStage.call(this, e);
        if (this._loadCompleteFlag && this._cvo.totalFrame > 1)
            Manager.render.add(this.render, this);
        if (this._isInit)
            return;
        this._isInit = true;
        if (this._cvo.stayMemory == 0)
            Manager.loader.load(this._path, this.loadSuccess, this, ResourceGCType.COMMON, this._loaderPriority);
        else if (this._cvo.stayMemory == 3
            || Manager.model.self.attrInfo.career == 1 && this._cvo.stayMemory == 1
            || Manager.model.self.attrInfo.career == 2 && this._cvo.stayMemory == 2) {
            Manager.loader.load(this._path, this.loadSuccess, this, ResourceGCType.NEVER, this._loaderPriority);
        }
    };
    Animation.prototype.loadSuccess = function (loader) {
        this._loadCompleteFlag = true;
        this._data = loader.data.aniData;
        this.initData();
        this.actLoadCompleteFuctions();
        this.dispatchEvent(new GlobalEvent(GlobalEvent.ANIMATION_LOAD_COMPLETE));
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESOURCE_LOAD_FAIL, this.loadFail, this);
    };
    Animation.prototype.__removeFromStage = function (e) {
        _super.prototype.__removeFromStage.call(this, e);
        Manager.render.remove(this.render, this);
    };
    Animation.prototype.play = function () { this._pause = false; };
    Animation.prototype.stop = function () { this._pause = true; };
    Animation.prototype.render = function (interval) {
        var that = this;
        if (!that._pause) {
            that.goto(that._currentFrame);
            that._currentTime += Math.max(Manager.render.interval, Manager.global.FRAME_TIME);
            that._currentFrame = Math.ceil(that._currentTime / Manager.global.ANI_INTERVAL); //Math.ceil(that._currentTime / Manager.global.FRAME_TIME);
            if (that._currentFrame > that._nextFrame)
                that._currentFrame = that._nextFrame;
            if (that._cvo && that._currentFrame > that._cvo.totalFrame) {
                that._currentTime = Manager.global.FRAME_TIME;
                that._currentFrame = 1;
                if (that._repeate > 0) {
                    that._curTime++;
                    that._repeate--;
                    if (that._repeate <= 0)
                        that.complete();
                }
            }
        }
    };
    Animation.prototype.goto = function (frame) {
        if (this._data == null)
            return;
        if (frame < 1)
            frame = 1;
        else if (frame > this._cvo.totalFrame)
            frame = this._cvo.totalFrame;
        this._currentFrame = frame;
        var index = this._cvo.frames.indexOf(this._currentFrame);
        if (index != -1) {
            this._nextFrame = ((index + 1) >= this._cvo.frames.length) ? 10000 : this._cvo.frames[index + 1];
            // let frameData = this._data.getKeyFrameData(index+1);
            // this._bitmap.x = frameData.x;
            // this._bitmap.y = frameData.y;
            // this._bitmap.texture = this._data.getTextureByFrame(index+1);
            var frameData = this._data.getKeyFrameData(index + 1);
            this._bitmap.x = -this._cvo.offsetX + frameData.offX;
            this._bitmap.y = -this._cvo.offsetY + frameData.offY;
            this._bitmap.texture = frameData.texture;
        }
    };
    Animation.prototype.initData = function () {
        this._currentFrame = 1;
        if (this._cvo.totalFrame > 1)
            Manager.render.add(this.render, this);
        else if (this._cvo.totalFrame == 1)
            this.goto(1);
    };
    Animation.prototype.actLoadCompleteFuctions = function () {
        var one;
        for (var i = 0; i < this._loaderCompletes.length; i++) {
            one = this._loaderCompletes[i];
            one.f.apply(this, one.param);
        }
        this._loaderCompletes = [];
    };
    Animation.prototype.loadFail = function (e) {
        if (e.params != this._path.url)
            return;
        this.dispatchEvent(new GlobalEvent(GlobalEvent.ANIMATION_LOAD_ERROR));
        Manager.pool.push(this);
    };
    Animation.prototype.gotoAndStop = function (frame) {
        if (this._data == null) {
            this._loaderCompletes.push({ f: this.gotoAndStop, param: [frame] });
            return;
        }
        this._pause = true;
        this._currentTime = frame * Manager.global.FRAME_TIME;
        this.goto(frame);
    };
    Animation.prototype.gotoAndPlay = function (frame) {
        if (this._data == null) {
            this._loaderCompletes.push({ f: this.gotoAndPlay, param: [frame] });
            return;
        }
        this._pause = false;
        this._currentTime = frame * Manager.global.FRAME_TIME;
        this.goto(frame);
    };
    Animation.prototype.complete = function () {
        if (this._playCompleteDispose) {
            Manager.pool.push(this);
        }
        else {
            this._pause = true;
            this._repeate = (this._cvo.wrapMode <= 0) ? -1 : this._cvo.wrapMode;
        }
        this.dispatchEvent(new GlobalEvent(GlobalEvent.ANIMATION_PLAY_COMPLETE));
    };
    Animation.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
        if (this._path)
            Manager.loader.remove(this._path, this.loadSuccess, this);
        Manager.pool.push(this._bitmap);
        this._bitmap = null;
        this._data = null;
        this._cvo = null;
        this._path = null;
        this._loaderCompletes = null;
    };
    return Animation;
}(Sprite));
//# sourceMappingURL=Animation.js.map