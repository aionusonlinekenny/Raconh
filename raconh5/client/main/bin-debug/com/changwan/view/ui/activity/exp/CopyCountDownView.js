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
 * 经验副本开始倒计时视图
 * luzhihong
 * create 2018.1.11
 */
var CopyCountDownView = (function (_super) {
    __extends(CopyCountDownView, _super);
    function CopyCountDownView() {
        var _this = _super.call(this) || this;
        _this._label = new eui.Image("copy_exp_label_3_png");
        _this.addChild(_this._label);
        _this._numView = Manager.pool.create(NumImgView2);
        _this._numView.y = -12;
        _this.addChild(_this._numView);
        return _this;
    }
    CopyCountDownView.prototype.show = function (leftTime) {
        this.reuse();
        this._endTime = leftTime + egret.getTimer() / 1000;
        if (this.parent == null) {
            Manager.layer.tipsLayer.addChild(this);
            this.y = 320;
            this.onResizeHandler(null);
        }
        Manager.render.add(this.countDown, this, 1000);
        this.countDown();
    };
    CopyCountDownView.prototype.countDown = function () {
        var left = Math.floor(this._endTime - egret.getTimer() / 1000);
        if (left > 0) {
            this._numView.setValue(left, "nums_countdown_", -42);
            this._numView.x = 130 - this._numView.width / 2;
        }
        else {
            Manager.view.hide(75 /* CopyCountDownView */);
        }
    };
    CopyCountDownView.prototype.hide = function () {
        this.dispose();
    };
    CopyCountDownView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    CopyCountDownView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    CopyCountDownView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - 415) / 2;
    };
    CopyCountDownView.prototype.dispose = function () {
        Manager.render.remove(this.countDown, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._label);
        ObjectUtil.dispose(this._numView);
        this._label = null;
        this._numView = null;
    };
    return CopyCountDownView;
}(Sprite));
__reflect(CopyCountDownView.prototype, "CopyCountDownView", ["IViewManager"]);
//# sourceMappingURL=CopyCountDownView.js.map