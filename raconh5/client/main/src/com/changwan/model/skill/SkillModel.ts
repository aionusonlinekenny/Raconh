/**
 *author Anydo
 *create 2017-11-14
 *description 
*/
class SkillModel extends egret.EventDispatcher
{
    public self:SelfGameObjectInfo;
    /**
     * 记录当前使用的技能的公共CD时间 
     */		
    public commonCD:number = 0;
    public defaultSkill:SkillInfo;
    public currentSkill:SkillInfo;
    public lastAttackTime:number = 0;
    
    public currentPetSkill:SkillInfo;
    public lastPetAttackTime:number = 0;
    
    public hasSetupSkill:boolean;
    
    private _hookSkills:SkillInfo[];

    private _carerrSkills:SkillInfo[];
    public get careerSkills():SkillInfo[]{ return this._carerrSkills; }
    /**根据类型返回职业技能 1：主动 0：被动 */
    public getCareerSkillsByType(type:number = 1):SkillInfo[]
    {
        let result:Array<SkillInfo> = [];
        let len = this._carerrSkills.length;
        for(let i = 0; i < len; i++)
        {
            if(this._carerrSkills[i].cvo.type == type) result.push(this._carerrSkills[i]);
        }
        if(result.length > 1) result.sort((a:SkillInfo, b:SkillInfo) => { return (a.cvo.groupID > b.cvo.groupID ? 1 : -1); });
        return result;
    }
    
    public constructor()
    {
        super();
        this.init();
    }
    
    private init():void
    {
        this.resetCareerSkills();
        this.self = Manager.model.self;
        let id:number = this.self.attrInfo.career * 1000 + 1;
        this.defaultSkill = this.currentSkill = new SkillInfo(SkillCVO.getCVO(id), 1);
        this.currentPetSkill = new SkillInfo(SkillCVO.getCVO(4001), 1);
    }

    public resetCareerSkills():void
    {
        this._carerrSkills = [];
    }

    public parseHookSkills():void
    {
        this._hookSkills = this.getCareerSkillsByType(1);
        if(this._hookSkills.length > 1) this._hookSkills.sort((a:SkillInfo, b:SkillInfo) => { return (a.cvo.autoHookPriority < b.cvo.autoHookPriority ? 1 : -1); });
    }

    public updateCareerSkills(info:SkillInfo):void
    {
        if(!info) return;
        let curInfo = this.getSkillInfoByGroupID(info.cvo.groupID);
        if(curInfo)
        {
            let index = this._carerrSkills.indexOf(curInfo);
            this._carerrSkills[index] = info;
        }
        else
        {
            this._carerrSkills.push(info);
            if(info.cvo.type == 1)
            {
                this.parseHookSkills();
                Manager.view.show(ViewID.SkillGainNewView, info.cvo.icon);
            }
        }
    }

    public getSkillInfoByGroupID(groupID:number):SkillInfo
    {
        if(this.defaultSkill.cvo.groupID == groupID) return this.defaultSkill;
        for(let i:number = 0; i < this._carerrSkills.length; i++)
        {
            if(this._carerrSkills[i].cvo.groupID == groupID) return this._carerrSkills[i];
        }
        return null;
    }
    /**根据分组id获取被动技能状态 */
    public getPassiveSkillStatus(groupID:number):number
    {
        let cvo = SkillCVO.getCVO(groupID);
        if(cvo.type == 1) return -1;
        let info = this.getSkillInfoByGroupID(groupID);
        if(info) return SkillTipsType.HAS_ACT;
        else
        {
            let condition = new ConditionVO(cvo.upgradeCond);
            let loss = new GainLossVO(cvo.upgradeCost);
            let condValue = condition && condition.isSatisfy();
            let lossValue = loss && loss.isEnough();
            if(condValue && lossValue) return SkillTipsType.ACTIVE;
            else if(!condValue) return SkillTipsType.AWAKE;
            else if(!lossValue) return SkillTipsType.GO_SHOP;
        }
    }
    /**根据分组id获取战力 */
    public getFightByGroupID(groupID:number):number
    {
        let result:number = 0;
        let info:SkillInfo = this.getSkillInfoByGroupID(groupID);
        if(info)
        {
            let cvos = SkillCVO.getCVOsByGroup(groupID);
            let len = cvos.length;
            for(let i = 0; i < len; i++)
            {
                if(this.getPassiveSkillStatus(cvos[i].groupID) == SkillTipsType.HAS_ACT) result += cvos[i].addFightValue;
            }
            let formulaCvo:SkillFormulaCVO = SkillFormulaCVO.getCVO(groupID, SkillFormulaType.FIGHT);
            result += formulaCvo.getFormulaResult(info.level);
        }
        return result;
    }
    /**检测是否可升级技能或激活被动 */
    public checkTipsShow():boolean
    {
        let curCoin = Manager.model.self.attrInfo.coin;
        let selfLvl = Manager.model.self.attrInfo.level;
        let infos = this.careerSkills.concat(this.defaultSkill);
        let info:SkillInfo;
        //铜钱升级主动技能
        for(let i = 0; i < infos.length; i++)
        {
            info = infos[i];
            if(info.cvo.mainType != 1) continue;
            if(info.cvo.type == 0) continue;
            if(info.level >= selfLvl || info.isMaxLevel()) continue;
            if(curCoin >= (info.getSkillFormulaCvo(SkillFormulaType.LOSS).getFormulaResult(info.level))) return true;
        }
        //道具激活被动技能
        let skillCvos:Array<SkillCVO>;
        for(let i = 0; i < infos.length; i++)
        {
            info = infos[i];
            if(info.cvo.mainType != 1) continue;
            if(info.cvo.type == 0) continue;
            skillCvos = SkillCVO.getCVOsByGroup(info.cvo.groupID);
            for(let j = 0; j < skillCvos.length; j++)
            {
                if(this.getPassiveSkillStatus(skillCvos[j].groupID) == SkillTipsType.ACTIVE) return true;
            }
        }
        return false;
    }
    
