/**
 *author Anydo
 *create 2017-11-17
 *description 
*/
class SkillEffectInfo implements cw.IPool
{
    public cvo:SkillCVO;
    public effID:number;
    public rotation:number;
    public isConfig:boolean;//true时为SkillLineEffect/SkillAreaEffect  false为单个特效
    
    private _diposeFlag:boolean;

    public reuse(cvo:SkillCVO, effID:number, rotation:number, isConfig:boolean):void
	{
        this.cvo = cvo;
		this.effID = effID;
		this.rotation = rotation;
		this.isConfig = isConfig;
	}

	public unuse():void
	{
         this.cvo = null;
	}

    public dispose():void
    {
        if(this._diposeFlag) return;
        this._diposeFlag = true;
        this.disposeSelf();
    }
    
    protected disposeSelf():void
    {
        this.cvo = null;
    }
}