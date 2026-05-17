/**
 * 地图模型
 */
class MapModel
{
    private _mapId:number = -1;
    public mapLongId:number = -1;
    public mapCVO:MapCVO;
    public mapData:MapData;
    public mapDataLoadComplete:boolean = false;
    public enterMapX:number;
    public enterMapY:number;
    public findPath:FindPath = new FindPath();
    public getId():number
    {
         return this._mapId; 
    }
    public setId(mapId:number, mapLongId:number):void
    {
        // if(this._mapId == mapId) return;
        this._mapId = mapId;
        // 这里读取地图配置数据
        this.mapCVO = MapCVO.getCVO(this._mapId);
        if(this.mapCVO == null) Trace.error("地图表数据打不到",this._mapId);
        this.mapLongId = mapLongId;
    }

    public setMapData(mapData:MapData):void
    {
        this.mapData = mapData;
        if(this.mapData)this.findPath.setSource(this.mapData.source)
    }

    public getPosData(posX:number, posY:number):number
    {
        var index:egret.Point = IndexUtil.getIndexByXY(posX, posY);
        if(!this.mapData || this.mapData.source[index.x] == null)
            return MapDataType.UN_WALK;
        return this.mapData.source[index.x][index.y];
    }

    public isWalkPoint(posX:number, posY:number):boolean
    {
        return (MapDataType.WALK & this.getPosData(posX, posY)) == MapDataType.WALK;
    }

    public isAlphaPoint(posX:number,posY:number):boolean
    {
        return (MapDataType.ALPHA & this.getPosData(posX,posY)) == MapDataType.ALPHA;
    }

    public isAbsolutrPoint(posX:number,posY:number):boolean
    {
        return (MapDataType.ABSOLUTR & this.getPosData(posX,posY)) == MapDataType.ABSOLUTR;
    }
    
    public isInRookieMap():boolean
    {
        return this._mapId == MapConst.ID_ROOKIE_STORY || this._mapId == MapConst.ID_ROOKIE_STORY_II;
    }
}