    public startCoolDownByGroupID(groupID:number):void
    {
        let cur:SkillInfo = this.getSkillInfoByGroupID(groupID);
        if(cur == null) return;
        
        cur.startRunning();
        let coldTime:number = cur.cvo.commonColdDownTime;
        for(let i:number = 0; i < this._carerrSkills.length; i++)
        {
            if(this._carerrSkills[i] != cur)
            {
                this._carerrSkills[i].startCommonRunning(coldTime);
            }
        }
    }
    
    /**
     * 挂机时自动设置技能(没有处理冷却时间的技能)
     */		
    public setAutoSkill():void
    {
        if(this.self.isBuffState(BodyStateManger.BUFF_CHEN_MO))
        {
            this.currentSkill = this.defaultSkill;
            return;
        }
        if(this._hookSkills.length > 0)
        {
            let info:SkillInfo;
            for(let i:number = 0 ; i < this._hookSkills.length; i++)
            {
                info = this._hookSkills[i];
                if(!info.cvo.running)
                {
                    this.currentSkill = info;
                    return;
                }
            }
        }
        this.currentSkill = this.defaultSkill;
    }

    public setToDefaultSkill():void 
    {
        this.currentSkill = this.defaultSkill;
    }
    
    //this.currentSkill有问题的时候，临时纠正成默认技能
    public correctCurrentSkill():boolean
    {
        if(this.currentSkill == null || this.currentSkill.cvo == null)
        {
            this.setToDefaultSkill();
            return true;
        }
        return false;
    }
    
    public canHitBySkill(skillInfo:SkillInfo, showMsg:boolean = true):boolean 
    {
        if(skillInfo == null) return false;
        let that = this;
        if(that.self.isBuffState(BodyStateManger.BUFF_XUAN_YUN)) 
        {
            if(showMsg) FloatTips.addTips("????");
            return false;
        }
        if(that.self.isBuffState(BodyStateManger.BUFF_CHAO_FENG))
        {
            if(showMsg) FloatTips.addTips("????");
            return false;
        }
        if(that.self.isBuffState(BodyStateManger.BUFF_CHEN_MO) && !skillInfo.cvo.isDefault)
        {
            if(showMsg) FloatTips.addTips("????");
            return false;
        }
        if(that.self.isingState(BodyStateManger.ISING_JUMP)) return false;
        if(that.self.isingState(BodyStateManger.ISING_SPRINT)) return false;
        if(that.self.isingState(BodyStateManger.ISING_SLIDE)) return false;
        if(that.self.isingState(BodyStateManger.ISING_KITE)) return false;
        if(that.self.isingState(BodyStateManger.ISING_WATER)) return false;
        if(!skillInfo.cvo.isCommonCD && skillInfo.cvo.running) return false;
        if(that.self.target && !skillInfo.cvo.checkCanHitByGameObjectType(that.self.target.getType())) 
        {
            if(that.self.target instanceof NPCGameObjectInfo) that.self.updateTarget(null);
            return false;
        }
        return true;
    }
    
