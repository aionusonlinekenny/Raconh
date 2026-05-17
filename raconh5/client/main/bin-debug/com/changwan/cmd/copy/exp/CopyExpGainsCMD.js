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
 * 经验副本经验更新协议
 * luzhihong
 * create 2018.1.12
 */
var CopyExpGainsCMD = (function (_super) {
    __extends(CopyExpGainsCMD, _super);
    function CopyExpGainsCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_EXP_GAINS;
        return _this;
    }
    CopyExpGainsCMD.prototype.receive = function (pi) {
        // array('name' => 'exp', 'type' => 'int32', 'desc' => '已获得的经验数'),
        Manager.model.getCopy().expModel.exp = pi.readInt();
    };
    return CopyExpGainsCMD;
}(BaseCMD));
__reflect(CopyExpGainsCMD.prototype, "CopyExpGainsCMD");
//# sourceMappingURL=CopyExpGainsCMD.js.map