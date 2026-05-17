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
 * 查询
 *  */
var ShopQueryCMD = /** @class */ (function (_super) {
    __extends(ShopQueryCMD, _super);
    function ShopQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_SHOP_QUEYT;
        return _this;
    }
    ShopQueryCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.type);
    };
    ShopQueryCMD.prototype.receive = function (ip) {
        var type = ip.readByte();
        var ln = ip.readShort();
        var dic = new Dictionary();
        for (var i = 0; i < ln; i++) {
            var itemId = ip.readInt();
            var num = ip.readShort();
            dic.add(itemId, num);
        }
        Manager.model.getShop().queryList(type, dic);
    };
    return ShopQueryCMD;
}(BaseCMD));
//# sourceMappingURL=ShopQueryCMD.js.map