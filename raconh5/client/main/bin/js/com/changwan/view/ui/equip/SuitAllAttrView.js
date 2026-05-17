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
 * 套装总体属性
 * Simon
 * 2018.1.6
 */
var SuitAllAttrView = /** @class */ (function (_super) {
    __extends(SuitAllAttrView, _super);
    function SuitAllAttrView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("equip", "SuitAllAttrViewSkin");
        _this.visible = false;
        return _this;
    }
    SuitAllAttrView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.visible = true;
        this.onResizeHandler(null);
    };
    SuitAllAttrView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    SuitAllAttrView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        if (this._closeBtn)
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    SuitAllAttrView.prototype.onResizeHandler = function (e) {
        this.width = Manager.global.gameMain.stage.stageWidth;
        this.height = Manager.global.gameMain.stage.stageHeight;
    };
    SuitAllAttrView.prototype.onClickHandler = function (e) {
        Manager.view.hide(78 /* SuitAllAttrView */);
    };
    SuitAllAttrView.prototype.show = function (suitType) {
        Manager.layer.tipsLayer.addChild(this);
        if (suitType == 2) {
            this._bgImg.height = 450;
            this._scroller.height = 400;
        }
        if (suitType == 1) {
            this._bgImg.height = 510;
            this._scroller.height = 460;
        }
        this.updateAttrInfo(suitType);
    };
    SuitAllAttrView.prototype.updateAttrInfo = function (suitType) {
        var suitName = suitType == 1 ? LangCVO.getContent("equip21") : LangCVO.getContent("equip20");
        var list;
        var suitPosList;
        if (suitType == 1) {
            list = Manager.model.getEquip().equipSuitDefenseList;
            list.sort(this.sortByLevel);
            suitPosList = EquipModel.SUIT_DEFENSE_POS;
        }
        else {
            list = Manager.model.getEquip().equipSuitAttackList;
            list.sort(this.sortByLevel);
            suitPosList = EquipModel.SUIT_ATTACK_POS;
        }
        var levelList = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].level > 0 && levelList.indexOf(list[i].level) == -1) {
                levelList.push(list[i].level);
            }
        }
        var suitList;
        var countSuitList = [];
        var equipNameList = [];
        var attrList = [];
        var viewHeightList = [];
        for (var i = 0; i < levelList.length; i++) {
            suitList = [];
            for (var j = 0; j < list.length; j++) {
                if (levelList[i] == list[j].level) {
                    suitList.push(list[j].pos);
                }
            }
            countSuitList.push(suitList.length);
            var equipName = "";
            for (var i_1 = 0; i_1 < suitPosList.length; i_1++) {
                if (suitList.indexOf(suitPosList[i_1]) != -1)
                    equipName += "<font color='" + Color.toColorStr(Color.GREEN) + "'>" + LangCVO.getContent("equip" + suitPosList[i_1]) + "</font>  ";
                else
                    equipName += "<font color='" + Color.toColorStr(Color.DEF) + "'>" + LangCVO.getContent("equip" + suitPosList[i_1]) + "</font>  ";
            }
            equipNameList.push(equipName);
            var attrValue = "";
            var len = suitType == 1 ? 4 : 3;
            var viewHeight = 0;
            for (var j = 0; j < len; j++) {
                var baseValue = suitType == 1 ? j + 2 : j + 1;
                var info = SuitCVO.getSuitInfo(suitType, levelList[i], baseValue);
                if (info) {
                    if (baseValue <= suitList.length)
                        attrValue += "<font color='" + Color.GREEN + "'>";
                    else
                        attrValue += "<font color='" + Color.DEF + "'>";
                    attrValue += LangCVO.getContent("equip25", baseValue);
                    for (var k = 0; k < info.attrInfo.attrInfos.length; k++) {
                        if (k > 0)
                            attrValue += "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
                        else
                            attrValue += "\t";
                        attrValue += info.attrInfo.attrInfos[k].desc() + "\n";
                        viewHeight += 32;
                    }
                    attrValue += "</font>";
                }
            }
            attrList.push(attrValue);
            viewHeightList.push(viewHeight);
        }
        var content = [];
        for (var i = 0; i < equipNameList.length; i++) {
            var name_1 = LangCVO.getContent("equip24", "", levelList[i], suitName, countSuitList[i], suitPosList.length);
            content.push({ index: i, suitName: name_1, equipName: equipNameList[i], suitAttr: attrList[i], viewHeight: 160 + viewHeightList[i] });
        }
        if (!this._scroller.isInit) {
            this._scroller.initBtnListData(SuitAllAttrItem, content, true);
            this._scroller.itemList.layout.gap = 5;
        }
        else
            this._scroller.dataProvider(content);
    };
    SuitAllAttrView.prototype.sortByLevel = function (value1, value2) {
        if (value1.level > value2.level)
            return 1;
        else if (value1.level < value2.level)
            return -1;
        else
            return 0;
    };
    SuitAllAttrView.prototype.hide = function () {
        this.dispose();
    };
    SuitAllAttrView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._closeBtn)
            this._closeBtn.dispose();
        this._closeBtn = null;
        if (this._scroller)
            this._scroller.dispose();
        this._scroller = null;
    };
    return SuitAllAttrView;
}(UIComponent));
//# sourceMappingURL=SuitAllAttrView.js.map