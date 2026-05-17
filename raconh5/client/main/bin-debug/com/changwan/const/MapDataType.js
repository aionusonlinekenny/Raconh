var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 地图数据类型,数据类型为0,1,2,4,8的格式
 */
var MapDataType = (function () {
    function MapDataType() {
    }
    MapDataType.UN_WALK = 0;
    MapDataType.WALK = 1;
    MapDataType.ALPHA = 2;
    MapDataType.ABSOLUTR = 4;
    return MapDataType;
}());
__reflect(MapDataType.prototype, "MapDataType");
//# sourceMappingURL=MapDataType.js.map