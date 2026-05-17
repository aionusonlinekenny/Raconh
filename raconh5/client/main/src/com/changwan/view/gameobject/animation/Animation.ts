/**
 *author Anydo
 *create 2017-11-17
 *description 
*/
class Animation extends Sprite implements IAnimation
{
    private _bitmap:egret.Bitmap;
    
    private _cvo:AnimationCVO;
    public get cvo():AnimationCVO{ return this._cvo; }
    private _currentFrame:number;
    public get currentFrame():number{ return this._currentFrame; }
    public get totalFrame():number{ return this._cvo.totalFrame; }
    
    private _path:PathInfo;
    public get url():string{ return (this._path ? this._path.url : "") }
    private _pause:boolean;
    private _playCompleteDispose:boolean;
    private _repeate:number;
    private _curTime:number;//标记正在播放的是第几遍
    private _loaderCompletes:any[];
    // private _data:egret.MovieClipData;
    private _data:AnimationData;
    private _loadCompleteFlag:boolean;
    private _nextFrame:number;
    private _currentTime:number;
    private _loaderPriority:number;
    private _isInit:boolean;
    
    public constructor()
    {
        super(true);
        this.touchChildren = false;
        this.touchEnabled = false;
    }

    public reuse(path:PathInfo, cvo:AnimationCVO, loaderPriority:number, autoPlay:boolean=true, playCompleteDispose:boolean=true):void
    {
        this._path = path;
        this._cvo = cvo;
        this._pause = !autoPlay;
        this._playCompleteDispose = playCompleteDispose;
        this._loaderPriority = loaderPriority;
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESOURCE_LOAD_FAIL, this.loadFail, this);
        
        this._curTime = 1;
        this._currentFrame = 1;
        this._loaderCompletes = [];
        this._nextFrame = 10000;
        this._currentTime = 0;//Manager.global.FRAME_TIME;
        this._repeate = (cvo.wrapMode <= 0) ? -1 : cvo.wrapMode;

