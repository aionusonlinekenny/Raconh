/**
 * 引导界面
 * luzh 
 * 2018.2.26
 */
class GuideView extends RenderSprite
{
    private _back:GuildViewBack;
    private _sign:Animation;
    private _hand:HandAni;
    private _time:number;
    private _callBack:CallBackInfo;
    // private _target:egret.DisplayObject;
    // private _disX:number;
    // private _disY:number;
    private _modal:boolean;

    private _globalPos:egret.Point;
    // private _targetX:number;
    // private _targetY:number;

    public constructor()
    {
        super();
        this.touchEnabled = true;
        this.touchChildren = false;
        this.start();
        this.addEvent();
    }
    

    protected start():void
    {
        super.start();
        this._sign = Manager.animation.createEffectAnimation("szdj");
        this.addChild(this._sign);
        this._hand = new HandAni(0, 0);
        this.addChild(this._hand);
    }

    public setData2(globalPos:egret.Point, disX:number, disY:number, callBack:Function, thisObj:any, modal:boolean):void
    {
        this._globalPos = globalPos;
        this._globalPos.x += disX;
        this._globalPos.y += disY;
        this._sign.play();
        this._hand.play();
        this._callBack = Manager.pool.create(CallBackInfo, callBack, thisObj);
        disX = Math.round(disX);
        disY = Math.round(disY);

        this._time = 10;
		Manager.render.add(this.countDown, this, 1000);

        this._modal = modal;
        if(this._modal)
        {
            if(this._back == null) this._back = Manager.pool.create(GuildViewBack);
            this.addChildAt(this._back, 0);
        }
        else  this.hideMode();
        
        // this._target = target;
        // this._targetX = this._target.x;
        // this._targetY = this._target.y;
        // this._disX = disX;
        // this._disY = disY;
        this.drawPos();
    }

    // public setData(target:egret.DisplayObject, disX:number, disY:number, callBack:Function, thisObj:any, modal:boolean):void
    // {
    //     this._sign.play();
    //     this._hand.play();
    //     this._callBack = Manager.pool.create(CallBackInfo, callBack, thisObj);
    //     disX = Math.round(disX);
    //     disY = Math.round(disY);

    //     this._time = 10;
	// 	Manager.render.add(this.countDown, this, 1000);

    //     this._modal = modal;
    //     if(this._modal)
    //     {
    //         if(this._back == null) this._back = Manager.pool.create(GuildViewBack);
    //         this.addChildAt(this._back, 0);
    //     }
    //     else  this.hideMode();
        
    //     this._target = target;
    //     this._targetX = this._target.x;
    //     this._targetY = this._target.y;
    //     this._disX = disX;
    //     this._disY = disY;
    //     this.drawPos();
    //         // this.invalidate("drawPos");
    // }

    private hideMode():void
    {
        if(this._back != null) ObjectUtil.remove(this._back);
    }

	protected drawPos():void
	{
        // if(this._target == null) return;
        let pos:egret.Point = this._globalPos;
        // if(this._target.parent) pos = this._target.parent.localToGlobal(this._targetX + this._disX, this._targetY + this._disY);
        // else pos = new egret.Point(this._targetX + this._disX, this._targetY + this._disY);
        this._sign.x = pos.x - 98;
        this._sign.y = pos.y - 240;
        this._hand.x = pos.x - 13;
        this._hand.y = pos.y - 6;

        if(this._modal)
        {
            this._back.setPos(pos.x, pos.y);
        }
        this.onResizeHandler(null);
	}

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawPos")) this.drawPos();
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawPos();
    }

    protected addEvent():void
    {
        super.addEvent();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    protected removeEvent():void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        super.removeEvent();
    }

    private onResizeHandler(e:GlobalEvent):void
	{
		this.invalidate("drawPos");
	}

    private onClickHandler(e:egret.TouchEvent)
    {
        // if(this._modal && !this._circle.hitTestPoint(e.stageX, e.stageY)) return;
        this._callBack.callBack.call(this._callBack.target);
    }

	private countDown():void
	{
        this._time--;
        if(this._time <= 0) this._callBack.callBack.call(this._callBack.target);
	}

    public hide():void
    {
        this._hand.pause();
        this._sign.stop();
        if(this._callBack != null) Manager.pool.push(this._callBack);
        this._callBack = null;
        // this._target = null;
		Manager.render.remove(this.countDown, this);
        ObjectUtil.remove(this);
        this.hideMode();
    }

    public dispose():void
    {
		Manager.render.remove(this.countDown, this);
        super.dispose();
        ObjectUtil.removes(this._back, this._sign);
        ObjectUtil.dispose(this._hand);
        this._hand = null;
        if(this._callBack != null) Manager.pool.push(this._callBack);
        this._callBack = null;
        // this._target = null;
        if(this._back != null)
        {
            this._back.dispose();
            this._back = null;
        }
        if(this._sign)
            Manager.pool.push(this._sign);
        this._sign = null;
    }
}