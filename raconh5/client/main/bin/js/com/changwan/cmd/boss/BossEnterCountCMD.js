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
 * BOSS进入次数和恢复时间协议
 * luzhihong
 * create 2018.1.2
 */
var BossEnterCountCMD = /** @class */ (function (_super) {
    __extends(BossEnterCountCMD, _super);
    function BossEnterCountCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.BOSS_ENTER_COUNT;
        return _this;
    }
    BossEnterCountCMD.prototype.receive = function (pi) {
        Manager.model.getBoss().setNumAndTime(pi.readByte(), pi.readInt());
    };
    return BossEnterCountCMD;
}(BaseCMD));
//# sourceMappingURL=BossEnterCountCMD.js.map