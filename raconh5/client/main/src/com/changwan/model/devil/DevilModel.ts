/**
 * 魔神降临model
 * liangyan
 * create 2018-04-10
*/
class DevilModel extends egret.EventDispatcher
{
    public constructor()
    {
        super();
        this._grabInfos = [];
    }
    private _lastKingInfo:DevilKingInfo;
    public set lastKingInfo(value:DevilKingInfo)
    {
        if(this._lastKingInfo == value) return;
        this._lastKingInfo = value;
        this.dispatchEvent(new DevilEvent(DevilEvent.DEVIL_LAST_KING_UPDATE));
    }
    /**上期霸主信息 */
    public get lastKingInfo():DevilKingInfo
    {
        return this._lastKingInfo;
    }
    /**结算信息 */
    public resultInfo:DevilResultInfo;

    private _grabInfos:DevilGrabInfo[];
    public set grabInfos(value:DevilGrabInfo[])
    {
        if(this._grabInfos == value) return;
        this._grabInfos = value;
        this.dispatchEvent(new DevilEvent(DevilEvent.DEVIL_GRAB_LIST_UPDATE));
    }
    /**抢夺列表信息 */
    public get grabInfos():DevilGrabInfo[]
    {
        return this._grabInfos;
    }

    /**禁止抢夺的截止时间戳 */
    public canGrabTime:number;

    /*********************************抄袭ArenaModel******************************************/
    private _result:boolean;
    private _score:number;
    public selfInfo:PlayerGameObjectInfo;
    public enemyInfo:PlayerGameObjectInfo;
    public isGrabing:boolean;
    public readWhenMapLoaded:boolean;
    public updatePKData(pi:TCPPacketIn):void
    {
        this._result = pi.readByte() == 1;
        this._score = pi.readInt();
        //模拟自己
        if(this.selfInfo) Manager.pool.push(this.selfInfo);
        let self:SelfGameObjectInfo = Manager.model.self;
        let selfRole:RoleInfo = Manager.pool.create(RoleInfo);
        selfRole.id = self.role.id + 100;//+100避免跟真正的角色ID重叠
        this.selfInfo = Manager.pool.create(PlayerGameObjectInfo, selfRole.id, selfRole);
        this.selfInfo.attrInfo.setValue(AttrDescType.NICKNAME, self.attrInfo.nickName);
        this.selfInfo.attrInfo.setValue(AttrDescType.CAREER, self.attrInfo.career);
        this.selfInfo.attrInfo.setValue(AttrDescType.LEVEL, self.attrInfo.level);
        this.selfInfo.attrInfo.setValue(AttrDescType.HEAD_ICON, self.attrInfo.headIcon);
        this.selfInfo.attrInfo.setValue(AttrDescType.FIGHT, self.attrInfo.fight);
        this.selfInfo.attrInfo.setValue(AttrDescType.HP_MAX, self.attrInfo.hpMax);
        this.selfInfo.attrInfo.setValue(AttrDescType.HP, pi.readInt64());
		this.selfInfo.updateStyle(self.attrInfo.clothes, self.attrInfo.weapon, self.attrInfo.wing);
        this.selfInfo.attrInfo.setValue(AttrDescType.SPEED, self.attrInfo.speed);
        this.selfInfo.setDirection(Direction.RIGHT);
        this.selfInfo.attrInfo.setValue(AttrDescType.PET_ANI, self.attrInfo.petAniID);
        if(this.selfInfo.attrInfo.petAniID > 0)
        {
            let selfPet:PetGameObjectInfo = Manager.pool.create(PetGameObjectInfo, 3333);
            selfPet.isInvented = true;
            selfPet.attrInfo.setValue(AttrDescType.SPEED, self.attrInfo.speed);
            selfPet.setDirection(Direction.RIGHT);
            this.selfInfo.setPet(selfPet);
        }
        //模拟敌人
        if(this.enemyInfo) Manager.pool.push(this.enemyInfo);
        let enemyRole:RoleInfo = Manager.pool.create(RoleInfo);
        enemyRole.id = pi.readInt64();
        this.enemyInfo = Manager.pool.create(PlayerGameObjectInfo, enemyRole.id, enemyRole);
        this.enemyInfo.attrInfo.setValue(AttrDescType.NICKNAME, pi.readUTF());
        this.enemyInfo.attrInfo.setValue(AttrDescType.CAREER, pi.readByte());
        this.enemyInfo.attrInfo.setValue(AttrDescType.LEVEL, pi.readShort());
        this.enemyInfo.attrInfo.setValue(AttrDescType.HEAD_ICON, pi.readShort());
        this.enemyInfo.attrInfo.setValue(AttrDescType.FIGHT, pi.readInt());
        this.enemyInfo.attrInfo.setValue(AttrDescType.HP_MAX, pi.readInt64());
        this.enemyInfo.attrInfo.setValue(AttrDescType.HP, pi.readInt64());
        this.enemyInfo.updateStyle(pi.readShort(), pi.readShort(), pi.readShort());
        this.enemyInfo.attrInfo.setValue(AttrDescType.SPEED, self.attrInfo.speed);
        this.enemyInfo.setDirection(Direction.LEFT);
        this.enemyInfo.attrInfo.setValue(AttrDescType.PET_ANI, pi.readShort());
        if(this.enemyInfo.attrInfo.petAniID > 0)
        {
            let enemyPet:PetGameObjectInfo = Manager.pool.create(PetGameObjectInfo, 4444);
            enemyPet.isInvented = true;
            enemyPet.attrInfo.setValue(AttrDescType.SPEED, self.attrInfo.speed);
            enemyPet.setDirection(Direction.LEFT);
            this.enemyInfo.setPet(enemyPet);
        }

        this.selfInfo.updatePostion(self.x, self.y);
        this.enemyInfo.updatePostion(this.getEnemyBirthPos().x, this.getEnemyBirthPos().y);
        if(this.selfInfo.getPet()) this.selfInfo.getPet().updatePostion(self.getPet().x, self.getPet().y);
        if(this.enemyInfo.getPet()) this.enemyInfo.getPet().updatePostion(this.enemyInfo.x + 50, this.enemyInfo.y + 50);

        Manager.view.show(ViewID.ArenaPKHeadView, Manager.model.getDevil().selfInfo, Manager.model.getDevil().enemyInfo);
        this.readyByMapLoaded();
    }

