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
/**
 * 宗门修改公告
 */
var ClubAlterCMD = /** @class */ (function (_super) {
    __extends(ClubAlterCMD, _super);
    function ClubAlterCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_ALTER;
        return _this;
    }
    ClubAlterCMD.prototype.processOut = function (pkg) {
        pkg.writeUTF(this.desc);
    };
    ClubAlterCMD.prototype.receive = function (pi) {
        var desc = pi.readUTF();
        Manager.model.getClub().clubInfo.desc = desc;
        Manager.model.getClub().dispatchEvent(new ClubEvent(ClubEvent.UPDATE_CLUB_NOTICE));
    };
    return ClubAlterCMD;
}(BaseCMD));
//# sourceMappingURL=ClubAlterCMD.js.map