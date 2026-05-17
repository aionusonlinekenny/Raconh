class AnimationLayer extends egret.Bitmap implements cw.IDispose,cw.IPool
{
    /** 通用帧频。但是像武器特效是自定的的关键侦 */		
    private _isNormal:boolean;
    public get isNormal():boolean{ return this._isNormal; }

    protected _datas:AnimationData;

    public constructor()
    {
        super();
    }

    public reuse(isNormal:boolean = true):void
	{
        this._isNormal = isNormal;
	}

	public unuse():void
	{
        if(this.parent)this.parent.removeChild(this);
        this._isNormal = true;
        this._datas = null;
        this.x = 0;
        this.y = 0;
        this.texture = null;
	}

    public setLoadData(loader:Loader):void
    {
        this._datas = loader.data.aniData;
    }

    public updateFrame(current:number):void
    {
        if(this.parent == null) return;
        if(this._datas == null || current > this._datas.totalFrames) return;
        let frameData:AnimationFrameData = this._datas.getKeyFrameData(current);
        this.x = frameData.offX - 400;
        this.y = frameData.offY - 400;
        this.texture = frameData.texture;
    }

    public clear():void
    {
        this._datas = null;
        this.x = 0;
        this.y = 0;
        this.texture = null;
    }

    public dispose():void
    {
        if(this.parent)this.parent.removeChild(this);
        this._datas = null;
        this.texture = null;
    }
}