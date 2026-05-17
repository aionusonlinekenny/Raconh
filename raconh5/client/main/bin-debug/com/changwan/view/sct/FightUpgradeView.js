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
/**
 * 提升战斗力
 */
var FightUpgradeView = (function (_super) {
    __extends(FightUpgradeView, _super);
    function FightUpgradeView() {
        return _super.call(this) || this;
    }
    FightUpgradeView.prototype.start = function () {
        _super.prototype.start.call(this);
        if (!this._fightUpgradeEffect) {
            this._fightUpgradeEffect = Manager.animation.createEffectAnimation("fightUpgrade");
            this._fightUpgradeEffect.width = 400;
            this._fightUpgradeEffect.height = 200;
            this._fightUpgradeEffect.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onPlayEffectComplete, this);
        }
        if (!this._fightUpgradeEffect.parent)
            this.addChild(this._fightUpgradeEffect);
        // this._fightUpgradeEffect.visible = true;
        if (!this._sp)
            this._sp = Manager.pool.create(Sprite);
        this._sp.alpha = 0;
        if (!this._sp.parent)
            this.addChild(this._sp);
        if (!this._fightImg) {
            this._fightImg = Manager.pool.create(BitmapRes, "common_zhanli2_png");
            this._fightImg.x = 90;
            this._fightImg.y = 80;
            this._sp.addChild(this._fightImg);
        }
        if (!this._fightAddImg) {
            this._fightAddImg = Manager.pool.create(BitmapRes, "nums_fighting_+_png");
            this._fightAddImg.x = 195;
            this._fightAddImg.y = 90;
            this._sp.addChild(this._fightAddImg);
        }
        if (!this._fightNum) {
            this._fightNum = Manager.pool.create(NumImgView2);
            this._fightNum.x = 230;
            this._fightNum.y = 90;
            if (!this._fightNum.parent)
                this._sp.addChild(this._fightNum);
        }
        this.onResizeHandler(null);
        egret.Tween.get(this._sp).to({ alpha: 1 }, 200);
    };
    FightUpgradeView.prototype.onPlayEffectComplete = function (e) {
        if (this._fightUpgradeEffect) {
            this._fightUpgradeEffect.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onPlayEffectComplete, this);
            // this._fightUpgradeEffect.visible = false;
            if (this._fightUpgradeEffect.parent)
                this._fightUpgradeEffect.parent.removeChild(this._fightUpgradeEffect);
            Manager.pool.push(this._fightUpgradeEffect);
            this._fightUpgradeEffect = null;
        }
        egret.Tween.get(this).to({ alpha: 0 }, 700).call(this.showComplate, this);
    };
    FightUpgradeView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    FightUpgradeView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    FightUpgradeView.prototype.onResizeHandler = function (e) {
        // this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
        this.x = 150;
        this.y = Manager.config.gameHeight - 480;
    };
    FightUpgradeView.prototype.reuse = function (fightValue, callback, thisObj) {
        _super.prototype.reuse.call(this);
        this._callback = callback;
        this._thisObj = thisObj;
        this._sp.alpha = 0;
        this._fightNum.setValue(fightValue, "nums_fighting_", 20);
    };
    FightUpgradeView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        egret.Tween.removeTweens(this._sp);
        egret.Tween.removeTweens(this);
        if (this._fightUpgradeEffect) {
            Manager.pool.push(this._fightUpgradeEffect);
            this._fightUpgradeEffect = null;
        }
        if (this._fightImg) {
            Manager.pool.push(this._fightImg);
            this._fightImg = null;
        }
        if (this._fightAddImg) {
            Manager.pool.push(this._fightAddImg);
            this._fightAddImg = null;
        }
        if (this._fightNum) {
            Manager.pool.push(this._fightNum);
            this._fightNum = null;
        }
        if (this._sp) {
            Manager.pool.push(this._sp);
            this._sp = null;
        }
        this._callback = null;
        this._thisObj = null;
    };
    FightUpgradeView.prototype.showComplate = function () {
        egret.Tween.get(this).to(null, 1000).call(this.hide, this);
    };
    FightUpgradeView.prototype.hide = function () {
        if (this._callback != null) {
            this._callback(this._thisObj);
        }
    };
    FightUpgradeView.prototype.dispose = function () {
        egret.Tween.removeTweens(this._sp);
        egret.Tween.removeTweens(this);
        _super.prototype.dispose.call(this);
        if (this._fightUpgradeEffect) {
            Manager.pool.push(this._fightUpgradeEffect);
            this._fightUpgradeEffect = null;
        }
        if (this._fightImg) {
            Manager.pool.push(this._fightImg);
            this._fightImg = null;
        }
        if (this._fightAddImg) {
            Manager.pool.push(this._fightAddImg);
            this._fightAddImg = null;
        }
        if (this._fightNum) {
            Manager.pool.push(this._fightNum);
            this._fightNum = null;
        }
        if (this._sp) {
            Manager.pool.push(this._sp);
            this._sp = null;
        }
        this._callback = null;
        this._thisObj = null;
    };
    return FightUpgradeView;
}(Sprite));
__reflect(FightUpgradeView.prototype, "FightUpgradeView");
//# sourceMappingURL=FightUpgradeView.js.map