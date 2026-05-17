/**
 * 场景特效视图信息类
 * liangyan
 * create 2017-12-29
*/
class SceneEffGameObjectInfo extends GameObjectInfo
{
    private _cvo:SceneEffCVO;
    public get cvo():SceneEffCVO
    {
         return this._cvo;
    }
    public getType():number
    {
        return GameObjectType.SCENE_EFF;
    }

    public canHited(showMsg:boolean = true):boolean
    {
         return false;
    }

    public getTotalBlood():number
    {
        return 0;
    }
    public getBlood():number
    {
        return 0;
    }

    protected addEvent():void
    {
        if(this._cvo.mapResID != Manager.model.getMap().mapCVO.res) return;
        Manager.model.self.addEventListener(GameObjectEvent.GO_INDEX9, this.__update9Scale, this);
    }
    
    protected removeEvent():void
    {
        Manager.model.self.removeEventListener(GameObjectEvent.GO_INDEX9, this.__update9Scale, this);
    }

    public reuse(id:number,cvo:SceneEffCVO):void
    {
        this._cvo = cvo;
        super.reuse(id);
    }

    public unuse():void
    {
        super.unuse();
        this._cvo = null;
    }

    public playShow():void
    {
        if(this._view != null) (this._view as SceneEffGameObject).playShow();
    }

    private __update9Scale(e:GameObjectEvent):void
    {
        if(Manager.model.self.isIn9Scale(this, 5))
        {
            if(!this.isInMapFlag) Manager.model.getGameobject().addGameObject(this);
        }
        else 
        {
            this.remove(true);
        }
    }

    public createGameObject():GameObject
    {
        if(this._view == null)this._view = Manager.pool.create(SceneEffGameObject,this);
        return this._view;
    }

    public dispose():void
    {
        super.dispose();
        this._cvo = null;
    }
}