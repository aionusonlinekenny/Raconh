/**
 *author Anydo
 *create 2017-12-27
 *description 
*/
class ArenaResultView extends UIComponent implements IViewManager
{
    private _back:eui.Image;
    private _txtTime:Label;
    private _picTitle:eui.Image;
    private _picFail:eui.Image;
    private _btnOk:Button;
    private _btnClose:eui.Image;

    private _txt1:Label;
    private _txt2:Label;
    private _txt3:Label;
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
        this.skinName = Manager.path.getSkinName("arena", "ArenaResultViewSkin");
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
            this._txt1.visible = this._txt2.visible = this._txt3.visible = true;
            this._txt1.text = LangCVO.getContent("arena13");
            let str:string = LangCVO.getContent("arena14") + "<font color='#fd7100' face='Microsoft YaHei'>"+resultObj.enemyName+"</font>";
            HtmlUtil.setTextFlow(this._txt2, str);
            if(resultObj.rankNew < resultObj.rankMax || resultObj.rankNew < resultObj.rankOld)
            {
                str = LangCVO.getContent("arena16", "<font color='#38b800' face='Microsoft YaHei'>"+resultObj.rankNew+"</font>");
                HtmlUtil.setTextFlow(this._txt3, str);
                // this._txt3.text = LangCVO.getContent("arena16", resultObj.rankNew);
            }
            else this._txt3.text = LangCVO.getContent("arena17");
            this._picTitle.source = "result_title_win_png";
        }
        else
        {
            this._picFail.visible = true;
            this._txt1.visible = this._txt2.visible = this._txt3.visible = false;
            this._picTitle.source = "result_title_fail_png";
        }

        this.disposeItems();
        this._goodItems = [];
        for(let i:number = 0; i < 2; i++)
		{
            let item:Goods = Manager.pool.create(Goods);
            item.x = i * 150;
            let info:ItemsModelInfo = new ItemsModelInfo();
            info.base_id = (i == 0) ? ItemsConst.EXP : ItemsConst.HONOUR;
            info.quantity = (i == 0) ? resultObj.exp : resultObj.honour;
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
        this._txtTime.text = LangCVO.getContent("arena1", this._countDownTime);
		this._countDownTime--;
	}

    private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
	}

	private onCloseHandler(e:egret.TouchEvent):void
	{
        Manager.socket.sendOnlyProtocol(Protocol.ARENA_EXIT);
		Manager.view.hide(ViewID.ArenaResultView);
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
		    this._txt1.dispose();
		    this._txt1 = null;
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