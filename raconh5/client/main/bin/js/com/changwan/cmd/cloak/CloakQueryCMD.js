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
 * 17.11.28
 * 查询
 *  */
var CloakQueryCMD = /** @class */ (function (_super) {
    __extends(CloakQueryCMD, _super);
    function CloakQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_CLOAK_QUEYT;
        return _this;
    }
    CloakQueryCMD.prototype.receive = function (ip) {
        var currentId = ip.readShort();
        var ln = ip.readShort();
        var dic = new Dictionary();
        for (var i = 0; i < ln; i++) {
            var id = ip.readShort();
            var num = ip.readByte();
            dic.add(id, num);
        }
        Manager.model.getCloak().queryList(currentId, dic);
    };
    return CloakQueryCMD;
}(BaseCMD));
//# sourceMappingURL=CloakQueryCMD.js.map