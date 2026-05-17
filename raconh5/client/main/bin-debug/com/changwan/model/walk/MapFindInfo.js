var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2017-12-18
 *description
*/
var MapFindInfo = (function () {
    function MapFindInfo() {
    }
    MapFindInfo.prototype.reuse = function (tPos, tCvo) {
        this.pos = tPos;
        this.cvo = tCvo;
    };
    MapFindInfo.prototype.unuse = function () {
        this.pos = null;
        this.cvo = null;
    };
    MapFindInfo.prototype.dispose = function () {
        this.pos = null;
        this.cvo = null;
    };
    return MapFindInfo;
}());
__reflect(MapFindInfo.prototype, "MapFindInfo", ["cw.IPool", "cw.IDispose"]);
//# sourceMappingURL=MapFindInfo.js.map