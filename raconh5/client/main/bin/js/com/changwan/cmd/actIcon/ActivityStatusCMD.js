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
 * 活动状态 有改变的时候发
 * liangyan
 * create 2017-12-26
*/
var ActivityStatusCMD = /** @class */ (function (_super) {
    __extends(ActivityStatusCMD, _super);
    function ActivityStatusCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.ACTIVITY_UPDATE;
        return _this;
    }
    ActivityStatusCMD.prototype.receive = function (pi) {
        var id = pi.readShort(); //活动id
        var status = pi.readByte(); //状态
        var leftTime = pi.readInt(); //剩余时间
        var cvo = DailyActivityCVO.getCVO(id);
        if (cvo) {
            cvo.setTime(status, leftTime);
            Manager.model.getActIcon().dispatchEvent(new ActIconEvent(ActIconEvent.SINGLE_UPDATE, id));
        }
    };
    return ActivityStatusCMD;
}(BaseCMD));
//# sourceMappingURL=ActivityStatusCMD.js.map