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
var LifeGridBuy = (function (_super) {
    __extends(LifeGridBuy, _super);
    function LifeGridBuy() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("lifeGrid/LifeGridBuy", "LifeGridBuySkin");
        return _this;
    }
    LifeGridBuy.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._vScroller.initBtnListData(LifeGridBuyItem, [], true);
        this._itemModel = Manager.model.getItems();
        this._model = Manager.model.getLifeGrid();
    };
    LifeGridBuy.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.DESTINY_FRAG, this.onFrigUpdateHandler, this);
        this._splerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenHuntHandler, this);
    };
    LifeGridBuy.prototype.removeEvent = function () {
        Manager.model.self.removeEventListener(GameObjectAttrEvent.DESTINY_FRAG, this.onFrigUpdateHandler, this);
        this._splerBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenHuntHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    LifeGridBuy.prototype.onOpenHuntHandler = function () {
        this._lifeGridView.setTap(3);
    };
    LifeGridBuy.prototype.onFrigUpdateHandler = function () {
        this._numTxt.text = "" + Manager.model.self.attrInfo.destinyfrig;
    };
    LifeGridBuy.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    LifeGridBuy.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.darwData();
    };
    LifeGridBuy.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.darwData();
    };
    LifeGridBuy.prototype.setData = function (data) {
        this.invalidate(InvalidationType.DATA);
    };
    LifeGridBuy.prototype.darwData = function () {
        var shopArr = ShopCVO.getShopTypeLists(ShopType.LIFEGRID_TYPE);
        shopArr = ArrayUtil.sortOn(shopArr, ["lifeIsyiyou", "lifeislock", "ample", "sort"]);
        this._vScroller.dataProvider(shopArr);
        this._numTxt.text = "" + Manager.model.self.attrInfo.destinyfrig;
    };
    LifeGridBuy.prototype.reuse = function (value) {
        _super.prototype.reuse.call(this);
        this._lifeGridView = value;
    };
    LifeGridBuy.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
    };
    LifeGridBuy.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._vScroller.dispose();
        this._vScroller = null;
        this._itemModel = null;
        this._model = null;
        this._numTxt = null;
        this._splerBtn = null;
        this._lifeGridView = null;
    };
    return LifeGridBuy;
}(UIComponent));
__reflect(LifeGridBuy.prototype, "LifeGridBuy");
//# sourceMappingURL=LifeGridBuy.js.map