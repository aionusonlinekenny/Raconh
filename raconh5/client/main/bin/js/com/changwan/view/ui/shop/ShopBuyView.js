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
 * 17.11.27
 * 商城购买界面
 */
var ShopBuyView = /** @class */ (function (_super) {
    __extends(ShopBuyView, _super);
    function ShopBuyView() {
        var _this = _super.call(this) || this;
        _this._titlePath = "shop_goumai_png";
        _this.skinName = Manager.path.getSkinName("shop", "ShopBuyViewSkin");
        return _this;
    }
    ShopBuyView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.touchEnabled = true;
        this._res1.iconSize = PlayerResItems.ICON_54;
        this._res1.sign = "";
        this._res1.color = "#7C6E62";
        this._res1.fontSize(26);
        this._goods.touchEnabled = false;
        this._goods.clear();
        this._nameTxt.stroke = 2;
        this._nameTxt.strokeColor = 0x7C6E62;
    };
    ShopBuyView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        if (this._cvo) {
            this.updateView();
        }
    };
    ShopBuyView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.updateView();
    };
    ShopBuyView.prototype.setData = function (value) {
        this._cvo = value;
        this._count = 1;
        this._price = 0;
        this.invalidate(InvalidationType.DATA);
    };
    ShopBuyView.prototype.updateView = function () {
        this._popupView.titleImg.source = this._titlePath;
        this._res1.type = this._cvo.label;
        this.setPrice();
        if (this._cvo.limit > 0) {
            this._placeTxt.text = "限购：" + this._cvo.count + "/" + this._cvo.limit;
        }
        else if (this._cvo.limit_p > 0) {
            this._placeTxt.text = "限购：" + this._cvo.count + "/" + this._cvo.limit_p;
        }
        else {
            this._placeTxt.text = "";
        }
        this._goods.baseId = this._cvo.base_id;
        this._goods.count = this._cvo.num;
        var itemCvo = ItemsCVO.getCvo(this._cvo.base_id);
        var str = HtmlUtil.addColorTag(itemCvo.name, itemCvo.colorStr);
        this._nameTxt.textFlow = new egret.HtmlTextParser().parse(str);
        this._popupView.diImgVisible = true;
        if (itemCvo.desc_output != "" && !Manager.view.isOpening(18 /* ShopPanel */) && !Manager.view.isOpening(115 /* ShopPanelMulte */)) {
            var arr = itemCvo.desc_output.split("|");
            var ln = arr.length;
            if (ln == 1) {
                if (arr[0].indexOf("" + LinkType.PANEL_SHOP_MULTE) > -1) {
                    this._huoqutujGroup.visible = false;
                    return;
                }
            }
            this._list = [];
            var starlife = 290;
            if (ln == 2) {
                starlife = 182;
            }
            else if (ln == 3) {
                starlife = 80;
            }
            for (var i = 0; i < ln; i++) {
                var item = Manager.pool.create(PutOutItem);
                this._huoqutujGroup.addChild(item);
                item.setData(arr[i]);
                item.viewId = 33 /* ShopBuyView */;
                item.x = starlife + i * 210;
                item.y = 44;
                this._list.push(item);
            }
            this._popupView.bgHeight = 630;
            this._popupView.diImgVisible = false;
        }
        else {
            this._huoqutujGroup.visible = false;
        }
    };
    ShopBuyView.prototype.setPrice = function () {
        this._price = this._cvo.price * this._count;
        this._res1.count = this._price;
        if (this._cvo.limit > 0) {
            this._numTxt.text = this._count + "/" + (this._cvo.limit - this._cvo.count);
        }
        else if (this._cvo.limit_p > 0) {
            this._numTxt.text = this._count + "/" + (this._cvo.limit_p - this._cvo.count);
        }
        else {
            this._numTxt.text = "" + this._count;
        }
    };
    ShopBuyView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._jina10Btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._jia10Btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._jianBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._jiaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
    };
    ShopBuyView.prototype.removeEvent = function () {
        this._jina10Btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._jia10Btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._jianBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._jiaBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ShopBuyView.prototype.onclickHandler = function (e) {
        switch (e.target) {
            case this._jina10Btn:
                if (this._count > 10) {
                    this._count = this._count - 10;
                }
                else {
                    this._count = 1;
                }
                break;
            case this._jia10Btn:
                this.jianCount(10);
                break;
            case this._jianBtn:
                this._count--;
                if (this._count < 1) {
                    this._count = 1;
                }
                break;
            case this._jiaBtn:
                this.jianCount(1);
                break;
            case this._buyBtn:
                this.sendBuy();
                return;
        }
        this.setPrice();
    };
    //增加物品限制
    ShopBuyView.prototype.jianCount = function (value) {
        this._count += value;
        var maxCount;
        if (this._cvo.limit > 0) {
            maxCount = this._cvo.limit - this._cvo.count;
            if (maxCount < this._count) {
                this._count = maxCount;
            }
            return;
        }
        if (this._cvo.limit_p > 0) {
            maxCount = this._cvo.limit_p - this._cvo.count;
            if (maxCount < this._count) {
                this._count = maxCount;
            }
            return;
        }
    };
    //购买
    ShopBuyView.prototype.sendBuy = function () {
        //{loss,drop,num}
        var str = "{loss," + this._cvo.label + "," + this._cvo.price + "}";
        var gai = new GainLossVO(str);
        if (!gai.isEnough()) {
            if (gai.type == GainLossVO.COIN) {
                var item = ItemsCVO.getCvo(ItemsConst.COIN);
                Manager.view.show(9 /* ItemsTips */, item);
                return;
            }
            var dsc = void 0;
            var cbi = void 0;
            if (gai.type == GainLossVO.GOLD) {
                dsc = gai.name + "不足,是否充值？";
                cbi = Manager.pool.create(CallBackInfo, this.sendBuyCallback, this);
            }
            else {
                dsc = gai.name + "不足";
            }
            Manager.tips.showTips(dsc, cbi);
            return;
        }
        Manager.control.getShop().buy(this._cvo.id, this._cvo.shop_type, this._count);
        this.onTouchCloseHandler();
    };
    ShopBuyView.prototype.sendBuyCallback = function () {
        this.onTouchCloseHandler();
        Manager.view.show(77 /* SysChargePanel */);
    };
    ShopBuyView.prototype.onTouchCloseHandler = function () {
        Manager.view.hide(33 /* ShopBuyView */);
        ShopPanel.shopbuyView = null;
    };
    ShopBuyView.prototype.clear = function () {
        this._goods.clear();
        this._count = 1;
        this._price = 0;
        this.setPrice();
        this._numTxt.text = "";
        this._cvo = null;
        this._nameTxt.text = "";
        this._placeTxt.text = "";
    };
    ShopBuyView.prototype.show = function (value) {
        if (value === void 0) { value = null; }
        if (value) {
            this.setData(value);
            this._titlePath = "shop_huoquwuping_png";
        }
        Manager.layer.tipsLayer.addChild(this);
    };
    ShopBuyView.prototype.hide = function () {
        this.dispose();
    };
    ShopBuyView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._loadComplete) {
            if (this._list) {
                this._list.forEach(function (item, i) {
                    Manager.pool.push(item);
                });
                this._list = null;
            }
            ObjectUtil.removes(this._huoqutujGroup);
            this._res1.dispose();
            this._res1 = null;
            this._placeTxt.dispose();
            this._placeTxt = null;
            this._goods.dispose();
            this._goods = null;
            this._nameTxt.dispose();
            this._nameTxt = null;
            this._jina10Btn.dispose();
            this._jina10Btn = null;
            this._jia10Btn.dispose();
            this._jia10Btn = null;
            this._jianBtn.dispose();
            this._jianBtn = null;
            this._jiaBtn.dispose();
            this._jiaBtn = null;
            this._buyBtn.dispose();
            this._buyBtn = null;
            this._numTxt.dispose();
            this._numTxt = null;
            this._huoqutujGroup = null;
        }
        this._cvo = null;
    };
    return ShopBuyView;
}(PopUpView));
//# sourceMappingURL=ShopBuyView.js.map