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
var ArenaPKCountCMD = /** @class */ (function (_super) {
    __extends(ArenaPKCountCMD, _super);
    function ArenaPKCountCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.ARENA_PK_COUNT;
        return _this;
    }
    ArenaPKCountCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.flag);
    };
    ArenaPKCountCMD.prototype.receive = function (pi) {
        Manager.model.getArena().updatePKCount(pi);
    };
    return ArenaPKCountCMD;
}(BaseCMD));
//# sourceMappingURL=ArenaPKCountCMD.js.map