/**
 * 采集物对象信息类
 * Simon
 * create 2018-3-12
*/
class CollectionGameObjectInfo extends GameObjectInfo
{
    public effectName:string;
    /*是否拾取*/
    public isGet:boolean;
    public callback:Function;
    public target:any;

    public unuse():void
    {
        super.unuse();
        this.effectName = null;
        this.isGet = false;
        this.target = null;
        this.callback = null;
    }

    public getType():number
    {
        return GameObjectType.COLLECT;
    }
    
    protected addEvent():void
    {
        // Manager.model.self.addEventListener(GameObjectEvent.GO_INDEX9, this.__update9Scale, this);
    }
    
    protected removeEvent():void
    {
        // Manager.model.self.removeEventListener(GameObjectEvent.GO_INDEX9, this.__update9Scale, this);
    }

    // private __update9Scale(e:GameObjectEvent):void
    // {
    //     if(Manager.model.self.isIn9Scale(this, 3))
    //     {
    //         if(!this.isInMapFlag) Manager.model.getGameobject().addGameObject(this);
    //     }
    //     else 
    //     {
    //         this.remove(true);
    //     }
    // }
    
    public createGameObject():GameObject
    {
        if(this._view == null)this._view = Manager.pool.create(CollectionGameObject,this);
        return this._view;
    }

    public setData(name:string, isGet:boolean, callback:Function = null,target:any = null):void
    {
        this.effectName = name;

        this.isGet = isGet;
        this.callback = callback;
        this.target = target;
    }
    
    public dispose():void
    {
        super.dispose();
        this.effectName = null;
        this.target = null;
        this.callback = null;
    }
}