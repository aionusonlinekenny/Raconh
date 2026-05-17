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
 * drq
 * 聚元、突破CMD
 * 2018.4.2
 */
var JuyuanProgressCMD = /** @class */ (function (_super) {
    __extends(JuyuanProgressCMD, _super);
    function JuyuanProgressCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_PROGRESS;
        return _this;
    }
    JuyuanProgressCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this._type); //1:突破，2:聚元
        pkg.writeByte(this._args); //type=1:_args是id；type=2：args为副本id
    };
    JuyuanProgressCMD.prototype.receive = function (pi) {
        //0失败，1成功
        var state = pi.readByte();
        if (state == 1) {
            Manager.model.getJuyuan()._curId += 1;
            Manager.model.getJuyuan().dispatchEvent(new JuyuanEvent(JuyuanEvent.JUYUAN_PROGRESS_UPDATE));
        }
    };
    return JuyuanProgressCMD;
}(BaseCMD));
//# sourceMappingURL=JuyuanProgressCMD.js.map