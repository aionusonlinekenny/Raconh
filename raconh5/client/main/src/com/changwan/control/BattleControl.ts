/**
 *author Anydo
 *create 2017-11-21
 *description 
*/
class BattleControl extends BaseControl
{
    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.BATTLE_UPDATE, BattleUpdateCMD);
        Manager.socket.addCMD(Protocol.REVIVE_INFO, ReviveInfoCMD);
        Manager.socket.addCMD(Protocol.REVIVE_APPLY, ReviveApplyCMD);
        Manager.socket.addCMD(Protocol.REVIVE_UPDATE, ReviveUpdateCMD);
        Manager.socket.addCMD(Protocol.REVIVE_NOTICE, ReviveNoticeCMD);
        Manager.socket.addCMD(Protocol.POISONING_NOTICE, PoisoningNoticeCMD);
        Manager.socket.addCMD(Protocol.PET_ATTACK, PetAttackCMD);
    }

    /**请求复活人物
     * @param 复活类型 0原地 1复活点
     */
    public reviveApply(type:number):void
    {
        let cmd:ReviveApplyCMD = Manager.socket.getCMD(Protocol.REVIVE_APPLY) as ReviveApplyCMD;
        cmd.type = type;
        cmd.send();
    }

    /** 人物攻击 */
    public cmdPlayerAttack(target:AliveGameObjectInfo, skill:SkillInfo, targetPosX:number=0, targetPosY:number=0):void
    {
        let skillModel:SkillModel = Manager.model.getSkill();
        let self:SelfGameObjectInfo = Manager.model.self;
        skillModel.startCoolDownByGroupID(skill.cvo.groupID);
        skillModel.lastAttackTime = egret.getTimer();
        skillModel.commonCD = skill.cvo.commonColdDownTime;
        if(Manager.model.getAuto().autoHook)
        {
            skillModel.setAutoSkill();
        }
        self.setBattleFlag(true);
        if(target != null && skill != null && self.canPlayBomb2(target.x,target.y, skill.cvo)) 
        {
            self.playBomb(target, skill.cvo.bombIndex);
        }

        let rotation:number = target ? PointUtil.getAngle(self.x,self.y, target.x,target.y) : 0;
        if(skill.cvo.selfNeedPlayEffect) self.playSkillEffectInfo(skill.cvo, skill.cvo.effectSelfID, rotation);
        this.playSkillShake(skill.cvo);
        this.playSkillConfigEffect(skill.cvo, rotation);

        let cmd = Manager.socket.getCMD(Protocol.BATTLE_UPDATE) as BattleUpdateCMD;
        cmd.skillID = skill.cvo.groupID;
        cmd.targetPosX = target ? target.x : targetPosX;
        cmd.targetPosY = target ? target.y : targetPosY;
        cmd.targetID = (target != null) ? target.id : 0;
        cmd.send();
    }

    public playSkillShake(skillCVO:SkillCVO):void
    {
        if(skillCVO.shakeConfig == "") return;
        let arr:string[] = skillCVO.shakeConfig.split(",");
        Manager.control.getMap().view.setShake(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]), arr[3] == "1");
    }

    public playSkillConfigEffect(skillCVO:SkillCVO,rotation:number):void
    {
        if(skillCVO.hasConfigEffect) Manager.model.self.playSkillEffectInfo(skillCVO,0,rotation,true);
    }
    
    /**宠物攻击
     * @param 技能id
     * @param 目标id
     */
    public cmdPetAttack(skillID:number, targeID:number):void
    {
        let cmd = Manager.socket.getCMD(Protocol.PET_ATTACK) as PetAttackCMD;
        cmd.skillID = skillID;
        cmd.targetID = targeID;
        cmd.send();
    }
}