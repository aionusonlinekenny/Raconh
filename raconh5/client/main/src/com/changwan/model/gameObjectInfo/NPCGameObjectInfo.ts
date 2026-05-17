/**
 * npc对象信息类
 * chenhuang
 * create  
 * update devil 2017-11-07
*/
class NPCGameObjectInfo extends GameObjectInfo implements ITarget
{
    private _cvo:NpcCVO;
    public get cvo():NpcCVO
    {
         return this._cvo;
    }
    public getType():number
    {
        return GameObjectType.NPC;
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
        Manager.model.self.addEventListener(GameObjectEvent.GO_INDEX9, this.__update9Scale, this);
    }
    
    protected removeEvent():void
    {
        Manager.model.self.removeEventListener(GameObjectEvent.GO_INDEX9, this.__update9Scale, this);
    }

    public reuse(id:number,cvo:NpcCVO):void
    {
        this._cvo = cvo;
        super.reuse(id);
    }

    public unuse():void
    {
        super.unuse();
        this._cvo = null;
    }

    private __update9Scale(e:GameObjectEvent):void
    {
        if(Manager.model.self.isIn9Scale(this, 3))
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
        if(this._view == null)this._view = Manager.pool.create(NPCGameObject,this);
        return this._view;
    }

    public dispose():void
    {
        super.dispose();
        this._cvo = null;
    }
}