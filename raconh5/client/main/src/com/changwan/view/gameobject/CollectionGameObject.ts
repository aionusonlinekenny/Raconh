/**
 * 采集物对象信息类
 * Simon
 * create 2018-3-12
*/
class CollectionGameObject extends GameObject
{
    private _collectionInfo:CollectionGameObjectInfo;
    private _effect:Animation;
     
    public constructor()
    {
        super();
    }

    protected addEvent():void
	{
        super.addEvent();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
	}

	protected removeEvent():void
	{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        super.removeEvent();
	}

    private onClickHandler(e?:egret.TouchEvent):void
    {
        if(this._collectionInfo && this._collectionInfo.effectName)
        {
            Manager.model.self.collect(this._collectionInfo, this._collectionInfo.callback,this._collectionInfo.target);
        }
    }

    public pick():void
    {
        this.onClickHandler();
    }

    public reuse(info:GameObjectInfo):void
	{
        this._collectionInfo = info as CollectionGameObjectInfo;
        super.reuse(info);
        this.touchEnabled = true;
    }

    public unuse():void
    {
        super.unuse();
        if(this._effect)
        {
            Manager.pool.push(this._effect);
            this._effect = null;
        }
    }

	protected drawAll():void
	{
		this.move(this._info.x,this._info.y);
        //显示物品
        this._effect = Manager.animation.createEffectAnimation(this._collectionInfo.effectName);
        this.addChild(this._effect);
	}

//     private onComplete():void
//     {  
// 　　     Manager.model.getGameobject().removeGameObject(this.info);
//     }
    
	protected disposeSelf():void
	{
		super.disposeSelf();
        if(this._effect)
        {
            Manager.pool.push(this._effect);
            this._effect = null;
        }
        this._collectionInfo = null;
	}
}
