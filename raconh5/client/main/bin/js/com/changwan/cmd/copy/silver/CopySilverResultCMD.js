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
 * 银币副本结算
 * luzhihong
 * create 2018.1.20
 */
var CopySilverResultCMD = /** @class */ (function (_super) {
    __extends(CopySilverResultCMD, _super);
    function CopySilverResultCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_SILVER_RESULT;
        return _this;
    }
    CopySilverResultCMD.prototype.receive = function (pi) {
        // array('name' => 'kill_count', 'type' => 'int16', 'desc' => '击杀数量'),
        // array('name' => 'ratio', 'type' => 'int16', 'desc' => '加成'),
        // array('name' => 'coin', 'type' => 'int32', 'desc' => '银币'),
        // array('name' => 'gold', 'type' => 'int32', 'desc' => '元宝'),
        var kills = pi.readShort();
        var rate = pi.readShort();
        var silver = pi.readInt();
        var gold = pi.readInt();
        Manager.view.show(87 /* CopySilverResultView */, kills, rate, silver, gold);
    };
    return CopySilverResultCMD;
}(BaseCMD));
//# sourceMappingURL=CopySilverResultCMD.js.map