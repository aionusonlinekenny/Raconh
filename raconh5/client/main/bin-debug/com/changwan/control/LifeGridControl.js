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
 * 17.12.27
     * Control
     */
var LifeGridControl = (function (_super) {
    __extends(LifeGridControl, _super);
    function LifeGridControl() {
        return _super.call(this) || this;
    }
    LifeGridControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_LIFEGRID_INFO, LifeGridCDQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_LIFEGRID_HUNT, LifeGridHuntCMD);
        Manager.socket.addCMD(Protocol.CMD_LIFEGRID_LEV_UP, LifeGridLvUpCMD);
        Manager.socket.addCMD(Protocol.CMD_LIFEGRID_WARE, LifeGridWareCMD);
        Manager.socket.addCMD(Protocol.CMD_LIFEGRID_SEPARATE, LifeGridSeparateCMD);
    };
    /**
     * 查询
     */
    LifeGridControl.prototype.query = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_LIFEGRID_INFO);
        cmd.send();
    };
    LifeGridControl.prototype.hount = function (free) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_LIFEGRID_HUNT);
        cmd.type = free;
        cmd.send();
    };
    /**
     * 孔位置
        lv   目标等级'
     */
    LifeGridControl.prototype.levelUp = function (lv, pos) {
        if (this._timeboo)
            return;
        Manager.render.add(this.updateTime, this, 500, 1, null, true);
        var cmd = Manager.socket.getCMD(Protocol.CMD_LIFEGRID_LEV_UP);
        cmd.leve = lv;
        cmd.index = pos;
        cmd.send();
        this._timeboo = true;
    };
    LifeGridControl.prototype.updateTime = function () {
        this._timeboo = null;
    };
    /**
    * 穿戴
    * 命格唯一id
    * pos 孔位置
    */
    LifeGridControl.prototype.ware = function (id, pos) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_LIFEGRID_WARE);
        cmd.id = id;
        cmd.index = pos;
        cmd.send();
    };
    /**
    * 分解  id列表
    */
    LifeGridControl.prototype.separate = function (arr) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_LIFEGRID_SEPARATE);
        cmd.array = arr;
        cmd.send();
    };
    return LifeGridControl;
}(BaseControl));
__reflect(LifeGridControl.prototype, "LifeGridControl");
//# sourceMappingURL=LifeGridControl.js.map