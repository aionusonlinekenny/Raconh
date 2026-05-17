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
 * 银币副本宝箱
 * luzhihong
 * create 2018.1.19
 */
var CopySilverBox = /** @class */ (function (_super) {
    __extends(CopySilverBox, _super);
    function CopySilverBox() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("activity", "CopySilverBoxSkin");
        _this.touchChildren = true;
        return _this;
    }
    CopySilverBox.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._coolingImg = new CoolingImage(50);
        this._coolingImg.x = this._coolingImg.y = 55;
        this.addChildAt(this._coolingImg, 0);
    };
    CopySilverBox.prototype.source = function (url) {
        this._btn.source = url;
    };
    CopySilverBox.prototype.setData = function (id, pos, endTime, totalTime) {
        this._id = id ? id : 0;
        this._pos = pos;
        this._endTime = endTime ? endTime : 0;
        ;
        this._totalTime = totalTime;
    };
    CopySilverBox.prototype.countdown = function () {
        var serverTime = Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        var left = this._endTime - serverTime;
        if (left > 0) {
            // let str:string = HtmlUtil.addColorTag(cw.DateUtil.formatStr(left, cw.DateUtil.LEFT_MM_SS, true), Color.GREEN_STR);
            // HtmlUtil.setTextFlow(this._txtTime, str);
            this._coolingImg.setSchedule(this._totalTime - left, this._totalTime);
            this.setEnabel(false);
        }
        else {
            // this._txtTime.text = "";
            this._coolingImg.setSchedule(1, 1);
            this.setEnabel(true);
        }
    };
    CopySilverBox.prototype.setEnabel = function (bool) {
        if (this._btn.touchEnabled == bool)
            return;
        this._btn.touchEnabled = bool;
        if (bool) {
            this._btn.filters = [];
        }
        else {
            FilterUtil.setGrayFilter(this._btn);
        }
    };
    CopySilverBox.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    CopySilverBox.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    CopySilverBox.prototype.onClickHandler = function (e) {
        if (this._id > 0) {
            if (!this.setTarget()) {
                var v = new Vector2D(200, 0);
                v.angle = Math.atan2(Manager.model.self.y - this._pos.y, Manager.model.self.x - this._pos.x);
                Manager.walk.moveTo(new egret.Point(this._pos.x + v.x, this._pos.y + v.y), this.setTarget, this);
            }
        }
    };
    CopySilverBox.prototype.setTarget = function () {
        var info = Manager.model.getGameobject().getMonsterGameObject(this._id);
        if (info) {
            Manager.model.self.updateTarget(info);
            return true;
        }
        return false;
    };
    /**引导调用 */
    CopySilverBox.prototype.guideClick = function () {
        this.onClickHandler(null);
    };
    CopySilverBox.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._btn);
        ObjectUtil.dispose(this._coolingImg);
        this._btn = null;
        this._coolingImg = null;
        this._pos = null;
    };
    return CopySilverBox;
}(UIComponent));
//# sourceMappingURL=CopySilverBox.js.map