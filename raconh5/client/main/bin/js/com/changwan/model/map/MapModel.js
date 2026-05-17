/**
 * 地图模型
 */
var MapModel = /** @class */ (function () {
    function MapModel() {
        this._mapId = -1;
        this.mapLongId = -1;
        this.mapDataLoadComplete = false;
        this.findPath = new FindPath();
    }
    MapModel.prototype.getId = function () {
        return this._mapId;
    };
    MapModel.prototype.setId = function (mapId, mapLongId) {
        // if(this._mapId == mapId) return;
        this._mapId = mapId;
        // 这里读取地图配置数据
        this.mapCVO = MapCVO.getCVO(this._mapId);
        if (this.mapCVO == null)
            Trace.error("地图表数据打不到", this._mapId);
        this.mapLongId = mapLongId;
    };
    MapModel.prototype.setMapData = function (mapData) {
        this.mapData = mapData;
        if (this.mapData)
            this.findPath.setSource(this.mapData.source);
    };
    MapModel.prototype.getPosData = function (posX, posY) {
        var index = IndexUtil.getIndexByXY(posX, posY);
        if (!this.mapData || this.mapData.source[index.x] == null)
            return MapDataType.UN_WALK;
        return this.mapData.source[index.x][index.y];
    };
    MapModel.prototype.isWalkPoint = function (posX, posY) {
        return (MapDataType.WALK & this.getPosData(posX, posY)) == MapDataType.WALK;
    };
    MapModel.prototype.isAlphaPoint = function (posX, posY) {
        return (MapDataType.ALPHA & this.getPosData(posX, posY)) == MapDataType.ALPHA;
    };
    MapModel.prototype.isAbsolutrPoint = function (posX, posY) {
        return (MapDataType.ABSOLUTR & this.getPosData(posX, posY)) == MapDataType.ABSOLUTR;
    };
    MapModel.prototype.isInRookieMap = function () {
        return this._mapId == MapConst.ID_ROOKIE_STORY || this._mapId == MapConst.ID_ROOKIE_STORY_II;
    };
    return MapModel;
}());
//# sourceMappingURL=MapModel.js.map