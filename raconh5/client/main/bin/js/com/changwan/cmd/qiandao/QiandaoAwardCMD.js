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
 * drq
 * 签到阶段奖励CMD
 * 2018.3.23
 */
var QiandaoAwardCMD = /** @class */ (function (_super) {
    __extends(QiandaoAwardCMD, _super);
    function QiandaoAwardCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_DAILY_AWARD;
        return _this;
    }
    QiandaoAwardCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this._sec);
    };
    QiandaoAwardCMD.prototype.receive = function (pi) {
        var sec = pi.readByte();
        var state = pi.readByte();
        QiandaoGainCVO.getCvos()[sec - 1].isGet = true;
        Manager.model.getQiandao().setSecResult(sec, state);
        //Manager.model.getQiandao().dispatchEvent(new QiandaoEvent(QiandaoEvent.QIANDAO_AWARD_UPDATE));
        Manager.model.getQiandao().dispatchEvent(new QiandaoEvent(QiandaoEvent.QIANDAO_SCHEDULE_AWARD));
    };
    return QiandaoAwardCMD;
}(BaseCMD));
//# sourceMappingURL=QiandaoAwardCMD.js.map