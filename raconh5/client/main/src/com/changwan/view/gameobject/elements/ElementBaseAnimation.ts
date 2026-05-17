class ElementBaseAnimation extends ElementBase
{
	protected _animation:IAnimation;
	/** 0非机器人 1场景机器人 2场景机器怪 */
	public sceneRobotFlag:number;
	
	public constructor()
    {
		super();
	}

    public reuse(gameObject:GameObject):void
	{
		super.reuse(gameObject);
		this.sceneRobotFlag = 0;
	}

	public unuse():void
	{
		super.unuse();
		this.poolPushAnimation();
		this.sceneRobotFlag = 0;
	}

	protected getInfo():AliveGameObjectInfo
	{
		if(this.sceneRobotFlag == 0) return this._gameObject.info as AliveGameObjectInfo;
		else if(this.sceneRobotFlag == 1) return (this._gameObject.info as SceneRobotGameObjectInfo).infoPlayer;
		else if(this.sceneRobotFlag == 2) return (this._gameObject.info as SceneRobotGameObjectInfo).infoMonster;
	}
	
	public drawDirection():void
	{
		if(this._animation instanceof ShowAnimation) this._animation.figureDirection = this.getInfo().getDirection();
	}
	
	public drawAction():void
	{
		if(this._animation instanceof ShowAnimation) this._animation.figureAction = this.getInfo().getActionStr();
	}

    public drawColorFilter():void
    {
        if(this._animation instanceof ShowAnimation)
        {
            let colorFilterType:number = this.getInfo().getColorFilterType();
            FilterUtil.addAliveColorFilter(this._animation, colorFilterType);
        }
    }

	public drawHide():void
	{
		this.poolPushAnimation();
	}

	protected poolPushAnimation():void
	{
		if(this._animation != null)
		{
			if(this._animation instanceof ShowAnimation) Manager.pool.push(this._animation as ShowAnimation);
			else if(this._animation instanceof Animation) Manager.pool.push(this._animation as Animation);
			this._animation = null;
		}
	}
	
	protected disposeSelf():void
	{
		super.disposeSelf();
		this.poolPushAnimation();
	}
}