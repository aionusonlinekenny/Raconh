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
 * 日常活动图标
 * liangyan
 * create 2017-12-28
* @update devil 2018-04-15
*/
var DailyActivityIcon2 = /** @class */ (function (_super) {
    __extends(DailyActivityIcon2, _super);
    function DailyActivityIcon2(imageContainer01, imageContainer, container1) {
        return _super.call(this, imageContainer01, imageContainer, container1) || this;
    }
    DailyActivityIcon2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getActivity().addEventListener(ActivityEvent.DAILY_SCHEDULE_UPDATE, this.__drawRed, this);
        Manager.model.getActivity().addEventListener(ActivityEvent.DAILY_UPDATE, this.__drawRed, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.__drawRed, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.FIGHT, this.__drawRed, this);
    };
    DailyActivityIcon2.prototype.removeEvent = function () {
        Manager.model.getActivity().removeEventListener(ActivityEvent.DAILY_SCHEDULE_UPDATE, this.__drawRed, this);
        Manager.model.getActivity().removeEventListener(ActivityEvent.DAILY_UPDATE, this.__drawRed, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.__drawRed, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.FIGHT, this.__drawRed, this);
        _super.prototype.removeEvent.call(this);
    };
    DailyActivityIcon2.prototype.hasRedIcon = function () {
        var towerModel = Manager.model.getCopy().towerModel;
        if (OpenCVO.isOpen(OpenConst.ID_JIUXIAOTA) && (towerModel.canSaodang || towerModel.canChallenge()))
            return true;
        if (ActivityCVO.hasCanget() || ActivityScheduleCVO.hasCanget())
            return true;
        return false;
    };
    return DailyActivityIcon2;
}(ActBaseIcon2));
//# sourceMappingURL=DailyActivityIcon2.js.map