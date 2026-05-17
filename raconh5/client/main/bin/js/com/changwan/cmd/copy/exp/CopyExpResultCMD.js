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
 * 经验副本结算协议
 * luzhihong
 * create 2018.1.12
 */
var CopyExpResultCMD = /** @class */ (function (_super) {
    __extends(CopyExpResultCMD, _super);
    function CopyExpResultCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_EXP_RESULT;
        return _this;
    }
    CopyExpResultCMD.prototype.receive = function (pi) {
        // array('name' => 'id', 'type' => 'int32', 'desc' => '副本ID'),
        // array('name' => 'used_time', 'type' => 'int32', 'desc' => '使用时间'),
        // array('name' => 'kill_cnt', 'type' => 'int16', 'desc' => '已击杀的怪物数量'),
        // array('name' => 'exp', 'type' => 'int32', 'desc' => '已获得的经验数'),
        var id = pi.readInt();
        var useTime = pi.readInt();
        var kills = pi.readShort();
        var exp = pi.readInt();
        Manager.view.show(72 /* CopyExpResultView */, useTime, kills, exp);
    };
    return CopyExpResultCMD;
}(BaseCMD));
//# sourceMappingURL=CopyExpResultCMD.js.map