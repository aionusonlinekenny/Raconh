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
 * 爬塔副本信息
 * liangyan
 * create 2017-12-28
*/
var TowerCopyInfoCMD = /** @class */ (function (_super) {
    __extends(TowerCopyInfoCMD, _super);
    function TowerCopyInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.TOWER_COPY_INFO;
        return _this;
    }
    TowerCopyInfoCMD.prototype.receive = function (pi) {
        var model = Manager.model.getCopy().towerModel;
        model.curLvl = pi.readShort();
        model.history = pi.readShort();
        model.dispatchEvent(new CopyEvent(CopyEvent.UPDATE_TOWER_INFO));
    };
    return TowerCopyInfoCMD;
}(BaseCMD));
//# sourceMappingURL=TowerCopyInfoCMD.js.map