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
//删除物品
var DeleteItemCMD = (function (_super) {
    __extends(DeleteItemCMD, _super);
    function DeleteItemCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_DIELETE_ITEM;
        return _this;
    }
    DeleteItemCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.type);
        pkg.writeInt(this.id);
    };
    return DeleteItemCMD;
}(BaseCMD));
__reflect(DeleteItemCMD.prototype, "DeleteItemCMD");
//# sourceMappingURL=DeleteItemCMD.js.map