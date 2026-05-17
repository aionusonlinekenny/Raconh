/**
 *author Anydo
 *create 2017-11-30
 *description 
*/
class PetAnimation extends ShowAnimation
{
    public constructor()
    {
        super();
    }

    public reuse(info:IAnimationInfo):void
	{
        if(info.getActionStr() != null) this._currentAction = info.getActionStr();
		super.reuse(info);
	}

    public set currentClothes(aniID:number)
    {
        let change:boolean = false;
		if(this._currentClothes != aniID)
		{
			this._currentClothes = aniID;
		    let clothesGroupName:string = this.getClothesGroupName();
            let path:PathInfo = Manager.path.getPetPath(clothesGroupName);
			change = (this._currentLoadingClothes != path);
		}
		this._isChangeClothes = change || this._updateDirection || this._updateAction;
    }

    protected getClothesGroupName():string
	{
        return "pet"+this._currentClothes+"_"+Direction.getResGroupShortName(this._currentDirection)+"_"+FigureAction.getResGroupShortName(this._currentAction);
	}
    
    protected setFrames(action:string):void
	{
		switch(action)
        {
            case FigureAction.WALK:
                this._frames = [1,5,9,13,17,21];
				this._totalFrame = 24;
				break;
            case FigureAction.STAND:
                this._frames = [1,7,13,19];
				this._totalFrame = 24;
				break;
            case FigureAction.ATTACK1:
                this._frames = [1,5,9,13];
				this._totalFrame = 16;
				break;
        }
	}

    public updateStyle():void
    {
        this.clothes();
    }
    
    protected clothes():void
    {
        let info = this._info as PetGameObjectInfo;
        if(!info) return;
        if(!info.owner) return;
        if(!info.owner.attrInfo) return;
        this.currentClothes = (this._info as PetGameObjectInfo).owner.attrInfo.petAniID;
    }
    
    protected updateClothes():void
	{
		super.updateClothes();
		let clothesGroupName:string = this.getClothesGroupName();
        let path:PathInfo = Manager.path.getPetPath(clothesGroupName);
        Manager.loader.load(path, this.clothesComplete, this, ResourceGCType.AVATAR, ResPriorityType.LOAD_LEVEL4);
        this._currentLoadingClothes = path;
	}

    protected getName(action:string,direction:string):string
    {
        if(FigureAction.isAttackAction(action)) action = "attack";
        return  action + "_" + direction.replace("left","right");
    }
    
    protected render(interval:number):void
    {
        if(this._isChangeStyle)
        {
            this.updateStyle();
            this._isChangeStyle = false;
        }
        super.render(interval);
    }
}