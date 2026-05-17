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
 * 套装
 */
var SuitView = /** @class */ (function (_super) {
    __extends(SuitView, _super);
    function SuitView(thisParent) {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this._thisParent = thisParent;
        _this.skinName = Manager.path.getSkinName("equip", "SuitViewSkin");
        return _this;
    }
    SuitView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (!this._leftBgImg) {
            this._leftBgImg = Manager.pool.create(BitmapRemote);
            this._leftBgImg.x = 10;
            this._leftBgImg.y = 126;
            this.addChildAt(this._leftBgImg, 3);
            this._leftBgImg.load(PathInfo.getPath("res/common/common_pnl_back2.png", LoaderType.IMAGE), 242, 693);
        }
        if (!this._bgImg) {
            this._bgImg = Manager.pool.create(BitmapRemote);
            this._bgImg.x = 260;
            this._bgImg.y = 127;
            this.addChildAt(this._bgImg, 2);
            this._bgImg.load(PathInfo.getPath("res/equip/suit_bgImg.png", LoaderType.IMAGE), 458, 671);
        }
        this._equipName.width = 200;
        this._equipGroup.touchEnabled = false;
        this._equipList = [];
        for (var i = 0; i < 8; i++) {
            this._equipList.push(this["_equipItem" + (i + 1)]);
            this._equipList[i].item.isShowTips = false;
            this._equipList[i].equipImg.source = "equip_baseIcon" + (i + 1) + "_png";
        }
        this._suitNum = Manager.pool.create(NumImgView2);
        if (this._suitNum && !this._suitNum.parent) {
            this._suitNum.x = 34;
            this._suitNum.y = 155;
            this.addChild(this._suitNum);
        }
        this._suitNum.setValue(0, "suit_num", 15);
        if (!this._fightNum) {
            this._fightNum = Manager.pool.create(NumImgView2);
            this._fightNum.x = this._fighting.x + 105;
            this._fightNum.y = this._fighting.y + 10;
            this.addChild(this._fightNum);
        }
        this._fightNum.setValue(0, "nums_fighting_", 25);
        // this.initData();
    };
    SuitView.prototype.initData = function () {
        this._thisParent._titleImg.source = "suit_title_png";
        this._curItemIndex = -1;
        this._isSetLocal = false;
        // this.onSuitInfoUpdataHandler(null);
        Manager.control.getEquip().suitInfoQuery();
    };
    SuitView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
    };
    SuitView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("onUpdateItemInfo"))
            this.onUpdateItemInfo();
        if (this.isInvalid("onUpdateEquipInfo"))
            this.onUpdateEquipInfo();
        if (this.isInvalid("onSuitInfoUpdata"))
            this.onSuitInfoUpdata();
        if (this.isInvalid("updateAttrInfo"))
            this.updateAttrInfo();
    };
    SuitView.prototype.cleanInfo = function () {
        this._suitNum.setValue(0, "suit_num", 15);
        // this._fightNum.setValue(0, "nums_fighting_");
        this._suitName.text = "";
        this._suitAmount.text = "(0/0)";
        this._equipName.text = "";
        this._item.clear();
    };
    SuitView.prototype.updateEquipInfo = function () {
        this.cleanInfo();
        // for(let i:number=0; i<this._equipList.length; i++)
        // 	this._equipList[i].clear();
        this._thisParent.curRoleInfo = Manager.model.self;
        if (!this._thisParent.curRoleInfo)
            return;
        this._equipDataList = Manager.model.getItems().equipList;
        var list;
        for (var i = 0; i < this._equipList.length; i++) {
            this._equipList[i].clear();
            var type = void 0;
            if (EquipModel.SUIT_DEFENSE_POS.indexOf(i + 1) != -1) {
                list = Manager.model.getEquip().equipSuitDefenseList;
                type = 1;
            }
            else if (EquipModel.SUIT_ATTACK_POS.indexOf(i + 1) != -1) {
                list = Manager.model.getEquip().equipSuitAttackList;
                type = 2;
            }
            var level = 0;
            for (var j = 0; j < list.length; j++) {
                if (list[j].pos == i + 1) {
                    level = list[j].level;
                    this._equipList[i].jie = level;
                    if (list[j].level > 0) {
                        this._equipList[i].kuang.visible = true;
                        this._equipList[i].tao(type).visible = true;
                        break;
                    }
                }
            }
            if (level + 1 <= EquipModel.SUIT_MAX_LEVEL) {
                var info = SuitCVO.getSuitUpgradeInfo(level + 1, i + 1);
                if (info) {
                    var num = Manager.model.getItems().getCountItemById(info.loss.baseId);
                    if (num >= info.loss.num) {
                        this._equipList[i].redIcon.visible = true;
                        if (!this._isSetLocal) {
                            this._isSetLocal = true;
                            this._curItemIndex = i;
                        }
                    }
                }
            }
            var itemInfo = this._equipDataList.get(i + 1);
            if (itemInfo) {
                this._equipList[i].item.callback(this.loadImgCallBack, this, i);
                this._equipList[i].item.data = itemInfo;
            }
        }
        this._fightNum.setValue(Manager.model.getEquip().suitAllFight, "nums_fighting_", 25);
    };
    SuitView.prototype.loadImgCallBack = function (local) {
        if (this._equipList[local].item.itemImgTexture || this._equipList[local].item.itemImgBitmapData)
            this._equipList[local].equipImg.visible = false;
    };
    SuitView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateItemInfoHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.EQUIP_UPDATE_EVENT, this.onUpdateEquipInfoHandler, this);
        Manager.model.getEquip().addEventListener(EquipEvent.SUIT_INFO_UPDATE, this.onSuitInfoUpdataHandler, this);
        if (this._equipList) {
            for (var i = 0; i < this._equipList.length; i++) {
                this._equipList[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemHandler, this);
            }
        }
        this._suitBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._suitBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    SuitView.prototype.removeEvent = function () {
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateItemInfoHandler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.EQUIP_UPDATE_EVENT, this.onUpdateEquipInfoHandler, this);
        Manager.model.getEquip().removeEventListener(EquipEvent.SUIT_INFO_UPDATE, this.onSuitInfoUpdataHandler, this);
        if (this._equipList) {
            for (var i = 0; i < this._equipList.length; i++) {
                this._equipList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemHandler, this);
            }
        }
        this._suitBtn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._suitBtn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    SuitView.prototype.onUpdateItemInfoHandler = function (e) {
        this.invalidate("onUpdateItemInfo");
    };
    SuitView.prototype.onUpdateItemInfo = function () {
        this.updateEquipInfo();
        // this.cleanInfo();
        this.updateAttrInfo();
    };
    SuitView.prototype.onUpdateEquipInfoHandler = function (e) {
        this.invalidate("onUpdateEquipInfo");
    };
    SuitView.prototype.onUpdateEquipInfo = function () {
        this.updateEquipInfo();
    };
    SuitView.prototype.onSuitInfoUpdataHandler = function (e) {
        this.invalidate("onSuitInfoUpdata");
    };
    SuitView.prototype.onSuitInfoUpdata = function () {
        this.updateEquipInfo();
        if (this._curItemIndex == -1)
            this._equipList[EquipType.EQUIP_HELMET - 1].dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP));
        else
            this._equipList[this._curItemIndex].dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP));
    };
    SuitView.prototype.onClickItemHandler = function (e) {
        var index = this._equipList.indexOf(e.currentTarget);
        if (index == -1)
            return;
        if (this._equipList[this._curItemIndex])
            this._equipList[this._curItemIndex].item.selected = false;
        this._curItemIndex = index;
        if (this._equipList[this._curItemIndex])
            this._equipList[this._curItemIndex].item.selected = true;
        this.cleanInfo();
        // this.updateAttrInfo();
        this.invalidate("updateAttrInfo");
    };
    SuitView.prototype.updateAttrInfo = function () {
        this._curSuitLevel = 0;
        var list;
        var passList = [];
        if (EquipModel.SUIT_ATTACK_POS.indexOf(this._curItemIndex + 1) != -1) {
            this._curSuitType = 2;
            list = Manager.model.getEquip().equipSuitAttackList;
        }
        else {
            this._curSuitType = 1;
            list = Manager.model.getEquip().equipSuitDefenseList;
        }
        for (var i = 0; i < list.length; i++) {
            if (list[i].pos == this._curItemIndex + 1) {
                this._curSuitLevel = list[i].level;
            }
        }
        for (var i = 0; i < list.length; i++) {
            if (list[i].level == this._curSuitLevel && this._curSuitLevel > 0)
                passList.push(list[i].pos);
        }
        if (this._curSuitLevel != 0) {
            this._jiaImg.x = 49;
            this._suitName.x = 85;
            this._suitAmount.x = 175;
            if (this._curSuitLevel < 10)
                this._suitNum.x = 30;
            else
                this._suitNum.x = 10;
        }
        else {
            this._jiaImg.x = 38;
            this._suitName.x = 72;
            this._suitAmount.x = 162;
            this._suitNum.x = 17;
        }
        var equipName = "";
        this._suitNum.setValue(this._curSuitLevel > 0 ? this._curSuitLevel : 1, "suit_num", 25);
        if (this._curSuitType == 1) {
            this._suitName.text = LangCVO.getContent("equip21");
            if (this._curSuitLevel > 0) {
                this._suitAmount.text = "(" + passList.length + "/" + EquipModel.SUIT_DEFENSE_POS.length + ")";
                if (passList.length == EquipModel.SUIT_DEFENSE_POS.length)
                    this._suitAmount.textColor = Color.GREEN;
                else
                    this._suitAmount.textColor = Color.RED;
            }
            else {
                this._suitAmount.text = "(" + LangCVO.getContent("equip22") + ")";
                this._suitAmount.textColor = Color.RED;
            }
            for (var i = 0; i < EquipModel.SUIT_DEFENSE_POS.length; i++) {
                if (passList.indexOf(EquipModel.SUIT_DEFENSE_POS[i]) != -1)
                    equipName += "<font color='" + Color.toColorStr(Color.GREEN) + "'>" + LangCVO.getContent("equip3" + EquipModel.SUIT_DEFENSE_POS[i]) + "</font>  ";
                else
                    equipName += "<font color='" + Color.toColorStr(Color.DEF) + "'>" + LangCVO.getContent("equip3" + EquipModel.SUIT_DEFENSE_POS[i]) + "</font>  ";
            }
        }
        else if (this._curSuitType == 2) {
            this._suitName.text = LangCVO.getContent("equip20");
            if (this._curSuitLevel > 0) {
                this._suitAmount.text = "(" + passList.length + "/" + EquipModel.SUIT_ATTACK_POS.length + ")";
                if (passList.length == EquipModel.SUIT_ATTACK_POS.length)
                    this._suitAmount.textColor = Color.GREEN;
                else
                    this._suitAmount.textColor = Color.RED;
            }
            else {
                this._suitAmount.text = "(" + LangCVO.getContent("equip22") + ")";
                this._suitAmount.textColor = Color.RED;
            }
            for (var i = 0; i < EquipModel.SUIT_ATTACK_POS.length; i++) {
                if (passList.indexOf(EquipModel.SUIT_ATTACK_POS[i]) != -1)
                    equipName += "<font color='" + Color.toColorStr(Color.GREEN) + "'>" + LangCVO.getContent("equip3" + EquipModel.SUIT_ATTACK_POS[i]) + "</font>  ";
                else
                    equipName += "<font color='" + Color.toColorStr(Color.DEF) + "'>" + LangCVO.getContent("equip3" + EquipModel.SUIT_ATTACK_POS[i]) + "</font>  ";
            }
        }
        HtmlUtil.setTextFlow(this._equipName, equipName);
        // this._fightNum.setValue(0, "nums_fighting_");
        var len = this._curSuitType == 1 ? 4 : 3;
        var content = [];
        for (var i = 0; i < len; i++) {
            var amountColor = Color.DEF;
            var attrValueColor = Color.DEF;
            var attrValue = "";
            var viewHeight = 0;
            var baseValue = this._curSuitType == 1 ? i + 2 : i + 1;
            var info = SuitCVO.getSuitInfo(this._curSuitType, (this._curSuitLevel > 0 ? this._curSuitLevel : 1), baseValue);
            if (info) {
                if (baseValue <= passList.length) {
                    amountColor = Color.GREEN;
                    attrValueColor = Color.GREEN;
                    // this._fightNum.setValue(info.attrInfo.getFighting(), "nums_fighting_");
                }
                else {
                    amountColor = Color.DEF;
                    attrValueColor = Color.DEF;
                }
                for (var j = 0; j < info.attrInfo.attrInfos.length; j++) {
                    attrValue += info.attrInfo.attrInfos[j].desc() + "\n";
                    viewHeight += 32;
                }
            }
            else {
                amountColor = Color.DEF;
                attrValueColor = Color.DEF;
            }
            var obj = { viewHeight: viewHeight, amount: LangCVO.getContent("equip23", baseValue), amountColor: amountColor, attrValueColor: attrValueColor, attrValue: attrValue };
            content.push(obj);
        }
        if (!this._scroller.isInit) {
            this._scroller.initBtnListData(SuitAttrList, content, true);
            this._scroller.itemList.layout.gap = 5;
        }
        else
            this._scroller.dataProvider(content);
        this._item.clear();
        var level = 0;
        for (var i = 0; i < list.length; i++) {
            if (list[i].pos == this._curItemIndex + 1) {
                level = list[i].level + 1;
                break;
            }
        }
        if (level <= EquipModel.SUIT_MAX_LEVEL) {
            var upgradeInfo = SuitCVO.getSuitUpgradeInfo((level > 0 ? level : 1), this._curItemIndex + 1);
            if (upgradeInfo) {
                this._item.baseId = upgradeInfo.loss.baseId;
                this._item.bind = upgradeInfo.loss.bind;
                var count = Manager.model.getItems().getCountItemById(upgradeInfo.loss.baseId);
                this._item.itemAmount(count, upgradeInfo.loss.num);
            }
        }
    };
    SuitView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._suitBtn1:
                var list = Manager.model.getEquip().equipSuitAttackList;
                var count = 0;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].level > 0)
                        count += 1;
                }
                if (count == 0)
                    FloatTips.addTips(LangCVO.getContent("equip27", LangCVO.getContent("equip20")), Color.RED);
                else
                    Manager.view.show(78 /* SuitAllAttrView */, 2);
                break;
            case this._suitBtn2:
                var list2 = Manager.model.getEquip().equipSuitDefenseList;
                var count2 = 0;
                for (var i = 0; i < list2.length; i++) {
                    if (list2[i].level > 0)
                        count2 += 1;
                }
                if (count2 == 0)
                    FloatTips.addTips(LangCVO.getContent("equip27", LangCVO.getContent("equip21")), Color.RED);
                else
                    Manager.view.show(78 /* SuitAllAttrView */, 1);
                break;
            case this._btn1:
                if (this._item.totalAmount < this._item.curAmount)
                    FloatTips.addTips(LangCVO.getContent("equip26"), Color.RED);
                else
                    Manager.control.getEquip().suitUpgrade(this._curItemIndex + 1);
                break;
            case this._btn2:
                if (this._curSuitLevel > 0)
                    Manager.view.show(79 /* SuitDisassemblyTips */, this._curItemIndex + 1, this._curSuitLevel);
                else
                    FloatTips.addTips(LangCVO.getContent("equip29"), Color.RED);
                break;
        }
    };
    SuitView.prototype.reuse = function (thisParent) {
        _super.prototype.reuse.call(this);
        this._thisParent = thisParent;
    };
    SuitView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._leftBgImg, this._bgImg);
        this._thisParent = null;
        this._equipGroup = null;
        if (this._equipList) {
            for (var i = 0; i < this._equipList.length; i++) {
                this._equipList[i].dispose();
                this._equipList[i] = null;
            }
            this._equipList = null;
        }
        this._fighting = null;
        if (this._item)
            this._item.dispose();
        this._item = null;
        this._jiaImg = null;
        if (this._suitName)
            this._suitName.dispose();
        this._suitName = null;
        if (this._suitAmount)
            this._suitAmount.dispose();
        this._suitAmount = null;
        if (this._equipName)
            this._equipName.dispose();
        this._equipName = null;
        if (this._scroller)
            this._scroller.dispose();
        this._scroller = null;
        if (this._suitBtn1)
            this._suitBtn1.dispose();
        this._suitBtn1 = null;
        if (this._suitBtn2)
            this._suitBtn2.dispose();
        this._suitBtn2 = null;
        if (this._btn1)
            this._btn1.dispose();
        this._btn1 = null;
        if (this._btn2)
            this._btn2.dispose();
        this._btn2 = null;
        if (this._suitNum)
            Manager.pool.push(this._suitNum);
        this._suitNum = null;
        if (this._fightNum)
            Manager.pool.push(this._fightNum);
        this._fightNum = null;
        this._equipDataList = null;
        if (this._leftBgImg)
            Manager.pool.push(this._leftBgImg);
        this._leftBgImg = null;
        if (this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
    };
    return SuitView;
}(UIComponent));
//# sourceMappingURL=SuitView.js.map