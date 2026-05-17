/**
 *author Anydo
 *create 2017-11-10
 *description 
*/
class SkillCVO extends egret.EventDispatcher
{
    /**
     * 学习/升级后技能ID
     */		
    public nextSkillID:number;

    /**
     * 技能分组id 
     */
    public groupID:number;
    /**
     * 技能名称
     */
    public name:string;
    /**
     * 技能大类型：1.角色  2.宠物  3.怪物技能 
     */
    public mainType:number;
    /**
     * 技能小类型：0.出生 1.苍穹(男) 2.扶风(女) 3.宠  4.怪
     */		
    public subType:number;
    /**
     * 技能类型  0.被动  1.主动
     */		
    public type:number;
    /**
     * 升到下一级条件  1,任务ID  2,角色等级  3,觉醒等级
     */		
    public upgradeCond:string;
    /**
     * 升到下一级消耗  1,铜钱数量  2,材料id,材料数量
     */		
    public upgradeCost:string;
    /**
     * 刻印关联的技能
     */		
    public mainGroup:number;
    /**
     * 击退距离（像素）
     */	
    public beatBackDis:number;
    /**
     * 起效对象(效果目标)(按位来可组合)  0.不区分  1.自身  2.敌对怪  4.敌对玩家  8.友怪  16.友方玩家
     */		
    public actOnType:number;
    /**
     * 最大使用距离(像素)
     */		
    public maxRange:number;
    /**
     * 攻击数量
     */		
    public hitNum:number;
    /**
     * 结算范围形状
     * 1:矩形（宽2格）
     * 2:矩形（宽4格）
     * 3:90度扇形
     * 4:120度扇形
     * 5:圆形
     */		
    public shape:string;
    public parseShape(type:number):void
    {
        let str = "";
        switch(type)
        {
            case 1:
            case 2:
                str = LangCVO.getContent("common29");//矩形
            break;
            case 3:
            case 4:
                str = LangCVO.getContent("common30");//扇形
            break;
            case 5:
                str = LangCVO.getContent("common31");//圆形
            break;
        }
        this.shape = str;
    }
    /**
     * 冷却时间
     */		
    public coldDownTime:number;
    /**
     * 公共冷却时间
     */		
    public commonColdDownTime:number;
    /**
     * 挂机时技能释放优先级  数值越大，优先级越高；同数值，CD越长优先级越高；-1：挂机不放
     */		
    public autoHookPriority:number;
    /**
     * 效果描述
     */		
    public describe:string;
    /**
     * 图标ID
     */		
    public icon:number;
    /**
     * 子弹效果编号
     */		
    public bombIndex:number;
    /**
     * 1 目标 
     * 2 x（目标扇形，x为子弹数量，根据数量角度平均分每个子弹射出） 
     * 3 x（自身圆形，x为子弹数量，根据数量角度平均分每个子弹射出）
     */		
    public effectType:number;
    /**
     * 直线特效配置
     */		
    public effectLineConfig:any[];
    /**
     * 区域特效配置
     */		
    public effectAreaConfig:any[];
    /**
     * 效果播放方向 1主目标 2所有目标 3区域播放
     */		
    public activeSide:number;
    /**
     * 自身效果资源ID。发动特效，自身持续特效等。
     */		
    public effectSelfID:number;
    /**
     * 目标效果资源ID
     */		
    public effectTarID:number;
    /**
     * 受击目标上的遮罩或特殊效果，1金色遮罩 2 红色遮罩 3 蓝色遮罩 4 流血特效
     */		
    public targetEffectII:number;
    /**
     * 技能攻击动作编号 0表示从1到3顺序播放动作，其它的值为1,2,3
     */		
    public action:number;
    /**
     * 是否默认技能
     */		
    public isDefault:boolean;
    /**
     * 震屏配置：延迟时间(毫秒)，震动时间(毫秒)，震动幅度(像素)
     */		
    public shakeConfig:string;
    /**
     * 主界面使用提示
     */		
    public screenTips:number;
    /**
     * 技能界面排序
     */		
    public showIndex:number;
    /**
     * 前端预留脚本
     */		
    public script:string;
    /**
     * 该技能所加战力
     */		
    public addFightValue:number;
    /**
     * 最高等级
     */		
    public maxLevel:number;
    
