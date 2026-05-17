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
 * 银币副本结算界面
 * luzhihong
 * create 2018.1.19
 */
var CopySilverResultView = (function (_super) {
    __extends(CopySilverResultView, _super);
    function CopySilverResultView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("activity", "CopySilverResultViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    CopySilverResultView.prototype.show = function (kills, rate, silver, gold) {
        this._kills = kills;
        this._rate = rate;
        this._silver = silver;
        this._gold = gold;
        this._endTime = egret.getTimer() + 10 * 1000;
        if (this.parent == null) {
            this.x = (Manager.config.gameWidth - this.width) >> 1;
            this.y = 213;
            Manager.layer.tipsLayer.addChild(this);
        }
        this.invalidate(InvalidationType.DATA);
    };
    CopySilverResultView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._back1.load(Manager.path.getActivityPath("exp/back1.png"));
        this._box.load(Manager.path.getActivityPath("silver/box.png"));
    };
    CopySilverResultView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    CopySilverResultView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    CopySilverResultView.prototype.drawData = function () {
        this._txtKill.text = this._kills + "";
        this._txtRate.text = "+" + (this._rate / 10) + "%";
        this._txtSilver.text = GameUtil.getNumShortStr(this._silver);
        this._txtGold.text = GameUtil.getNumShortStr(this._gold);
        Manager.render.add(this.countDown, this, 1000);
        this.countDown();
    };
    CopySilverResultView.prototype.countDown = function () {
        var left = this.leftTime;
        if (left == 0) {
            Manager.view.hide(87 /* CopySilverResultView */);
            return;
        }
        this._back.setTxt(LangCVO.getContent("activity2", left));
    };
    Object.defineProperty(CopySilverResultView.prototype, "leftTime", {
        get: function () {
            var left = Math.floor((this._endTime - egret.getTimer()) / 1000);
            return left > 0 ? left : 0;
        },
        enumerable: true,
        configurable: true
    });
    CopySilverResultView.prototype.hide = function () {
        this.dispose();
    };
    CopySilverResultView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._back.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._back.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    CopySilverResultView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._back.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._back.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    CopySilverResultView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    CopySilverResultView.prototype.onClickHandler = function (e) {
        Manager.view.hide(87 /* CopySilverResultView */);
    };
    CopySilverResultView.prototype.dispose = function () {
        Manager.control.getCopy().exit();
        Manager.render.remove(this.countDown, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._back, this._back1, this._box, this._txtKill, this._txtRate, this._txtSilver, this._txtGold);
        this._back = null;
        this._back1 = null;
        this._box = null;
        this._txtKill = null;
        this._txtRate = null;
        this._txtSilver = null;
        this._txtGold = null;
    };
    return CopySilverResultView;
}(UIComponent));
__reflect(CopySilverResultView.prototype, "CopySilverResultView", ["IViewManager"]);
//# sourceMappingURL=CopySilverResultView.js.map