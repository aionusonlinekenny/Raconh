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
 * 签到Event
 * 2018.3.23
 */
var QiandaoEvent = (function (_super) {
    __extends(QiandaoEvent, _super);
    function QiandaoEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QiandaoEvent.QIANDAO_INFO_UPDATE = "qiandaoInfoUpdate";
    QiandaoEvent.QIANDAO_SIGN_UPDATE = "qiandaoSignUpdate";
    //public static QIANDAO_AWARD_UPDATE:string = "qiandaoAwardUpdate";
    QiandaoEvent.QIANDAO_SCHEDULE_DAILY = "qiandaoScheduleDaily";
    QiandaoEvent.QIANDAO_SCHEDULE_AWARD = "qiandaoScheduleAward";
    return QiandaoEvent;
}(BaseEvent));
__reflect(QiandaoEvent.prototype, "QiandaoEvent");
//# sourceMappingURL=QiandaoEvent.js.map