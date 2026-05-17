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
 * pzx
 * 充值活动
 * 2018.1.19
 */
var RechargeActivityView = /** @class */ (function (_super) {
    __extends(RechargeActivityView, _super);
    function RechargeActivityView() {
        var _this = _super.call(this) || this;
        _this._type = RechargeActivityType.RECHARGEACTIVITY_SINGLE_TYPE;
        _this.skinName = Manager.path.getSkinName("rechargeActivity", "RechargeActivityViewSkin");
        RechargeActivityView.instance = _this;
        return _this;
    }
    RechargeActivityView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._scroll.initBtnListData(RechargeActivityItem, [], true);
        this._model = Manager.model.getrechargeActivity();
        this._descTxt.lineSpacing = 15;
        this.touchChildren = true;
        this._scroll.touchEnabled = this._scroll.touchChildren = true;
    };
    RechargeActivityView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(RechargeActivityEvent.RECHARGEACTIVITY_QUERY_EVENT, this.updateView, this);
    };
    RechargeActivityView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._model.removeEventListener(RechargeActivityEvent.RECHARGEACTIVITY_QUERY_EVENT, this.updateView, this);
    };
    RechargeActivityView.prototype.updateViewHandler = function () {
        this.updateView();
    };
    RechargeActivityView.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    RechargeActivityView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    RechargeActivityView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    RechargeActivityView.prototype.setData = function (type) {
        this._type = type;
        this.invalidate(InvalidationType.DATA);
    };
    RechargeActivityView.prototype.drawData = function () {
        this._descTxt.text = LangCVO.getContent("rechargeActivity" + this._type);
        this._model.quperTypeList(this._type);
        //this.updateView();
    };
    RechargeActivityView.prototype.updateView = function () {
        var arr = this._model.getCvoList(this._type);
        arr = ArrayUtil.sortOn(arr, ["isReward", "sort"], [1, 0]);
        this._scroll.dataProvider(arr);
        this.drawTime();
    };
    RechargeActivityView.prototype.drawTime = function () {
        var num = this._model.getTime(this._type);
        var second = Math.round(num - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if (second > 0) {
            this.countdown();
            Manager.render.add(this.countdown, this, 1000);
        }
        else {
            this.setIsFree();
            return;
        }
    };
    RechargeActivityView.prototype.countdown = function () {
        var num = this._model.getTime(this._type);
        var second = Math.round(num - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if (second < 0) {
            this.setIsFree();
            Manager.render.remove(this.countdown, this);
            return;
        }
        var str = cw.DateUtil.formatStr(second, cw.DateUtil.LEFT_DD_HH_MM, true);
        str = HtmlUtil.addColorTag(str, "#fff7e7");
        HtmlUtil.setTextFlow(this._timeTxt, str);
    };
    RechargeActivityView.prototype.setIsFree = function () {
        HtmlUtil.setTextFlow(this._timeTxt, LangCVO.getContent("rechargeActivity7"));
    };
    RechargeActivityView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    RechargeActivityView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    RechargeActivityView.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove) {
            ObjectUtil.disposes(this._timeTxt, this._descTxt, this._scroll);
        }
        if (Manager.render.contains(this.countdown, this))
            Manager.render.remove(this.countdown, this);
        this._timeTxt = null;
        this._descTxt = null;
        this._scroll = null;
        this._model = null;
        RechargeActivityView.instance = null;
    };
    RechargeActivityView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    return RechargeActivityView;
}(UIComponent));
//# sourceMappingURL=RechargeActivityView.js.map