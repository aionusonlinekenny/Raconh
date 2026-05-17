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
var ShopItem = /** @class */ (function (_super) {
    __extends(ShopItem, _super);
    function ShopItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("shop", "ShopItemSkin");
        return _this;
    }
    ShopItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._res1.iconSize = PlayerResItems.ICON_54;
        this._res2.iconSize = PlayerResItems.ICON_54;
        this._res1.color = "#7C6E62";
        this._res2.color = "#7C6E62";
        this._res1.sign = "";
        this._res2.sign = "";
        this._res1.fontSize(24);
        this._res2.fontSize(24);
        this._nameTxt.stroke = 2;
        this._nameTxt.strokeColor = 0x7C6E62;
        this.touchChildren = true;
        this._buyBtn.touchEnabled = true;
    };
    ShopItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyClickFun, this);
    };
    ShopItem.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buyClickFun, this);
    };
    ShopItem.prototype.buyClickFun = function (e) {
        if (ShopPanel.shopbuyView == null) {
            ShopPanel.shopbuyView = Manager.view.show(33 /* ShopBuyView */);
        }
        ShopPanel.shopbuyView.setData(this._cvo);
    };
    ShopItem.prototype.clear = function () {
        this._nameTxt.text = "";
        this._goods.clear();
        this._tuijianImg.visible = false;
    };
    ShopItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.updateView();
    };
    ShopItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.updateView();
    };
    ShopItem.prototype.setData = function (info) {
        // if(this._cvo && this._cvo.id == info.id && this._cvo.count == info.count)
        // {
        // 	return;
        // }
        this._cvo = info;
        this.invalidate(InvalidationType.DATA);
    };
    ShopItem.prototype.updateView = function () {
        if (!this._cvo)
            return;
        var itemCvo = ItemsCVO.getCvo(this._cvo.base_id);
        var str = HtmlUtil.addColorTag(itemCvo.name, itemCvo.colorStr);
        this._nameTxt.textFlow = new egret.HtmlTextParser().parse(str);
        //this._nameTxt.text = itemCvo.name;
        this._goods.setCvo(itemCvo);
        this._goods.count = this._cvo.num;
        if (this._cvo.goods_tips == 10) {
            this._tuijianImg.visible = true;
            this._tuijianImg.source = "common_itemRecommend_png";
            this._agioTxt.text = "热卖";
        }
        else if (this._cvo.goods_tips == 11) {
            this._tuijianImg.visible = true;
            this._tuijianImg.source = "common_itemRecommend_png";
            this._agioTxt.text = "珍品";
        }
        else if (this._cvo.goods_tips == 0) {
            this._tuijianImg.visible = false;
            this._agioTxt.text = "";
        }
        else {
            this._tuijianImg.visible = true;
            this._tuijianImg.source = "common_itemRecommend2_png";
            this._agioTxt.text = this._cvo.goods_tips + "折";
        }
        if (this._cvo.oldPrice > 0) {
            this._priceTxt.visible = true;
            this._currentPriceTxt.visible = true;
            this._hongImg.visible = true;
            this._res1.visible = true;
            this._res1.type = this._cvo.label;
            this._res1.count = this._cvo.oldPrice;
            this._res2.type = this._cvo.label;
            this._res2.count = this._cvo.price;
            // this._gro1.x =Math.round((this.width - (54 + this._res1.width))/2);
            this._gro2.x = 34;
            this._gro2.y = 187;
        }
        else {
            this._priceTxt.visible = false;
            this._currentPriceTxt.visible = false;
            this._hongImg.visible = false;
            this._res1.visible = false;
            this._res2.type = this._cvo.label;
            this._res2.count = this._cvo.price;
            this._gro2.x = 5; //Math.round((this.width - (108 + this._res2.width))/2)+15;
            this._gro2.y = 172;
        }
        if (this._cvo.limit > 0 && this._cvo.count >= this._cvo.limit) {
            this._noStockImg.visible = true;
        }
        else if (this._cvo.limit_p > 0 && this._cvo.count >= this._cvo.limit_p) {
            this._noStockImg.visible = true;
        }
        else {
            this._noStockImg.visible = false;
        }
        this._buyBtn.visible = !this._noStockImg.visible;
        //_vip
        var condition = new ConditionVO(this._cvo.show_cond);
        if (!this._vipNum) {
            this._vipNum = Manager.pool.create(NumImgView2);
            this._vipNum.x = 69;
            this._vipNum.y = 255;
            this.addChild(this._vipNum);
        }
        if (condition.isSatisfy()) {
            this._vipImg.visible = false;
            this._vipNum.visible = false;
        }
        else {
            this._vipImg.visible = true;
            this._vipNum.visible = true;
            this._vipNum.setValue(condition.value, "nums_vip_", 14);
            this._buyBtn.visible = false;
            if (condition.value > 9) {
                this._vipNum.x = 70;
            }
            else {
                this._vipNum.x = 80;
            }
        }
    };
    ShopItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    ShopItem.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    ShopItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._loadComplete) {
            this._nameTxt.dispose();
            this._nameTxt = null;
            this._goods.dispose();
            this._goods = null;
            this.removeChild(this._tuijianImg);
            this._tuijianImg = null;
            this._res1.dispose();
            this._res1 = null;
            this._res2.dispose();
            this._res2 = null;
            this._buyBtn.dispose();
            this._buyBtn = null;
            this.removeChild(this._noStockImg);
            this._noStockImg = null;
            this._priceTxt.dispose();
            this._priceTxt = null;
            this._currentPriceTxt.dispose();
            this._currentPriceTxt = null;
            this.removeChild(this._hongImg);
            this._hongImg = null;
            if (this._vipNum)
                Manager.pool.push(this._vipNum);
            this._vipNum = null;
            this.removeChild(this._vipImg);
            this._vipImg = null;
            this._cvo = null;
            this.removeChild(this._gro1);
            this._gro1 = null;
            this.removeChild(this._gro2);
            this._gro2 = null;
            this._agioTxt.dispose();
            this._agioTxt = null;
        }
    };
    return ShopItem;
}(UIComponent));
//# sourceMappingURL=ShopItem.js.map