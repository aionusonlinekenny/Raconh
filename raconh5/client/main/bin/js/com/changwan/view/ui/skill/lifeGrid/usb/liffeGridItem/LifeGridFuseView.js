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
 * 命格融合 与 兑换 view
 * 17-12-28
 */
var LifeGridFuseView = /** @class */ (function (_super) {
    __extends(LifeGridFuseView, _super);
    function LifeGridFuseView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("lifeGrid/lifegridview", "LifeGridFuseViewSkin");
        return _this;
    }
    LifeGridFuseView.prototype.addEvent = function () {
        this._rhBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyLifeGridHandler, this);
        _super.prototype.addEvent.call(this);
    };
    LifeGridFuseView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._rhBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyLifeGridHandler, this);
    };
    LifeGridFuseView.prototype.onBuyLifeGridHandler = function (e) {
        Manager.control.getShop().buy(this._shopCvo.id, this._shopCvo.shop_type, 1);
        Manager.view.hide(54 /* LifeGridFuseView */);
    };
    LifeGridFuseView.prototype.onclickHandler = function (e) {
        Manager.control.getLifeGrid().ware(this._itemId, this._pos);
        Manager.view.hide(54 /* LifeGridFuseView */);
    };
    LifeGridFuseView.prototype.onTouchCloseHandler = function (e) {
        Manager.view.hide(54 /* LifeGridFuseView */);
    };
    LifeGridFuseView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.darwData();
        this.drawBuyData();
    };
    LifeGridFuseView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("darwData"))
            this.darwData();
        if (this.isInvalid("drawShopbuy"))
            this.drawBuyData();
    };
    /**
     * 融合数据
     * pos孔位置
        id'命格唯一id
     */
    LifeGridFuseView.prototype.setData = function (data, data2, pos, id) {
        this._shopCvo = null;
        this._cvo1 = data;
        this._cvo2 = data2;
        this._pos = pos;
        this._itemId = id;
        this.invalidate("darwData");
    };
    LifeGridFuseView.prototype.darwData = function () {
        if (this._cvo1 == null)
            return;
        this._lifeGroup.x = 112;
        this._lifeGroup.y = 373;
        this._rightGroup.visible = true;
        this._group1.visible = false;
        this._popupView.titleImg.source = "lifeGrid_minggerh_png";
        this._goods1.baseId = this._cvo1.base_id;
        this._goods2.baseId = this._cvo2.base_id;
        var itemCvo1 = ItemsCVO.getCvo(this._cvo1.base_id);
        var itemCvo2 = ItemsCVO.getCvo(this._cvo2.base_id);
        this._nameTxt1.text = itemCvo1.name + "Lv." + this._cvo1.lev;
        this._nameTxt2.text = itemCvo2.name + "Lv." + this._cvo2.lev;
        var attvos = this._cvo1.attrVos();
        this._attrTxt0.text = attvos[0].desc();
        if (attvos[1]) {
            this._attrTxt1.text = attvos[1].desc();
        }
        else {
            this._attrTxt1.text = "";
        }
        attvos = this._cvo2.attrVos();
        this._attrTxt2.text = attvos[0].desc();
        if (attvos[1]) {
            this._attrTxt3.text = attvos[1].desc();
        }
        else {
            this._attrTxt3.text = "";
        }
    };
    /**
     * 兑换数据
     */
    LifeGridFuseView.prototype.setbuyData = function (shopcvo) {
        this._shopCvo = shopcvo;
        this._cvo1 = null;
        this.invalidate("drawShopbuy");
    };
    LifeGridFuseView.prototype.drawBuyData = function () {
        if (this._shopCvo == null)
            return;
        this._lifeGroup.x = 282;
        this._lifeGroup.y = 383;
        this._rightGroup.visible = false;
        this._group1.visible = true;
        var cvo = LifeGridCVO.getInfo(this._shopCvo.base_id, 1);
        this._goods1.baseId = cvo.base_id;
        var attvos = cvo.attrVos();
        var itemCvo1 = ItemsCVO.getCvo(cvo.base_id);
        this._nameTxt1.text = itemCvo1.name + "Lv.1";
        if (attvos[1]) {
            this._attrTxt1.text = attvos[1].desc();
        }
        else {
            this._attrTxt1.text = "";
        }
        if (attvos[0]) {
            this._attrTxt0.text = attvos[0].desc();
        }
        else {
            this._attrTxt0.text = "";
        }
        var str = StringUtils.setParam(LangCVO.getContent("lifeGrid5"), this._shopCvo.price);
        HtmlUtil.setTextFlow(this._losseTxt, str);
        this._popupView.titleImg.source = "common_dh_png";
    };
    LifeGridFuseView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    LifeGridFuseView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
    };
    LifeGridFuseView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._attrTxt0, this._attrTxt1, this._attrTxt2, this._attrTxt3, this._goods1, this._goods2, this._nameTxt1, this._nameTxt2, this._rhBtn, this._losseTxt, this._buyBtn);
        ObjectUtil.removes(this._lifeGroup, this._rightGroup, this._group1);
        this._attrTxt0 = null;
        this._attrTxt1 = null;
        this._attrTxt2 = null;
        this._attrTxt3 = null;
        this._goods1 = null;
        this._goods2 = null;
        this._nameTxt1 = null;
        this._nameTxt2 = null;
        this._rhBtn = null;
        this._cvo1 = null;
        this._cvo2 = null;
        this._lifeGroup = null;
        this._rightGroup = null;
        this._group1 = null;
        this._shopCvo = null;
        this._losseTxt = null;
        this._buyBtn = null;
    };
    return LifeGridFuseView;
}(PopUpView));
//# sourceMappingURL=LifeGridFuseView.js.map