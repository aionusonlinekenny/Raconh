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
 * 市场购买view
 */
var MarketBuyTipsView = (function (_super) {
    __extends(MarketBuyTipsView, _super);
    function MarketBuyTipsView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("market/tips", "MarketBuyTipsViewSkin");
        return _this;
    }
    MarketBuyTipsView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.touchEnabled = true;
        this._nameTxt.stroke = 2;
        this._nameTxt.strokeColor = 0x7C6E62;
        this._popupView.titleImg.source = "shop_goumai_png";
        this._popupView.bgHeight = 640;
        this._popupView.diImgVisible = false;
        this._popupView.viewY = 300;
        this._inputNumTxt.textDisplay.textAlign = "center";
        this._inputNumTxt.textColor = 0xffffff;
        this._inputNumTxt.maxChars = 4;
        this._inputNumTxt.restrict = "0-9";
    };
    MarketBuyTipsView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        if (this._data) {
            this.updateView();
        }
    };
    MarketBuyTipsView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.updateView();
    };
    MarketBuyTipsView.prototype.updateView = function () {
        this._goods.baseId = this._data.base_id;
        HtmlUtil.setTextFlow(this._nameTxt, HtmlUtil.addColorTag(this._data.cvo.name, this._data.cvo.colorStr));
        this._goods.count = this._data.quantity;
        this._price = this._data.price;
        this._priceTxt.text = this._price + "";
        this._count = 1;
        this.drawCount();
    };
    MarketBuyTipsView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._jianBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._jiaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._inputNumTxt.addEventListener(eui.UIEvent.CHANGE, this.onCheckInputHander, this);
    };
    MarketBuyTipsView.prototype.removeEvent = function () {
        this._jianBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._jiaBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._inputNumTxt.removeEventListener(eui.UIEvent.CHANGE, this.onCheckInputHander, this);
        _super.prototype.removeEvent.call(this);
    };
    //检测文本输入
    MarketBuyTipsView.prototype.onCheckInputHander = function () {
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
    //数量
    MarketBuyTipsView.prototype.drawCount = function () {
        this._inputNumTxt.text = this._count + "";
        this.drawTotalPrice();
    };
    MarketBuyTipsView.prototype.drawTotalPrice = function () {
        this._goldTxt.text = this._count * this._price + "";
    };
    MarketBuyTipsView.prototype.onclickHandler = function (e) {
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
            case this._buyBtn:
                this.sendBuy();
                return;
        }
    };
    //购买
    MarketBuyTipsView.prototype.sendBuy = function () {
        if (Manager.model.getItems().bagSurplus > 1) {
            var gold = this._price * this._count;
            if (gold <= Manager.model.self.attrInfo.gold) {
                //您即将花费{0}元宝购买{1}个{2}
                var str = LangCVO.getContent("market4");
                str = StringUtils.setParam(str, gold, this._count, this._data.cvo.name);
                var callkBakc = Manager.pool.create(CallBackInfo, this.sendBuyHandler, this);
                Manager.tips.showTips(str, callkBakc, true);
            }
            else {
                Manager.tips.showTips(LangCVO.getContent("common33")); //元宝不足
            }
        }
        else {
            Manager.tips.showTips(LangCVO.getContent("market3")); //背包已满，请清理后购买！
        }
    };
    MarketBuyTipsView.prototype.sendBuyHandler = function () {
        Manager.control.getmarket().buy(Manager.model.getmarketModel().getPlayerMarketInfo().play_id, this._data.pos, this._count);
        this.onTouchCloseHandler();
    };
    MarketBuyTipsView.prototype.onTouchCloseHandler = function () {
        Manager.view.hide(150 /* MarketBuyTipsView */);
    };
    MarketBuyTipsView.prototype.show = function (info) {
        this._data = info;
        Manager.layer.tipsLayer.addChild(this);
    };
    MarketBuyTipsView.prototype.hide = function () {
        this.dispose();
    };
    MarketBuyTipsView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._inputNumTxt, this._jiaBtn, this._jianBtn, this._buyBtn, this._nameTxt, this._goldTxt, this._priceTxt);
        Manager.pool.push(this._goods);
        this._buyBtn = null;
        this._goods = null;
        this._nameTxt = null;
        this._goldTxt = null;
        this._priceTxt = null;
        this._data = null;
        this._inputNumTxt = null;
    };
    return MarketBuyTipsView;
}(PopUpView));
__reflect(MarketBuyTipsView.prototype, "MarketBuyTipsView");
//# sourceMappingURL=MarketBuyTipsView.js.map