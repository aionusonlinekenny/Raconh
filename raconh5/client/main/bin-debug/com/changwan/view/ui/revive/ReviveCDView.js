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
 * 复活倒计时界面
 * liangyan
 * create 2017-12-06
*/
var ReviveCDView = (function (_super) {
    __extends(ReviveCDView, _super);
    function ReviveCDView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("revive", "ReviveCDViewSkin");
        return _this;
    }
    ReviveCDView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    ReviveCDView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    ReviveCDView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ReviveCDView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawLayout();
    };
    ReviveCDView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.LAYOUT))
            this.drawLayout();
    };
    ReviveCDView.prototype.drawLayout = function () {
        if (!this._circleAni) {
            this._circleAni = Manager.animation.createEffectAnimation("circle");
            this._circleAni.x = 205;
            this._circleAni.y = 430;
            this.addChild(this._circleAni);
        }
        if (!this._num) {
            this._num = Manager.pool.create(NumImgView2);
            this.addChild(this._num);
        }
        if (!this._life || this._life <= 0)
            return;
        this.setSecondValue();
    };
    ReviveCDView.prototype.setSecondValue = function () {
        if (this._num == null)
            return;
        this._num.setValue(this._life, "nums_cd_", 25);
        this._num.x = 27 + (666 - this._num.width) / 2 - 10; //this._numBack.x + (this._numBack.width - this._num.width) / 2 - 10;
        this._num.y = 546; //this._numBack.y + (this._numBack.height - 74) / 2;
    };
    ReviveCDView.prototype.countdown = function () {
        this._life--;
        if (this._life <= 0) {
            // Manager.render.remove(this.countdown, this);
            Manager.control.getBattle().reviveApply(1);
        }
        else {
            this.setSecondValue();
        }
    };
    ReviveCDView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    ReviveCDView.prototype.show = function (life) {
        var _this = this;
        if (!this.parent) {
            this._life = life;
            this.invalidate(InvalidationType.LAYOUT);
            // Manager.render.add(this.countdown, this, 1000, 0, null, true);
            window.clearInterval(this._tempTime);
            this._tempTime = window.setInterval(function () { return _this.countdown(); }, 1000);
            Manager.layer.tipsLayer.addChild(this);
            this.onResizeHandler(null);
        }
    };
    ReviveCDView.prototype.hide = function () {
        if (this.parent)
            this.dispose();
    };
    ReviveCDView.prototype.dispose = function () {
        // if(Manager.render.contains(this.countdown, this)) Manager.render.remove(this.countdown, this);
        window.clearInterval(this._tempTime);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._circleAni, this._num);
        if (this._circleAni) {
            Manager.pool.push(this._circleAni);
            this._circleAni = null;
        }
        if (this._num)
            Manager.pool.push(this._num);
        this._num = null;
    };
    return ReviveCDView;
}(UIComponent));
__reflect(ReviveCDView.prototype, "ReviveCDView", ["IViewManager"]);
//# sourceMappingURL=ReviveCDView.js.map