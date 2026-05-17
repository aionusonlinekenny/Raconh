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
var ItemsQueryCMD = (function (_super) {
    __extends(ItemsQueryCMD, _super);
    function ItemsQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.GOODS_QUERY_INFO;
        return _this;
    }
    ItemsQueryCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.type);
    };
    ItemsQueryCMD.prototype.receive = function (pi) {
        Manager.model.getItems().queryItemsList(pi);
    };
    return ItemsQueryCMD;
}(BaseCMD));
__reflect(ItemsQueryCMD.prototype, "ItemsQueryCMD");
//# sourceMappingURL=ItemsQueryCMD.js.map