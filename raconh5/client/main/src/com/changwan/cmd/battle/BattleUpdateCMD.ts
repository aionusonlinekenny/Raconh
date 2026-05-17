/**
 *author Anydo
 *create 2017-11-21
 *description 
*/
class BattleUpdateCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.BATTLE_UPDATE;
    }

    public skillID:number;//技能ID
    public targetID:number;//目标ID
    public targetPosX:number;//目标点坐标x
    public targetPosY:number;//目标点坐标y

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeShort(this.skillID);
        pkg.writeShort(this.targetPosX);
        pkg.writeShort(this.targetPosY);
        pkg.writeInt64(this.targetID);
    }

    public receive(pi:TCPPacketIn):void
    {
        let attackID:number = pi.readInt64();
        let targetPosX:number = pi.readShort();
        let targetPosY:number = pi.readShort();
        let skillID:number = pi.readShort();

        let attack:AliveGameObjectInfo;
		let skill:SkillCVO = SkillCVO.getCVO(skillID);
        if(skill.mainType == 2)
        {
            attack = Manager.model.getGameobject().getGameObject(attackID) as AliveGameObjectInfo;
            if(attack) attack = (attack as PlayerGameObjectInfo).getPet();
        }
        else attack = Manager.model.getGameobject().getGameObject(attackID) as AliveGameObjectInfo;

        if(attack != null)
        {
            this.processAttack(attack,skill);
            this.processAttackSkill(attack,skill);
            this.processAttackAction(attack,skill);
        }
        
		let attacked:AliveGameObjectInfo;
		let isMainTarget:boolean = true;
        let len:number = pi.readShort();
        for(let i:number = 0; i < len; i++)
        {
            let attackedID:number = pi.readInt64();
            let moveType:number = pi.readByte();//移动类型 0 不移动 1 击退 2 击飞
            let newX:number = pi.readShort();
            let newY:number = pi.readShort();
            let ignoreHP:boolean = (pi.readByte() == 1);
            let newBlood:number = pi.readInt64();
            let hurtType:number = pi.readByte();//伤害类型 1 闪避 2 普通 3 暴击 4 跳闪
            let hurtValue:number = pi.readInt();//伤害值

            attacked = Manager.model.getGameobject().getGameObject(attackedID) as AliveGameObjectInfo;
            if(attacked != null)
            {
                if(isMainTarget)
                {
                    if(attack != null)
                    {
                        this.processAttackDirection(attack, attacked, skill);
                        this.processAttackSkillByDirection(attack,PointUtil.getAngle(attack.x,attack.y,attacked.x,attacked.y),skill);
                    }
                }
                this.processAttackedSkill(attack, attacked,skill);
                this.processAttacked(attack, attacked, skill, moveType, newX, newY);
                this.processAttactedSct(attack, attacked, hurtType, hurtValue);
                this.processAttackSkillBomb(attack, attacked, skill);

                if(attacked && attack && attack.isType(GameObjectType.SELF))
                {
                    attacked.setHitedWhiteFilter();
                }
                isMainTarget = false;//第一个设为主目标，后面都为辅助目标
                attacked.attackID = attackID;
                if(!ignoreHP) attacked.attrInfo.setValue(AttrDescType.HP, newBlood);
            }
        }
    }

    private processAttack(attack:AliveGameObjectInfo, skill:SkillCVO):void
    {
        attack.setBattleFlag(true); //攻击技能
        if(attack instanceof PlayerGameObjectInfo)
        {
            if(attack.isType(GameObjectType.SELF))
            {
                let self:SelfGameObjectInfo = Manager.model.self;
                if(self.target != null)
                {
                    if(self.selfPet != null && (self.selfPet.target != self.target))
                    {
                        self.selfPet.updateTarget(self.target);
                    }
                }
            }
        }
    }
    
    private processAttackSkill(attack:AliveGameObjectInfo, skill:SkillCVO):void
    {
        if(attack.isType(GameObjectType.SELF)) return;
        if(!skill.selfNeedPlayEffect) return;
        attack.playSkillEffectInfo(skill, skill.effectSelfID);
    }
		
    private processAttackAction(attack:AliveGameObjectInfo, skill:SkillCVO):void
    {
        if(skill.action == 100) return;//不需要播放动作
        if(!attack.isType(GameObjectType.SELF) && attack.getAliveFlag())
        {
            if(attack instanceof PlayerGameObjectInfo) attack.playRandomAttack();
            else attack.setActionStr(FigureAction.ATTACK1);
        }
    }
		
    private processAttackDirection(attack:AliveGameObjectInfo, attacked:AliveGameObjectInfo, skill:SkillCVO):void
    {
        if(attack.isType(GameObjectType.SELF)) return;
        if(attack instanceof MonsterGameObjectInfo && attack.cvo.singleDic) return;
        let dir:string = Direction.getDir(attack.x,attack.y,attacked.x,attacked.y);
        if(attack instanceof MonsterGameObjectInfo && (attack as MonsterGameObjectInfo).cvo.grade == 2 && attack.cvo.isMaterialFireLong())
        {
            if(dir == Direction.RIGHT_TOP || dir == Direction.RIGHT) dir = Direction.RIGHT_DOWN;
            else if(dir == Direction.LEFT_TOP || dir == Direction.LEFT) dir = Direction.LEFT_DOWN;
            attack.setDirection(dir);
            if(skill.mainType == 3)
            {
                Manager.control.getMaterialCopy().addMaterialEffect(attack as MonsterGameObjectInfo);
            }
            return;
        }
        attack.setDirection(dir);
    }

    private processAttackSkillByDirection(attack:AliveGameObjectInfo, rotation:number, skill:SkillCVO):void
    {
        if(!skill.hasConfigEffect) return;
        if(attack.isType(GameObjectType.SELF)) return;
        attack.playSkillEffectInfo(skill, skill.effectSelfID, rotation, true);
    }

    private processAttackedSkill(attack:AliveGameObjectInfo, attacked:AliveGameObjectInfo, skill:SkillCVO):void
    {
        if(attack == attacked) return;
        if(!skill.targetNeedPlayEffect) return;
        if(attack && !attack.isSelfGO && !attacked.isSelfGO) return;
        attacked.playSkillEffectInfo(skill, skill.effectTarID);
    }

    //** 处理回击和击退 */
    private processAttacked(attack:AliveGameObjectInfo, attacked:AliveGameObjectInfo, skill:SkillCVO, moveType:number, newX:number, newY:number):void
    {
        if(attack == attacked) return;
        attacked.setBattleFlag(true);
        if(attacked.isType(GameObjectType.SELF))
        {
            let needHitBack:boolean = false;
            if(Manager.model.self.target == null) needHitBack = true;
            if((attack != null) && (Manager.model.self.target == attack)) needHitBack = true;
            
            if(needHitBack && !Manager.model.getAuto().autoHook && (attack != null) && attack.getAliveFlag())
            {
                if(!attack.isType(GameObjectType.SELF))
                {
                    if(Manager.model.self.selfPet != null)
                    {
                        if((Manager.model.self.selfPet as SelfPetGameObjectInfo).canHit() && Manager.model.self.selfPet.target == null)
                        {
                            Manager.model.self.selfPet.updateTarget(attack);
                        }
                    }
                }
            }
        }
        
        if(moveType && !(attacked.x == newX && attacked.y == newY))
        {
            if(moveType == 1)
            {
                if(attack == null) return;
                if(attacked instanceof MonsterGameObjectInfo) attacked.beatBack(newX, newY);
            }
        }
    }

    private processAttackSkillBomb(attack:AliveGameObjectInfo, attacked:AliveGameObjectInfo, skill:SkillCVO):void
    {
        if(attack == null) return;
        if(attack.isType(GameObjectType.SELF)) return;
        if(!attack.canPlayBomb2(attacked.x,attacked.y, skill)) return;
        attack.playBomb(attacked, skill.bombIndex);
    }

    /** 
     * 播放sct
     * @hurtType 伤害类型 1 闪避 2 普通 3 暴击
     */
    private processAttactedSct(attack:AliveGameObjectInfo, attacked:AliveGameObjectInfo, hurtType:number, hurtValue:number):void
    {
        if(hurtType <= 0) return;
        if(Manager.global.lifecyclePause) return;
        if(attack && !attack.isSelfGO && attacked && !attacked.isSelfGO) return;
        let direction:number = attack ? PointUtil.getAngle(attack.x,attack.y, attacked.x,attacked.y) : 0;
        let sctType:number;
        switch(hurtType)
        {
            case 1:
                sctType = attacked.isType(GameObjectType.SELF) ? SCTConst.TYPE_DODGE : SCTConst.TYPE_MISS;
                break;
            case 2:
                if(attacked.isType(GameObjectType.SELF)) sctType = SCTConst.TYPE_HURT;
                else
                {
                    sctType = attack.isType(GameObjectType.SELF) ? SCTConst.TYPE_SKILL : SCTConst.TYPE_PET;
                }
                break;
            case 3:
                if(attacked.isType(GameObjectType.SELF)) sctType = SCTConst.TYPE_HURT_CRIT;
                else
                {
                    sctType = attack.isType(GameObjectType.SELF) ? SCTConst.TYPE_SKILL_CRIT : SCTConst.TYPE_PET_CRIT;
                }
                break;
            default:
                sctType = SCTConst.TYPE_SKILL;
                break;
        }
        attacked.playSCT(sctType, hurtValue, direction);
    }
}