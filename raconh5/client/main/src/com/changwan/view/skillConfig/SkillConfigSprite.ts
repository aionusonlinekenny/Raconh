/**
 *author Anydo
 *create 2017-11-17
 *description 
*/
class SkillConfigSprite extends Sprite
{
    /**
     * 技能特效移动数据
     */	
    public moveInfo:SkillConfigMoveInfo;

    public constructor()
	{
		super();
	}
    
    public reuse(rotation:number, moveConfig:string):void
    {
        this.moveInfo = (moveConfig == "" || moveConfig == "0&0&0&0&0") ? null : Manager.pool.create(SkillConfigMoveInfo, moveConfig, rotation);
        super.reuse();
    }

	public unuse():void
	{
        super.unuse();
        if(this.moveInfo != null)
        {
            Manager.pool.push(this.moveInfo);
            this.moveInfo = null;
        }
    }
    
    protected disposeSelf():void
    {
        super.disposeSelf();
        if(this.moveInfo != null)
        {
            Manager.pool.push(this.moveInfo);
            this.moveInfo = null;
        }
    }
}