    public isCommonCD:boolean;
    
    public parseOne(data:egret.ByteArray)
    {
        this.groupID = data.readShort();
        this.name = data.readUTF();
        this.mainType = data.readByte();
        this.subType = data.readByte();
        this.type = data.readByte();
        this.upgradeCond = data.readUTF();
        this.upgradeCost = data.readUTF();
        this.mainGroup = data.readShort();
        this.beatBackDis = data.readShort();
        this.actOnType = data.readShort();
        this.maxRange = data.readShort();
        this.hitNum = data.readByte();
        this.parseShape(data.readByte());
        this.coldDownTime = data.readShort();
        this.commonColdDownTime = data.readShort();
        this.autoHookPriority = data.readShort();
        this.describe = data.readUTF();
        this.icon = data.readShort();
        this.bombIndex = data.readShort();
        this.effectType = data.readByte();
        // this.effectLineConfig = data.readUTF();
        // this.effectAreaConfig = data.readUTF();
        this.parseLineEffectConfig(data.readUTF());
        this.parseAreaEffectConfig(data.readUTF());
        this.activeSide = data.readByte();
        this.effectSelfID = data.readShort();
        this.effectTarID = data.readShort();
        this.targetEffectII = data.readByte();
        this.action = data.readByte();
        this.isDefault = data.readBoolean();
        this.shakeConfig = data.readUTF();
        this.screenTips = data.readShort();
        this.showIndex = data.readByte();
        this.script = data.readUTF();
        this.addFightValue = data.readShort();
        this.maxLevel = data.readShort();
    }

    private parseLineEffectConfig(config:string):void
    {
        this.effectLineConfig = [];
        if(config == "") return;
        let arr:string[] = config.split("$");
        for(let i:number = 0; i < arr.length; i++)
        {
            let brr:string[] = arr[i].split("#");
            this.effectLineConfig.push(brr);
        }
    }

    private parseAreaEffectConfig(config:string):void
    {
        this.effectAreaConfig = [];
        if(config == "") return;
        let arr:string[] = config.split("$");
        for(let i:number = 0; i < arr.length; i++)
        {
            let brr:string[] = arr[i].split("#");
            this.effectAreaConfig.push(brr);
        }
    }
    
    private static _cvos:Object;
    public static parse(bytes:egret.ByteArray):void
    {
        SkillCVO._cvos = {};
        SkillFormulaCVO.cvos = {};
        var tableCount:number = bytes.readByte();
        var baseCount:number = bytes.readShort();
        let cvo:SkillCVO;
        for (var i = 0; i < baseCount; i++)
        {
            cvo = new SkillCVO();
            cvo.parseOne(bytes);
            SkillCVO._cvos[cvo.groupID] = cvo;
        }
        var formulaCount = bytes.readShort();
        let formula:SkillFormulaCVO;
        for(var j = 0; j < formulaCount; j++)
        {
            formula = new SkillFormulaCVO();
            formula.parse(bytes);
            if(!SkillFormulaCVO.cvos.hasOwnProperty(formula.type)) SkillFormulaCVO.cvos[formula.type] = new Array<SkillFormulaCVO>();
            SkillFormulaCVO.cvos[formula.type].push(formula);
        }
    }
    
    public static getCVO(groupID:number):SkillCVO
    {
        return SkillCVO._cvos[groupID];
    }
    /**根据分组id获取刻印关联的技能 */
    public static getCVOsByGroup(groupID:number):Array<SkillCVO>
    {
        let result:Array<SkillCVO> = [];
        let cvo:SkillCVO;
        for(let key in this._cvos)
        {
            cvo = this._cvos[key];
            if(cvo.mainGroup == groupID) result.push(cvo);
        }
        if(result.length > 1) result.sort((a:SkillCVO, b:SkillCVO) => { return (a.groupID > b.groupID ? 1 : -1); });
        return result;
    }
    /**根据类型获取关联的技能 */
    public static getCVOsByType(mainType:number, subType:number, type:number):Array<SkillCVO>
    {
        let result:Array<SkillCVO> = [];
        let cvo:SkillCVO;
        for(let key in this._cvos)
        {
            cvo = this._cvos[key];
            if(cvo.mainType == mainType && cvo.subType == subType && cvo.type == type) result.push(cvo);
        }
        if(result.length > 1) result.sort((a:SkillCVO, b:SkillCVO) => { return (a.groupID > b.groupID ? 1 : -1); });
        return result;
    }

