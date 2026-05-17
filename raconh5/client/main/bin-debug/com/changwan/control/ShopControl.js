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
 * pzx
 * 17.11.28
     * 商Control
     */
var ShopControl = (function (_super) {
    __extends(ShopControl, _super);
    function ShopControl() {
        return _super.call(this) || this;
    }
    ShopControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_SHOP_BUY, ShopBuyCMD);
        Manager.socket.addCMD(Protocol.CMD_SHOP_QUEYT, ShopQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_TREASUREGARRET_QUERY, TreasureGarretQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_TREASUREGARRET_UPDATE, TreasureGarretUpdateCMD);
    };
    /**
     * 查询
     */
    ShopControl.prototype.query = function (type) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_SHOP_QUEYT);
        cmd.type = type;
        cmd.send();
    };
    ShopControl.prototype.buy = function (id, type, num) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_SHOP_BUY);
        cmd.id = id;
        cmd.num = num;
        cmd.send();
    };
    /**
     * 珍宝阁查询
     */
    ShopControl.prototype.treasureGarretQuery = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_TREASUREGARRET_QUERY);
        cmd.send();
    };
    /**
     * 珍宝阁刷新
     */
    ShopControl.prototype.treasureGarretUpdate = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_TREASUREGARRET_UPDATE);
        cmd.send();
    };
    return ShopControl;
}(BaseControl));
__reflect(ShopControl.prototype, "ShopControl");
//# sourceMappingURL=ShopControl.js.map