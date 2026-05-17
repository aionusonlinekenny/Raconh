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
 * 掉落控制器
 * luzhihong
 * create 2017-11-17
 */
var DropControl = (function (_super) {
    __extends(DropControl, _super);
    function DropControl() {
        return _super.call(this) || this;
    }
    DropControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.DROP_LIST, DropListCMD);
        Manager.socket.addCMD(Protocol.DROP_RARE_LIST, DropRareListCMD);
    };
    DropControl.prototype.showAlert = function (infos) {
        if (this._dropAlert == null)
            this._dropAlert = Manager.pool.create(DropAlert, infos);
        else
            this._dropAlert.reuse(infos);
    };
    DropControl.prototype.hideAlert = function () {
        if (this._dropAlert)
            this._dropAlert.unuse();
    };
    DropControl.prototype.showEfficiencyAlert = function (lastSilver, lastExp, curSilver, curExp) {
        if (this._efficiencyAlert == null) {
            this._efficiencyAlert = Manager.pool.create(EfficiencyAlert, lastSilver, lastExp, curSilver, curExp);
        }
        else
            this._efficiencyAlert.reuse(lastSilver, lastExp, curSilver, curExp);
        this._efficiencyAlert.x = (Manager.config.gameWidth - 478) >> 1;
        this._efficiencyAlert.y = (Manager.config.gameHeight - 250) >> 1;
    };
    DropControl.prototype.hideEfficiencyAlert = function () {
        if (this._efficiencyAlert)
            this._efficiencyAlert.unuse();
    };
    return DropControl;
}(BaseControl));
__reflect(DropControl.prototype, "DropControl");
//# sourceMappingURL=DropControl.js.map