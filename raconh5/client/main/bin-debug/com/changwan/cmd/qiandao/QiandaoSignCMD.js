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
 * drq
 * 日常签到、补签CMD
 * 2018.3.23
 */
var QiandaoSignCMD = (function (_super) {
    __extends(QiandaoSignCMD, _super);
    function QiandaoSignCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_DAILY_SIGN;
        return _this;
    }
    QiandaoSignCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this._day);
    };
    QiandaoSignCMD.prototype.receive = function (pi) {
        var day = pi.readByte();
        var state = pi.readByte();
        if (day == Manager.model.getQiandao().getToday()) {
            Manager.model.getQiandao().setTodayCanGet(false);
            var cashView = Manager.view.getView(84 /* CashCowPanel */);
            cashView.delQiandaoRedIcon();
        }
        Manager.model.getQiandao().setBuqian(day, state);
        Manager.model.getQiandao().dispatchEvent(new QiandaoEvent(QiandaoEvent.QIANDAO_SIGN_UPDATE));
        Manager.model.getQiandao().dispatchEvent(new QiandaoEvent(QiandaoEvent.QIANDAO_SCHEDULE_DAILY));
        Manager.model.getQiandao().dispatchEvent(new QiandaoEvent(QiandaoEvent.QIANDAO_SCHEDULE_AWARD));
    };
    return QiandaoSignCMD;
}(BaseCMD));
__reflect(QiandaoSignCMD.prototype, "QiandaoSignCMD");
//# sourceMappingURL=QiandaoSignCMD.js.map