        this._bitmap = Manager.pool.create(egret.Bitmap);
        this.addChild(this._bitmap);
        this.scaleX = this._cvo.scale;
        this.scaleY = this._cvo.scale;
        if(this.scaleX != 1 || this.scaleY != 1) this._bitmap.smoothing = true;
        super.reuse();
    }

    public unuse():void
	{
        super.unuse();
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESOURCE_LOAD_FAIL, this.loadFail, this);
        if(this._path) Manager.loader.remove(this._path, this.loadSuccess, this);
        if(this._bitmap)
            Manager.pool.push(this._bitmap);
        this._bitmap = null;
		this.filters = null;
        this._cvo = null;
        this._data = null;
        this._path = null;
        this._loaderCompletes = null;
        this._pause = false;
        this._isInit = false;
        this._loadCompleteFlag = false;
        this._playCompleteDispose = false;
        this._repeate = 0;
        this._curTime = 0;
        this._nextFrame = 0;
        this._currentTime = 0;
        this._loaderPriority = 0;
        this.x = 0;
        this.y = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.skewX = 0;
        this.skewY = 0;
        this.touchChildren = false;
        this.touchEnabled = false;
    }
    
    protected __addedToStage(e:egret.Event):void
    {
        super.__addedToStage(e);
        if(this._loadCompleteFlag &&　this._cvo.totalFrame > 1) Manager.render.add(this.render, this);
        if(this._isInit) return;
        this._isInit = true;
        if(this._cvo.stayMemory == 0)Manager.loader.load(this._path, this.loadSuccess, this, ResourceGCType.COMMON, this._loaderPriority);
        else if(this._cvo.stayMemory == 3 
        || Manager.model.self.attrInfo.career == 1 && this._cvo.stayMemory == 1 
        || Manager.model.self.attrInfo.career == 2 && this._cvo.stayMemory == 2 
        ) 
        {
            Manager.loader.load(this._path, this.loadSuccess, this, ResourceGCType.NEVER, this._loaderPriority);
        }
    }

    private loadSuccess(loader:Loader):void
    {
        this._loadCompleteFlag = true;
        this._data = loader.data.aniData;
        this.initData();
        this.actLoadCompleteFuctions();
        this.dispatchEvent(new GlobalEvent(GlobalEvent.ANIMATION_LOAD_COMPLETE));
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESOURCE_LOAD_FAIL, this.loadFail, this);
    }

    protected __removeFromStage(e:egret.Event):void
    {
        super.__removeFromStage(e);
        Manager.render.remove(this.render, this);
    }
    
    public play():void{ this._pause = false; }
    
    public stop():void{ this._pause = true; }
    
    protected render(interval:number):void
    {
        let that = this;
        if(!that._pause)
        {
            that.goto(that._currentFrame);
            that._currentTime += Math.max(Manager.render.interval, Manager.global.FRAME_TIME);
            that._currentFrame = Math.ceil(that._currentTime / Manager.global.ANI_INTERVAL);//Math.ceil(that._currentTime / Manager.global.FRAME_TIME);
            if(that._currentFrame > that._nextFrame) that._currentFrame = that._nextFrame;
            if(that._cvo && that._currentFrame > that._cvo.totalFrame)
            {
                that._currentTime = Manager.global.FRAME_TIME;
                that._currentFrame = 1;
                if(that._repeate > 0)
                {
                    that._curTime ++;
                    that._repeate --;
                    if(that._repeate <= 0) that.complete();
                }
            }
        }
    }
    
    private goto(frame:number):void
    {
        if(this._data == null) return;
        if(frame < 1) frame = 1;
        else if(frame > this._cvo.totalFrame) frame = this._cvo.totalFrame;
        this._currentFrame = frame;
        let index:number = this._cvo.frames.indexOf(this._currentFrame);
        if(index != -1)
        {
            this._nextFrame = ((index + 1) >= this._cvo.frames.length) ? 10000 : this._cvo.frames[index + 1];
            // let frameData = this._data.getKeyFrameData(index+1);
            // this._bitmap.x = frameData.x;
            // this._bitmap.y = frameData.y;
            // this._bitmap.texture = this._data.getTextureByFrame(index+1);
            let frameData:AnimationFrameData = this._data.getKeyFrameData(index+1);
            this._bitmap.x = -this._cvo.offsetX + frameData.offX;
            this._bitmap.y = -this._cvo.offsetY + frameData.offY;
            this._bitmap.texture = frameData.texture;
        }
    }
    
    private initData():void
    {
        this._currentFrame = 1;
        if(this._cvo.totalFrame > 1) Manager.render.add(this.render, this);
        else if(this._cvo.totalFrame == 1) this.goto(1);
    }
    
    private actLoadCompleteFuctions():void
    {
        let one:any;
        for(let i:number = 0; i < this._loaderCompletes.length; i++)
        {
            one = this._loaderCompletes[i];
            (one.f as Function).apply(this, one.param);
        }
        this._loaderCompletes = [];
    }
    
    private loadFail(e:GlobalEvent):void
    {
        if(e.params != this._path.url) return;
        this.dispatchEvent(new GlobalEvent(GlobalEvent.ANIMATION_LOAD_ERROR));
        Manager.pool.push(this);
    }

    public gotoAndStop(frame:number):void
    {
        if(this._data == null)
        {
            this._loaderCompletes.push({f:this.gotoAndStop,param:[frame]});
            return;
        }
        this._pause = true;
        this._currentTime = frame * Manager.global.FRAME_TIME;
        this.goto(frame);
    }

    public gotoAndPlay(frame:number):void
    {
        if(this._data == null)
        {
            this._loaderCompletes.push({f:this.gotoAndPlay,param:[frame]});
            return;
        }
        this._pause = false;
        this._currentTime = frame * Manager.global.FRAME_TIME;
        this.goto(frame);
    }
    
    private complete():void
    {
        if(this._playCompleteDispose)
        {
            Manager.pool.push(this);
        }
        else
        {
            this._pause = true;
            this._repeate = (this._cvo.wrapMode <= 0) ? -1 : this._cvo.wrapMode;
        }
        this.dispatchEvent(new GlobalEvent(GlobalEvent.ANIMATION_PLAY_COMPLETE));
    }
    
    protected disposeSelf():void
    {
        super.disposeSelf();
        if(this._path) Manager.loader.remove(this._path, this.loadSuccess, this);
        Manager.pool.push(this._bitmap);
        this._bitmap = null;
        this._data = null;
        this._cvo = null;
        this._path = null;
        this._loaderCompletes = null;
    }
}