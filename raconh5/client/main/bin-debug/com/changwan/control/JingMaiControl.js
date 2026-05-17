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
 * pzx
 * 17.11.18
     * 经脉Control
     */
var JingMaiControl = (function (_super) {
    __extends(JingMaiControl, _super);
    function JingMaiControl() {
        return _super.call(this) || this;
    }
    JingMaiControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_JINGMAI_QUEYT_INFO, JingMaiQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_JINGMAI_LV_UP, JingMaiLvUpCMD);
    };
    /**
     * 查询
     */
    JingMaiControl.prototype.query = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_JINGMAI_QUEYT_INFO);
        cmd.send();
    };
    /**
    * 提交
    */
    JingMaiControl.prototype.jianMaiLvUp = function (leve, palyId) {
        if (this._upgrideLv)
            return;
        var cmd = Manager.socket.getCMD(Protocol.CMD_JINGMAI_LV_UP);
        cmd.leve = leve;
        cmd.playid = palyId;
        cmd.send();
        this._upgrideLv = true;
        Manager.render.add(this.upgrideLv, this, 500, 1, null, true);
    };
    JingMaiControl.prototype.upgrideLv = function () {
        this._upgrideLv = false;
    };
    return JingMaiControl;
}(BaseControl));
__reflect(JingMaiControl.prototype, "JingMaiControl");
//# sourceMappingURL=JingMaiControl.js.map