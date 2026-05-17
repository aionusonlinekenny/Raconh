class GameObjectInfo extends egret.EventDispatcher implements cw.IPool
{
    protected _id:number;
    public get id():number
    {
         return this._id;
    }
    //是否在地图中
    public isInMapFlag:boolean;
    public farToSelf:number;
    public x:number;
    public y:number;
    // public get position():egret.Point{ return new egret.Point(this.x, this.y); }
    protected _indexes:egret.Point;
    public get indexes():egret.Point
    {
         return this._indexes; 
    }
    protected _index9:egret.Point;
    public set index9(value:egret.Point)
    {
         this._index9 = value; 
    }
    public get index9():egret.Point
    {
         return this._index9;
    }
    protected _view:GameObject;
    public get view():GameObject
    {
         return this._view;
    }
    public getType():number
    {
         return GameObjectType.EMPTY; 
    }

    public isType(goType:number):boolean
    {
        return ((this.getType() & goType) == goType);
    }

    public constructor()
    {
        super();
        this._index9 = new egret.Point(0,0);
        this._indexes = new egret.Point(0,0);
    }

    public unuse():void
    {
        this.removeEvent();
        this._id = 0;
        this._view = null;
    }
    public reuse(id:number,...args:any[]):void
    {
        this._id = id;
        this.start();
        this.addEvent();
    }

    protected start():void
    {
        this.x = 0;
        this.y = 0;
        this.isInMapFlag = false;
        this.farToSelf = 0;
        this._index9.x = 0;
        this._index9.y = 0;
        this._indexes.x = 0;
        this._indexes.y = 0;
    }

    protected addEvent():void
    {

    }
    protected removeEvent():void
    {

    }

    public createGameObject():GameObject
    {
        return null;
    }

    public updatePostion(x:number, y:number,isForce:boolean = false):void
    {
        if(this.x == x && this.y == y && !isForce)return;
        // let oldPos:egret.Point = new egret.Point(this.x, this.y);
        this.x = x;
        this.y = y;
        this._indexes = IndexUtil.getIndexByXY(x, y);
        this.index9 = IndexUtil.getIndex9ByXY(this.x,this.y);
        if(this._view != null) this._view.eventPosition();
        // this.checkSelfPosSync(oldPos);
        // this.dispatchEvent(new GameObjectEvent(GameObjectEvent.GO_POSITION));
    }

    // private checkSelfPosSync(oldPos:egret.Point):void
    // {
    //     //野外地图(单人)，九宫格改变同步位置；多人地图，小格子改变同步位置
    //     if(!(this instanceof SelfGameObjectInfo)) return;
    //     let oldIndex:egret.Point;
    //     let noChange:boolean = true;
    //     if(Manager.model.getMap().mapCVO.isFieldMap)
    //     {
    //         oldIndex = IndexUtil.getIndex9ByXY(oldPos.x, oldPos.y);
    //         noChange = this.index9.equals(oldIndex);
    //     }
    //     else
    //     {
    //         oldIndex = IndexUtil.getIndexByXY(oldPos.x, oldPos.y);
    //         noChange = this._indexes.equals(oldIndex);
    //     }
    //     if(!noChange) Manager.control.getMap().cmdSelfWalkPosSync(this.x, this.y);
    // }

    public dispose():void
    {
        this.removeEvent();
        this._index9 = null;
        this._indexes = null;
        this._view = null;
    }

    public remove(onlyView:boolean,isImmediately:boolean=true,delayTime:number=2000):void
    {
        if(this._view != null)
        {
            this._view.eventRemove(onlyView ? true : isImmediately, delayTime);
            this._view = null;
        }
        if(!onlyView)
        {
             if(isImmediately)Manager.pool.push(this);
        }
    }
}