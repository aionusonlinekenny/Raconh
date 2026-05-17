/**
 * drop对象信息类
 * luzh
 * update 2017-11-17
*/
class DropGameObjectInfo extends GameObjectInfo
{
    /*物品cvo*/
    public item:ItemsCVO;
    /*物品数量*/
    public count:number;
    /*是否拾取*/
    public isGet:boolean;

    public unuse():void
    {
        super.unuse();
        this.item = null;
        this.count = 0;
        this.isGet = false;
    }

    public getType():number
    {
        return GameObjectType.DROP;
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
    //     if(Manager.model.self.isIn9Scale(this))
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
        if(this._view == null)this._view = Manager.pool.create(DropGameObject,this);
        return this._view;
    }

    public setData(temID:number, isGet:boolean, count:number):void
    {
        this.item = ItemsCVO.getCvo(temID);
        this.isGet = isGet;
        this.count = count;
    }
    
    public dispose():void
    {
        super.dispose();
        this.item = null;
        this.count = 0;
    }
}