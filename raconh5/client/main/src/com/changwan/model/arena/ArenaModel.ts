/**
 *author Anydo
 *create 2017-12-27
 *description 
*/
class ArenaModel extends egret.EventDispatcher
{
    public countLeft:number;//剩余挑战次数
    public countHasBuy:number;//已购买次数
    public countCDTime:number;//挑战次数恢复时间戳(秒)
	
    public myRank:number;//自己当前排名
    public myMaxRank:number;//自己历史最高排名
	public preRenewTime:number;
    public readWhenMapLoaded:boolean;
    public maxGetedIDs:number[];

    public selfInfo:PlayerGameObjectInfo;
    public enemyInfo:PlayerGameObjectInfo;
    public isPlaying:boolean;
    public resultObj:any;

    /**0竞技场，1斗地主，2盟主战 */
    public playType:number = 0;

    public closeOpenBfPanel:boolean = false;
    
    public constructor()
    {
        super();
        this.myMaxRank = 9999;
        this.maxGetedIDs = [];
    }
    
    public updatePKCount(pi:TCPPacketIn):void
    {
        this.countLeft = pi.readByte();
        this.countCDTime = pi.readInt();
        this.countHasBuy = pi.readByte();
        this.dispatchEvent(new ArenaEvent(ArenaEvent.UPDATE_PK_COUNT));
    }
    
    public updateMaxRankAward(pi:TCPPacketIn):void
    {
        this.myMaxRank = pi.readShort();
        this.maxGetedIDs = [];
        let count:number = pi.readShort();
        for(let i:number = 0; i < count; i++)
        {
            this.maxGetedIDs.push(pi.readByte());
        }
        this.dispatchEvent(new ArenaEvent(ArenaEvent.UPDATE_MAX_RANK_AWARD));
    }
    
    public updatePKLog(pi:TCPPacketIn):void
    {
        let logs:ArenaLogInfo[] = [];
        let count:number = pi.readShort();
        for(let i:number = 0; i < count; i++)
        {
            let log:ArenaLogInfo = new ArenaLogInfo();
            log.isAttack = (pi.readByte() == 1);
            log.isWin = (pi.readByte() == 1);
            log.logTime = pi.readInt();
            log.enemyName = pi.readUTF();
            log.rankOld = pi.readShort();
            log.rankNew = pi.readShort();
            log.honour = pi.readShort();
            logs.push(log);
        }
        this.dispatchEvent(new ArenaEvent(ArenaEvent.UPDATE_PK_LOG, logs));
    }

    public updateRank(pi:TCPPacketIn):void
    {
        this.myRank = pi.readShort();
        let ranks:ArenaRankInfo[] = [];
        let count:number = pi.readShort();
        for(let i:number = 0; i < count; i++)
        {
            let one:ArenaRankInfo = new ArenaRankInfo();
            one.playerName = pi.readUTF();
            one.career = pi.readByte();
            one.headID = pi.readShort();
            one.rank = pi.readShort();
            one.power = pi.readInt();
            ranks.push(one);
        }
        this.dispatchEvent(new ArenaEvent(ArenaEvent.UPDATE_RANK, ranks));
    }

