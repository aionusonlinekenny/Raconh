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
 * 准备进行传功
 *  */
var TrainingPrepareCMD = /** @class */ (function (_super) {
    __extends(TrainingPrepareCMD, _super);
    function TrainingPrepareCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_TRAINING_PREPARE;
        return _this;
    }
    TrainingPrepareCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.trainingType);
    };
    TrainingPrepareCMD.prototype.receive = function (pi) {
        var trainingType = pi.readByte();
        var posId = pi.readShort();
        Manager.model.getTraining().updateTrainingType(trainingType, posId);
    };
    return TrainingPrepareCMD;
}(BaseCMD));
//# sourceMappingURL=TrainingPrepareCMD.js.map