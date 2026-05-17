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
 * 活动结束前10秒倒计时
 * liangyan
 * create 2017-12-26
*/
var ActivityEndCMD = /** @class */ (function (_super) {
    __extends(ActivityEndCMD, _super);
    function ActivityEndCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.ACTIVITY_END;
        return _this;
    }
    ActivityEndCMD.prototype.receive = function (pi) {
    };
    return ActivityEndCMD;
}(BaseCMD));
//# sourceMappingURL=ActivityEndCMD.js.map