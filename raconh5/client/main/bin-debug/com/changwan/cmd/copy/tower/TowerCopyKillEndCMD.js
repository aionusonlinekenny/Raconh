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
 * 爬塔副本杀死怪物的时候通知取消挂机
 *author Anydo
 *create 2018-1-30
 *description
*/
var TowerCopyKillEndCMD = (function (_super) {
    __extends(TowerCopyKillEndCMD, _super);
    function TowerCopyKillEndCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.TOWER_COPY_KILL_END;
        return _this;
    }
    TowerCopyKillEndCMD.prototype.receive = function (pi) {
        if (Manager.model.self.attrInfo.bfType != BFType.COPY)
            return;
        if (Manager.model.getCopy().curID != CopyConst.ID_TOWER && Manager.model.getCopy().curID != CopyConst.ID_MAIN)
            return;
        Manager.model.getAuto().autoHook = false;
    };
    return TowerCopyKillEndCMD;
}(BaseCMD));
__reflect(TowerCopyKillEndCMD.prototype, "TowerCopyKillEndCMD");
//# sourceMappingURL=TowerCopyKillEndCMD.js.map