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
 * 传功进行确认
 *  */
var TrainingCommitCMD = /** @class */ (function (_super) {
    __extends(TrainingCommitCMD, _super);
    function TrainingCommitCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_TRAINING_COMMIT;
        return _this;
    }
    TrainingCommitCMD.prototype.receive = function (pi) {
        var list = [];
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var itemInfo = new ItemsModelInfo();
            itemInfo.base_id = pi.readInt();
            itemInfo.bind = pi.readByte() == 1 ? true : false;
            itemInfo.quantity = pi.readInt();
            list.push(itemInfo);
        }
        Manager.control.getDrop().showAlert(list);
    };
    return TrainingCommitCMD;
}(BaseCMD));
//# sourceMappingURL=TrainingCommitCMD.js.map