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
 * 2018.1.2
 */
var SysChargeItem = /** @class */ (function (_super) {
    __extends(SysChargeItem, _super);
    function SysChargeItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("syscharge", "SysChargeItemSkin");
        _this.touchChildren = false;
        _this.touchEnabled = true;
        return _this;
    }
    SysChargeItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (!this._progiftNum) {
            this._progiftNum = Manager.pool.create(NumImgView2);
            this._progiftNum.y = this._perImg.y;
            this._chargeGroup.addChild(this._progiftNum);
        }
    };
    SysChargeItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    SysChargeItem.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    SysChargeItem.prototype.onClickHandler = function (e) {
        Manager.platform.pay(this._data.money);
    };
    SysChargeItem.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    SysChargeItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    SysChargeItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    SysChargeItem.prototype.setData = function (data) {
        this._data = data;
        this.invalidate(InvalidationType.DATA);
    };
    SysChargeItem.prototype.drawData = function () {
        var mon = HtmlUtil.addColorTag(this._data.money + LangCVO.getContent("common37"), Color.DEF_STR);
        HtmlUtil.setTextFlow(this._moneyTxt, mon);
        this._goldTxt.text = "" + this._data.gold;
        this._goldBgImg.source = this._data.goldImg;
        var label = 0;
        var retrive = 0;
        if (this._data.first) {
            label = this._data.second_label;
            retrive = this._data.second_retrive;
            this._czImg.source = "sysCharge_sc_png";
        }
        else {
            label = this._data.first_label;
            retrive = this._data.first_retrive;
            this._czImg.source = "sysCharge_cz_png";
        }
        if (label > 0) {
            this._chargeGroup.visible = true;
            this._progiftNum.setValue(label, "nums_syscharge_", 10);
        }
        else {
            this._chargeGroup.visible = false;
        }
        if (retrive > 0) {
            this._largessGroup.visible = true;
            this._goldTxt0.text = "" + retrive;
        }
        else {
            this._largessGroup.visible = false;
        }
        this._progiftNum.x = this._perImg.x - this._progiftNum.width - 15;
    };
    SysChargeItem.prototype.setkuangBgImg = function (value) {
        this._kuangImg.visible = value;
        var color = Color.WHITE_STR;
        if (!value) {
            color = Color.DEF_STR;
        }
        var mon = HtmlUtil.addColorTag(this._data.money + LangCVO.getContent("common37"), color);
        HtmlUtil.setTextFlow(this._moneyTxt, mon);
    };
    Object.defineProperty(SysChargeItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    SysChargeItem.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    SysChargeItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    SysChargeItem.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove) {
            ObjectUtil.removes(this._kuangImg, this._goldBgImg, this._czImg, this._largessGroup, this._chargeGroup, this._progiftNum, this._perImg);
        }
        this._kuangImg.bitmapData = null;
        this._kuangImg = null;
        this._goldBgImg.bitmapData = null;
        this._goldBgImg = null;
        this._czImg.bitmapData = null;
        this._czImg = null;
        this._largessGroup = null;
        this._chargeGroup = null;
        this._goldTxt.dispose();
        this._goldTxt = null;
        this._moneyTxt.dispose();
        this._moneyTxt = null;
        this._goldTxt0.dispose();
        this._goldTxt0 = null;
        Manager.pool.push(this._progiftNum);
        this._progiftNum = null;
        this._perImg.bitmapData = null;
        this._perImg = null;
        this._data = null;
    };
    SysChargeItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    return SysChargeItem;
}(UIComponent));
//# sourceMappingURL=SysChargeItem.js.map