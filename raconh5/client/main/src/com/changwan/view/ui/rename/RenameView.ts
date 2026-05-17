/**
 * pzx 
 * 2017.12.14
 * 改名
 */
class RenameView extends UIComponent{
	private _popupView:BasePopUpView;
	private _okBtn:Button;
	private _txt:Label;
	private _loginTxt:Label;
	private _inputTxt:TextInput;
	private _itemTxt:Label;
	private _res:PlayerResItems;
	private _self:SelfGameObjectInfo;
	private _success:boolean

	private _itemCvo:ItemsCVO;
	private _itemLoss:GainLossVO;

	public constructor() {
		super();
		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("rename", "RenameViewSkin");
	}
	protected configUI():void
	{
		super.configUI();
		this._inputTxt.maxChars = 5;
		this._inputTxt.prompt = LangCVO.getContent("rename5");
        this._inputTxt.textDisplay.textAlign = "center";
		this._loginTxt.visible = false;
		this._self = Manager.model.self;
		this._success = false;
		this._res.visible = false;
	}

	protected addEvent():void
	{
		super.addEvent();
		this._popupView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBtnHandler, this);
		this._okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRenameHandler,this);
		this._self.addEventListener(RenameEvent.UPDATE_RENAME_EVENT,this.onRenameSuccessHandler,this);
		this._itemTxt.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onItemTipsHandler,this);
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
	}

	protected removeEvent():void
	{
		this._popupView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBtnHandler, this);
		this._okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRenameHandler,this);
		this._self.removeEventListener(RenameEvent.UPDATE_RENAME_EVENT,this.onRenameSuccessHandler,this);
		this._itemTxt.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onItemTipsHandler,this);
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		super.removeEvent();
	}
	private onRenameSuccessHandler():void
	{
		this._success = true;
		this._inputTxt.visible = false;
		this._txt.visible = false;
		this._loginTxt.visible = true;
		this._loginTxt.text = LangCVO.getContent("rename4");
		this._res.visible = false;
		this._itemTxt.visible = false;
	}
	private onRenameHandler(e:egret.TouchEvent):void
	{
		if(this._success)
		{
			Manager.view.hide(ViewID.RenameView);
			return;
		}
		let name:string = this._inputTxt.text;
		if(name.length==0)
		{
			Manager.tips.showTips(LangCVO.getContent("rename1"),null,false);
			return;
		}
		if(!this._itemLoss.isEnough())
		{
			this.onItemTipsHandler();
			return;
		}
		Manager.control.getRename().rename(name);
	}
	protected drawAll():void
	{
		super.drawAll();
		this.updateView();
	}
	private updateView():void
	{
		this._itemLoss= new GainLossVO(RenameCVO.itemlosse);
		this._itemCvo = ItemsCVO.getCvo(this._itemLoss.baseId);
		let str:string=HtmlUtil.addUTag(HtmlUtil.addColorTag(this._itemCvo.name,this._itemCvo.colorStr));
		let n:number = Manager.model.getItems().getCountItemById(this._itemLoss.baseId);
		let par:string = "("+n+"/"+this._itemLoss.num+")";
		if(this._itemLoss.isEnough())
		{
			par = HtmlUtil.addColorTag(par,Color.GREEN_STR);
		}
		else
		{
			par = HtmlUtil.addColorTag(par,Color.RED_STR);
		}
		str = str + par;
		HtmlUtil.setTextFlow(this._itemTxt,str);

		// let gold:GainLossVO = new GainLossVO(RenameCVO.goldlosse);
		// this._res.iconSize = PlayerResItems.ICON_54;
		// this._res.setData(gold);
	}
	private onClickBtnHandler(e:egret.TouchEvent):void
	{
		Manager.view.hide(ViewID.RenameView);
	}

	private onItemTipsHandler(e:egret.TouchEvent=null):void
	{
		if(this._itemCvo)
		{
			Manager.view.show(ViewID.ItemsTips,this._itemCvo)
		}
	}

	public show():void
	{
		if(this.parent== null)
		{
			this.onResizeHandler(null);
			Manager.layer.tipsLayer.addChild(this);
		}
	}
	public hide():void
	{
		this.dispose();
	}
	private onResizeHandler(e:GlobalEvent):void
	{
		this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
	}
	public dispose()
	{
		super.dispose();
		if(this._loadComplete)
		{
			this._popupView.dispose();
			this._popupView=null;
			this._okBtn.dispose();
			this._okBtn=null;
			this._txt.dispose();
			this._txt=null;
			this._inputTxt.dispose();
			this._inputTxt=null;
			this._loginTxt.dispose();
			this._loginTxt = null;
			this._itemTxt.dispose();
			this._res.dispose();
			this._res = null;
			this._self = null;

			this._itemLoss= null;
			this._itemCvo =null;
		}

	}
}