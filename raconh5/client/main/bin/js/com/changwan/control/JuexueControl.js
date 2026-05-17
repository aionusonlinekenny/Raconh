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
     * 绝学Control
     */
var JuexueControl = /** @class */ (function (_super) {
    __extends(JuexueControl, _super);
    function JuexueControl() {
        return _super.call(this) || this;
    }
    JuexueControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_JUEXUE_QUERY, JuexueQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_JUEXUE_UPGRADE, JuexueUpgradeCMD);
        Manager.socket.addCMD(Protocol.CMD_JUEXUE_AMBIT, JuexueAmbitCMD);
    };
    /**
     * 查询
     */
    JuexueControl.prototype.query = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_JUEXUE_QUERY);
        cmd.send();
    };
    JuexueControl.prototype.upgrade = function (id, lev) {
        if (this._upgrideLv)
            return;
        var cmd = Manager.socket.getCMD(Protocol.CMD_JUEXUE_UPGRADE);
        cmd.id = id;
        cmd.lev = lev;
        cmd.send();
        this._upgrideLv = true;
        Manager.render.add(this.upgrideLv, this, 500, 1, null, true);
    };
    JuexueControl.prototype.ambitlv = function (id) {
        if (this._filterLv)
            return;
        var cmd = Manager.socket.getCMD(Protocol.CMD_JUEXUE_AMBIT);
        cmd.id = id;
        cmd.send();
        this._filterLv = true;
        Manager.render.add(this.filterLv, this, 500, 1, null, true);
    };
    JuexueControl.prototype.filterLv = function () {
        this._filterLv = false;
    };
    JuexueControl.prototype.upgrideLv = function () {
        this._upgrideLv = false;
    };
    return JuexueControl;
}(BaseControl));
//# sourceMappingURL=JuexueControl.js.map