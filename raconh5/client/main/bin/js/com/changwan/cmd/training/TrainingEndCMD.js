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
 * 传功结束
 *  */
var TrainingEndCMD = /** @class */ (function (_super) {
    __extends(TrainingEndCMD, _super);
    function TrainingEndCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_TRAINING_PUSH_END;
        return _this;
    }
    TrainingEndCMD.prototype.receive = function (pi) {
        var trainingType = pi.readByte();
        var data = { trainingType: trainingType, list: [] };
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var itemId = pi.readInt();
            var bind = pi.readByte();
            var quantity = pi.readInt();
            data.list.push({ itemId: itemId, bind: bind, quantity: quantity });
        }
        Manager.model.getTraining().updateActivityEnd();
        Manager.view.show(83 /* ChuangongScussView */, data);
    };
    return TrainingEndCMD;
}(BaseCMD));
//# sourceMappingURL=TrainingEndCMD.js.map