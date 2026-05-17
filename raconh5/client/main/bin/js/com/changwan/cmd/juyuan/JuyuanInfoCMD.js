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
 * 聚元信息CMD
 * 2018.4.2
 */
var JuyuanInfoCMD = /** @class */ (function (_super) {
    __extends(JuyuanInfoCMD, _super);
    function JuyuanInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_GATHER_INFO;
        return _this;
    }
    JuyuanInfoCMD.prototype.receive = function (pi) {
        //接收魂球信息列表
        var id = pi.readShort();
        Manager.model.getJuyuan()._curId = id;
        //接收已通关层数
        var guard = pi.readShort();
        Manager.model.getJuyuan().dispatchEvent(new JuyuanEvent(JuyuanEvent.JUYUAN_INFO_UPDATE));
    };
    return JuyuanInfoCMD;
}(BaseCMD));
//# sourceMappingURL=JuyuanInfoCMD.js.map