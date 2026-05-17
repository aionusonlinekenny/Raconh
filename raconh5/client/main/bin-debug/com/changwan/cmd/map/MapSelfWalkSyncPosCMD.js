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
 *author Anydo
 *create 2017-11-6
 *description
*/
var MapSelfWalkSyncPosCMD = (function (_super) {
    __extends(MapSelfWalkSyncPosCMD, _super);
    function MapSelfWalkSyncPosCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MAP_SELF_WALK_SYNC_POS;
        return _this;
    }
    MapSelfWalkSyncPosCMD.prototype.processOut = function (out) {
        out.writeShort(this.posX);
        out.writeShort(this.posY);
    };
    return MapSelfWalkSyncPosCMD;
}(BaseCMD));
__reflect(MapSelfWalkSyncPosCMD.prototype, "MapSelfWalkSyncPosCMD");
//# sourceMappingURL=MapSelfWalkSyncPosCMD.js.map