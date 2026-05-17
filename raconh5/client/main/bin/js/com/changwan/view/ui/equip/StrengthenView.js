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
var StrengthenView = /** @class */ (function (_super) {
    __extends(StrengthenView, _super);
    function StrengthenView(thisParent) {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this._thisParent = thisParent;
        _this.skinName = Manager.path.getSkinName("equip", "StrengthenViewSkin");
        return _this;
    }
    StrengthenView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (!this._bgImg) {
            this._bgImg = Manager.pool.create(BitmapRemote);
            this._bgImg.x = 49;
            this._bgImg.y = 217;
            this._thisParent.addChildAt(this._bgImg, 5);
            this._bgImg.load(PathInfo.getPath("res/equip/equip_strengthen_centerImg1.png", LoaderType.IMAGE), 623, 588);
        }
        if (!this._bgImg2) {
            this._bgImg2 = Manager.pool.create(BitmapRemote);
            this._bgImg2.x = 49 + 34;
            this._bgImg2.y = 314;
            this._thisParent.addChildAt(this._bgImg2, 6);
            this._bgImg2.load(PathInfo.getPath("res/equip/equip_strengthen_centerImg2.png", LoaderType.IMAGE), 555, 279);
        }
        Manager.control.getEquip().equipStrengthenQuery();
        this._strengthen.touchEnabled = false;
        this._equipImg.touchEnabled = true;
        this._curAttrList = [this._attrValue1, this._attrValue2];
        this._nextAttrList = [this._nextAttrValue1, this._nextAttrValue2];
        this._goodsItem.clear();
        this._btnImg.touchEnabled = false;
        this.initData();
        //引导
        if (Manager.model.getGuide().curID == GuideID.STRENTHEN) {
            var pos = this._btn.parent.localToGlobal(this._btn.x, this._btn.y);
            Manager.control.getTask().showGuide(pos, this._btn.width >> 1, this._btn.height >> 1, this.guideCB, this, false);
        }
    };
    StrengthenView.prototype.initData = function () {
        this._thisParent._titleImg.source = "equip_strengthen_titleImg_png";
        // this._thisParent._topBtn.icon = "equip_strengthen_chuizi_png";
        this.updateRoleInfo();
    };
    StrengthenView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
    };
    StrengthenView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("onUpdateStrengthenInfo"))
            this.onUpdateStrengthenInfo();
        if (this.isInvalid("onUpdateItemInfo"))
            this.onUpdateItemInfo();
    };
    StrengthenView.prototype.cleanItemInfo = function () {
        this._thisParent._equipName.text = "";
        for (var i = 0; i < this._thisParent._itemList.length; i++) {
            this._thisParent._itemList[i].clear();
            this._thisParent._itemList[i].selected = false;
        }
        for (var i = 0; i < this._curAttrList.length; i++) {
            this._curAttrList[i].text = "";
            this._nextAttrList[i].text = "";
        }
        this._thisParent._fighting.setValue(0, "nums_fighting_", 25);
        this._equipImg.texture = null;
        this._equipImg.bitmapData = null;
        this._goodsItem.clear();
    };
    StrengthenView.prototype.updateRoleInfo = function () {
        this.cleanItemInfo();
        this._thisParent.curRoleInfo = Manager.model.self;
        if (!this._thisParent.curRoleInfo)
            return;
        this._equipDataList = Manager.model.getItems().equipList;
        for (var i = 0; i < this._thisParent._itemList.length; i++) {
            this._thisParent._itemList[i].clear();
            var itemInfo = this._equipDataList.get(i + 1);
            if (itemInfo) {
                this._thisParent._itemList[i].callback(this.loadImgCallBack, this, i);
                // this._thisParent._itemList[i].baseId = itemInfo.base_id;
                this._thisParent._itemList[i].data = itemInfo;
            }
        }
    };
    StrengthenView.prototype.loadImgCallBack = function (local) {
        this._thisParent.baseIconList[local].visible = false;
        if (this._thisParent._curItemIndex == local) {
            this._equipImg.texture = this._thisParent._itemList[this._thisParent._curItemIndex].itemImgTexture;
            if (this._equipImg.texture == null)
                this._equipImg.bitmapData = this._thisParent._itemList[this._thisParent._curItemIndex].itemImgBitmapData;
        }
    };
    StrengthenView.prototype.updateStrengthenInfo = function () {
        if (!this._thisParent.curRoleInfo)
            return;
        var itemInfo;
        var selectIndex = 0;
        for (var i = 0; i < this._thisParent._itemList.length; i++) {
            var info = Manager.model.getItems().equipStrengthenData.get(i + 1);
            if (info) {
                if (info.level == 0) {
                    selectIndex = i;
                    if (this._equipDataList)
                        itemInfo = this._equipDataList.get(i + 1);
                    break;
                }
                else {
                    this._thisParent._itemList[i].setStrengthenLevel(info.level, true);
                    if (this._thisParent._itemList[i].strengthenLevel < this._thisParent._itemList[selectIndex].strengthenLevel) {
                        selectIndex = i;
                        itemInfo = this._equipDataList.get(i + 1);
                    }
                }
            }
            else {
                selectIndex = i;
                itemInfo = this._equipDataList.get(i + 1);
                break;
            }
        }
        this._thisParent._curItemIndex = selectIndex;
        for (var i_1 = 0; i_1 < this._thisParent._itemList.length; i_1++) {
            if (i_1 == this._thisParent._curItemIndex)
                this._thisParent._itemList[i_1].selected = true;
            else
                this._thisParent._itemList[i_1].selected = false;
        }
        this._curItemInfo = itemInfo;
        this.updateSelectItem();
        this.updateFighting();
    };
    StrengthenView.prototype.updateSelectItem = function () {
        this._equipImg.texture = this._thisParent._itemList[this._thisParent._curItemIndex].itemImgTexture;
        if (this._equipImg.texture == null)
            this._equipImg.bitmapData = this._thisParent._itemList[this._thisParent._curItemIndex].itemImgBitmapData;
        var curLevel = 0;
        var info = Manager.model.getItems().equipStrengthenData.get(this._thisParent._curItemIndex + 1);
        if (info)
            curLevel = info.level;
        var equipName;
        if (this._curItemInfo) {
            this._curCvoInfo = EquipStrengthenCVO.getInfo(this._curItemInfo.pos, curLevel);
            this._nextCvoInfo = EquipStrengthenCVO.getInfo(this._curItemInfo.pos, curLevel + 1);
            equipName = this._curItemInfo.cvo.name;
        }
        else {
            this._curCvoInfo = EquipStrengthenCVO.getInfo(this._thisParent._curItemIndex + 1, curLevel);
            this._nextCvoInfo = EquipStrengthenCVO.getInfo(this._thisParent._curItemIndex + 1, curLevel + 1);
            var itemInfo = this._thisParent._itemList[this._thisParent._curItemIndex].cvo;
            if (itemInfo)
                equipName = itemInfo.name;
            else
                equipName = LangCVO.getContent("equip" + (this._thisParent._curItemIndex + 1));
        }
        if (this._curCvoInfo) {
            if (curLevel >= 1)
                this._thisParent._equipName.text = equipName + "+" + curLevel;
            else
                this._thisParent._equipName.text = equipName;
            this._goodsItem.baseId = this._curCvoInfo.itemId;
            this._goodsItem.itemAmount(Manager.model.getItems().getCountItemById(this._curCvoInfo.itemId), this._curCvoInfo.amount);
            for (var i = 0; i < this._curCvoInfo.attr.length; i++) {
                this._curAttrList[i].text = AttrDescType.getAttrName(this._curCvoInfo.attr[i][0]) + "+" + this._curCvoInfo.attr[i][1];
            }
        }
        if (this._nextCvoInfo) {
            for (var i = 0; i < this._nextCvoInfo.attr.length; i++) {
                this._nextAttrList[i].text = AttrDescType.getAttrName(this._nextCvoInfo.attr[i][0]) + "+" + this._nextCvoInfo.attr[i][1];
            }
        }
    };
    StrengthenView.prototype.updateFighting = function () {
        var fightingValue = 0;
        for (var i = 0; i < this._thisParent._itemList.length; i++) {
            var info = Manager.model.getItems().equipStrengthenData.get(i + 1);
            if (info)
                fightingValue += info.fighting;
        }
        this._thisParent._fighting.setValue(fightingValue, "nums_fighting_", 25);
    };
    StrengthenView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._equipImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEquipImgHandler, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateStrengthenInfoHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.EQUIP_UPDATE_EVENT, this.onUpdateItemInfoHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT, this.onUpdateStrengthenInfoHandler, this);
    };
    StrengthenView.prototype.removeEvent = function () {
        this._equipImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEquipImgHandler, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateStrengthenInfoHandler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.EQUIP_UPDATE_EVENT, this.onUpdateItemInfoHandler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT, this.onUpdateStrengthenInfoHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    StrengthenView.prototype.onClickHandler = function (e) {
        if (e != null && Manager.model.getGuide().curID == GuideID.STRENTHEN)
            return;
        if (this._thisParent.curRoleInfo) {
            if (this._goodsItem.curAmount > this._goodsItem.totalAmount) {
                // FloatTips.addTips(LangCVO.getContent("equip9"), Color.RED);
                // Manager.view.show(ViewID.ItemsTips, ItemsCVO.getCvo(this._goodsItem.baseId));
                var shopCvo = ShopCVO.getbaseIdCvo(this._goodsItem.baseId);
                Manager.view.show(33 /* ShopBuyView */, shopCvo);
            }
            else {
                var hasCanUpgrade = false;
                for (var i = 0; i < this._thisParent._itemList.length; i++) {
                    var info = Manager.model.getItems().equipStrengthenData.get(i + 1);
                    if (info && info.level < this._thisParent.curRoleInfo.attrInfo.level) {
                        hasCanUpgrade = true;
                        break;
                    }
                }
                if (hasCanUpgrade) {
                    Manager.control.getEquip().equipStrengthen();
                    this._thisParent.showCgEffect();
                }
                else
                    FloatTips.addTips(LangCVO.getContent("equip10"), Color.RED);
            }
        }
    };
    StrengthenView.prototype.onUpdateItemInfoHandler = function (e) {
        this.invalidate("onUpdateItemInfo");
    };
    StrengthenView.prototype.onUpdateItemInfo = function () {
        this.updateRoleInfo();
    };
    StrengthenView.prototype.onUpdateStrengthenInfoHandler = function (e) {
        this.invalidate("onUpdateStrengthenInfo");
    };
    StrengthenView.prototype.onUpdateStrengthenInfo = function () {
        if (this._thisParent.curView == this) {
            this.updateStrengthenInfo();
            var list = Manager.model.getItems().equipOldStrengthenLevel;
            if (list && list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                    var effect = this._thisParent.strengthenEffectList[list[i]];
                    if (!effect) {
                        effect = Manager.animation.createEffectAnimation("Qianghua", 0, true, false);
                        effect.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onPlayCompleteHandler, this);
                        effect.x = -63;
                        effect.y = -57;
                        effect.touchEnabled = false;
                        this._thisParent.strengthenEffectList[list[i]] = effect;
                    }
                    effect.play();
                    if (!effect.parent)
                        this._thisParent._itemList[list[i] - 1].addChild(effect);
                }
            }
            list = [];
        }
    };
    StrengthenView.prototype.onPlayCompleteHandler = function (e) {
        if (e.currentTarget.parent)
            e.currentTarget.parent.removeChild(e.currentTarget);
    };
    StrengthenView.prototype.onClickEquipImgHandler = function (e) {
        this._thisParent._itemList[this._thisParent._curItemIndex].dispatchEventWith(egret.TouchEvent.TOUCH_TAP, false, true);
    };
    StrengthenView.prototype.guideCB = function () {
        this.onClickHandler(null);
        Manager.control.getTask().hideGuide();
    };
    StrengthenView.prototype.showAttrTips = function () {
    };
    StrengthenView.prototype.reuse = function (thisParent) {
        _super.prototype.reuse.call(this);
        this._thisParent = thisParent;
    };
    StrengthenView.prototype.dispose = function () {
        for (var i = 0; i < 8; i++) {
            if (this._thisParent.strengthenEffectList[i + 1]) {
                this._thisParent.strengthenEffectList[i + 1].removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onPlayCompleteHandler, this);
            }
        }
        if (Manager.model.getGuide().curID == GuideID.STRENTHEN)
            Manager.control.getTask().hideGuide();
        _super.prototype.dispose.call(this);
        this._thisParent = null;
        this._strengthen = null;
        this._equipImg = null;
        if (this._goodsItem)
            Manager.pool.push(this._goodsItem);
        this._goodsItem = null;
        if (this._descTxt)
            this._descTxt.dispose();
        this._descTxt = null;
        if (this._btn)
            this._btn.dispose();
        this._btn = null;
        this._btnImg = null;
        if (this._attrValue1)
            this._attrValue1.dispose();
        this._attrValue1 = null;
        if (this._attrValue2)
            this._attrValue2.dispose();
        this._attrValue2 = null;
        if (this._nextAttrValue1)
            this._nextAttrValue1.dispose();
        this._nextAttrValue1 = null;
        if (this._nextAttrValue2)
            this._nextAttrValue2.dispose();
        this._nextAttrValue2 = null;
        this._curAttrList = null;
        this._nextAttrList = null;
        this._curItemInfo = null;
        this._curCvoInfo = null;
        this._nextCvoInfo = null;
        this._equipDataList = null;
        if (this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
        if (this._bgImg2)
            Manager.pool.push(this._bgImg2);
        this._bgImg2 = null;
    };
    return StrengthenView;
}(UIComponent));
//# sourceMappingURL=StrengthenView.js.map