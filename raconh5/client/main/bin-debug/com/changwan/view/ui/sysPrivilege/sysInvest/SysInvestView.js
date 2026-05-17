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
 * 投资容器
 * pzx
 * create 18.1.13
 */
var SysInvestView = (function (_super) {
    __extends(SysInvestView, _super);
    function SysInvestView() {
        var _this = _super.call(this) || this;
        _this._type = SysInvestType.SYSINVEST_MONTH_TYPE;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("sysInvest", "SysInvestViewSkin");
        SysInvestView.instince = _this;
        return _this;
    }
    SysInvestView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._scroll.initBtnListData(SysInvestItem, [], true);
        this._model = Manager.model.getSysInvest();
        this._labelImg.touchEnabled = false;
        Manager.control.getSysInvest().query();
    };
    SysInvestView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyFunHandler, this);
        this._model.addEventListener(SysInvestEvent.SYSINVEST_UPDATE_EVENT, this.drawData, this);
    };
    SysInvestView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyFunHandler, this);
        this._model.removeEventListener(SysInvestEvent.SYSINVEST_UPDATE_EVENT, this.drawData, this);
    };
    SysInvestView.prototype.onBuyFunHandler = function (e) {
        var str = LangCVO.getContent("SysInvest1"); //是否花费<font color = '#38b800'>{0}元</font>购买<font color = '#38b800'>{1}</font>？
        var name = SysInvestCVO.getName(this._type);
        str = StringUtils.setParam(str, this._type, name);
        var ok = Manager.pool.create(CallBackInfo, this.onCallBackFun, this);
        Manager.tips.showTips(str, ok, true);
    };
    /** 购买回调 */
    SysInvestView.prototype.onCallBackFun = function () {
        Manager.platform.pay(Number(this._type), 1);
    };
    SysInvestView.prototype.getisActive = function () {
        if (this._model.isActive(this._type)) {
            return true;
        }
        else {
            this.onBuyFunHandler(null);
            return false;
        }
    };
    SysInvestView.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    SysInvestView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    SysInvestView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    SysInvestView.prototype.setData = function (type) {
        this._type = type;
        this.invalidate(InvalidationType.DATA);
    };
    SysInvestView.prototype.drawData = function () {
        if (this._type == SysInvestType.SYSINVEST_MONTH_TYPE) {
            this._labelImg.source = "sysInvest_28_png";
        }
        else {
            this._labelImg.source = "sysInvest_188_png";
        }
        var list = SysInvestCVO.getCvos(this._type);
        list = ArrayUtil.sortOn(list, ["state", "sort"]);
        this._scroll.dataProvider(list);
        if (this._model.isActive(this._type)) {
            this._activeImg.visible = true;
        }
        else {
            this._activeImg.visible = false;
        }
        this._buyGroup.visible = !this._activeImg.visible;
    };
    SysInvestView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    SysInvestView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    SysInvestView.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove) {
            ObjectUtil.removes(this._buyGroup, this._labelImg, this._activeImg);
        }
        this._buyGroup = null;
        this._buyBtn.dispose();
        this._buyBtn = null;
        this._labelImg = null;
        this._activeImg = null;
        this._scroll.dispose();
        this._scroll = null;
        this._model = null;
    };
    SysInvestView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    return SysInvestView;
}(UIComponent));
__reflect(SysInvestView.prototype, "SysInvestView");
//# sourceMappingURL=SysInvestView.js.map