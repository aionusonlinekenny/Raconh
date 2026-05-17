/**
 *author Anydo
 *create 2018-1-19
 *description 
*/
class SceneRobotGameObjectInfo extends GameObjectInfo
{
    private _cvo:SceneRobotCVO;
    public get cvo():SceneRobotCVO{ return this._cvo; }

    public _infoMonster:MonsterGameObjectInfo;
    public get infoMonster():MonsterGameObjectInfo{ return this._infoMonster; }

    public _infoPlayer:PlayerGameObjectInfo;
    public get infoPlayer():PlayerGameObjectInfo{ return this._infoPlayer; }

    public getType():number{ return GameObjectType.SCENE_ROBOT; }
    public canHited(showMsg:boolean = true):boolean{ return false; }
    public getTotalBlood():number{ return 0; }
    public getBlood():number{ return 0; }

    protected addEvent():void
    {
        if(this._cvo.mapResID != Manager.model.getMap().mapCVO.res) return;
        Manager.model.self.addEventListener(GameObjectEvent.GO_INDEX9, this.__update9Scale, this);
    }
    
    protected removeEvent():void
    {
        Manager.model.self.removeEventListener(GameObjectEvent.GO_INDEX9, this.__update9Scale, this);
    }

    public reuse(id:number,cvo:SceneRobotCVO):void
    {
        this._cvo = cvo;
        super.reuse(id);
        this.createPlayerInfo();
        this.createMonsterInfo();
    }

    public unuse():void
    {
        super.unuse();
        this._cvo = null;
        if(this._infoPlayer)
        {
            Manager.pool.push(this._infoPlayer);
            this._infoPlayer = null;
        }
        if(this._infoMonster)
        {
            Manager.pool.push(this._infoMonster);
            this._infoMonster = null;
        }
    }

    private createMonsterInfo():void
    {
        if(this._cvo.monsterId == 0) return null;
        this._infoMonster = Manager.pool.create(MonsterGameObjectInfo, this._cvo.monsterId * 1000, this._cvo.monsterId);
        this._infoMonster.isSceneRobot = true;
        this._infoMonster.setActionStr(FigureAction.ATTACK1);
        this._infoMonster.setDirection(Direction.getDir(this._cvo.posxMon, this._cvo.posyMon, 0, 0));
    }

    private createPlayerInfo():void
    {
        let id:number = this._cvo.id + Manager.model.self.id;
        let roleInfo:RoleInfo = Manager.pool.create(RoleInfo);
        roleInfo.id = id;
        this._infoPlayer = Manager.pool.create(PlayerGameObjectInfo, id, roleInfo);
        this._infoPlayer.isSceneRobot = true;
        if(this._cvo.playerStyId != 0)
        {
            let styleCvo:SceneRobotStyleCVO = SceneRobotStyleCVO.getCVO(this._cvo.playerStyId);
            this._infoPlayer.attrInfo.nickName = styleCvo.playerName;
            this._infoPlayer.attrInfo.career = styleCvo.career;
            this._infoPlayer.updateStyle(styleCvo.clothes, styleCvo.weapon, styleCvo.wing);
        }
        else
        {
            this.randomPlayerStyle();
        }
        this._infoPlayer.setActionStr(FigureAction.ATTACK1);
        this._infoPlayer.setDirection(Direction.getDir(0, 0, this._cvo.posxMon, this._cvo.posyMon));
    }

    public randomPlayerStyle():void
    {
        if(this._cvo.playerStyId != 0) return;
        let self:SelfGameObjectInfo = Manager.model.self;
        this._infoPlayer.attrInfo.nickName = SceneRobotNameCVO.getRandomName();
        this._infoPlayer.attrInfo.career = (Math.random() > 0.5) ? 1 : 2;
        let clothes:number = this.changeStyleID(self.attrInfo.clothes, this._infoPlayer.attrInfo.career, 1);
        let weapon:number = this.changeStyleID(self.attrInfo.weapon, this._infoPlayer.attrInfo.career, 2);
        let wing:number = (self.attrInfo.career == this._infoPlayer.attrInfo.career) ? self.attrInfo.wing : 0;
        this._infoPlayer.updateStyle(clothes, weapon, wing);
    }

    /**
	 * 根据职业转换资源ID
     * resouceID 原始资源ID
     * career 职业
     * flag 1衣服 2武器
	 */	
    private changeStyleID(resouceID:number, career:number, flag:number):number
    {
        if(flag == 1)
        {
            return (career == 1) ? (resouceID % 100 + 1000) : (resouceID % 100 + 2000);
        }
        else if(flag == 2)
        {
            return (career == 1) ? (resouceID % 100 + 9000) : (resouceID % 100 + 8000);
        }
    }

    private __update9Scale(e:GameObjectEvent):void
    {
        if(Manager.model.self.isIn9Scale(this, 2))
        {
            if(!this.isInMapFlag) Manager.model.getGameobject().addGameObject(this);
        }
        else 
        {
            this.remove(true);
        }
    }

    public createGameObject():GameObject
    {
        if(this._view == null)this._view = Manager.pool.create(SceneRobotGameObject,this);
        return this._view;
    }

    public dispose():void
    {
        super.dispose();
        this._cvo = null;
        if(this._infoPlayer)
        {
            Manager.pool.push(this._infoPlayer);
            this._infoPlayer = null;
        }
        if(this._infoMonster)
        {
            Manager.pool.push(this._infoMonster);
            this._infoMonster = null;
        }
    }
}