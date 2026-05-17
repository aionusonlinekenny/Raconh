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
 * 击杀记录
 * liangyan
 * create 2017-11-14
*/
var KillRecordCMD = (function (_super) {
    __extends(KillRecordCMD, _super);
    function KillRecordCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.KILL_RECORD;
        return _this;
    }
    KillRecordCMD.prototype.receive = function (pi) {
        var id = pi.readInt64();
        var name = pi.readUTF();
    };
    return KillRecordCMD;
}(BaseCMD));
__reflect(KillRecordCMD.prototype, "KillRecordCMD");
//# sourceMappingURL=KillRecordCMD.js.map