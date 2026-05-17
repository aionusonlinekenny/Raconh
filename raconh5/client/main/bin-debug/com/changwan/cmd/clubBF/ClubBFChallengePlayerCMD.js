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
/**
 * 挑战玩家协议
 * luzhihong
 * create 2018.2.1
 */
var ClubBFChallengePlayerCMD = (function (_super) {
    __extends(ClubBFChallengePlayerCMD, _super);
    function ClubBFChallengePlayerCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_BF_CHALLENGE_PLAYER;
        return _this;
    }
    ClubBFChallengePlayerCMD.prototype.processOut = function (pkg) {
        // array('name' => 'type', 'type' => 'int8', 'desc' => '类型：0玩家，1机器人'),
        // array('name' => 'tar_id', 'type' => 'int64', 'desc' => '目标角色id'),
        pkg.writeByte(this.isRobot ? 1 : 0);
        pkg.writeInt64(this.id);
    };
    ClubBFChallengePlayerCMD.prototype.receive = function (pi) {
        var isRobot = pi.readByte() != 0;
        var id = pi.readInt64();
        Manager.control.getClubBF().showPKHead(id);
    };
    return ClubBFChallengePlayerCMD;
}(BaseCMD));
__reflect(ClubBFChallengePlayerCMD.prototype, "ClubBFChallengePlayerCMD");
//# sourceMappingURL=ClubBFChallengePlayerCMD.js.map