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
 * 宗主数据更新
 */
var ClubRecommendCMD = (function (_super) {
    __extends(ClubRecommendCMD, _super);
    function ClubRecommendCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_RECOMMEND;
        return _this;
    }
    ClubRecommendCMD.prototype.receive = function (pi) {
        var list = [];
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var info = Manager.pool.create(ClubRecommendInfo);
            info.clubId = pi.readInt64();
            info.clubType = pi.readByte();
            info.playerCount = pi.readInt();
            list.push(info);
        }
        Manager.model.getClub().updateChooseClubInfo(list);
    };
    return ClubRecommendCMD;
}(BaseCMD));
__reflect(ClubRecommendCMD.prototype, "ClubRecommendCMD");
//# sourceMappingURL=ClubRecommendCMD.js.map