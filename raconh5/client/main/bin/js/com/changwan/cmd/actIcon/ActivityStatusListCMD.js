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
 * 活动状态列表 上线的时候发
 * liangyan
 * create 2017-12-26
*/
var ActivityStatusListCMD = /** @class */ (function (_super) {
    __extends(ActivityStatusListCMD, _super);
    function ActivityStatusListCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.ACTIVITY_LIST_UPDATE;
        return _this;
    }
    ActivityStatusListCMD.prototype.receive = function (pi) {
        var count = pi.readShort();
        var id;
        var status;
        var leftTime;
        var cvo;
        var flag = false;
        while (count > 0) {
            id = pi.readShort();
            status = pi.readByte();
            leftTime = pi.readInt();
            cvo = DailyActivityCVO.getCVO(id);
            if (cvo) {
                if (!(status == DailyActivityCVO.STATE_IN && leftTime <= 0)) {
                    cvo.setTime(status, leftTime);
                    flag = true;
                }
            }
            count--;
        }
        if (flag)
            Manager.model.getActIcon().dispatchEvent(new ActIconEvent(ActIconEvent.LIST_UPDATE));
    };
    return ActivityStatusListCMD;
}(BaseCMD));
//# sourceMappingURL=ActivityStatusListCMD.js.map