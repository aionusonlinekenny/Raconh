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
 * 进入挑战区协议
 * luzhihong
 * create 2018.2.1
 */
var ClubBFEnterDoorCMD = (function (_super) {
    __extends(ClubBFEnterDoorCMD, _super);
    function ClubBFEnterDoorCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_BF_ENTER_DOOR;
        return _this;
    }
    ClubBFEnterDoorCMD.prototype.processOut = function (pkg) {
        // array('name' => 'type', 'type' => 'int8', 'desc' => '是否进入挑战区：0否，1是'),
        pkg.writeByte(this.isEnter ? 1 : 0);
    };
    ClubBFEnterDoorCMD.prototype.receive = function (pi) {
        // array('name' => 'type', 'type' => 'int8', 'desc' => '是否在挑战区：0否，1是'),
        Manager.model.getClubBF().hasEnterChallengeArea = pi.readByte() != 0;
    };
    return ClubBFEnterDoorCMD;
}(BaseCMD));
__reflect(ClubBFEnterDoorCMD.prototype, "ClubBFEnterDoorCMD");
//# sourceMappingURL=ClubBFEnterDoorCMD.js.map