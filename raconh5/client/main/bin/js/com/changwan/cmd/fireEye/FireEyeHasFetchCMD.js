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
 * 火眼金睛已领取的奖励数据
 * liangyan
 * create 2018-03-27
*/
var FireEyeHasFetchCMD = /** @class */ (function (_super) {
    __extends(FireEyeHasFetchCMD, _super);
    function FireEyeHasFetchCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FIRE_EYE_HAS_FETCH;
        return _this;
    }
    FireEyeHasFetchCMD.prototype.receive = function (pi) {
        var count = pi.readShort();
        var model = Manager.model.getFireEye();
        model.fetchedRewards = [];
        while (count > 0) {
            model.fetchedRewards.push(pi.readByte());
            count--;
        }
        Manager.model.getFireEye().dispatchEvent(new FireEyeEvent(FireEyeEvent.FIRE_EYE_UPDATE_REWARDS));
    };
    return FireEyeHasFetchCMD;
}(BaseCMD));
//# sourceMappingURL=FireEyeHasFetchCMD.js.map