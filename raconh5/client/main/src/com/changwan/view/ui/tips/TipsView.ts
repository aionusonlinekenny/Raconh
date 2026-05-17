/**
 * pzx 
 * 2017.11.27
 * 提示
 */
class TipsView extends UIComponent implements IViewManager
{
    private _back:eui.Image;
    private _line:eui.Image;
    private _title:Label;
    private _content:Label;
    private _btnCancel:Button;
    private _btnOk:Button;
    private _btnClose:eui.Image;
    
	private _textContent:string;
    // private _okCallback:Function;
    private _isShowCancelBtn:boolean;
    // private _cancelCallback:Function;
    private _ok:CallBackInfo;
    private _cancel:CallBackInfo;
    // private _data:any;
    
    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("common", "TipsViewSkin");
    }

    public configUI():void
    {
        super.configUI();
        this._content.lineSpacing=10;
    }

    /** 
	 * @param textContent 提示内容
	 * @param okCallback 确定回调函数
	 * @param isShowCancelBtn 是否显示取消按钮
	 * @param cancelCallback 取消回调函数
	 * @param data 需求传递的数据
    */
    // public show(textContent:string, okCallback:Function = null, isShowCancelBtn:boolean = false, cancelCallback:Function = null, data:any = null):void
    public show(textContent:string, okCallback:CallBackInfo = null, isShowCancelBtn:boolean = false, cancelCallback:CallBackInfo = null):void
    {
        this._textContent = textContent;
        // this._okCallback = okCallback;
        // this._cancelCallback = cancelCallback;
        this._ok = okCallback;
        this._cancel = cancelCallback;
        this._isShowCancelBtn = isShowCancelBtn;
        // this._data = data;
        
        this.invalidate(InvalidationType.DATA);
        if(this.parent == null)
        {
            this.visible= false;
            this.onResizeHandler(null);
            Manager.layer.tipsLayer.addChild(this);
        }
    }

    public hide():void
    {
        this.dispose();
    }

	protected draw():void
	{
		super.draw();
		if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    protected drawAll():void
    {
        super.drawAll();
        this._content.wordWrap = true;
        this.drawData();
    }

    private drawData():void
    {
        if(this._isShowCancelBtn)
        {
            this._btnOk.x = 247;
            this._btnCancel.visible = true;
        }
        else
        {
             this._btnOk.x = 127;
            this._btnCancel.visible = false;
        }
        HtmlUtil.setTextFlow(this._content, this._textContent);
        this.visible= true;
    }

    protected addEvent():void
    {
        super.addEvent();

        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();

        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnCancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._btnOk:
                // if(this._okCallback != null)
                // {
                //     if(this._data) this._okCallback(this._data);
                //     else this._okCallback();
                // }
                if(this._ok != null)
                {
                    // if(this._data != null)this._ok.callBack.apply(this._ok.target,this._data);
                    // else this._ok.callBack.apply(this._ok.target);
                    this._ok.actCallBack();
                }
			    break;
			case this._btnCancel:
                // if(this._cancelCallback != null)
                // {
                //     if(this._data) this._cancelCallback(this._data);
                //     else this._cancelCallback();
                // }
                if(this._cancel != null)
                {
                    // if(this._data != null)this._cancel.callBack.apply(this._cancel.target,this._data);
                    // else this._cancel.callBack.apply(this._cancel.target);
                    this._cancel.actCallBack();
                }
			    break;
		}
        
		Manager.view.hide(ViewID.TipsView);
	}

	public dispose():void
	{
		super.dispose();
        ObjectUtil.removes(this._back, this._line, this._btnClose);
        this._back = null;
        this._line = null;
        this._title.dispose();
        this._title = null;
        this._content.dispose();
        this._content = null;
        this._btnCancel.dispose();
        this._btnCancel = null;
        this._btnOk.dispose();
        this._btnOk = null;
        this._btnClose = null;
        // this._okCallback = null;
        // this._cancelCallback = null;
        if(this._ok)
        {
            Manager.pool.push(this._ok);
            this._ok = null;
        }
        if(this._cancel)
        {
            Manager.pool.push(this._cancel);
            this._cancel = null;
        }
        // this._data = null;
	}
}