    public readyByMapLoaded():void
    {
        if(Manager.model.getMap().mapDataLoadComplete 
           && (Manager.model.getMap().getId() == Number(DevilConfigCVO.getCVO(DevilConfigCVO.ID_GRAB_MAP).value)))
        {
            this.addPlayers();
        }
        else this.readWhenMapLoaded = true;
    }

    public checkByMapLoaded():void
    {
        if(this.readWhenMapLoaded && (Manager.model.getMap().getId() == Number(DevilConfigCVO.getCVO(DevilConfigCVO.ID_GRAB_MAP).value)))
        {
            this.readWhenMapLoaded = false;
            this.addPlayers();
        }
    }
    
    private addPlayers():void
    {
        this.showOrHideSelf(false);
        Manager.model.getGameobject().addGameObject(this.selfInfo);
        Manager.model.getGameobject().addGameObject(this.enemyInfo);
        if(this.selfInfo.getPet()) Manager.model.getGameobject().addGameObject(this.selfInfo.getPet());
        if(this.enemyInfo.getPet()) Manager.model.getGameobject().addGameObject(this.enemyInfo.getPet());
        Manager.render.add(this.startPK, this, 1500, 1, null, true);
    }
    
    public startPK():void
    {
        this.isGrabing = true;
        DevilBattleUtil.readyData();
        DevilBattleUtil.startWalkToCenter();
    }
    
