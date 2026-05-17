/**
 * 失败弹出框
 * luzhihong
 * create 2017-12-1
 */
class CopyResultFail extends UIComponent implements IViewManager
{
    private _btn:Button;
    private _btnClose:eui.Image;
    private _gBtns0:eui.Image;
    private _btnEquip:eui.Image;
    private _btnPet:eui.Image;
    private _btnSkill:eui.Image;
    private _btnJieXue:eui.Image;
    private _btnShenQi:eui.Image;
    protected _txt:Label;
    
	private _endTime:number;
    private _callback:Function;
    
    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("copy", "CopyResultFailSkin");
        this.touchChildren = true;
    }

    protected configUI():void
    {
        super.configUI();

        let cell:number = CopyCVO.getCVO(CopyConst.ID_MAIN).cell;
        if(cell < 20)
        {
            this._gBtns0.visible = false;
            this._btnShenQi.visible = true;
        }
        else 
        {
            this._gBtns0.visible = true;
            this._btnShenQi.visible = false;
        }

        this.onResizeHandler(null);
    }

    /** 
	 * @param textContent 倒计时时间（秒）
	 * @param okCallback 回调函数
    */
    public show(countDownTime:number = 3, callback:Function = null):void
    {
		this._endTime = egret.getTimer() + countDownTime * 1000;
        this._callback = callback;
        
        if(this.parent == null)
        {
            this.x = (Manager.config.gameWidth - this.width) >> 1;
            this.y = 213;
            Manager.layer.tipsLayer.addChild(this);
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
		Manager.render.add(this.countDown, this, 1000);
		this.countDown();
    }

	protected countDown():void
	{
		let left:number = this.leftTime;
		if(left == 0)
		{
			Manager.view.hide(ViewID.CopyResultFail);
			return;
		}
		this._txt.text = LangCVO.getContent("activity2", left);
	}

	protected get leftTime():number
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
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnEquip.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnPet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnSkill.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnJieXue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnShenQi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();

        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnEquip.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnPet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnSkill.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnJieXue.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnShenQi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

    private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._btnEquip:
                if(OpenCVO.isOpen(OpenConst.ID_STRENGTHEN, true))
        		    Manager.view.show(ViewID.EquipPanel);
			    break;
			case this._btnPet:
        		Manager.view.show(ViewID.RolePanel, 1);
			    break;
			case this._btnSkill:
        		Manager.view.show(ViewID.SkillPanel);
			    break;
			case this._btnJieXue:
        		Manager.view.show(ViewID.SkillPanel, 1);
			    break;
			case this._btnShenQi:
        		Manager.view.show(ViewID.ReinPanel);
			    break;
		}
        // if(this._callback && e.currentTarget != this._btnClose) this._callback();
        this.hideView();
	}

    protected hideView():void
    {
		Manager.view.hide(ViewID.CopyResultFail);
    }

	public dispose():void
	{
        if(this._callback) this._callback();
		Manager.render.remove(this.countDown, this);
		super.dispose();
		ObjectUtil.removes(this._btnClose, this._btnEquip, this._btnPet, this._btnSkill, this._btnJieXue, this._btnShenQi);
		ObjectUtil.disposes(this._btn, this._txt);
		this._btn = null;
        this._btnClose = null;
    	this._btnEquip = null;
    	this._btnPet = null;
    	this._btnSkill = null;
    	this._btnJieXue = null;
    	this._btnShenQi = null;
    	this._txt = null;
    	this._callback = null;
	}
}