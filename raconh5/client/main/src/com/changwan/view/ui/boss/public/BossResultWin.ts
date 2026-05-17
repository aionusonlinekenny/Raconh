/**
 * 成功弹出框
 * luzhihong
 * create 2017-12-1
 */
class BossResultWin extends UIComponent implements IViewManager
{
    private _back:ResultWinBack;
    private _txtRank:Label;
	private _goodItems:Array<Goods> = [];
    
	private _myRank:number;
	private _infos:Array<ItemsModelInfo>;
	private _endTime:number;
    private _callback:Function;
    
    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("boss", "BossResultWinSkin");
		this.touchChildren = true;
    }

    /** 
	 * @param textContent 倒计时时间（秒）
	 * @param okCallback 回调函数
    */
    public show(myRank:number, infos:Array<ItemsModelInfo>, countDownTime:number = 3, callback:Function = null):void
    {
		this._myRank = myRank;
		this._infos = infos;
		this._endTime = egret.getTimer() + countDownTime * 1000;
        this._callback = callback;
        
        if(this.parent == null)
        {
            Manager.layer.tipsLayer.addChild(this);
			this.onResizeHandler(null);
        }
		
        this.invalidate(InvalidationType.DATA);
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
		this._txtRank.text = LangCVO.getContent("boss14", this._myRank);

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
				this._goodItems[i].y = 370 - itemsH/2 + Math.floor(i/lineMaxCount)*dis;
                this._goodItems[i].data = this._infos[i];
			}
			else
			{
				Manager.pool.push(Goods);
			}
		}

		Manager.render.add(this.countDown, this, 1000);
		this.countDown();
    }

	private countDown():void
	{
		let left:number = this.leftTime;
		if(left == 0)
		{
			Manager.view.hide(ViewID.BossResultWin);
			return;
		}
		this._back.setTxt(LangCVO.getContent("activity2", left));
	}

	private get leftTime():number
	{
		let left:number = Math.floor((this._endTime - egret.getTimer())/1000);
		return left > 0 ? left : 0;
	}

    public hide():void
    {
        this.dispose();
    }

    protected addEvent():void
    {
        super.addEvent();

        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._back.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._back.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();

        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._back.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._back.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Math.round(Manager.config.gameWidth - this.width) / 2;
        this.y = 213;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
        // if(this._callback && e.currentTarget != this._btnClose) this._callback();
		Manager.view.hide(ViewID.BossResultWin);
	}

	public dispose():void
	{
        if(this._callback) this._callback();
		Manager.render.remove(this.countDown, this);
		super.dispose();
		for(var i:number=this._goodItems.length-1; i>=0; i--)
        {
            Manager.pool.push(this._goodItems[i]); 
        }
		this._goodItems = null;
		if(this._loadComplete)
		{
			this._back.dispose();
			this._back = null;
			this._txtRank.dispose();
			this._txtRank = null;
		}
		this._infos = null;
		this._callback = null;
	}
}