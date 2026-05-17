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
var EquipRonglianCMD = /** @class */ (function (_super) {
    __extends(EquipRonglianCMD, _super);
    function EquipRonglianCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.EQUIP_RONGLIAN;
        return _this;
    }
    EquipRonglianCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.list.length);
        for (var i = 0; i < this.list.length; i++)
            pkg.writeInt64(this.list[i].id);
    };
    EquipRonglianCMD.prototype.receive = function (pi) {
        var list = [];
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var info = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte() == 1 ? true : false;
            info.quantity = pi.readInt();
            list.push(info);
        }
        Manager.model.getItems().dispatchEventWith(ItemsEvent.EQUIP_RONGLIAN_UPDATE_EVENT, false, list);
    };
    return EquipRonglianCMD;
}(BaseCMD));
//# sourceMappingURL=EquipRonglianCMD.js.map