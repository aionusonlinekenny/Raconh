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
 * 福利活动图标
 * pzx
 * create 2018-3-7
 * @update  devil 2018-04-16
*/
var CashCowIcon2 = /** @class */ (function (_super) {
    __extends(CashCowIcon2, _super);
    function CashCowIcon2(imageContainer01, imageContainer, container1) {
        return _super.call(this, imageContainer01, imageContainer, container1) || this;
    }
    CashCowIcon2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getcashCow().addEventListener(CashCowEvent.CASHCOW_UPDATE_EVENT, this.__drawRed, this);
        Manager.model.getcashCow().sevenDaysModel.addEventListener(CashCowEvent.SEVENDAYS_REWARD_EVENT, this.__drawRed, this);
        Manager.model.getSysnotice().addEventListener(SysnoticeEvent.UPD_NOTICE_EVENT, this.__drawRed, this);
        Manager.model.getQiandao().addEventListener(QiandaoEvent.QIANDAO_INFO_UPDATE, this.__drawRed, this);
        Manager.model.getQiandao().addEventListener(QiandaoEvent.QIANDAO_SIGN_UPDATE, this.__drawRed, this);
    };
    CashCowIcon2.prototype.removeEvent = function () {
        Manager.model.getcashCow().removeEventListener(CashCowEvent.CASHCOW_UPDATE_EVENT, this.__drawRed, this);
        Manager.model.getcashCow().sevenDaysModel.removeEventListener(CashCowEvent.SEVENDAYS_REWARD_EVENT, this.__drawRed, this);
        Manager.model.getSysnotice().removeEventListener(SysnoticeEvent.UPD_NOTICE_EVENT, this.__drawRed, this);
        Manager.model.getQiandao().removeEventListener(QiandaoEvent.QIANDAO_INFO_UPDATE, this.__drawRed, this);
        Manager.model.getQiandao().removeEventListener(QiandaoEvent.QIANDAO_SIGN_UPDATE, this.__drawRed, this);
        _super.prototype.removeEvent.call(this);
    };
    CashCowIcon2.prototype.hasRedIcon = function () {
        var boo = Manager.model.getcashCow().checkRewardCd()
            || Manager.model.getcashCow().sevenDaysModel.checkSeverDaysReward() || !UpdNoticCVO.cvo().isReward || Manager.model.getQiandao().getTodayCanGet();
        return boo;
    };
    return CashCowIcon2;
}(ActBaseIcon2));
//# sourceMappingURL=CashCowIcon2.js.map