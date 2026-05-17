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
var ArenaPKResultRobotCMD = /** @class */ (function (_super) {
    __extends(ArenaPKResultRobotCMD, _super);
    function ArenaPKResultRobotCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.ARENA_PK_RESULT_ROBOT;
        return _this;
    }
    ArenaPKResultRobotCMD.prototype.receive = function (pi) {
        Manager.model.getArena().playType = pi.readByte();
        Manager.model.getArena().updatePKData(pi, false);
    };
    return ArenaPKResultRobotCMD;
}(BaseCMD));
//# sourceMappingURL=ArenaPKResultRobotCMD.js.map