    public static getPetPanelSkills():Array<SkillCVO>
    {
        let result:Array<SkillCVO> = [];
        let cvo:SkillCVO;
        for(let key in this._cvos)
        {
            cvo = this._cvos[key];
            if(cvo.mainType == 2 && cvo.subType == 3 && !cvo.isDefault) result.push(cvo);
        }
        if(result.length > 1) result.sort((a:SkillCVO, b:SkillCVO) => { return (a.groupID > b.groupID ? 1 : -1); });
        return result;
    }

    public get isNeedTarget():boolean{ return (this.actOnType > 1); }
    
    private _tempCDTime:number = 0;
    public get totalTime():number{return this._tempCDTime;}
    
    private _leftTime:number = 0;
    public get leftTime():number{return this._leftTime;}
    public set leftTime(value:number){this._leftTime = value;}
    
    private _isRunning:boolean = false;
    public get running():boolean{return this._isRunning;}
    
    public clearCD():void
    {
        this._leftTime = 0;
        this.render(0);
        this.setRunning(false);
    }
    
    public setRunning(value:boolean,coldDownTime:number=0):void
    {
        if(this._isRunning == value)return;
        this._isRunning = value;
        if(this._isRunning)
        {
            this.isCommonCD = false;
            this._tempCDTime = coldDownTime;
            this.start();
        }
        else this.stop();
    }
    
    /**
     * 设置公共冷却时间。 
     */		
    public setCommonRunning(value:boolean,commonCountDownTime:number = 0):void
    {
        if(this._isRunning == value)return;
        this._isRunning = value;
        if(this._isRunning)
        {
            this.isCommonCD = true;
            this._tempCDTime = commonCountDownTime;
            this.start();
        }
        else this.stop();
    }
    
    private start():void
    {
        this._leftTime = this._tempCDTime;
        Manager.render.add(this.render, this);
    }
    
    private stop():void
    {
        Manager.render.remove(this.render, this);
    }
    
    private render(interval:number):void
    {
        this._leftTime -= interval;
        // this.dispatchEvent(new GlobalEvent(GlobalEvent.COOL_DOWN_UPDATE));
        if(this._leftTime <= 0) 
        {
            this.setRunning(false,0);
            this._leftTime = 0;
            this.isCommonCD = false;
        }
    }
    
    public get selfNeedPlayEffect():boolean{return this.effectSelfID != 0;}
    public get targetNeedPlayEffect():boolean{return this.effectTarID != 0;}
    
    public get hasConfigEffect():boolean
    {
        return (this.effectLineConfig.length > 0) || (this.effectAreaConfig.length > 0);
    }
    
    public get upgradeNeedCondition():boolean
    {
       return ((this.upgradeCond != "") || (this.upgradeCost != ""));
    }
    
    public get actOnTypeIsSelf():boolean
    {
        return (this.actOnType & 1) == 1;
    }
    
    public get actOnTypeIsOtherPlayer():boolean
    {
        return (this.actOnType & 4) == 4 || (this.actOnType & 16) == 16;
    }
    
    public get actOnTypeIsMonster():boolean
    {
        return (this.actOnType & 2) == 2 || (this.actOnType & 8) == 8;
    }
    
    public checkCanHitByGameObjectType(type:number):boolean
    {
        if(this.actOnType == 0) return true;
        if(this.actOnTypeIsSelf) return true;
        else if(this.actOnTypeIsMonster && ((type == GameObjectType.MONSTER_NORMAL) || (type == GameObjectType.MONSTER_BOSS))) return true;
        else if(this.actOnTypeIsOtherPlayer && (type == GameObjectType.OTHER)) return true;
        return false;
    }
}