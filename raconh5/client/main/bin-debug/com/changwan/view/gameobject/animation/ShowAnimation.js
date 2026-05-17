var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
var ShowAnimation = (function (_super) {
    __extends(ShowAnimation, _super);
    function ShowAnimation() {
        return _super.call(this) || this;
    }
    ShowAnimation.prototype.reuse = function (info) {
        this._layers = [];
        this._totalTimer = 0;
        this._nextFrame = 10000;
        this._currentAction = FigureAction.STAND;
        this._currentDirection = Direction.DOWN;
        this._currentFrame = 1;
        this._info = info;
        this._pause = false;
        this._isClearCurrent = true;
        this._updateDirection = true;
        this._updateAction = true;
        this._isChangeStyle = true;
        this._isChangeClothes = false;
        this._currentClothes = -1;
        this._currentLoadingClothes = null;
        this._container = Manager.pool.create(egret.DisplayObjectContainer);
        this.addChild(this._container);
        this._clothes = Manager.pool.create(AnimationLayer);
        this._container.addChild(this._clothes);
        this.setFrames(this._currentAction);
        this.resetTimer();
        this.addEvent();
    };
    ShowAnimation.prototype.unuse = function () {
        if (this.parent != null)
            this.parent.removeChild(this);
        this.removeLoad(this._currentLoadingClothes, this.clothesComplete);
        this.removeEvent();
        this.filters = null;
        this._layers = null;
        this._pause = false;
        this._totalTimer = 0;
        this._currentTimer = 0;
        this._updateDirection = false;
        this._updateAction = false;
        this._currentAction = "";
        this._currentFrame = 0;
        this._nextFrame = 0;
        this._totalFrame = 0;
        this._info = null;
        this._frames = null;
        this._isChangeClothes = false;
        this._isChangeStyle = false;
        this._isClearCurrent = false;
        this._currentClothes = -1;
        this._currentLoadingClothes = null;
        Manager.pool.push(this._clothes);
        this._clothes = null;
        Manager.pool.push(this._container);
        this._container = null;
        if (this._ghosts != null) {
            for (var i = 0; i < this._ghosts.length; i++) {
                Manager.pool.push(this._ghosts[i]);
            }
            this._ghosts = null;
        }
        this.x = 0;
        this.y = 0;
    };
    ShowAnimation.prototype.addEvent = function () {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.__addedToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removeFromStage, this);
    };
    ShowAnimation.prototype.removeEvent = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.__addedToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removeFromStage, this);
    };
    ShowAnimation.prototype.__addedToStage = function (e) {
        Manager.render.add(this.render, this);
        this._isChangeStyle = true;
    };
    ShowAnimation.prototype.__removeFromStage = function (e) {
        Manager.render.remove(this.render, this);
    };
    Object.defineProperty(ShowAnimation.prototype, "figureDirection", {
        set: function (direction) {
            if (this._currentDirection != direction) {
                if (this._currentDirection.replace("left", "right") != direction.replace("left", "right"))
                    this._isChangeStyle = (this._currentDirection != direction);
                this._currentDirection = direction;
                this._isClearCurrent = this._isChangeStyle;
                this._updateDirection = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShowAnimation.prototype, "figureAction", {
        set: function (action) {
            if (this._currentAction != action) {
                this._currentAction = action;
                this._isChangeStyle = true;
                this._updateAction = true;
                this._isClearCurrent = true;
                this._currentFrame = 1;
                this._pause = false;
                this.setFrames(this._currentAction);
                this.resetTimer();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShowAnimation.prototype, "currentClothes", {
        set: function (aniID) {
            throw new Error("子类需重写");
        },
        enumerable: true,
        configurable: true
    });
    ShowAnimation.prototype.setFrames = function (action) {
        throw new Error("子类需重写");
    };
    ShowAnimation.prototype.updateStyle = function () {
        throw new Error("子类需重写");
    };
    ShowAnimation.prototype.switchInitFrameLabel = function () {
    };
    ShowAnimation.prototype.resetTimer = function () {
        this._currentTimer = 0;
        this._totalTimer = this._totalFrame * Manager.global.FRAME_TIME;
    };
    ShowAnimation.prototype.cancelClothes = function () {
        if (this._currentLoadingClothes != null) {
            this.cancelLoadCompleteCall(this._clothes, this._currentLoadingClothes, this.clothesComplete);
            this._currentLoadingClothes = null;
        }
    };
    ShowAnimation.prototype.updateClothes = function () {
        this.cancelClothes();
    };
    ShowAnimation.prototype.cancel = function () {
        this.cancelClothes();
    };
    ShowAnimation.prototype.addLayer = function (layer) {
        if (this.hasLayer(layer))
            return;
        this._layers.push(layer);
    };
    ShowAnimation.prototype.hasLayer = function (layer) {
        if (!this._layers || !layer)
            return false;
        return (this._layers.indexOf(layer) != -1);
    };
    ShowAnimation.prototype.removeLayer = function (layer) {
        var index = this._layers.indexOf(layer);
        if (index != -1)
            this._layers.splice(index, 1);
    };
    ShowAnimation.prototype.render = function (interval) {
        var that = this;
        if (that._isChangeClothes) {
            that._isChangeClothes = false;
            that.updateClothes();
        }
        if (that._isClearCurrent)
            that._isClearCurrent = false;
        if (that._updateDirection) {
            that._container.scaleX = (that._currentDirection.indexOf("left") == 0) ? -1 : 1;
            that._updateDirection = false;
        }
        if (that._pause || that._frames == null)
            return;
        that.updateKeyFrame();
        that._currentTimer += Math.max(interval, Manager.global.FRAME_TIME);
        that._currentFrame = Math.ceil(that._currentTimer / Manager.global.ANI_INTERVAL); //Math.ceil(that._currentTimer / Manager.global.FRAME_TIME);
        if (that._currentFrame > that._nextFrame)
            that._currentFrame = that._nextFrame;
        that.renderCurrentFrame();
    };
    /**
     * 更新关键帧
     */
    ShowAnimation.prototype.updateKeyFrame = function () {
        var that = this;
        var index = that._frames.indexOf(that._currentFrame);
        if (index != -1) {
            that._nextFrame = ((index + 1) >= that._frames.length) ? 10000 : that._frames[index + 1];
            for (var i = 0; i < that._layers.length; i++) {
                if (that._layers[i].isNormal)
                    that.updateAnimationLayer(index, that._layers[i]);
            }
        }
    };
    ShowAnimation.prototype.renderCurrentFrame = function () {
        var that = this;
        if (that._currentFrame > that._totalFrame) {
            var wrapmode = FigureAction.getWrapMode(that._currentAction);
            switch (wrapmode) {
                case WrapMode.ONCE:
                    that._pause = true;
                    break;
                case WrapMode.ONCE_DEFAULT:
                case WrapMode.ATTACK:
                    that._currentTimer = 0;
                    that._currentFrame = 1;
                    if (!that._info.isSceneRobot)
                        that.onceDefault();
                    break;
                default:
                    that._currentTimer = 0;
                    that._currentFrame = 1;
                    break;
            }
        }
    };
    ShowAnimation.prototype.onceDefault = function () {
        this._info.setActionStr(FigureAction.STAND);
    };
    ShowAnimation.prototype.updateAnimationLayer = function (index, layer) {
        layer.updateFrame(index + 1);
    };
    ShowAnimation.prototype.cancelLoadCompleteCall = function (layer, current, call) {
        if (this._isClearCurrent) {
            layer.clear();
        }
        this.removeLayer(layer);
        this.removeLoad(current, call);
    };
    ShowAnimation.prototype.removeLoad = function (current, call) {
        if (current != null) {
            Manager.loader.remove(current, call, this);
        }
    };
    ShowAnimation.prototype.initData = function (layer, loader) {
        layer.setLoadData(loader);
        if (this._pause) {
            // let index = this._frames[this._frames.length - 1];
            var index = this._frames.length - 1;
            this.updateAnimationLayer(index, layer);
        }
    };
    ShowAnimation.prototype.clothesComplete = function (loader) {
        this.loadAnimationComplete(this._clothes, loader);
    };
    ShowAnimation.prototype.loadAnimationComplete = function (layer, loader) {
        this.initData(layer, loader);
        this.addLayer(layer);
    };
    ShowAnimation.prototype.updateGhost = function () {
        if (this._ghosts == null)
            return;
        for (var i = this._ghosts.length - 1; i >= 0; i--) {
            this._ghosts[i].alpha -= 0.04;
            if (this._ghosts[i].alpha <= 0) {
                Manager.pool.push(this._ghosts[i]);
                this._ghosts.splice(i, 1);
            }
        }
    };
    ShowAnimation.prototype.addGhost = function (bitmap, posx, posy) {
        var ghost = Manager.pool.create(egret.Bitmap);
        ghost.alpha = 0.65;
        ghost.texture = bitmap.texture;
        ghost.scaleX = this._container.scaleX;
        ghost.x = posx + bitmap.x * this._container.scaleX;
        ghost.y = posy + bitmap.y;
        Manager.layer.elementLayer2.addChild(ghost);
        if (this._ghosts == null)
            this._ghosts = [];
        this._ghosts.push(ghost);
    };
    ShowAnimation.prototype.hasGhost = function () {
        return this._ghosts != null && this._ghosts.length > 0;
    };
    ShowAnimation.prototype.dispose = function () {
        if (this.parent != null)
            this.parent.removeChild(this);
        this.cancel();
        Manager.pool.push(this._clothes);
        this._clothes = null;
        Manager.pool.push(this._container);
        this._container = null;
        if (this._ghosts != null) {
            for (var i = 0; i < this._ghosts.length; i++) {
                Manager.pool.push(this._ghosts[i]);
            }
            this._ghosts = null;
        }
        this._info = null;
        this._layers = null;
        this._currentLoadingClothes = null;
    };
    return ShowAnimation;
}(egret.DisplayObjectContainer));
__reflect(ShowAnimation.prototype, "ShowAnimation", ["IAnimation", "cw.IDispose", "egret.IEventDispatcher", "cw.IPool"]);
//# sourceMappingURL=ShowAnimation.js.map