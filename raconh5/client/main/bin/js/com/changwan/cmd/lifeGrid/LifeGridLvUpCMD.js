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
 * pzx
 * 17.12.27
 * 升级
 *  */
var LifeGridLvUpCMD = /** @class */ (function (_super) {
    __extends(LifeGridLvUpCMD, _super);
    function LifeGridLvUpCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_LIFEGRID_LEV_UP;
        return _this;
    }
    LifeGridLvUpCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.index);
        pkg.writeInt(this.leve);
    };
    LifeGridLvUpCMD.prototype.receive = function (ip) {
        var lv = ip.readByte();
        Manager.model.getLifeGrid().returnLvUP(lv, this.index);
        this.index = -1;
    };
    return LifeGridLvUpCMD;
}(BaseCMD));
//# sourceMappingURL=LifeGridLvUpCMD.js.map