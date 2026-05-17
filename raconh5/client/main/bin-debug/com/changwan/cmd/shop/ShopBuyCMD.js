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
 *
 *  */
var ShopBuyCMD = (function (_super) {
    __extends(ShopBuyCMD, _super);
    function ShopBuyCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_SHOP_BUY;
        return _this;
    }
    ShopBuyCMD.prototype.processOut = function (pkg) {
        pkg.writeInt(this.id);
        pkg.writeShort(this.num);
    };
    ShopBuyCMD.prototype.receive = function (ip) {
        //let type:number = ip.readByte();
        var id = ip.readInt();
        var num = ip.readShort();
        var res = ip.readByte();
        Manager.model.getShop().buy(id, num, res);
    };
    return ShopBuyCMD;
}(BaseCMD));
__reflect(ShopBuyCMD.prototype, "ShopBuyCMD");
//# sourceMappingURL=ShopBuyCMD.js.map