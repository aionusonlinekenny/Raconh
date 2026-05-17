/**
 * 地图视图
 */
class MapView
{
    private _control:MapControl;
    private _model:MapModel;
    private _tileds:any;
    private _updatePosition:boolean;
    private _initialize:boolean;//第一次进入地图初始化，一定是加载地图，不需要Manager.camera.needUpdateTiled()来判断
    private _shakeTime:number;//震屏时间
	private _shakeLeftTime:number;//震屏剩余时间
	private _shakeIndex:number;//震屏点索引
    private _shakeW:number;//震屏幅度
	private _shakeH:number;//震屏幅度
	private _onlyY:boolean;//只有Y移动
	private _shakeInterval:number;//震屏间隔
    private _inShaking:boolean;//震屏状态
    private _mapLayerP:egret.Point;//地图层坐标
    private _smallMap:egret.BitmapData;
    // private _path:PathInfo;
    // private _clipBounds:egret.Rectangle;

    public constructor(control:MapControl, model:MapModel)
    {
        this._control = control;
        this._model = model;
        this._tileds = {};
        // this._clipBounds = new egret.Rectangle(0,0,Manager.config.tiledMapSize * 0.1,Manager.config.tiledMapSize * 0.1);
        Manager.render.add(this.render, this);
        this._shakeInterval = 0;
        this._inShaking = false;
    }

    private resetSmallMap(smallMap:egret.BitmapData):void
    {
        // if(this._smallMap != null)
        // {
        //     Manager.pool.push(this._smallMap);
        //     this._smallMap = null;
        // }
        // this._smallMap = Manager.pool.create(egret.Bitmap);
        // this._smallMap.texture = smallMap;
        this._smallMap = smallMap;
    }

    public reset(smallMap:egret.BitmapData):void
    {
        this._initialize = true;
        this._updatePosition = false;
        for (let key in this._tileds)
        {
            Manager.pool.push(this._tileds[key]);
            delete this._tileds[key];
        }
        this.resetShake();
        this.resetSmallMap(smallMap);
    }

    private render()
    {
        if(this._inShaking)
        {
            if(this._shakeLeftTime > 0)
            {
                if(!this._updatePosition) this.shake(Manager.global.FRAME_TIME);
            }
            else this.resetShake();
        }
        if (this._updatePosition)
        {
            this._updatePosition = false;
            this.drawTiles();
        }
    }
   
    private drawTiles()
    {
        if (Manager.camera.needUpdateTiled() || this._initialize)
        {
            this._initialize = false;
            let row = Math.floor(Manager.camera.getSeeRect().y / Manager.config.tiledMapSize);
            let col = Math.floor(Manager.camera.getSeeRect().x / Manager.config.tiledMapSize);
            let seeRectRow:number = Manager.camera.getMapSeeRect().height - Manager.camera.getSeeRect().y;
            let seeRectCol:number = Manager.camera.getMapSeeRect().width - Manager.camera.getSeeRect().x;
            let cameraRowHeight:number = seeRectRow < Manager.camera.getSeeRect().height ? seeRectRow : Manager.camera.getSeeRect().height;
            let cameraColWidth:number = seeRectCol < Manager.camera.getSeeRect().width ? seeRectCol : Manager.camera.getSeeRect().width;
            let endRow = Math.ceil((Manager.camera.getSeeRect().y + cameraRowHeight) / Manager.config.tiledMapSize);
            let endCol = Math.ceil((Manager.camera.getSeeRect().x + cameraColWidth) / Manager.config.tiledMapSize);
            Manager.camera.updateSeeRectRC(col * Manager.config.tiledMapSize, row * Manager.config.tiledMapSize, (endCol - col) * Manager.config.tiledMapSize, (endRow - row) * Manager.config.tiledMapSize);
            let midRow:number = row + Math.floor((endRow - row) / 2);
            let midCol:number = col + Math.floor((endCol - col) / 2);
            for (let key in this._tileds)
            {
                this._tileds[key].show = false;
            }
            let keys:number = 0;
            let tiled:MapTiled = null;
            for (let i = row; i < endRow; i++)
            {
                for (let j = col; j < endCol; j++)
                {
                    keys = i * 1000 + j;
                    tiled = this._tileds[keys];
                    if(tiled == null)
                    {
                        tiled = Manager.pool.create(MapTiled, i, j);
                        this._tileds[keys] = tiled;
                        if(tiled.bitmapData == null) this.setMosic(tiled);
                        // tiled.load();
                    }
                    tiled.show = true;
                }
            }
            // for (let key in this._tileds) this._tileds[key].draw();
            for (let key in this._tileds)
            {
                tiled = this._tileds[key];
                if (tiled.show && tiled.parent == null)
                {
                    if(tiled.loadStep == 0) tiled.load();
                    Manager.layer.mapLayer.addChild(tiled);
                }
                else if(!tiled.show && tiled.parent != null)
                {
                    tiled.parent.removeChild(tiled);
                }
            }
        }
    }

