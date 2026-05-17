/**
 *author Anydo
 *create 2017-11-14
 *description 
*/
class SkillInfo extends egret.EventDispatcher
{
    public id:number;
    
    private _level:number;
    public get level():number{ return this._level; }
    public set level(value:number)
    {
        if(this._level == value) return;
        this._level = value;
        this.id = this._cvo.groupID * 1000 + this._level;
        // this.dispatchEvent(new SkillEvent(SkillEvent.UPDATE_SKILL_LEVEL));
    }

    private _cvo:SkillCVO;
    public get cvo():SkillCVO{return this._cvo;}

    /**
     * 上次使用时间（毫秒） 
     */		
    public lastUseTime:number;

    public constructor(cvo:SkillCVO, lev:number)
    {
        super();
        this._level = -1;
        this._cvo = cvo;
        this.level = lev;
    }
    
    public get isUnLearn():boolean{ return (this._level == 0); }
    
    public get maxRange():number{ return this._cvo.maxRange; }
    
    public get coldDownTime():number{ return this._cvo.coldDownTime; }
    
    public startRunning():void
    {
        if(this._cvo == null || this._level == 0) return;
        this._cvo.setRunning(true,this.coldDownTime);
    }
    
    public startCommonRunning(commonCD:number):void
    {
        if(this._cvo == null || this._level == 0) return;
        this._cvo.setCommonRunning(true,commonCD);
    }
    
    public isMaxLevel():boolean
    {
        if(this._cvo.type == 1)
        {
            return this._level >= this._cvo.maxLevel;
        }
        //被动技能没有等级
        else return (this._level >= 1);
    }
    
    public get hasLearn():boolean
    {
        if(this._cvo == null) return false;
        if(this._level <= 0) return false;
        return true;
    }

    public getSkillFormulaCvo(type:string):SkillFormulaCVO
    {
        let formula = SkillFormulaCVO.getCVO(this.cvo.groupID, type);
        return formula;
    }
    
    public dispose():void
    {
        this._cvo = null;
    }
}