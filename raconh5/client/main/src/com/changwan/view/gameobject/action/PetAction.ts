/**
 *author Anydo
 *create 2017-12-4
 *description 
*/
class PetAction extends Action
{
    private _tempTime:number;

    public get petInfo():PetGameObjectInfo{ return (this._info as PetGameObjectInfo); }

    /**
     * 超过距离传送到主人身边
     */		
    private DIS_FLY:number = 400;

    protected render(interval:number):boolean
    {
        // let interval:number = runTime - this._lastTickTime;
		this.renderWalk(interval);
		this.renderBackToOwner(interval);
		// this._lastTickTime = runTime;
		return false;
    }

    protected renderBackToOwner(interval:number):void
    {
        if(this.petInfo.isInvented) return;
        this._tempTime += interval;
        if(this._tempTime < 330) return;
        this._tempTime %= 330;
        if(!this.inMove && !this.petInfo.owner.isingState(BodyStateManger.ISING_JUMP))
        {
            if(this.flyBackToOwner())
            {
                this.cancel();
                return;
            }
            this.walkBackToOwner();
        }
    }

    private flyBackToOwner():boolean
    {
        if(new egret.Point(this._info.x,this._info.y).subtract(new egret.Point(this.petInfo.owner.x,this.petInfo.owner.y)).length >= this.DIS_FLY)
        {
            this.stopWalk();
            var targetPos:egret.Point = GameUtil.getNearCanWalkRandomPos(this.petInfo.owner.x, this.petInfo.owner.y, 150, 20, 5);
            this._info.updatePostion(targetPos.x, targetPos.y);
            return true;
        }
        return false;
    }
    
    protected walkBackToOwner():void
    {
        if(this.inMove) return;
        var dis:number = 300;
        var target:egret.Point = new egret.Point(this.petInfo.owner.x,this.petInfo.owner.y);
        if(new egret.Point(this._info.x,this._info.y).subtract(new egret.Point(target.x,target.y)).length >= dis)
        {
            var path:egret.Point[] = [new egret.Point(this._info.x,this._info.y), target];
            path = PathUtils.processPath(path, dis-150);
            if(path != null && path.length > 1)
            {
                this._info.walk(path, WalkType.WALK);
                if(this._info instanceof SelfPetGameObjectInfo)
                {
                    if(this._info.canHit()) (this._info as SelfPetGameObjectInfo).updateTarget(null);
                    // FollowerController.getInstance().followerWalk(this.selfPet.id, this.selfPet.followerType, path, WalkType.WALK);//..
                }
            }
        }
    }
}