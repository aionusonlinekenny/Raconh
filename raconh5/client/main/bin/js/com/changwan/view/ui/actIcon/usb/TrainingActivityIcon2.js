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
 * 传功活动图标
 * Simon
 * create 2018-1-15
*/
var TrainingActivityIcon2 = /** @class */ (function (_super) {
    __extends(TrainingActivityIcon2, _super);
    function TrainingActivityIcon2(imageContainer01, imageContainer, container1) {
        return _super.call(this, imageContainer01, imageContainer, container1) || this;
    }
    TrainingActivityIcon2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getTraining().addEventListener(TrainingEvent.INFO_UPDATE, this.onInfoUpdateHandler, this);
    };
    TrainingActivityIcon2.prototype.removeEvent = function () {
        Manager.model.getTraining().removeEventListener(TrainingEvent.INFO_UPDATE, this.onInfoUpdateHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    TrainingActivityIcon2.prototype.onTouchHandler = function (e) {
        if (Manager.model.getTraining().info.isPlayed) {
            FloatTips.addTips(LangCVO.getContent("training8"), Color.RED);
            return;
        }
        if (Manager.model.getTraining().info.status == DailyActivityCVO.STATE_IN) {
            Manager.model.getTraining().isfindPoint = true;
            Manager.walk.moveTo(TrainingCVO.regionInfo.trainingPoint, null, null, MapConst.ID_HOME);
        }
        else {
            var info = DailyActivityCVO.getCVO(ActIconID.TRAINING);
            if (info)
                FloatTips.addTips(LangCVO.getContent("training1", info.timeDesc), Color.RED);
        }
    };
    TrainingActivityIcon2.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.onInfoUpdateHandler(null);
    };
    TrainingActivityIcon2.prototype.onInfoUpdateHandler = function (e) {
        this.setIsInTime(Manager.model.getTraining().info.status == DailyActivityCVO.STATE_IN);
    };
    return TrainingActivityIcon2;
}(ActBaseIcon2));
//# sourceMappingURL=TrainingActivityIcon2.js.map