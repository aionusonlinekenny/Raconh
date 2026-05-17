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
//存储空间转移物品到另一个存储空间
var MoveItemsCMD = /** @class */ (function (_super) {
    __extends(MoveItemsCMD, _super);
    function MoveItemsCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_MOVE_ITEM;
        return _this;
    }
    MoveItemsCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.type1);
        pkg.writeInt(this.pos);
        pkg.writeByte(this.type2);
    };
    MoveItemsCMD.prototype.receive = function (pi) {
        Manager.model.getItems().dispatchEventWith(ItemsEvent.EQUIP_UPDATE_EVENT);
    };
    return MoveItemsCMD;
}(BaseCMD));
//# sourceMappingURL=MoveItemsCMD.js.map