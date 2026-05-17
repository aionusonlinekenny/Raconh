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
 * pzx
 * 17.14.16
 * y市场上架view
 */
var MarketSaleTipsView = (function (_super) {
    __extends(MarketSaleTipsView, _super);
    function MarketSaleTipsView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("market/tips", "MarketSaleTipsViewSkin");
        return _this;
    }
    MarketSaleTipsView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.touchEnabled = true;
        this._goods.touchEnabled = false;
        this._goods.clear();
        this._nameTxt.stroke = 2;
        this._nameTxt.strokeColor = 0x7C6E62;
        this._popupView.titleImg.source = "market_titel_1_png";
        this._popupView.bgHeight = 695;
        this._popupView.diImgVisible = false;
        this._popupView.viewY = 300;
        this._inputNumTxt.textDisplay.textAlign = "center";
        this._inputNumTxt.textColor = 0xffffff;
        this._inputNumTxt.maxChars = 4;
        this._inputNumTxt.restrict = "0-9";
    };
    MarketSaleTipsView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        if (this._data) {
            this.updateView();
        }
    };
    MarketSaleTipsView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.updateView();
    };
    MarketSaleTipsView.prototype.updateView = function () {
        this._goods.baseId = this._data.base_id;
        HtmlUtil.setTextFlow(this._nameTxt, HtmlUtil.addColorTag(this._data.cvo.name, this._data.cvo.colorStr));
        HtmlUtil.setTextFlow(this._taxrateTxt, LangCVO.getContent("market2")); //税率：<font color='#38b800'>10%</font>
        this.drawCount();
        this._multiple = 0;
        this.drawPrice();
    };
    //设置单价
    MarketSaleTipsView.prototype.drawPrice = function () {
        var sig = "";
        var color;
        if (this._multiple >= 0) {
            sig = "+";
            color = Color.GREEN_STR;
        }
        else {
            color = Color.RED_STR;
        }
        var str = StringUtils.setParam(LangCVO.getContent("market1"), sig + this._multiple + "%", color); //推荐单价<font color='#38b800'>{0}</font>
        HtmlUtil.setTextFlow(this._recommendTxt, str);
        this._price = this._data.cvo.market + Math.round(this._data.cvo.market * this._multiple / 100);
        this._priceTxt.text = this._price + "";
        this.drawTotalPrice();
    };
    MarketSaleTipsView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._jianBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._jiaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._jianBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._jiaBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._inputNumTxt.addEventListener(eui.UIEvent.CHANGE, this.onCheckInputHander, this);
    };
    MarketSaleTipsView.prototype.removeEvent = function () {
        this._jianBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._jiaBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._jianBtn0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._jiaBtn0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._inputNumTxt.removeEventListener(eui.UIEvent.CHANGE, this.onCheckInputHander, this);
        _super.prototype.removeEvent.call(this);
    };
    //检测文本输入
    MarketSaleTipsView.prototype.onCheckInputHander = function () {
        var str = this._inputNumTxt.text;
        var num = Number(str);
        if (num == 0) {
            num = 1;
            this._inputNumTxt.text = "1";
        }
        if (num > this._data.quantity) {
            this._count = this._data.quantity;
            this.drawCount();
        }
        else {
            this._count = num;
            this.drawTotalPrice();
        }
    };
    MarketSaleTipsView.prototype.onclickHandler = function (e) {
        switch (e.target) {
            case this._jianBtn:
                this._count--;
                if (this._count < 1) {
                    this._count = 1;
                }
                this.drawCount();
                break;
            case this._jiaBtn:
                this._count++;
                if (this._count > this._data.quantity) {
                    this._count = this._data.quantity;
                }
                this.drawCount();
                break;
            case this._jianBtn0:
                this._multiple -= 5;
                if (this._multiple < MarketSaleTipsView.MAIN_MULTIPLE) {
                    this._multiple = MarketSaleTipsView.MAIN_MULTIPLE;
                }
                this.drawPrice();
                break;
            case this._jiaBtn0:
                this._multiple += 5;
                if (this._multiple > MarketSaleTipsView.MAX_MULTIPLE) {
                    this._multiple = MarketSaleTipsView.MAX_MULTIPLE;
                }
                this.drawPrice();
                break;
            case this._buyBtn:
                this.sendBuy();
                return;
        }
    };
    //数量
    MarketSaleTipsView.prototype.drawCount = function () {
        this._inputNumTxt.text = this._count + "";
        this.drawTotalPrice();
    };
    MarketSaleTipsView.prototype.drawTotalPrice = function () {
        this._goldTxt.text = this._count * this._price + "";
    };
    //上架
    MarketSaleTipsView.prototype.sendBuy = function () {
        Manager.model.getmarketModel().curSaleItem = this._data;
        Manager.control.getmarket().sale(this._data.id, this._count, this._price);
        this.onTouchCloseHandler();
    };
    MarketSaleTipsView.prototype.onTouchCloseHandler = function () {
        Manager.view.hide(149 /* MarketSaleTipsView */);
    };
    MarketSaleTipsView.prototype.clear = function () {
        this._goods.clear();
        this._count = 1;
        this._price = 1;
        this.drawPrice();
        this._nameTxt.text = "";
    };
    MarketSaleTipsView.prototype.show = function (info) {
        this._data = info;
        this._count = 1;
        this._price = 1;
        this.invalidate(InvalidationType.DATA);
        Manager.layer.tipsLayer.addChild(this);
    };
    MarketSaleTipsView.prototype.hide = function () {
        this.dispose();
    };
    MarketSaleTipsView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._goods, this._nameTxt, this._jiaBtn, this._jianBtn, this._jiaBtn0, this._jianBtn0, this._inputNumTxt, this._recommendTxt, this._priceTxt, this._taxrateTxt, this._buyBtn, this._goldTxt);
        this._goods = null;
        this._nameTxt = null;
        this._jianBtn = null;
        this._jiaBtn = null;
        this._inputNumTxt = null;
        this._recommendTxt = null;
        this._jianBtn0 = null;
        this._jiaBtn0 = null;
        this._priceTxt = null;
        this._taxrateTxt = null;
        this._buyBtn = null;
        this._goldTxt = null;
        this._data = null;
    };
    MarketSaleTipsView.MAX_MULTIPLE = 50;
    MarketSaleTipsView.MAIN_MULTIPLE = -50;
    return MarketSaleTipsView;
}(PopUpView));
__reflect(MarketSaleTipsView.prototype, "MarketSaleTipsView");
//# sourceMappingURL=MarketSaleTipsView.js.map