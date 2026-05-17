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
 *author Anydo
 *create 2018-1-2
 *description
*/
var ArenaMaxRankAwardCMD = (function (_super) {
    __extends(ArenaMaxRankAwardCMD, _super);
    function ArenaMaxRankAwardCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.ARENA_MAX_RANK_AWARD;
        return _this;
    }
    ArenaMaxRankAwardCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.id);
    };
    ArenaMaxRankAwardCMD.prototype.receive = function (pi) {
        Manager.model.getArena().updateMaxRankAward(pi);
    };
    return ArenaMaxRankAwardCMD;
}(BaseCMD));
__reflect(ArenaMaxRankAwardCMD.prototype, "ArenaMaxRankAwardCMD");
//# sourceMappingURL=ArenaMaxRankAwardCMD.js.map