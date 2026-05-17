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
 * 世界等级cmd
 * pzx
 * 18.4.3
 */
var WorldLevelExpCMD = (function (_super) {
    __extends(WorldLevelExpCMD, _super);
    function WorldLevelExpCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_WORLD_LEVE;
        return _this;
    }
    WorldLevelExpCMD.prototype.receive = function (pi) {
        var lv = pi.readShort();
        Manager.model.getLogin().dispatchEvent(new WorldLeveExpEvent(WorldLeveExpEvent.UPDATE_WORLDLEVE_EVENT, lv));
    };
    return WorldLevelExpCMD;
}(BaseCMD));
__reflect(WorldLevelExpCMD.prototype, "WorldLevelExpCMD");
//# sourceMappingURL=WorldLevelExpCMD.js.map