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
var EquipOneKeyCMD = (function (_super) {
    __extends(EquipOneKeyCMD, _super);
    function EquipOneKeyCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.EQUIP_ONEKEY;
        return _this;
    }
    EquipOneKeyCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.list.length);
        for (var i = 0; i < this.list.length; i++)
            pkg.writeInt64(this.list[i].id);
    };
    EquipOneKeyCMD.prototype.receive = function (pi) {
        // Manager.control.getItems().itemsQuery(ItemsType.EQUIE);
        Manager.model.getItems().dispatchEvent(new ItemsEvent(ItemsEvent.ITEM_UPDATE_EVENT));
        Manager.model.getItems().dispatchEvent(new ItemsEvent(ItemsEvent.EQUIP_UPDATE_EVENT));
    };
    return EquipOneKeyCMD;
}(BaseCMD));
__reflect(EquipOneKeyCMD.prototype, "EquipOneKeyCMD");
//# sourceMappingURL=EquipOneKeyCMD.js.map