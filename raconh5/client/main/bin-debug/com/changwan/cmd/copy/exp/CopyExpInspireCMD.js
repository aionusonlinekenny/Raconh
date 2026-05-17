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
 * 经验副本鼓舞购买协议
 * luzhihong
 * create 2018.1.12
 */
var CopyExpInspireCMD = (function (_super) {
    __extends(CopyExpInspireCMD, _super);
    function CopyExpInspireCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_EXP_INSPIRE;
        return _this;
    }
    CopyExpInspireCMD.prototype.processOut = function (pkg) {
        // array('name' => 'type', 'type' => 'int8', 'desc' => '鼓舞类型(0铜币鼓舞，1元宝鼓舞)'),
        pkg.writeByte(this.type);
    };
    CopyExpInspireCMD.prototype.receive = function (pi) {
        // array('name' => 'inspire', 'type' => 'int16', 'desc' => '鼓舞加成'),
        Manager.model.getCopy().expModel.inspireRate = pi.readShort();
    };
    return CopyExpInspireCMD;
}(BaseCMD));
__reflect(CopyExpInspireCMD.prototype, "CopyExpInspireCMD");
//# sourceMappingURL=CopyExpInspireCMD.js.map