    private setMosic(tiled:MapTiled):egret.BitmapData
    {
        if(this._smallMap == null) return;
        // this._clipBounds.x = tiled.col * Manager.config.tiledMapSize * 0.01;
        // this._clipBounds.y = tiled.row * Manager.config.tiledMapSize * 0.01;
        tiled.setMosic(this._smallMap);
    }

    public setCenter(x:number,y:number):void
    {
        this._updatePosition = true;
        Manager.camera.setFocus(x,y);
        let rect:egret.Rectangle = Manager.camera.getSeeRect();
        Manager.layer.moveMapPos(-rect.x, -rect.y);
        if(this._inShaking)
        {
            this._mapLayerP = new egret.Point(-rect.x, -rect.y);
            this.shake(Manager.global.FRAME_TIME_60);
        }
    }

    /**
	 * 设置震屏
     * @param delayTime 震屏延迟 单位毫秒
     * @param shakeTime 震屏时间
     * @param shakeH    震屏高度
     * @param onlyY     只有Y震屏
     */		
	public setShake(delayTime:number=0,shakeTime:number=300,shakeH:number=5,onlyY:boolean=false):void
	{
        if(this._inShaking) this.resetShake();
        this._shakeIndex = 0;
		this._shakeTime = shakeTime;
		this._shakeLeftTime = shakeTime;
		this._shakeH = shakeH;
        this._shakeW = shakeH * 1.8;
		this._onlyY = onlyY;
        this._mapLayerP = new egret.Point(Manager.layer.mapLayer.x, Manager.layer.mapLayer.y);
		if(delayTime == 0) this._inShaking = true;
		else if(delayTime > 0) Manager.render.add(this.startShake, this, delayTime, 1, null, true);
	}
    /**开始震屏 */
    private startShake():void
    {
        Manager.render.remove(this.startShake, this);
        this._inShaking = true;
    }
	/**
	 * 停止震屏 
	 */		
	public stopShake():void
	{
        this.resetShake();
	}
    /**震屏 */
    private shake(interval:number):void
    {
        this._shakeLeftTime -= interval;
		this._shakeInterval++;
		if(this._shakeInterval > 2)
		{
			this._shakeInterval = 0;
			if(this._shakeLeftTime <= 0)
			{
                Manager.layer.moveMapPos(this._mapLayerP.x, this._mapLayerP.y);
			}
			else
			{
				this._shakeIndex++;
                let rangeH = Manager.layer.mapLayer.y + this._shakeH * Math.random();//(this._shakeLeftTime / this._shakeTime) *
                let rangeW = Manager.layer.mapLayer.x + this._shakeW * Math.random(); 
				if((this._shakeIndex % 2) == 0)
                {
                    rangeH = Manager.layer.mapLayer.y - this._shakeH * Math.random() * 2; 
                    rangeW = Manager.layer.mapLayer.x - this._shakeW * Math.random() * 2;
                }
				if(this._onlyY)
                {
                    Manager.layer.moveMapY(rangeH);
                }
				else
                {
                    Manager.layer.moveMapPos(rangeW, rangeH);
                }
			}
		}
    }
    /**重置震屏 */
    private resetShake():void
    {
        if(Manager.render.contains(this.startShake, this)) Manager.render.remove(this.startShake, this);
        this._inShaking = false;
        this._shakeLeftTime = this._shakeInterval = 0;
        if(this._mapLayerP) Manager.layer.moveMapPos(this._mapLayerP.x, this._mapLayerP.y);
    }
}