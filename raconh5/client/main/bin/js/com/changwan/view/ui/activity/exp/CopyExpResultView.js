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
 * 经验副本结算界面
 * luzhihong
 * create 2017-12-1
 */
var CopyExpResultView = /** @class */ (function (_super) {
    __extends(CopyExpResultView, _super);
    function CopyExpResultView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("activity", "CopyExpResultViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    CopyExpResultView.prototype.show = function (useTime, kills, exp) {
        this._useTime = useTime;
        this._kills = kills;
        this._exp = exp;
        this._endTime = egret.getTimer() + 10 * 1000;
        if (this.parent == null) {
            this.x = (Manager.config.gameWidth - this.width) >> 1;
            this.y = 213;
            Manager.layer.tipsLayer.addChild(this);
        }
        this.invalidate(InvalidationType.DATA);
    };
    CopyExpResultView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._back1.load(Manager.path.getActivityPath("exp/back1.png"));
    };
    CopyExpResultView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    CopyExpResultView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    CopyExpResultView.prototype.drawData = function () {
        var cvo = CopyExpScoreCVO.getCVOByKillNum(this._kills);
        this._scorePic.load(Manager.path.getActivityPath("exp/score_" + cvo.score + ".png"));
        this._txtTime.text = cw.DateUtil.formatStr(this._useTime, cw.DateUtil.LEFT_HH_MM_SS, true);
        this._txtExp.text = GameUtil.getNumShortStr(this._exp);
        Manager.render.add(this.countDown, this, 1000);
        this.countDown();
    };
    CopyExpResultView.prototype.countDown = function () {
        var left = this.leftTime;
        if (left == 0) {
            Manager.view.hide(72 /* CopyExpResultView */);
            return;
        }
        this._back.setTxt(LangCVO.getContent("activity2", left));
    };
    Object.defineProperty(CopyExpResultView.prototype, "leftTime", {
        get: function () {
            var left = Math.floor((this._endTime - egret.getTimer()) / 1000);
            return left > 0 ? left : 0;
        },
        enumerable: true,
        configurable: true
    });
    CopyExpResultView.prototype.hide = function () {
        this.dispose();
    };
    CopyExpResultView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._back.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._back.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    CopyExpResultView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._back.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._back.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    CopyExpResultView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    CopyExpResultView.prototype.onClickHandler = function (e) {
        Manager.view.hide(72 /* CopyExpResultView */);
    };
    CopyExpResultView.prototype.dispose = function () {
        Manager.control.getCopy().exit();
        Manager.render.remove(this.countDown, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._back, this._back1, this._scorePic, this._txtTime, this._txtExp);
        this._back = null;
        this._back1 = null;
        this._scorePic = null;
        this._txtTime = null;
        this._txtExp = null;
    };
    return CopyExpResultView;
}(UIComponent));
//# sourceMappingURL=CopyExpResultView.js.map