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
 * 宗门职位福利
 */
var ClubSalaryCMD = (function (_super) {
    __extends(ClubSalaryCMD, _super);
    function ClubSalaryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_SALARY;
        return _this;
    }
    ClubSalaryCMD.prototype.receive = function (pi) {
        Manager.model.getClub().clubInfo.isGetReward = 1;
        Manager.model.getClub().dispatchEvent(new ClubEvent(ClubEvent.UPDATE_CLUB_INFO));
    };
    return ClubSalaryCMD;
}(BaseCMD));
__reflect(ClubSalaryCMD.prototype, "ClubSalaryCMD");
//# sourceMappingURL=ClubSalaryCMD.js.map