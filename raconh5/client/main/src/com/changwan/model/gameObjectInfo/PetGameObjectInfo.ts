/**
 *author Anydo
 *create 2017-11-29
 *description 
*/
class PetGameObjectInfo extends AliveGameObjectInfo
{
    public owner:PlayerGameObjectInfo;

    public isInvented:boolean;//虚拟宠物，个人竞技用
    private _bombPoss:egret.Point[];

    protected _isOut:boolean;
    public getIsOut():boolean{ return this._isOut; }
    public setIsOut(value:boolean):void
    {
        if(this._isOut == value) return;
        this._isOut = value;
    }

	public reuse(id:number,role:RoleInfo):void
	{
		super.reuse(id);
        this.isInvented = false;
	}

    public unuse():void
    {
        super.unuse();
        this.owner = null;
        this.isInvented = false;
        this._bombPoss = null;
    }
    
    public get ownerID():number
    {
        return this.owner ? this.owner.id : 0;
    }

    public getType():number 
    {
        return GameObjectType.PET; 
    }
    
    public getAnimationType():number
    {
        return AnimationType.PET;
    }
    
    public get moveSpeed():number
    {
        if(this.owner != null) return this.owner.attrInfo.speed;
        else return 230;
    }
    
	public getBombShootPos():egret.Point
	{
        if(this._bombPoss)
        {
            let ti:number = Direction.directions.indexOf(this.getDirection());
            let pos:egret.Point = this._bombPoss[ti];
            return new egret.Point(this.x, this.y).add(pos);
        }
        return new egret.Point(this.x, this.y - 100);
	}

    private parseBombShootPos():void
    {
        this._bombPoss = null;
        if(this.owner == null) return;
        if(this.owner.attrInfo == null) return;
        this._bombPoss = PetBombCVO.getBombPoss(this.owner.attrInfo.petAniID);
    }
    
    public get isSelfGO():boolean
    {
        return this.ownerID == Manager.model.self.id;
    }

    public canHited(showMsg:boolean=true):boolean 
    {
        return false;
    }
		
    public canHit():boolean
    {
        return false;
    }
    
    /** 不更新血量 */		
    public attrUpdateBlood(oldValue:number):void
    {}
    
    public remove(onlyView:boolean,isImmediately:boolean = true):void
    {
        if(!onlyView) this.owner = null;
        super.remove(onlyView, isImmediately);
    }
   
    public createGameObject():GameObject
	{
		if(this._view == null)this._view = Manager.pool.create(PetGameObject,this)
		return this._view;
	}

    public attrUpdateAni():void
	{
        this.parseBombShootPos();
		if(this._view != null)(this._view as PetGameObject).eventAni();
	}

	public dispose():void
	{
		super.dispose();
        this.owner = null;
        this._bombPoss = null;
	}
}