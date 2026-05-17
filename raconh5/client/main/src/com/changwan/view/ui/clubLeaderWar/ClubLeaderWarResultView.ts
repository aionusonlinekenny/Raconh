class ClubLeaderWarResultView extends UIComponent implements IViewManager
{
	private _back:eui.Image;
	private _picTitle:eui.Image;
	private _btnClose:eui.Image;
    private _picFail:eui.Image;
	private _txt2:Label;
    private _txt3:Label;
    private _btnOk:Button;
	private _txtTime:Label;

    private _itemBox:eui.Group;
	private _goodItems:Array<Goods> = [];
    
	private _infos:Array<ItemsModelInfo>;
	private _countDownTime:number;
    private _callback:Function;

	public constructor()
	{
		super();
		this._itemBox = new eui.Group();
        this._itemBox.y = 378;
        this.addChild(this._itemBox);
        this.skinName = Manager.path.getSkinName("clubLeaderWar", "ClubLeaderWarResultViewSkin");
        this.touchChildren = true;
	}

	protected addEvent():void
    {
        super.addEvent();

        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();

        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
    }

	private onResizeHandler(e:GlobalEvent):void
	{
		this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
	}

    /** 
	 * @param textContent 倒计时时间（秒）
	 * @param okCallback 回调函数
    */
    public show(infos:Array<ItemsModelInfo>, countDownTime:number = 5, callback:Function = null):void
    {
		this._infos = infos;
        this._countDownTime = countDownTime;
        this._callback = callback;
        
        if(this.parent == null)
        {
            this.x = (Manager.config.gameWidth - this.width) >> 1;
            this.y = 213;
            Manager.layer.tipsLayer.addChild(this);
        }
        this.setViewByData();
    }

    public hide():void
    {
        this.dispose();
    }

    private setViewByData():void
    {
        let resultObj:any = Manager.model.getArena().resultObj;
        if(resultObj.isWin)
        {
            this._picFail.visible = false;
            this._txt2.visible = this._txt3.visible = true;
			let nameStr:string = LangCVO.getContent("clubLeaderWar4", "<font color='#FD7100' size='30' face='Microsoft YaHei'>"+resultObj.enemyName+"</font>");
            HtmlUtil.setTextFlow(this._txt2, nameStr);
			this._txt3.text = LangCVO.getContent("clubLeaderWar5", resultObj.winCount, resultObj.rank);
            this._picTitle.source = "result_title_win_png";
        }
        else
        {
            this._picFail.visible = true;
            this._txt2.visible = this._txt3.visible = false;
            this._picTitle.source = "result_title_fail_png";
        }

        this.disposeItems();
        this._goodItems = [];
        for(let i:number = 0; i < 2; i++)
		{
            let item:Goods = Manager.pool.create(Goods);
            item.x = i * 150;
            let info:ItemsModelInfo = new ItemsModelInfo();
            info.base_id = (i == 0) ? ItemsConst.DONATE : ItemsConst.HONOUR;
            info.quantity = (i == 0) ? resultObj.donate : resultObj.honour;
            item.data = info;
            this._itemBox.addChild(item);
            this._goodItems.push(item);
        }
        this._itemBox.x = (this.width - this._itemBox.width) / 2;
		Manager.render.add(this.countDownHandler, this, 1000);
		this.countDownHandler();
    }

	private countDownHandler():void
	{
		if(this._countDownTime == 0)
		{
			this.onCloseHandler(null);
			return;
		}
        this._txtTime.text = LangCVO.getContent("clubLeaderWar6", this._countDownTime);
		this._countDownTime--;
	}

	private onCloseHandler(e:egret.TouchEvent):void
	{
		Manager.control.getClubLeaderWar().exitQuery();
        Manager.control.getClubLeaderWar().query();
		Manager.view.hide(ViewID.ClubLeaderWarResultView);
	}

    private disposeItems():void
    {
        for(let i:number = 0; i < this._goodItems.length; i++)
        {
            Manager.pool.push(this._goodItems[i]); 
        }
		this._goodItems = null;
    }

	public dispose():void
	{
        if(this._callback) this._callback();
		Manager.render.remove(this.countDownHandler, this);
		super.dispose();
        if(this._loadComplete)
        {
            this._btnOk.dispose();
            this._btnOk = null;
            this._txtTime.dispose();
            this._txtTime = null;
            this._back = null;
            this._picFail = null;
            this._picTitle = null;
            this._btnClose = null;
		    this._txt2.dispose();
		    this._txt2 = null;
		    this._txt3.dispose();
		    this._txt3 = null;
        }
        this.disposeItems();
        this.removeChild(this._itemBox);
        this._itemBox = null;
		this._infos = null;
    	this._callback = null;
	}
}