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
 * 活动结束前10秒倒计时
 * liangyan
 * create 2017-12-26
*/
var ActivityEndCMD = (function (_super) {
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
__reflect(ActivityEndCMD.prototype, "ActivityEndCMD");
//# sourceMappingURL=ActivityEndCMD.js.map