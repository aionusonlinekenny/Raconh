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
 * 经验副本信息协议
 * luzhihong
 * create 2018.1.12
 */
var CopyExpInfoCMD = /** @class */ (function (_super) {
    __extends(CopyExpInfoCMD, _super);
    function CopyExpInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_EXP_INFO;
        return _this;
    }
    CopyExpInfoCMD.prototype.receive = function (pi) {
        // array('name' => 'enter_cnt', 'type' => 'int8', 'desc' => '已挑战次数'),
        // array('name' => 'buy_cnt', 'type' => 'int8', 'desc' => '已购买次数'),
        // array('name' => 'enter_ts', 'type' => 'int32', 'desc' => '下次可进入时间戳(秒)'),
        var enterCount = pi.readByte();
        var buyCount = pi.readByte();
        var nextTime = pi.readInt();
        var scoreID = pi.readByte();
        var hardLvl = pi.readByte();
        Manager.model.getCopy().setBuyCount(CopyConst.TYPE_EXP, buyCount);
        Manager.model.getCopy().expModel.setInfos(enterCount, nextTime, scoreID, hardLvl);
    };
    return CopyExpInfoCMD;
}(BaseCMD));
//# sourceMappingURL=CopyExpInfoCMD.js.map