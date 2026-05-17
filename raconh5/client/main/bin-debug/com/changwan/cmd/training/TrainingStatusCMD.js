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
 * Simon
 * 18.1.12
 * 传功状态数据
 *  */
var TrainingStatusCMD = (function (_super) {
    __extends(TrainingStatusCMD, _super);
    function TrainingStatusCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_TRAINING_PUSH_STATUS;
        return _this;
    }
    TrainingStatusCMD.prototype.receive = function (pi) {
        var trainingType = pi.readByte();
        var trainingEndTime = pi.readInt();
        var posId = pi.readShort();
        Manager.model.getTraining().updateStatus(trainingType, trainingEndTime, posId);
    };
    return TrainingStatusCMD;
}(BaseCMD));
__reflect(TrainingStatusCMD.prototype, "TrainingStatusCMD");
//# sourceMappingURL=TrainingStatusCMD.js.map