/**
 * 神器激活成功
 * pzx 
 */
class RelicStuffCuccessView extends UIComponent{
	private _curCvo:RelicStuffCVO;
	private _nameBit:BitmapRemote;
    private _ani:Animation;
    private _diBit:BitmapRemote;
    private _sucAni:Animation;
	public constructor() {
		super();
		this.skinName = Manager.path.getSkinName("relicStuff", "RelicStuffCuccessViewSkin");
		this.visible = false;
		this.touchChildren = false;
		this.touchEnabled = true;
	}
	protected configUI():void
    {
        super.configUI();
		this.onResizeHandler(null);
        this._diBit.load(Manager.path.getRelicStuffPath("relicStuffdi2"));
        
    }

	 protected drawAll():void
	{
		super.drawAll();
		this.drawData();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    public setData(data):void
    {
		this._curCvo = data;
        this.invalidate(InvalidationType.DATA);
    }
    private clearAni1():void
	{
		if(this._sucAni)
		{
			Manager.pool.push(this._sucAni);
			this._sucAni = null;
		}
	}

    private drawData():void{

		this._nameBit.load(Manager.path.getRelicStuffPath("label/name"+this._curCvo.id));
        this.clearAni();
        let arr:string[] = this._curCvo.ani_id.split("/");
        this._ani = Manager.animation.createPanelGlobalAnimation(this._curCvo.ani_id,arr[arr.length-1]);
        this._ani.y = 116;
        this._ani.x = 5;

        let points:string[] = this._curCvo.point.split("|");
        this._ani.x = this._ani.x + Number(points[0]);
        this._ani.y = this._ani.y + Number(points[1]);
        this.addChildAt(this._ani,3);
        this.clearAni1();
        this._sucAni=Manager.animation.createEffectAnimation("suc");
		this._sucAni.x = Math.round((this.width - 512) / 2);
		this._sucAni.y = Math.round((this.height - 258) / 2) + 150;
		this.addChild(this._sucAni);

    }

    private clearAni():void
    {
        if(this._ani)
		{
			Manager.pool.push(this._ani);
			this._ani = null;
		}
    }

    protected addEvent():void
    {
         GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchCloseHandler,this);
        super.addEvent();
    }

    protected removeEvent():void
    {
         GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		 this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchCloseHandler,this);
        super.removeEvent();
    }
	protected onTouchCloseHandler(e:egret.TouchEvent):void
    {
        Manager.view.hide(ViewID.RelicStuffCuccessView);
    }
    private onResizeHandler(e:GlobalEvent):void
	{
		this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        if(!this.visible)
        this.visible = true;
	}

	public show(data:RelicStuffCVO):void
    {
		this._curCvo = data;
		Manager.layer.tipsLayer.addChild(this);
    }

	public hide():void
    {
        this.dispose();
    }


    public dispose():void
    {
        super.dispose();
        this.clearAni();
        this.clearAni1();
        this._curCvo=null;
        this._nameBit.dispose();
        this._nameBit=null;
        this._diBit.dispose();
        this._diBit=null;
    }
}