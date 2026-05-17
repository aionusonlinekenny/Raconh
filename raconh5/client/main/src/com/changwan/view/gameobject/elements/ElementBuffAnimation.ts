/**
 *author Anydo
 *create 2017-11-27
 *description 
*/
class ElementBuffAnimation extends ElementBase
{
    private _buffAnimation:Animation;

	public readyPlayCVO:BuffCVO;
    private _buffAniPos:egret.Point;
		
    public constructor()
    {
        super();
    }

	public unuse():void
	{
        this.poolPushBuffAnimation();
		this.readyPlayCVO = null;
        this._buffAniPos = null;
    }

    private poolPushBuffAnimation():void
    {
        if(this._buffAnimation != null)
        {
            Manager.pool.push(this._buffAnimation);
            this._buffAnimation = null;
        }
    }
    
    public drawBuff():void
    {
        this.poolPushBuffAnimation();
        if(this.readyPlayCVO != null)
        {
            var cvo:AnimationCVO = AnimationCVO.getCVO("" + this.readyPlayCVO.aniId);
            this._buffAnimation = Manager.animation.createSkillAnimation(this.readyPlayCVO.aniId);
            this._buffAniPos = (this._gameObject.info as AliveGameObjectInfo).getBuffAniPos(this.readyPlayCVO.placeFlag);
            this.movePosition();
            if(cvo.isInFeet) Manager.layer.addChildToNodeByType(this._buffAnimation, this._buffAnimation.url, 2);
            else Manager.layer.addChildToNodeByType(this._buffAnimation, this._buffAnimation.url, 1);
        }
    }

    public movePosition():void
    {
        if(this._buffAnimation != null)
        {
            this._buffAnimation.move(this._gameObject.info.x + this._buffAniPos.x, this._gameObject.info.y + this._buffAniPos.y);
        }
    }
    
    public hasChange(buff:BuffCVO,isAdd:boolean):boolean
    {
        if(isAdd)
        {
            if(buff != null && buff.aniId != 0 && ((this.readyPlayCVO == null) || (this.readyPlayCVO.aniPriority < buff.aniPriority)))
            {
                this.readyPlayCVO = buff;
                return true;
            }
        }
        else
        {
            if(this.readyPlayCVO != null && this.readyPlayCVO.groupID == buff.groupID)
            {
                this.readyPlayCVO = null;
                return true;
            }
        }
        return false;
    }
    
    protected disposeSelf():void
    {
        super.disposeSelf();
        this.poolPushBuffAnimation();
        this.readyPlayCVO = null;
        this._buffAniPos = null;
    }
}