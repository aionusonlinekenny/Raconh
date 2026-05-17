/**
 *author Anydo
 *create 2017-12-18
 *description
*/
var MapFindInfo = /** @class */ (function () {
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
//# sourceMappingURL=MapFindInfo.js.map