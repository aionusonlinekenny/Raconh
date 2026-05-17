/**
 *author Anydo
 *create 2017-11-2
 *update devlil 2017-11-08
 *description 
*/
class MonsterGameObjectInfo extends AliveGameObjectInfo
{
    private _cvo:MonsterCVO;
    public get cvo():MonsterCVO
    {
        return this._cvo; 
    }

    /**
     * 怪物类型  GameObjectType常量
     */
    private _elementType:number;
    public getType():number
    {
         return this._elementType; 
    }

     public get borderWidth():number
     {
          return this._cvo.showHalfWidth; 
     }

	private _union:number;//阵营标识

    public unuse():void
    {
        super.unuse();
        this._cvo = null;
    }

    public reuse(id:number,cvoID:number):void
    {
        this.setCVO(cvoID);
        super.reuse(id);
    }

    public getName():string
    {
        return HtmlUtil.addFontTag(this._cvo.name, this._cvo.nameColor);
    }

    public get fullName():string
    {
        var str:string = this._cvo.gradeName + this._cvo.name;
        return HtmlUtil.addFontTag(str, this._cvo.nameColor);
    }

    public canHited(showMsg:boolean = true):boolean 
    {
        if(this._cvo == null) return false;
        if(this._cvo && !((this._cvo.canAttackedFlag & 2) == 2)) return false;
        return true;
    }

    public getAnimationType():number
    {
         return AnimationType.MONSTER; 
    }

	public setDirection(value:string):void
	{
        if(this.cvo && this.cvo.singleDic && value != Direction.RIGHT_TOP) value = Direction.RIGHT_TOP;
        super.setDirection(value);
	}

	public setActionStr(value:string):void
	{
        if(this.cvo && this.cvo.singleAction && value != FigureAction.STAND) value = FigureAction.STAND;
        super.setActionStr(value);
	}

    public setAliveFlag(value:boolean):void
    {
        if(this._view != null) (this._view as MonsterGameObject).markDead();
        super.setAliveFlag(value);
        if(!value) 
        {
            this.resetHitedWhiteFilter();
            let delayTime:number = this.cvo.deadNoHide ? 1000000 : 2000;
            let needImmediately:boolean = (this._view == null);//_view存在的话，设为flase不立即移除，因为要做死亡击飞或者死亡渐隐动画
            Manager.model.getGameobject().removeGameObject(this, needImmediately, delayTime);
        }
    }

    public setBattleFlag(value:boolean):void
	{
		super.setBattleFlag(value);
		let self = Manager.model.self;
		if(this._view && self.target == this) (this._view as MonsterGameObject).eventStrip(value);
	}

    public playDeadAnimation():void
    {
        if(this._view != null) (this._view as MonsterGameObject).playMonsterDeadAnimation();
    }

    private setCVO(cvoID:number):void
    {
        this._cvo = MonsterCVO.getCVO(cvoID);
        if(this._cvo.grade == MonsterGrade.ELITE || this._cvo.grade == MonsterGrade.BOSS) this._elementType = GameObjectType.MONSTER_BOSS;
        else this._elementType = GameObjectType.MONSTER_NORMAL;
    }

    public getBombShootPos():egret.Point
    {
        return new egret.Point(this.x, this.y - this._cvo.height / 2);
    }
	
    /**
	 * @param flag 1脚底 2名称高度 3名称高度一半
	 */	
    public getBuffAniPos(flag:number):egret.Point
    {
        if(this._cvo != null)
        {
            if(flag == 1) return new egret.Point();
            else if(flag == 2) return new egret.Point(0, -this._cvo.height - 30);
            else if(flag == 3) return new egret.Point(0, -this._cvo.height / 2);
        }
        return new egret.Point();
    }
		
	public getSctPos():egret.Point
	{
		return new egret.Point(this.x, this.y - this._cvo.height / 2);
	}

	public beatBack(targetX:number, targetY:number):void
	{
		if(this._view != null) (this._view as MonsterGameObject).eventBeatBack(targetX, targetY);
	}

    public parse(data:TCPPacketIn,isNew:boolean):void
    {
        this.attrInfo.setValue(AttrDescType.HP_MAX, data.readInt64());
        this.attrInfo.setValue(AttrDescType.HP, data.readInt64());
        this.attrInfo.setValue(AttrDescType.SPEED, data.readShort());
        let posX:number = data.readShort();
        let posY:number = data.readShort();
        if(isNew)this.updatePostion(posX, posY);
        this._union = data.readInt();
        this.parseBuff(data);
        this.attrInfo.setValue(AttrDescType.FIGHT, data.readInt());
        this.attrInfo.setValue(AttrDescType.LEVEL, data.readShort());
    }

    public get level():number
    {
        if(this.attrInfo.level > 0) return this.attrInfo.level;
        return this._cvo.level;
    }

	private parseBuff(data:TCPPacketIn):void
	{
		var buff:BuffCVO;
		var buffGroupID:number;
        var buffLevel:number;
		let buffLen:number = data.readShort();
		for(let i:number = 0; i < buffLen; i++)
		{
			buffGroupID = data.readInt();
            buffLevel = data.readByte();
            buff = this.getBuffById(buffGroupID) as BuffCVO;
			if(buff == null)
			{
				buff = BuffCVO.getCVO(buffGroupID, buffLevel);
				this.addBuff(buff);
			}
		}
	}

    public createGameObject():GameObject
    {
        if(this._view == null)this._view = Manager.pool.create(MonsterGameObject, this);
		return this._view as MonsterGameObject;
    }
		
    public dispose():void
    {
        super.dispose();
        this._cvo = null;
    }
}