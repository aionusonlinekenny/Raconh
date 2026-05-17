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
var LairdInfoCMD = /** @class */ (function (_super) {
    __extends(LairdInfoCMD, _super);
    function LairdInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_LAIRD_INFO;
        return _this;
    }
    LairdInfoCMD.prototype.processOut = function (pkg) {
        // pkg.writeByte(this.trainingType);
    };
    LairdInfoCMD.prototype.receive = function (pi) {
        var info = Manager.model.getLaird().lairdRoleInfo;
        info.catchCount = pi.readByte();
        info.rescueCount = pi.readByte();
        info.interactCount = pi.readByte();
        info.seekHelpCount = pi.readByte();
        info.interactTimes = pi.readInt();
        Manager.model.getLaird().dispatchEvent(new LairdEvent(LairdEvent.LAIRD_INFO_UPDATE));
    };
    return LairdInfoCMD;
}(BaseCMD));
//# sourceMappingURL=LairdInfoCMD.js.map