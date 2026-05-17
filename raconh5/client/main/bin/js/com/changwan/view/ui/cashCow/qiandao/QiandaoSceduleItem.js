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
 * 签到阶段item
 * drq
 * create 2018-3-27
 */
var QiandaoSceduleItem = /** @class */ (function (_super) {
    __extends(QiandaoSceduleItem, _super);
    function QiandaoSceduleItem(cvo, lastValue) {
        var _this = _super.call(this) || this;
        _this.BAR_W = 80;
        _this._cvo = cvo;
        _this._lastValue = lastValue;
        _this.skinName = Manager.path.getSkinName("activity", "DailyScheduleItemSkin");
        _this.touchChildren = true;
        return _this;
    }
    QiandaoSceduleItem.prototype.configUI = function () {
        var boxArr = ["activity_xiangzi_4_png", "activity_xiangzi_3_png", "activity_xiangzi_1_png", "activity_xiangzi_2_png"];
        this._model = Manager.model.getQiandao();
        this._box.source = boxArr[this._cvo.id - 1];
        this._txt.text = LangCVO.getContent("qiandao32", this._cvo.day);
        this._txt.x = 75;
        this.drawDaily();
        this.drawSchedule();
    };
    QiandaoSceduleItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(QiandaoEvent.QIANDAO_SCHEDULE_DAILY, this.drawDaily, this);
        this._model.addEventListener(QiandaoEvent.QIANDAO_SCHEDULE_AWARD, this.drawSchedule, this);
        this._box.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBox, this);
    };
    QiandaoSceduleItem.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._model.removeEventListener(QiandaoEvent.QIANDAO_SCHEDULE_DAILY, this.drawDaily, this);
        this._model.removeEventListener(QiandaoEvent.QIANDAO_SCHEDULE_AWARD, this.drawSchedule, this);
        this._box.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBox, this);
    };
    QiandaoSceduleItem.prototype.onClickBox = function (e) {
        if (e === void 0) { e = null; }
        var arr = this._cvo.reward.split("|");
        var arrLoss = [];
        for (var i = 0; i < arr.length; i++) {
            var loss = new GainLossVO(arr[i]);
            arrLoss.push(loss);
        }
        var curValue = this._model.getDailyList().length;
        var canget = curValue >= this._cvo.day;
        var cbi = canget ? Manager.pool.create(CallBackInfo, this.clickCallback, this, this._cvo.id) : null;
        Manager.view.show(61 /* ArenaMaxAwardView */, arrLoss, canget, cbi);
    };
    QiandaoSceduleItem.prototype.clickCallback = function (cvoId) {
        Manager.control.geQiandao().sendAward(cvoId);
    };
    QiandaoSceduleItem.prototype.drawDaily = function () {
        var curValue = this._model.getDailyList().length;
        if (curValue < this._cvo.day) {
            var cur = curValue > this._lastValue ? curValue - this._lastValue : 0;
            var total = this._cvo.day - this._lastValue;
            this._bar.width = this.BAR_W * cur / total;
            this._circle.visible = false;
        }
        else {
            this._bar.width = this.BAR_W;
            this._circle.visible = true;
        }
    };
    QiandaoSceduleItem.prototype.addAni = function () {
        if (this._boxAni == null) {
            this._boxAni = Manager.animation.createEffectAnimation("dailyBox");
            this._boxAni.move(this._box.x + 318, this._box.y + 316);
            this.addChild(this._boxAni);
        }
    };
    QiandaoSceduleItem.prototype.removeAni = function () {
        if (this._boxAni) {
            Manager.pool.push(this._boxAni);
            this._boxAni = null;
        }
    };
    QiandaoSceduleItem.prototype.drawSchedule = function () {
        var curValue = this._model.getDailyList().length;
        //let curItem = this._model.get
        if (this._cvo.isGet) {
            this._label.visible = true;
            this._box.touchEnabled = false;
            this._box.filters = [FilterUtil.getBrightFilter(-60)];
            this.removeAni();
        }
        else {
            this._label.visible = false;
            this._box.touchEnabled = true;
            this._box.filters = [];
            if (curValue >= this._cvo.day) {
                this.addAni();
            }
            else {
                this.removeAni();
            }
        }
    };
    QiandaoSceduleItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.removeAni();
        ObjectUtil.dispose(this._model);
        ObjectUtil.removes(this._bar, this._circle, this._box, this._txt, this._label);
        this._model = null;
        this._cvo = null;
        this._lastValue = null;
        this._bar = null;
        this._circle = null;
        this._box = null;
        this._txt = null;
        this._label = null;
        this._boxAni = null;
        this.BAR_W = null;
    };
    return QiandaoSceduleItem;
}(UIComponent));
//# sourceMappingURL=QiandaoSceduleItem.js.map