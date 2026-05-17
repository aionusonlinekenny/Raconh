class ElementPlayerAnimation extends ElementBaseAnimation
{
	public constructor()
	{
		super();
	}

	public get animation():PlayerAnimation
	{
		return this._animation as PlayerAnimation;
	}

	public drawStyle():void
	{
		if(this._animation instanceof PlayerAnimation) this._animation.updateStyle();
	}

	public drawDead():void
	{
		if(this._animation instanceof PlayerAnimation) this._animation.dead();
	}

	public drawPlayerAnimation():void
	{
		if(this._animation == null)
		{
			let playerInfo:PlayerGameObjectInfo = this.getInfo() as PlayerGameObjectInfo;
            this._animation = Manager.animation.createGameOjbectAnimation(playerInfo);
			this._gameObject.addChild(this._animation as ShowAnimation);
			this.drawAction();
			this.drawDirection();
		}
	}
}