    /**
     * 判断公共CD时间是否已过，能否攻击
     */		
    public canHitByCommonCD():boolean
    {
        return (egret.getTimer() - this.lastAttackTime) >= this.commonCD;
    }
		
    /**
     * 宠物能否攻击。
     */		
    public canPetHitByCommonCD():boolean
    {
        return (egret.getTimer() - this.lastPetAttackTime) >= this.currentPetSkill.coldDownTime;
    }

    public renderAutoHook2():void
    {
        this.renderPlayerAutoHook2();
        this.renderPetAutoHook2();
    }

    public renderAutoHook():void
    {
        this.renderPlayerAutoHook();
        this.renderPetAutoHook();
    }

    private renderPlayerAutoHook():void
	{
        let that = this;
        if(!that.self.getAliveFlag()) return;
        if(!that.self.canHit(false,true)) return;
        if(!FigureAction.isAttackAction(that.self.getActionStr())) return;
        if(that.self.target == null) return;
        if(!(that.self.target instanceof AliveGameObjectInfo)) return;
        if(!(that.self.target as AliveGameObjectInfo).canHited(false)) return;
        if(!that.canHitBySkill(that.currentSkill, false))
        {
            that.setAutoSkill();
        }
        if(that.currentSkill.cvo.running) return;
        if(!that.currentSkill.cvo.checkCanHitByGameObjectType(that.self.target.getType())) return;
        if(!that.self.isInAttackRect()) return;
        // that.startCoolDownByGroupID(that.currentSkill.cvo.groupID);
        // that.lastAttackTime = egret.getTimer();
        // that.commonCD = that.currentSkill.cvo.commonColdDownTime;
        Manager.control.getBattle().cmdPlayerAttack(that.self.target as AliveGameObjectInfo, that.currentSkill);
        that.self.setDirection(Direction.getDir(that.self.x, that.self.y, that.self.target.x, that.self.target.y));
    }

    private renderPlayerAutoHook2():void
	{
        let that = this;
        if(!that.self.canHit(false,true)) return;
        if(!FigureAction.isAttackAction(that.self.getActionStr())) return;
        if(that.self.target == null) return;
        if(!(that.self.target instanceof AliveGameObjectInfo)) return;
        if(!(that.self.target as AliveGameObjectInfo).canHited(false)) return;
        if(!that.canHitBySkill(that.currentSkill, false))
        {
            that.setAutoSkill();
        }
        if(that.currentSkill.cvo.running) return;
        if(!that.currentSkill.cvo.checkCanHitByGameObjectType(that.self.target.getType())) return;
        if(!that.self.isInAttackRect()) return;
        Manager.control.getBattle().cmdPlayerAttack(that.self.target as AliveGameObjectInfo, that.currentSkill);
        that.self.setDirection(Direction.getDir(that.self.x, that.self.y, that.self.target.x, that.self.target.y));
    }

    private renderPetAutoHook():void
	{
        let that = this;
        if(that.self.selfPet == null) return;
        if(!that.self.selfPet.canHit()) return;
        if(!FigureAction.isAttackAction(that.self.getActionStr())) return;
        if(that.self.selfPet.target == null) return;
        if(!that.self.selfPet.isInAttackRect()) return;
        that.lastPetAttackTime = egret.getTimer();
        Manager.control.getBattle().cmdPetAttack(that.currentPetSkill.cvo.groupID, (that.self.selfPet.target as AliveGameObjectInfo).id);
        that.self.selfPet.setDirection(Direction.getDir(that.self.selfPet.x, that.self.selfPet.y, that.self.selfPet.target.x, that.self.selfPet.target.y));
    }

    private renderPetAutoHook2():void
	{
        let that = this;
        if(that.self.selfPet == null) return;
        if(!that.self.selfPet.canHit()) return;
        if(!FigureAction.isAttackAction(that.self.getActionStr())) return;
        if(that.self.selfPet.target == null) return;
        if(!that.self.selfPet.isInAttackRect()) return;
        that.lastPetAttackTime = egret.getTimer();
        Manager.control.getBattle().cmdPetAttack(that.currentPetSkill.cvo.groupID, (that.self.selfPet.target as AliveGameObjectInfo).id);
        that.self.selfPet.setDirection(Direction.getDir(that.self.selfPet.x, that.self.selfPet.y, that.self.selfPet.target.x, that.self.selfPet.target.y));
    }
}