    public updatePKData(pi:TCPPacketIn, isPlayer:boolean):void
    {
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
        this.selfInfo.attrInfo.setValue(AttrDescType.HP, self.attrInfo.hpMax);
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
        if(isPlayer)
        {
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
            this.enemyInfo.attrInfo.setValue(AttrDescType.HP, this.enemyInfo.attrInfo.hpMax);
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
        }
        else
        {
            let robotRank:number = pi.readShort();
            let robotName:string = pi.readUTF();
            let robotCvo:ArenaRobotCVO = ArenaRobotCVO.getCVOByRank(robotRank);
            robotName = cw.StringUtil.isEmptyStr(robotName) ? robotCvo.nickname : robotName;
            if(this.enemyInfo) Manager.pool.push(this.enemyInfo);
            let enemyRole:RoleInfo = Manager.pool.create(RoleInfo);
            enemyRole.id = robotRank;
            this.enemyInfo = Manager.pool.create(PlayerGameObjectInfo, robotRank, enemyRole);
            this.enemyInfo.attrInfo.setValue(AttrDescType.NICKNAME, robotName);
            this.enemyInfo.attrInfo.setValue(AttrDescType.CAREER, robotCvo.career);
            this.enemyInfo.attrInfo.setValue(AttrDescType.LEVEL, robotCvo.level);
            this.enemyInfo.attrInfo.setValue(AttrDescType.HEAD_ICON, robotCvo.headID);
            this.enemyInfo.attrInfo.setValue(AttrDescType.FIGHT, robotCvo.power);
            this.enemyInfo.attrInfo.setValue(AttrDescType.HP_MAX, robotCvo.hp);
            // this.enemyInfo.attrInfo.setValue(AttrDescType.FIGHT, self.attrInfo.fight);
            // this.enemyInfo.attrInfo.setValue(AttrDescType.HP_MAX, self.attrInfo.hpMax);
            this.enemyInfo.attrInfo.setValue(AttrDescType.HP, this.enemyInfo.attrInfo.hpMax);
            this.enemyInfo.updateStyle(robotCvo.clothes, robotCvo.weapon, robotCvo.wing);
            this.enemyInfo.attrInfo.setValue(AttrDescType.SPEED, self.attrInfo.speed);
            this.enemyInfo.setDirection(Direction.LEFT);
            this.enemyInfo.attrInfo.setValue(AttrDescType.PET_ANI, robotCvo.petAni);
            if(this.enemyInfo.attrInfo.petAniID > 0)
            {
                let enemyPet:PetGameObjectInfo = Manager.pool.create(PetGameObjectInfo, 4444);
                enemyPet.isInvented = true;
                enemyPet.attrInfo.setValue(AttrDescType.SPEED, self.attrInfo.speed);
                enemyPet.setDirection(Direction.LEFT);
                this.enemyInfo.setPet(enemyPet);
            }
        }
        this.selfInfo.updatePostion(this.getSelfBorthPos().x, this.getSelfBorthPos().y);
        this.enemyInfo.updatePostion(this.getEnemyBorthPos().x, this.getEnemyBorthPos().y);
        if(this.selfInfo.getPet()) this.selfInfo.getPet().updatePostion(this.getSelfPetBorthPos().x, this.getSelfPetBorthPos().y);
        if(this.enemyInfo.getPet()) this.enemyInfo.getPet().updatePostion(this.getEnemyPetBorthPos().x + 100, this.getEnemyPetBorthPos().y);
        //战斗结果
        this.resultObj = {};
        this.resultObj.isWin = (pi.readByte() == 1);
        if(this.playType == 1)
            Manager.model.getLaird().updatePlayResult(this.resultObj.isWin);
        this.resultObj.enemyName = this.enemyInfo.attrInfo.nickName;
        if(this.playType == 0 || this.playType == 1)
        {
            this.resultObj.rankOld = pi.readShort();
            this.resultObj.rankNew = pi.readShort();
            this.resultObj.rankMax = pi.readShort();
            this.resultObj.exp = pi.readInt();
            this.resultObj.honour = pi.readInt();
        }
        else if(this.playType == 2)
        {
            this.resultObj.winCount = pi.readShort();
            this.resultObj.rank = pi.readShort();
            this.resultObj.donate = pi.readInt();
            this.resultObj.honour = pi.readInt();
        }

        Manager.view.show(ViewID.ArenaPKHeadView, Manager.model.getArena().selfInfo, Manager.model.getArena().enemyInfo);
        Manager.view.show(ViewID.ArenaJumpBtnView);
		this.readyByMapLoaded();
    }

    public get hasMaxAwardCanGet():boolean
    {
        if(!OpenCVO.isOpen(OpenConst.ID_ARENA_PK)) return false;
        let maxCVOs:Array<ArenaMaxRankCVO> = ArenaMaxRankCVO.cvos;
        let arr:Array<ArenaMaxRankCVO> = [];
        for(let i:number = 0; i < maxCVOs.length; i++)
        {
            if(this.myMaxRank <= maxCVOs[i].rankTarget) arr.push(maxCVOs[i]);
        }
        for(let j:number = 0; j < arr.length; j++)
        {
            if(Manager.model.getArena().maxGetedIDs.indexOf(arr[j].id) == -1) return true;
        }
        return false;
    }

