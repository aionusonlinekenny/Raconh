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
//使用背包物品
var UseItemCMD = /** @class */ (function (_super) {
    __extends(UseItemCMD, _super);
    function UseItemCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_USE_ITEM;
        return _this;
    }
    UseItemCMD.prototype.processOut = function (pkg) {
        pkg.writeInt(this.id);
        pkg.writeShort(this.count);
        pkg.writeInt(this.base_id);
    };
    UseItemCMD.prototype.receive = function (pi) {
        var useId = pi.readInt();
        var ln = pi.readShort();
        var arr = [];
        for (var i = 0; i < ln; i++) {
            var info = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte() == 1;
            info.quantity = pi.readInt();
            var l = pi.readShort();
            for (var j = 0; j < l; j++) {
                var exarr = new ExattrItemsinfo();
                exarr.type = pi.readShort();
                exarr.target = pi.readInt();
                exarr.value = pi.readInt();
                exarr.desc = pi.readUTF();
                info.infoList.push(exarr);
            }
            arr.push(info);
        }
        Manager.model.getItems().sueItemResultReturn(useId, arr);
    };
    return UseItemCMD;
}(BaseCMD));
//# sourceMappingURL=UseItemCMD.js.map