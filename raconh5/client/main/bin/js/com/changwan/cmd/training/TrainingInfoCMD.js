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
 * 传功信息
 *  */
var TrainingInfoCMD = /** @class */ (function (_super) {
    __extends(TrainingInfoCMD, _super);
    function TrainingInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_TRAINING_PUSH_INFO;
        return _this;
    }
    TrainingInfoCMD.prototype.receive = function (pi) {
        var isPlayed = pi.readByte() == 1;
        Manager.model.getTraining().updateInfo(isPlayed);
    };
    return TrainingInfoCMD;
}(BaseCMD));
//# sourceMappingURL=TrainingInfoCMD.js.map