    public clearPKData():void
    {
        this.isGrabing = false;
        this.selfInfo = this.enemyInfo = null;
        DevilBattleUtil.clearData();
    }

    public exitGrabHandler():void
    {
        Manager.view.show(ViewID.DevilGrabEff);
        Manager.view.hide(ViewID.ArenaPKHeadView);
        if(Manager.layer.panelDarkLayer.parent == null) Manager.global.gameMain.addChildAt(Manager.layer.panelDarkLayer, LayerIndex.panelDarkLayer);
        if(Manager.layer.uiLayer.parent == null) Manager.global.gameMain.addChildAt(Manager.layer.uiLayer, LayerIndex.uiLayer);
        if(Manager.layer.effectLayer.parent == null) Manager.global.gameMain.addChildAt(Manager.layer.effectLayer, LayerIndex.effectLayer);
        this.clearPKData();
        this.showOrHideSelf(true);
    }

    public showResultView():void
    {
        this.isGrabing = false;
        if(this._result)
        {
            this.selfInfo.setActionStr(FigureAction.STAND);
            this.enemyInfo.setActionStr(FigureAction.DEAD);
            this.enemyInfo.attrInfo.setValue(AttrDescType.HP, 0);
        }
        else
        {
            this.selfInfo.setActionStr(FigureAction.DEAD);
            this.enemyInfo.setActionStr(FigureAction.STAND);
            this.selfInfo.attrInfo.setValue(AttrDescType.HP, 0);
        }
        //您成功战胜了<font color='{0}'>{1}</font>，抢夺了<font color='{2}'>{3}</font>积分
        //您被<font color='{0}'>{1}</font>击败，获得了安慰奖励<font color='{2}'>{3}</font>积分
        let str = LangCVO.getContent(this._result ? "devil15" : "devil16", Color.GREEN_STR_2, this.enemyInfo.getName(), Color.GREEN_STR_2, this._score);
        FloatTips.addTips(str, this._result ? Color.YELLOR : Color.RED);
        Manager.render.add(this.sendExitGrab, this, 1500, 1, null, true);
    }

    private sendExitGrab():void
    {
        Manager.control.getDevil().exitGrab();
    }
    
    public showOrHideSelf(show:boolean):void
    {
        let self:SelfGameObjectInfo = Manager.model.self;
        let selfView:SelfGameObject = self.view as SelfGameObject;
        if(selfView) selfView.visible = show;
        if(self.getPet())
        {
            let selfPetView:SelfPetGameObject = self.getPet().view as SelfPetGameObject;
            if(selfPetView) selfPetView.visible = show;
        }
    }

    public getSelfTargetPos():egret.Point
    {
        if(this.selfInfo == null) return null;
        else return new egret.Point(this.selfInfo.x, this.selfInfo.y);
    }
    public getSeflPetTargetPos():egret.Point{ return PointUtil.getPoint2(DevilConfigCVO.getCVO(DevilConfigCVO.ID_SELF_PET_TARGET_POS).value); }
    public getEnemyBirthPos():egret.Point{ return PointUtil.getPoint2(DevilConfigCVO.getCVO(DevilConfigCVO.ID_ENEMY_BIRTH_POS).value); }
    public getEnemyTargetPos():egret.Point
    {
        if(this.selfInfo == null) return null;
        else return new egret.Point(this.selfInfo.x - 100, this.selfInfo.y + 50);
    }
    public getEnemyPetBirthPos():egret.Point{ return PointUtil.getPoint2(DevilConfigCVO.getCVO(DevilConfigCVO.ID_ENEMY_PET_BIRTH_POS).value); }
    public getEnemyPetTargetPos():egret.Point
    {
        if(this.selfInfo == null) return null;
        else return new egret.Point(this.selfInfo.getPet().x - 100, this.selfInfo.getPet().y + 50);
    }
    /*********************************抄袭ArenaModel******************************************/
}