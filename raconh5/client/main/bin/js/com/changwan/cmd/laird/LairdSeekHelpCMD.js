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
var LairdSeekHelpCMD = /** @class */ (function (_super) {
    __extends(LairdSeekHelpCMD, _super);
    function LairdSeekHelpCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_LAIRD_SEEK_HELP;
        return _this;
    }
    LairdSeekHelpCMD.prototype.processOut = function (pkg) {
        pkg.writeInt64(this.targetId);
    };
    LairdSeekHelpCMD.prototype.receive = function (pi) {
        var seekHelpCount = pi.readByte();
        Manager.model.getLaird().lairdRoleInfo.seekHelpCount = seekHelpCount;
        Manager.model.getLaird().dispatchEvent(new LairdEvent(LairdEvent.LAIRD_SEEK_HELP_UPDATE));
    };
    return LairdSeekHelpCMD;
}(BaseCMD));
//# sourceMappingURL=LairdSeekHelpCMD.js.map