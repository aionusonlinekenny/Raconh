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
 * 退出地图（挑战玩家/挑战boss/退出战场）协议
 * luzhihong
 * create 2018.2.1
 */
var ClubBFExitCMD = (function (_super) {
    __extends(ClubBFExitCMD, _super);
    function ClubBFExitCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_BF_EXIT;
        return _this;
    }
    return ClubBFExitCMD;
}(BaseCMD));
__reflect(ClubBFExitCMD.prototype, "ClubBFExitCMD");
//# sourceMappingURL=ClubBFExitCMD.js.map