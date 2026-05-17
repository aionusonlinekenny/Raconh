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
var LairdInteractCMD = /** @class */ (function (_super) {
    __extends(LairdInteractCMD, _super);
    function LairdInteractCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_LAIRD_INTERACT;
        return _this;
    }
    LairdInteractCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.type);
        pkg.writeInt64(this.targetId);
    };
    LairdInteractCMD.prototype.receive = function (pi) {
        var interactCount = pi.readByte();
        var interactTimes = pi.readInt();
        Manager.model.getLaird().lairdRoleInfo.interactCount = interactCount;
        Manager.model.getLaird().lairdRoleInfo.interactTimes = interactTimes;
        Manager.model.getLaird().dispatchEvent(new LairdEvent(LairdEvent.LAIRD_INFO_UPDATE));
        var list = [];
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var info = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte() == 1 ? true : false;
            info.quantity = pi.readInt();
            list.push(info);
        }
        Manager.control.getDrop().showAlert(list);
    };
    return LairdInteractCMD;
}(BaseCMD));
//# sourceMappingURL=LairdInteractCMD.js.map