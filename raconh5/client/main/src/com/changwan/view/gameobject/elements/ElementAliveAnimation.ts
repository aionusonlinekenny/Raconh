/**
 *author Anydo
 *create 2017-11-30
 *description 
*/
class ElementAliveAnimation extends ElementBaseAnimation
{
    public constructor()
    {
        super();
    }
    
    public drawStyle():void
    {
        if(this._animation != null)(this._animation as ShowAnimation).updateStyle();
    }
    
    public drawPet():void
    {
        if(this._animation == null)
        {
            var info:MonsterGameObjectInfo = this._gameObject.info as MonsterGameObjectInfo;
            this._animation = Manager.animation.createGameOjbectAnimation(info);
            this._gameObject.addChild(this._animation as PetAnimation);
            this.drawAction();
            this.drawDirection();
        }
    }
}