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
 * 日常阶段item
 * luzhihong
 * create 2017-11-23
 */
var DailySceduleItem = /** @class */ (function (_super) {
    __extends(DailySceduleItem, _super);
    function DailySceduleItem(cvo, lastValue) {
        var _this = _super.call(this) || this;
        _this.BAR_W = 80;
        _this._cvo = cvo;
        _this._lastValue = lastValue;
        _this.skinName = Manager.path.getSkinName("activity", "DailyScheduleItemSkin");
        _this.touchChildren = true;
        return _this;
    }
    DailySceduleItem.prototype.configUI = function () {
        this._model = Manager.model.getActivity();
        this._box.source = "activity_xiangzi_" + this._cvo.id + "_png";
        this._txt.text = "" + this._cvo.value;
        this.drawDaily();
        this.drawSchedule();
    };
    DailySceduleItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(ActivityEvent.DAILY_SCHEDULE_UPDATE, this.updateSchedule, this);
        this._model.addEventListener(ActivityEvent.DAILY_UPDATE, this.updateDaily, this);
        this._box.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    DailySceduleItem.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._model.removeEventListener(ActivityEvent.DAILY_SCHEDULE_UPDATE, this.updateSchedule, this);
        this._model.removeEventListener(ActivityEvent.DAILY_UPDATE, this.updateDaily, this);
        this._box.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    DailySceduleItem.prototype.updateDaily = function (e) {
        this.invalidate("drawDaily");
    };
    DailySceduleItem.prototype.updateSchedule = function (e) {
        this.invalidate("drawSchedule");
    };
    DailySceduleItem.prototype.drawDaily = function () {
        var curValue = this._model.curDailyValue;
        if (curValue < this._cvo.value) {
            var cur = curValue > this._lastValue ? curValue - this._lastValue : 0;
            var total = this._cvo.value - this._lastValue;
            this._bar.width = this.BAR_W * cur / total;
            this._circle.visible = false;
        }
        else {
            this._bar.width = this.BAR_W;
            this._circle.visible = true;
        }
    };
    DailySceduleItem.prototype.drawSchedule = function () {
        if (this._cvo.hasGet) {
            this._label.visible = true;
            this._box.touchEnabled = false;
            this._box.filters = [FilterUtil.getBrightFilter(-60)];
            this.removeAni();
        }
        else {
            this._label.visible = false;
            this._box.touchEnabled = true;
            this._box.filters = [];
            if (this._cvo.canGet) {
                this.addAni();
            }
            else {
                this.removeAni();
            }
        }
    };
    DailySceduleItem.prototype.addAni = function () {
        if (this._boxAni == null) {
            this._boxAni = Manager.animation.createEffectAnimation("dailyBox");
            this._boxAni.move(this._box.x + 318, this._box.y + 316);
            this.addChild(this._boxAni);
        }
    };
    DailySceduleItem.prototype.removeAni = function () {
        if (this._boxAni) {
            Manager.pool.push(this._boxAni);
            this._boxAni = null;
        }
    };
    DailySceduleItem.prototype.onClickHandler = function (e) {
        if (e === void 0) { e = null; }
        // if(this._cvo.canGet)
        // {
        //     Manager.control.getActivity().getDailySchedule(this._cvo.id);
        // }
        var canGet = this._cvo.canGet;
        var cbi = canGet ? Manager.pool.create(CallBackInfo, this.callBack, this, this._cvo.id) : null;
        Manager.view.show(61 /* ArenaMaxAwardView */, this._cvo.gains, canGet, cbi);
    };
    DailySceduleItem.prototype.callBack = function (cvoId) {
        Manager.control.getActivity().getDailySchedule(cvoId);
    };
    DailySceduleItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawDaily"))
            this.drawDaily();
        if (this.isInvalid("drawSchedule", "drawDaily"))
            this.drawSchedule();
    };
    // protected drawAll():void
    // {
    //     super.drawAll();
    //     this.drawDaily();
    //     this.drawSchedule();
    // }
    DailySceduleItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.removeAni();
        ObjectUtil.dispose(this._txt);
        ObjectUtil.removes(this._bar, this._circle, this._box, this._label);
        this._model = null;
        this._cvo = null;
        this._bar = null;
        this._circle = null;
        this._box = null;
        this._txt = null;
        this._label = null;
    };
    return DailySceduleItem;
}(UIComponent));
//# sourceMappingURL=DailySceduleItem.js.map