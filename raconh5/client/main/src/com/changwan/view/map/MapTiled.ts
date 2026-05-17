/**
 * 地图块
 */
class MapTiled extends egret.Bitmap implements cw.IPool
{
    public col:number;//col,指的是此地图块的在地图中的第几列.
    public row:number;//row,指的是此地图块在地图中的第几行.
    public show:boolean;//是否显示
    public tempDis:number;
    public loadStep:number;//0未加载 1已经进行加载 2加载完成
    
    private _texture:egret.Texture;

    private _path:PathInfo;

    public constructor()
    {
        super();
        this.col = 0;
        this.row = 0;
        this.tempDis = 0;
        this.loadStep = 0;
    }

    public load():void
    {
        if(this.loadStep > 0) return;
        this.loadStep = 1;
        Manager.loader.load(this._path,this.onLoadImgComplete,this,ResourceGCType.MAP);
    }

    protected onLoadImgComplete(loader:Loader):void
	{
        // this.disposeBitmapData();
        this.loadStep = 2;
        if(this._texture != null)
        {
            Manager.pool.push(this._texture);
            this._texture = null;
        }
        this.texture = null;
        this.bitmapData = loader.data;
    }

    public unuse()
    {
        Manager.loader.remove(this._path,this.onLoadImgComplete,this);
        this.col = 0;
        this.row = 0;
        this._path = null;
        this.disposeBitmapData();
        this.loadStep = 0;
        if(this.parent != null) this.parent.removeChild(this);
    }

    public reuse(row:number, col:number):void
    {
        this.show = false;
        this.loadStep = 0;
        this.row = row;
        this.col = col;
        this._path = Manager.path.getMapPath(Manager.model.getMap().mapCVO.res,this.row,this.col);
        this.x = Manager.config.tiledMapSize * this.col;
        this.y = Manager.config.tiledMapSize * this.row;
    }

    public setMosic(smallMap:egret.BitmapData):void
    {
        this._texture = Manager.pool.create(egret.Texture);
        this._texture.bitmapData = smallMap;
        let temp:number = Manager.config.tiledMapSize;
        this._texture.$initData(this.col * temp, this.row * temp,
            temp, temp,
            0, 0,
            temp, temp,
            smallMap.width * 10, smallMap.height * 10);
        this.texture = this._texture;
    }

    private disposeBitmapData()
    {
        // this.texture = null;
        // this._texture = null;
        // this.bitmapData = null;
        // if(this.bitmapData != null)this.bitmapData.$dispose();
        if(this._texture != null)Manager.pool.push(this._texture);
        this._texture = null;
        this.texture = null;
        this.bitmapData = null;
    }

    public dispose():void
    {
        Manager.loader.remove(this._path,this.onLoadImgComplete,this);
        if(this.parent != null)this.parent.removeChild(this);
        this._path = null;
        this.disposeBitmapData();
    }
}