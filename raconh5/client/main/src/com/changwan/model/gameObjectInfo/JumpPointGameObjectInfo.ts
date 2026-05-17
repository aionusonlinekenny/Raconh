/**
 *author Anydo
 *create 2017-12-6
 *description 
*/
class JumpPointGameObjectInfo extends GameObjectInfo
{
    private _cvo:JumpPointCVO;
    public get cvo():JumpPointCVO{ return this._cvo; }

    public reuse(cvoID:number, cvo:JumpPointCVO):void
    {
        this._cvo = cvo;
        super.reuse(cvoID);
    }

    public unuse():void
    {
        super.unuse();
        this._cvo = null;
    }
    
    // protected addEvent():void
    // {
    //     if(this._cvo.mapResID != Manager.model.getMap().mapCVO.res) return;
    //     Manager.model.self.addEventListener(GameObjectEvent.GO_POSITION, this.__updateLocation, this);
    // }
    
    // protected removeEvent():void
    // {
    //     Manager.model.self.removeEventListener(GameObjectEvent.GO_POSITION, this.__updateLocation, this);
    // }
    
    // private __updateLocation(e:GameObjectEvent):void
    // {
    //     let self:SelfGameObjectInfo = Manager.model.self;
    //     if(self.isingState(BodyStateManger.ISING_JUMP)) return;
    //     if(self.isingState(BodyStateManger.ISING_SPRINT)) return;
    //     if(self.isingState(BodyStateManger.ISING_FLY)) return;
    //     if(self.isingState(BodyStateManger.ISING_SLIDE)) return;
    //     if(self.isingState(BodyStateManger.ISING_KITE)) return;
    //     if(self.isingState(BodyStateManger.ISING_WATER)) return;
    //     if(this._cvo.canTrigger(Manager.model.getMap().mapCVO.res, self.x, self.y))
    //     {
    //         if(!Manager.model.getAuto().autoHook && Manager.walk.findInfo == null && self && self.view)
    //         {
    //             let targetPos:egret.Point = (self.view as SelfGameObject).getWalkTarget();
    //             if(targetPos) Manager.walk.findInfo = Manager.pool.create(MapFindInfo, targetPos, null);
    //         }
    //         if(this._cvo.scriptType > 0) Manager.jump.curInfo = this;
    //         else Manager.jump.curInfo = null;
    //         Manager.jump.jump(this._cvo.targets);
    //     }
    // }
    
    public playRookieAction(type:number):void
    {
        if(!this._cvo || this._cvo.scriptType == 0) return;
        if(this._cvo.scriptType == RookieConst.APPLY_MONSTER)
        {
            Manager.model.self.cancelAction();
            Manager.control.getTask().rookieAsk();
            return;
        }
        let self = Manager.model.self;
        let selfPos:egret.Point = new egret.Point(self.x, self.y);
        let startPos = this.rookieStartP;
        let endPos = this.rookieEndP;
		let distance = egret.Point.distance(selfPos, startPos);
		if(distance <= 50)
		{
            switch(type)
            {
                case WalkType.KITE:
                    let kite = Manager.model.getGameobject().getSceneEffByType(SceneEffCVO.TYPE_COMMON);
		            if(!kite) return;
                    let self = Manager.model.self.view;
                    if(!self) return;
		            kite.view.parent.removeChild(kite.view);
			        kite.view.x = -200;
			        kite.view.y = -150;
			        self.addChildAt(kite.view, 0);
                    (Manager.model.self.view as SelfGameObject).eventWalk([selfPos, endPos], type, this.playActionCallBack1, this);
                    break;
                case WalkType.WATER:
                    this.playWaterEff();
                    Manager.render.add(this.playWaterEff, this, 200, 0, null, true);
                    Manager.model.self.needCanYing = true;
                    (Manager.model.self.view as SelfGameObject).eventWalk([selfPos, endPos], type, this.playActionCallBack2, this);
                    break;
                default:
                    (Manager.model.self.view as SelfGameObject).eventWalk([selfPos, endPos], type, null, null);
                    break;
            }
		}
    }
    private playActionCallBack1():void
    {
        Manager.view.show(ViewID.CloudTransferEffect);
    }
    private playActionCallBack2():void
    {
        Manager.render.remove(this.playWaterEff, this);
        Manager.model.self.needCanYing = false;
        Manager.render.add(this.playActionCallBack3, this, 1000, 1, null, true);
    }
    private playActionCallBack3():void
    {
        Manager.view.show(ViewID.RollingWordsView);
    }
    /**新手剧情动作起点 */
    private get rookieStartP():egret.Point
    {
        let startP:egret.Point;
        let arr = this._cvo.script.split("|");
        if(!arr || arr.length != 2) return null;
        let temp = ArrayUtil.parseStringToArray(arr[0], ",")
        if(!temp || temp.length != 2) return null;
        startP = new egret.Point(temp[0], temp[1]);
        return startP;
    }
    /**新手剧情动作终点 */
    private get rookieEndP():egret.Point
    {
        let endP:egret.Point;
        let arr = this._cvo.script.split("|");
        if(!arr || arr.length != 2) return null;
        let temp = ArrayUtil.parseStringToArray(arr[1], ",")
        if(!temp || temp.length != 2) return null;
        endP = new egret.Point(temp[0], temp[1]);
        return endP;
    }
    private playWaterEff():void
    {
        let shuihua = Manager.animation.createEffectAnimation("shuihua", 0, true, true);
        let self = Manager.model.self;
		shuihua.x = -260 + self.x;
		shuihua.y = -390 + self.y;
		Manager.layer.elementLayer2.addChild(shuihua);
    }

    public remove(onlyView:boolean,isImmediately:boolean = true):void
    {
		super.remove(onlyView, isImmediately);
        if(!onlyView) this._cvo = null;
    }
    
    public getType():number
    {
        return GameObjectType.JUMP_POINT;
    }

    public createGameObject():GameObject
    {
        return null;
    }
}