    public get hasPkCount():boolean
    {
        return this.countLeft > 0;
    }

    public PKHandler(enemyRank:number,enemyPower:number,enemyName:string=""):void
    {
        if(this.countLeft <= 0)
        {
            if(this.countHasBuy < 0) this.buyPKCountHandler();
            else FloatTips.addTips(LangCVO.getContent("arena4"));
            return;
        }
        let self:SelfGameObjectInfo = Manager.model.self;
        if(self.attrInfo.isTraining)
        {
            FloatTips.addTips(LangCVO.getContent("training7"), Color.RED);
            return;
        }
        if(self.attrInfo.nickName == enemyName)
        {
            FloatTips.addTips(LangCVO.getContent("arena5"));
            return;
        }
        if(!self.canJoinActive(true)) return;
        if(enemyPower > self.attrInfo.fight)
        {
            let info:CallBackInfo = Manager.pool.create(CallBackInfo,Manager.control.getArena().cmdPKSend,Manager.control.getArena(),enemyRank);
            Manager.tips.showTips(LangCVO.getContent("arena6"),info,true);
        }
        else Manager.control.getArena().cmdPKSend(enemyRank);
    }

    public renewRankHandler(checkTime:boolean):void
    {
        if(checkTime)
        {
            let now:number = egret.getTimer();
            if(now - this.preRenewTime < 5000)
            {
                FloatTips.addTips(LangCVO.getContent("arena9", Math.floor((5000 - (now - this.preRenewTime)) / 1000)));
                return;
            }
            this.preRenewTime = now;
        }
        Manager.socket.sendOnlyProtocol(Protocol.ARENA_RANK_UPDATE);
    }
    
    public buyPKCountHandler():void
    {
        let fullCount:number = Number(ArenaOtherCVO.getCVO("daily_count").value);
        if(Manager.model.getArena().countLeft >= fullCount)
        {
            FloatTips.addTips(LangCVO.getContent("arena24"));
            return;
        }
        let gain:GainLossVO = new GainLossVO(ArenaOtherCVO.getCVO("price").value);
        if(Manager.model.self.attrInfo.gold < gain.num)
        {
            FloatTips.addTips(LangCVO.getContent("common33"));
            return;
        }
        let vipLevel:number = Manager.model.self.attrInfo.vipLevel;
        if(this.countHasBuy >= ArenaVipCountCVO.getCanBuyCount(vipLevel))
        {
            FloatTips.addTips(LangCVO.getContent("arena25"));
            return;
        }
        let ok:CallBackInfo = Manager.pool.create(CallBackInfo,Manager.control.getArena().cmdPKCount,Manager.control.getArena(),1);
        Manager.tips.showTips(LangCVO.getContent("arena7", gain.num),ok,true);
    }
    
    public readyByMapLoaded():void
    {
        if(Manager.model.getMap().mapDataLoadComplete && (Manager.model.getMap().getId() == Number(ArenaOtherCVO.getCVO("map_id").value)))
        {
            this.startCountDown();
        }
        else
        {
            this.readWhenMapLoaded = true;
        }
    }

    public checkByMapLoaded():void
    {
        if(this.readWhenMapLoaded && (Manager.model.getMap().getId() == Number(ArenaOtherCVO.getCVO("map_id").value)))
        {
            this.readWhenMapLoaded = false;
            this.startCountDown();
        }
    }
    
    private startCountDown():void
    {
        this.showOrHideSelf(false);
        Manager.model.getGameobject().addGameObject(this.selfInfo);
        Manager.model.getGameobject().addGameObject(this.enemyInfo);
        if(this.selfInfo.getPet()) Manager.model.getGameobject().addGameObject(this.selfInfo.getPet());
        if(this.enemyInfo.getPet()) Manager.model.getGameobject().addGameObject(this.enemyInfo.getPet());
		Manager.view.show(ViewID.CountDownTool, 3, "countDownLabel_png", this.startPK, this);
    }
    
