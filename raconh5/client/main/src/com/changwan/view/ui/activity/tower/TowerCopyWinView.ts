/**
 * 爬塔副本胜利结算界面
 * liangyan
 * create 2017-12-27
*/
class TowerCopyWinView extends UIComponent implements IViewManager
{
    private _back:eui.Image;
    private _txt:Label;
    private _confirmBtn:Button;
    private _nextBtn:Button;
    private _btnClose:eui.Image;

    private _goodItems:Array<Goods> = [];
    private _infos:Array<ItemsModelInfo>;
	private _countDownTime:number;
    private _callback:Function;
    private _interval:number;

    public constructor()
	{
        super();
        this.skinName = Manager.path.getSkinName("copy", "TowerCopyWinViewSkin");
        this.touchChildren = true;
    }

    protected addEvent():void
    {
        super.addEvent();

        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
        this._nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
    }

    protected removeEvent():void
    {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
        this._nextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);

        super.removeEvent();
    }

    protected initData():void
    {
        super.initData();
        this.onResizeHandler(null);
    }

    protected draw():void
	{
		super.draw();
		if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawData();
    }

    private drawData():void
    {
        if(!this._infos) return;
		var goodsLen:number = this._goodItems.length;
		var infosLen:number = this._infos.length;
		var max:number = goodsLen > infosLen ? goodsLen : infosLen;

		var lineMaxCount:number = 4;//单行最多个数
		var dis:number = 128;//两个的位置差
		var padding:number = 42;//间隔
		var itemsH:number = Math.ceil(infosLen / lineMaxCount) * dis - padding;
		var lineW:number;
		var item:Goods;
		var lineNum:number = 0;
		for(var i:number=0; i<max; i++)
		{
			if(i<infosLen)
			{
				if(i >= goodsLen) 
				{
					item = Manager.pool.create(Goods);
					this.addChild(item);
					this._goodItems.push(item);
				}
				if(i % lineMaxCount == 0)
				{
					var lineCount:number = infosLen - Math.floor(i/lineMaxCount) * lineMaxCount;
					if(lineCount > 4) lineCount = 4;
					lineW = lineCount * dis - padding;
				}
				this._goodItems[i].x = 330 - lineW/2 + (i%lineMaxCount)*dis;
				this._goodItems[i].y = 440 - itemsH/2 + Math.floor(i/lineMaxCount)*dis;
                this._goodItems[i].data = this._infos[i];
			}
			else
			{
				Manager.pool.push(Goods);
			}
		}

		window.clearInterval(this._interval);
        this._interval = window.setInterval(()=>this.countDown(), 1000);
		this.countDown();
    }

    private countDown():void
	{
		if(this._countDownTime == 0)
		{
            Manager.control.getCopy().enter(CopyConst.ID_TOWER);
            this._callback = null;
			Manager.view.hide(ViewID.TowerCopyWinView);
			return;
		}
		this._txt.text = LangCVO.getContent("activity2", this._countDownTime);
		this._countDownTime--;
	}

    private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
	}

	private onTouchHandler(e:egret.TouchEvent):void
	{
        switch(e.currentTarget)
        {
            case this._confirmBtn:
                Manager.view.hide(ViewID.TowerCopyWinView);
                break;
            case this._nextBtn:
                // Manager.control.getCopy().enter(CopyConst.ID_TOWER);
                // this._callback = null;
                // Manager.view.hide(ViewID.TowerCopyWinView);
                let door:SceneEffGameObjectInfo = Manager.model.getGameobject().getSceneEffByType(SceneEffCVO.TYPE_TOWER);
                if(door)
                {
                    door.playShow();
                    Manager.model.getAuto().autoHook = false;
                    Manager.walk.moveTo(new egret.Point(2103,671), Manager.model.getCopy().towerMoveToEnd, Manager.model.getCopy());
                }
                else
                {
                    Manager.control.getCopy().enter(CopyConst.ID_TOWER);
                }
                this._callback = null;
                Manager.view.hide(ViewID.TowerCopyWinView);
                break;
            case this._btnClose:
                Manager.view.hide(ViewID.TowerCopyWinView);
                break;
        }
		
	}

    /** 
	 * @param textContent 倒计时时间（秒）
	 * @param okCallback 回调函数
    */
    public show(infos:Array<ItemsModelInfo>, countDownTime:number = 3, callback:Function = null):void
    {
		this._infos = infos;
        this._countDownTime = countDownTime;
        this._callback = callback;
        
        if(this.parent == null) Manager.layer.tipsLayer.addChild(this);
        this.invalidate(InvalidationType.DATA);
    }

    public hide():void
    {
        if(this.parent) this.dispose();
    }

	public dispose():void
	{
        if(this._callback) this._callback();
        window.clearInterval(this._interval);
		super.dispose();
        if(this._loadComplete)
        {
            ObjectUtil.removes(this._back, this._txt, this._confirmBtn, this._nextBtn, this._btnClose);
            this._back.bitmapData = null;
            this._back = null;
            this._txt.dispose();
            this._txt = null;
            this._confirmBtn.dispose();
            this._confirmBtn = null;
            this._nextBtn.dispose();
            this._nextBtn = null;
            this._btnClose.bitmapData = null;
            this._btnClose = null;

            for(var i:number=this._goodItems.length-1; i>=0; i--)
            {
                Manager.pool.push(this._goodItems[i]); 
            }
		    this._goodItems = null;
		    this._infos = null;
		    this._callback = null;
        }
	}
}