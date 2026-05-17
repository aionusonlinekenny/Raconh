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
 * 银币副本小面板信息
 * luzhihong
 * create 2018.1.20
 */
var CopySilverMiniCMD = /** @class */ (function (_super) {
    __extends(CopySilverMiniCMD, _super);
    function CopySilverMiniCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_SILVER_MINI;
        return _this;
    }
    CopySilverMiniCMD.prototype.receive = function (pi) {
        // array('name' => 'ratio', 'type' => 'int16', 'desc' => '加成'),
        // array('name' => 'coin', 'type' => 'int32', 'desc' => '银币'),
        // array('name' => 'gold', 'type' => 'int32', 'desc' => '元宝'),
        var obj = {};
        // obj["kills"] = pi.readShort();
        obj["rate"] = pi.readShort();
        obj["silver"] = pi.readInt();
        obj["gold"] = pi.readInt();
        Manager.model.getCopy().silverModel.dispatchEvent(new CopyEvent(CopyEvent.SILVER_MINI, obj));
    };
    return CopySilverMiniCMD;
}(BaseCMD));
//# sourceMappingURL=CopySilverMiniCMD.js.map