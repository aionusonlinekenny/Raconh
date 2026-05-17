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
 * 宠物喂养子项
 * liangyan
 * create 2017-12-16
*/
var PetFeedItem = /** @class */ (function (_super) {
    __extends(PetFeedItem, _super);
    function PetFeedItem() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("pet", "PetFeedItemSkin");
        return _this;
    }
    PetFeedItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    PetFeedItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._useBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEvent, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdateHandler, this);
        Manager.model.getPet().addEventListener(PetEvent.ZZD_USE, this.onPetUpdateHandler, this);
        Manager.model.getPet().addEventListener(PetEvent.WXD_USE, this.onPetUpdateHandler, this);
    };
    PetFeedItem.prototype.removeEvent = function () {
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdateHandler, this);
        this._useBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEvent, this);
        Manager.model.getPet().removeEventListener(PetEvent.ZZD_USE, this.onPetUpdateHandler, this);
        Manager.model.getPet().removeEventListener(PetEvent.WXD_USE, this.onPetUpdateHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    PetFeedItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
        this.drawCount();
    };
    PetFeedItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
        if (this.isInvalid("count"))
            this.drawCount();
    };
    PetFeedItem.prototype.drawData = function () {
        if (!this._goodsID)
            return;
        var cvo = ItemsCVO.getCvo(this._goodsID);
        if (!cvo)
            return;
        this._goods.baseId = cvo.id;
        this._nameTxt.text = cvo.name;
        // this.drawCount();
    };
    PetFeedItem.prototype.drawCount = function () {
        var model = Manager.model.getPet();
        var petCvo = PetCVO.getCVO(model.pinjie, model.star);
        if (this._goodsID == ItemsConst.PET_ZZD) {
            this._useNum = model.zzdUsed;
            this._useMax = petCvo.zzdMax;
        }
        else if (this._goodsID == ItemsConst.PET_WXD) {
            this._useNum = model.wxdUsed;
            this._useMax = petCvo.wxdMax;
        }
        var canUseNum = this._useMax - this._useNum;
        this._hasUseTxt.text = LangCVO.getContent("pet2", this._useNum); //当前已使用：{0}
        this._canUseTxt.text = LangCVO.getContent("pet3", canUseNum); //当前可使用：
        this._bagCount = Manager.model.getItems().getCountItemById(this._goodsID);
        this._leftTxt.text = LangCVO.getContent("pet4", this._bagCount); //剩余：{0}个
        this._redIcon.visible = (canUseNum > 0 && this._bagCount > 0);
    };
    PetFeedItem.prototype.onItemUpdateHandler = function (e) {
        this.invalidate("count");
    };
    PetFeedItem.prototype.onTouchEvent = function (e) {
        if (!this._goodsID)
            return;
        if (this._bagCount <= 0) {
            var cvo = ItemsCVO.getCvo(this._goodsID);
            Manager.view.show(9 /* ItemsTips */, cvo);
            return;
        }
        if (this._useMax <= this._useNum) {
            FloatTips.addTips(LangCVO.getContent("pet5"), Color.RED); //当前品阶可使用个数已满
            return;
        }
        if (this._goodsID == ItemsConst.PET_ZZD)
            Manager.control.getPet().usePetZZD();
        else if (this._goodsID == ItemsConst.PET_WXD)
            Manager.control.getPet().usePetWXD();
    };
    PetFeedItem.prototype.onPetUpdateHandler = function (e) {
        if ((e.type == PetEvent.ZZD_USE && this._goodsID == ItemsConst.PET_ZZD)
            || (e.type == PetEvent.WXD_USE && this._goodsID == ItemsConst.PET_WXD))
            this.invalidate("count");
    };
    PetFeedItem.prototype.reuse = function (goodsID) {
        this._goodsID = goodsID;
        _super.prototype.reuse.call(this);
    };
    PetFeedItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        Manager.pool.push(this._goods);
        this._goods = null;
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._hasUseTxt.dispose();
        this._hasUseTxt = null;
        this._canUseTxt.dispose();
        this._canUseTxt = null;
        this._leftTxt.dispose();
        this._leftTxt = null;
        this._useBtn.dispose();
        this._useBtn = null;
        this._redIcon = null;
    };
    PetFeedItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._goods, this._nameTxt, this._hasUseTxt, this._canUseTxt, this._leftTxt, this._useBtn);
        Manager.pool.push(this._goods);
        this._goods = null;
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._hasUseTxt.dispose();
        this._hasUseTxt = null;
        this._canUseTxt.dispose();
        this._canUseTxt = null;
        this._leftTxt.dispose();
        this._leftTxt = null;
        this._useBtn.dispose();
        this._useBtn = null;
        this._redIcon = null;
    };
    return PetFeedItem;
}(UIComponent));
//# sourceMappingURL=PetFeedItem.js.map