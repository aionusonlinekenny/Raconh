/**
 *author Anydo
 *create 2017-11-30
 *description 
*/
class SelfPetGameObject extends PetGameObject
{
    private _updateTime:number;//检测update循环的时间
    
	protected createAction():void
	{
		this._action = Manager.pool.create(SelfPetAciton, this._aliveGameObjectInfo);
	}
		
    protected get selfPet():SelfPetGameObjectInfo{return (this._info as SelfPetGameObjectInfo);}
    
    public eventTarget():void
    {
        if(this.selfPet.target != null)
        {
            var path:egret.Point[] = [new egret.Point(this.selfPet.x,this.selfPet.y),new egret.Point(this.selfPet.target.x,this.selfPet.target.y)];
            path = PathUtils.processPath(path, Manager.model.getSkill().currentPetSkill.maxRange - 10);
            
            if(path != null && path.length > 0)
            {
                this._action.walk(path, WalkType.WALK);
                // FollowerController.getInstance().followerWalk(this.selfPet.id, this.selfPet.followerType, path, WalkType.WALK);//..
            }
        }
    }
}