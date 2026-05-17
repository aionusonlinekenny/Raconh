/**
 *author Anydo
 *create 2017-11-7
 *description 
*/
class ElementMonsterAnimation extends ElementBaseAnimation
{
    public constructor()
    {
        super();
    }

    public get animation():MonsterAnimation
    {
        return this._animation as MonsterAnimation;
    }
    
    public drawMonster():void
    {
        if(this._animation == null)
        {
            var info:MonsterGameObjectInfo = this.getInfo() as MonsterGameObjectInfo;
            this._animation = Manager.animation.createGameOjbectAnimation(info);
            if(this.sceneRobotFlag == 2)
            {
                (this._animation as MonsterAnimation).x = (this._gameObject.info as SceneRobotGameObjectInfo).cvo.posxMon + (info.cvo ? -info.cvo.offsetX : 0);
                (this._animation as MonsterAnimation).y = (this._gameObject.info as SceneRobotGameObjectInfo).cvo.posyMon + (info.cvo ? -info.cvo.offsetY : 0);
            }
            else
            {
                (this._animation as MonsterAnimation).x = (info.cvo ? -info.cvo.offsetX : 0);
                (this._animation as MonsterAnimation).y = (info.cvo ? -info.cvo.offsetY : 0);
            }
            this._gameObject.addChild(this._animation as MonsterAnimation);
            this.drawAction();
            this.drawDirection();
        }
    }

	public drawDead():void
	{
		if(this._animation instanceof MonsterAnimation) this._animation.dead();
	}
	
	public drawAction():void
	{
		if(this._animation instanceof MonsterAnimation) 
        {
            if(this._animation.isDeadFlag) this._animation.figureAction = FigureAction.DEAD;
            else this._animation.figureAction = this.getInfo().getActionStr();
        }
	}

    /** 怪物死亡后，info直接unuse，所以info有可能马上被其他的新怪赋值，导致info数据是不准确的，此方法用来做临时标记 */
    public markDead():void
    {
        if(this._animation instanceof MonsterAnimation) this._animation.isDeadFlag = true;
    }
}