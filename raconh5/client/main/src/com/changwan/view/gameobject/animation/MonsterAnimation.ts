class MonsterAnimation extends ShowAnimation
{
	public isDeadFlag:boolean;//怪物死亡后，info直接unuse，所以info有可能马上被其他的新怪赋值，导致info数据是不准确的，此字段用来做临时标记

    public get monsterInfo():MonsterGameObjectInfo { return this._info as MonsterGameObjectInfo; }
    public constructor()
    {
        super();
    }

    public reuse(info:IAnimationInfo):void
	{
        this.isDeadFlag = !(info as MonsterGameObjectInfo).getAliveFlag();
        if(info.getActionStr() != null) this._currentAction = info.getActionStr();
		super.reuse(info);
	}

    public set currentClothes(aniID:number)
    {
        let changeId:boolean = false;
		if(this._currentClothes != aniID)
		{
			this._currentClothes = aniID;
			let clothesGroupName:string = this.getClothesGroupName();
			let path:PathInfo = Manager.path.getMonsterPath(clothesGroupName);
			changeId = (this._currentLoadingClothes != path);
		}
        this._isChangeClothes = changeId || (this._updateDirection && !this.monsterInfo.cvo.singleDic) || (this._updateAction && !this.monsterInfo.cvo.singleAction);
    }

    protected getClothesGroupName():string
	{
        let actionStr:string;
        if(this.monsterInfo.cvo.singleAction) actionStr = FigureAction.STAND;
        else if(this._currentAction == FigureAction.DEAD || this.isDeadFlag) return "monster"+this._currentClothes+"_3_d";
        else actionStr = this._currentAction;
        let dirStr:string = this.monsterInfo.cvo.singleDic ? Direction.RIGHT_TOP : this._currentDirection;
		return "monster"+this._currentClothes+"_"+Direction.getResGroupShortName(dirStr)+"_"+FigureAction.getResGroupShortName(actionStr);
	}
    
    protected setFrames(action:string):void
	{
		switch(action)
        {
            case FigureAction.WALK:
                this._frames = [1,5,9,13];
				this._totalFrame = 16;
				break;
            case FigureAction.STAND:
                this._frames = [1,7,13,19];
				this._totalFrame = 24;
				break;
            case FigureAction.ATTACK1:
                this._frames = [1,5,9,13,17];
				this._totalFrame = 20;
				break;
            case FigureAction.HITED:
            case FigureAction.DEAD:
                this._frames = [1];
				this._totalFrame = 1;
				break;
        }
	}

    public updateStyle():void
    {
        this.clothes();
    }
    
    protected clothes():void
    {
        //死亡时info已经unuse，cvo为空，所以直接使用就的样式id取动作
        let newClothes:number = (this.monsterInfo.cvo != null) ? parseInt(this.monsterInfo.cvo.url) : this._currentClothes;
        this.currentClothes = newClothes;
    }
    
    protected updateClothes():void
	{
		super.updateClothes();
		let clothesGroupName:string = this.getClothesGroupName();
        let path:PathInfo = Manager.path.getMonsterPath(clothesGroupName);
        Manager.loader.load(path, this.clothesComplete, this, ResourceGCType.AVATAR, ResPriorityType.LOAD_LEVEL4);
        this._currentLoadingClothes = path;
	}

    protected getName(action:string,direction:string):string
    {
        if(FigureAction.isAttackAction(action)) action = "attack";
        return  action + "_" + direction.replace("left","right");
    }

	public dead():void
	{
		
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