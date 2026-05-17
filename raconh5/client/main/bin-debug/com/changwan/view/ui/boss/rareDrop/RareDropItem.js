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
 * 珍希掉落item
 * pzx
 * create 18.2.1
 */
var RareDropItem = (function (_super) {
    __extends(RareDropItem, _super);
    function RareDropItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("boss/rareDrop", "RareDropItemSkin");
        return _this;
    }
    RareDropItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.addEvent();
    };
    RareDropItem.prototype.addEvent = function () {
        this._descTxt.addEventListener(egret.TextEvent.LINK, this.linkShopTips, this);
    };
    RareDropItem.prototype.removeEvent = function () {
        this._descTxt.removeEventListener(egret.TextEvent.LINK, this.linkShopTips, this);
    };
    RareDropItem.prototype.linkShopTips = function () {
        var info = this.data.item;
        var cvo = info.cvo;
        if (cvo) {
            if (cvo.group == 1) {
                Manager.view.show(20 /* BagEquipTips */, info);
            }
            else {
                Manager.view.show(9 /* ItemsTips */, info);
            }
        }
    };
    RareDropItem.prototype.dataChanged = function () {
        var cnof = this.data;
        var monCvo = MonsterCVO.getCVO(cnof.mon_id);
        var date = cw.DateUtil.getDateBySecs(cnof.time);
        var time = date.getUTCFullYear() + LangCVO.getContent("common43") + (date.getUTCMonth() + 1) + LangCVO.getContent("common44") + date.getDate() + LangCVO.getContent("common45") + date.getHours() + LangCVO.getContent("common46") + date.getUTCMinutes() + LangCVO.getContent("common47");
        this._timeTxt.text = monCvo.getBossTypeDesc() + time;
        var str = LangCVO.getContent("boss17");
        var itemCvo = cnof.item.cvo;
        str = StringUtils.setParam(str, cnof.name, monCvo.level, monCvo.name);
        var itemName = HtmlUtil.addColorTag(itemCvo.name, itemCvo.colorStr);
        itemName = HtmlUtil.addATag(HtmlUtil.addUTag(itemName), "link");
        str = str + itemName;
        HtmlUtil.setTextFlow(this._descTxt, str);
    };
    RareDropItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.removeEvent();
        this._descTxt.dispose();
        this._timeTxt.dispose();
    };
    return RareDropItem;
}(ItemRenderer));
__reflect(RareDropItem.prototype, "RareDropItem");
//# sourceMappingURL=RareDropItem.js.map