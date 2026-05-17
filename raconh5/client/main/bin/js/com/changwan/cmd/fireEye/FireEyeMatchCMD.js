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
 * 火眼金睛参与活动（进入匹配队列）
 * liangyan
 * create 2018-03-27
*/
var FireEyeMatchCMD = /** @class */ (function (_super) {
    __extends(FireEyeMatchCMD, _super);
    function FireEyeMatchCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FIRE_EYE_MATCH;
        return _this;
    }
    FireEyeMatchCMD.prototype.receive = function (pi) {
        Manager.view.show(105 /* ClubLeaderWarMatchingView */, ClubLeaderWarMatchingView.TYPE_FIRE_EYE);
    };
    return FireEyeMatchCMD;
}(BaseCMD));
//# sourceMappingURL=FireEyeMatchCMD.js.map