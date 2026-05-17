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
 * 18.3.1
 * 绝学升级
 *  */
var JuexueUpgradeCMD = /** @class */ (function (_super) {
    __extends(JuexueUpgradeCMD, _super);
    function JuexueUpgradeCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_JUEXUE_UPGRADE;
        return _this;
    }
    JuexueUpgradeCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.id);
        pkg.writeShort(this.lev);
    };
    JuexueUpgradeCMD.prototype.receive = function (ip) {
        // array('name' => 'id', 'type' => 'int16', 'desc' => '绝学id'),
        //         array('name' => 'lev', 'type' => 'int16', 'desc' => '目标等级(1级为激活，其他为升级)'),
        var id = ip.readShort();
        var lev = ip.readShort();
        var cvo = JueXueCVO.getCvo(id);
        cvo.setLev(lev);
        Manager.model.getjuexue().returnUpgrade(cvo);
    };
    return JuexueUpgradeCMD;
}(BaseCMD));
//# sourceMappingURL=JuexueUpgradeCMD.js.map