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
var LairdPickExpCMD = (function (_super) {
    __extends(LairdPickExpCMD, _super);
    function LairdPickExpCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_LAIRD_PICK_EXP;
        return _this;
    }
    LairdPickExpCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.type);
        pkg.writeInt64(this.targetId);
    };
    LairdPickExpCMD.prototype.receive = function (pi) {
        var targetId = pi.readInt64();
        var workSec = pi.readInt();
        Manager.model.getLaird().updateCoolyInfo(targetId, workSec);
        var list = [];
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var info = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte() == 1 ? true : false;
            info.quantity = pi.readInt();
            list.push(info);
        }
        var isPickAll = pi.readByte();
        Manager.control.getDrop().showAlert(list);
        Manager.model.getLaird().dispatchEvent(new LairdEvent(LairdEvent.LAIRD_PICK_EXP_UPDATE));
    };
    return LairdPickExpCMD;
}(BaseCMD));
__reflect(LairdPickExpCMD.prototype, "LairdPickExpCMD");
//# sourceMappingURL=LairdPickExpCMD.js.map