    public startPK():void
    {
        this.isPlaying = true;
        ArenaBattleUtil.readyData();
        ArenaBattleUtil.startJumpToCenter();
    }
    
    public clearPKData():void
    {
        this.isPlaying = false;
        this.resultObj = null;
        this.selfInfo = this.enemyInfo = null;
        ArenaBattleUtil.clearData();
    }

    public exitArenaHandler():void
    {
        Manager.view.hide(ViewID.ArenaPKHeadView);
        Manager.view.hide(ViewID.ArenaJumpBtnView);
        // Manager.layer.panelDarkLayer.visible = true;
        // Manager.layer.uiLayer.visible = true;
        // Manager.layer.effectLayer.visible = true;
        if(Manager.layer.panelDarkLayer.parent == null) Manager.global.gameMain.addChildAt(Manager.layer.panelDarkLayer, LayerIndex.panelDarkLayer);
        if(Manager.layer.uiLayer.parent == null) Manager.global.gameMain.addChildAt(Manager.layer.uiLayer, LayerIndex.uiLayer);
        if(Manager.layer.effectLayer.parent == null) Manager.global.gameMain.addChildAt(Manager.layer.effectLayer, LayerIndex.effectLayer);
        this.clearPKData();
        this.showOrHideSelf(true);
    }

    public showResultToolView():void
    {
        this.isPlaying = false;
        ArenaBattleUtil.clearTempTimes();
        if(this.resultObj.isWin)
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
        if(this.playType == 0)
            Manager.view.show(ViewID.ArenaResultView);
        else if(this.playType == 1)
        {
            if(this.resultObj.isWin)
                Manager.view.show(ViewID.LandlordResultWin);
            else
                Manager.view.show(ViewID.LandlordResultFail);
        }
        else if(this.playType == 2)
        {
            Manager.view.show(ViewID.ClubLeaderWarResultView);
        }
        this.dispatchEvent(new ArenaEvent(ArenaEvent.HIDE_JUMP_BTN));
    }
    
    public showOrHideSelf(show:boolean):void
    {
        let self:SelfGameObjectInfo = Manager.model.self;
        // let selfView:SelfGameObject = Manager.control.getMap().getGameObject(self) as SelfGameObject;
        let selfView:SelfGameObject = self.view as SelfGameObject;
        if(selfView) selfView.visible = show;
        if(self.getPet())
        {
            // let selfPetView:SelfPetGameObject = Manager.control.getMap().getGameObject(self.getPet()) as SelfPetGameObject;
            let selfPetView:SelfPetGameObject = self.getPet().view as SelfPetGameObject;
            if(selfPetView) selfPetView.visible = show;
        }
    }

    public getSelfBorthPos():egret.Point{ return PointUtil.getPoint2(ArenaOtherCVO.getCVO("self_borth").value); }
    public getSelfTargetPos():egret.Point{ return PointUtil.getPoint2(ArenaOtherCVO.getCVO("self_target").value); }
    public getEnemyBorthPos():egret.Point{ return PointUtil.getPoint2(ArenaOtherCVO.getCVO("enemy_borth").value); }
    public getEnemyTargetPos():egret.Point{ return PointUtil.getPoint2(ArenaOtherCVO.getCVO("enemy_target").value); }
    public getSelfPetBorthPos():egret.Point{ return PointUtil.getPoint2(ArenaOtherCVO.getCVO("selfpet_borth").value); }
    public getSelfPetTargetPos():egret.Point{ return PointUtil.getPoint2(ArenaOtherCVO.getCVO("selfpet_target").value); }
    public getEnemyPetBorthPos():egret.Point{ return PointUtil.getPoint2(ArenaOtherCVO.getCVO("enemypet_borth").value); }
    public getEnemyPetTargetPos():egret.Point{ return PointUtil.getPoint2(ArenaOtherCVO.getCVO("enemypet_target").value); }
}