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
 *author Simon
 *create 2018-1-12
 *description
*/
var MapUpdatePlayerPosCMD = (function (_super) {
    __extends(MapUpdatePlayerPosCMD, _super);
    function MapUpdatePlayerPosCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MAP_UPDATE_PLAYER_POS;
        return _this;
    }
    MapUpdatePlayerPosCMD.prototype.receive = function (pi) {
        var posX = pi.readShort();
        var posY = pi.readShort();
    };
    return MapUpdatePlayerPosCMD;
}(BaseCMD));
__reflect(MapUpdatePlayerPosCMD.prototype, "MapUpdatePlayerPosCMD");
//# sourceMappingURL=MapUpdatePlayerPosCMD.js.map