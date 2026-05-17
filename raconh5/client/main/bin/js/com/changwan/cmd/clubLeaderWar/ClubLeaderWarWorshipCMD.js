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
 * 盟主战膜拜
 */
var ClubLeaderWarWorshipCMD = /** @class */ (function (_super) {
    __extends(ClubLeaderWarWorshipCMD, _super);
    function ClubLeaderWarWorshipCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_CLUB_LEADER_WAR_WORSHIP;
        return _this;
    }
    ClubLeaderWarWorshipCMD.prototype.processOut = function (pkg) {
        pkg.writeInt64(this.roleId);
    };
    return ClubLeaderWarWorshipCMD;
}(BaseCMD));
//# sourceMappingURL=ClubLeaderWarWorshipCMD.js.map