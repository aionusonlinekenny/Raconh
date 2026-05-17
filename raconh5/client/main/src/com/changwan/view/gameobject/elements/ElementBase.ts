class ElementBase implements cw.IPool
{

    private _diposeFlag:boolean;
	protected _gameObject:GameObject;
	
    public constructor()
    {}

    public reuse(gameObject:GameObject):void
	{
        this._gameObject = gameObject;
		this.start();
	}

	public unuse():void
	{}

    protected start():void{}
    
    public dispose():void
    {
        if(this._diposeFlag) return;
        this._diposeFlag = true;
        this.disposeSelf();
    }
    
    protected disposeSelf():void
    {
        this._gameObject = null;
    }
}