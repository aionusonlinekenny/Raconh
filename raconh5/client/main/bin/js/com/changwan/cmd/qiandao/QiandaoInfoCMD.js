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
 * 签到信息请求CMD
 * 2018.3.23
 */
var QiandaoInfoCMD = /** @class */ (function (_super) {
    __extends(QiandaoInfoCMD, _super);
    function QiandaoInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_SIGH_INFO;
        return _this;
    }
    QiandaoInfoCMD.prototype.receive = function (pi) {
        //阶段列表
        var length = pi.readShort();
        for (var i = 0; i < length; i++) {
            var id = pi.readByte();
            var state = pi.readByte();
            QiandaoGainCVO.getCvos()[id - 1].isGet = true;
            Manager.model.getQiandao().setTotalList(id, state);
        }
        //每日列表
        var length2 = pi.readShort();
        for (var j = 0; j < length2; j++) {
            var days = pi.readByte();
            var state = pi.readByte();
            if (days == Manager.model.getQiandao().getToday()) {
                Manager.model.getQiandao().setTodayCanGet(false);
            }
            Manager.model.getQiandao().setDailyList(days, state);
        }
        //事件
        Manager.model.getQiandao().dispatchEvent(new QiandaoEvent(QiandaoEvent.QIANDAO_INFO_UPDATE));
    };
    return QiandaoInfoCMD;
}(BaseCMD));
//# sourceMappingURL=QiandaoInfoCMD.js.map