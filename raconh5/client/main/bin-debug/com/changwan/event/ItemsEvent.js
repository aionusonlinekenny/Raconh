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
var ItemsEvent = (function (_super) {
    __extends(ItemsEvent, _super);
    function ItemsEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //物品更新
    ItemsEvent.ITEM_UPDATE_EVENT = "ITEM_UPDATE_EVENT";
    //装备更新
    ItemsEvent.EQUIP_UPDATE_EVENT = "EQUIP_UPDATE_EVENT";
    //装备强化更新
    ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT = "EQUIP_STRENGTHEN_UPDATE_EVENT";
    //熔炼获得物品更新
    ItemsEvent.EQUIP_RONGLIAN_UPDATE_EVENT = "EQUIP_RONGLIAN_UPDATE_EVENT";
    //一键装备获得物品更新
    ItemsEvent.ONEKEY_UPGRADE_EQUIP_LIST = "ONEKEY_UPGRADE_EQUIP_LIST";
    return ItemsEvent;
}(BaseEvent));
__reflect(ItemsEvent.prototype, "ItemsEvent");
//# sourceMappingURL=ItemsEvent.js.map