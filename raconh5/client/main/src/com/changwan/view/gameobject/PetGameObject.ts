/**
 *author Anydo
 *create 2017-11-30
 *description 
*/
class PetGameObject extends AliveGameObject
{
    protected _elementShow:ElementAliveAnimation;
    
    protected get petInfo():PetGameObjectInfo
    {
        return this._info as PetGameObjectInfo;
    }

    public constructor()
    {
        super();
    }

    protected start():void
	{
		super.start();
		this._elementShow = Manager.pool.create(ElementAliveAnimation, this);
	}

    public unuse():void
	{
		super.unuse();
		if(this._elementShow != null)
		{
			Manager.pool.push(this._elementShow);
			this._elementShow = null;
		}
	}

	protected createAction():void
	{
		this._action = Manager.pool.create(PetAction, this._aliveGameObjectInfo);
	}

    protected drawAll():void
	{
		super.drawAll();
		this._elementShow.drawPet();
	}

	protected draw():void
	{
		super.draw();
		if(this.isInvalid(InvalidationType.GO_ANIMATION)) this._elementShow.drawPet();
		if(this.isInvalid(InvalidationType.GO_ACTION)) this._elementShow.drawAction();
		if(this.isInvalid(InvalidationType.GO_DIRECTION)) this._elementShow.drawDirection();
		if(this.isInvalid(InvalidationType.GO_STYLE)) this._elementShow.drawStyle();
	}
		
	public eventDirection():void
	{
		this.invalidate(InvalidationType.GO_DIRECTION);
	}

	public eventAction():void
	{
		this.invalidate(InvalidationType.GO_ACTION);
	}

    public eventWalk(path:egret.Point[],walkType:number,complete?:Function,completeTarget?:any):void
	{
        if(this._action.inMove || path.length <= 0) return;
		let petPath:egret.Point[] = [new egret.Point(this.petInfo.x,this.petInfo.y), path[path.length - 1]];
        this._action.walk(petPath, WalkType.WALK, complete, completeTarget);
    }

	public eventAni():void
	{
		this.invalidate(InvalidationType.GO_STYLE);
	}

    protected disposeSelf():void
	{
		super.disposeSelf();
		if(this._elementShow != null)
		{
			Manager.pool.push(this._elementShow);
			this._elementShow = null;
		}
    }
}