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
 * 火眼金睛已匹配到玩家
 * liangyan
 * create 2018-03-26
*/
var FireEyeMatchSuccCMD = (function (_super) {
    __extends(FireEyeMatchSuccCMD, _super);
    function FireEyeMatchSuccCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FIRE_EYE_MATCH_SUCC;
        return _this;
    }
    FireEyeMatchSuccCMD.prototype.receive = function (pi) {
        Manager.view.getView(105 /* ClubLeaderWarMatchingView */).stop();
        Manager.control.getFireEye().askEnemyData();
    };
    return FireEyeMatchSuccCMD;
}(BaseCMD));
__reflect(FireEyeMatchSuccCMD.prototype, "FireEyeMatchSuccCMD");
//# sourceMappingURL=FireEyeMatchSuccCMD.js.map