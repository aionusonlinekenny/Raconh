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
     * 背包道具Control
     */
var ItemsControl = (function (_super) {
    __extends(ItemsControl, _super);
    function ItemsControl() {
        return _super.call(this) || this;
    }
    ItemsControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.GOODS_QUERY_INFO, ItemsQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_ADD_ITEM_RETURN, AddItemReturnCMD);
        Manager.socket.addCMD(Protocol.CMD_DIELETE_ITEM, DeleteItemCMD);
        Manager.socket.addCMD(Protocol.CMD_DIELETE_ITEM_REUTNR, DeleteItemReturnCMD);
        Manager.socket.addCMD(Protocol.CMD_MOVE_ITEM, MoveItemsCMD);
        Manager.socket.addCMD(Protocol.CMD_UPDATE_ITEM_RETURN, UpdateItemReturnCMD);
        Manager.socket.addCMD(Protocol.CMD_USE_ITEM, UseItemCMD);
    };
    /**
     * 道具查询
     */
    ItemsControl.prototype.itemsQuery = function (value) {
        var cmd = Manager.socket.getCMD(Protocol.GOODS_QUERY_INFO);
        cmd.type = value;
        cmd.send();
    };
    /**
    * 删除物品
    */
    ItemsControl.prototype.deleteItems = function (value, id) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_DIELETE_ITEM);
        cmd.type = value;
        cmd.id = id;
        cmd.send();
    };
    /**
    * 使用背包物品
    */
    ItemsControl.prototype.useItems = function (id, value, baseid) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_USE_ITEM);
        cmd.count = value;
        cmd.id = id;
        cmd.base_id = baseid;
        cmd.send();
    };
    /**
    * 存储空间转移物品到另一个存储空间
    */
    ItemsControl.prototype.moveItems = function (value, value1, pos) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_MOVE_ITEM);
        cmd.type1 = value;
        cmd.type2 = value1;
        cmd.pos = pos;
        cmd.send();
    };
    return ItemsControl;
}(BaseControl));
__reflect(ItemsControl.prototype, "ItemsControl");
//# sourceMappingURL=ItemsControl.js.map