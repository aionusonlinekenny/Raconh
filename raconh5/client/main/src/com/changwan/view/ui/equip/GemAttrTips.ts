/**
 * 宝石属性TIPS
 * Simon 2017.11.27
 */
class GemAttrTips extends UIComponent
{
	private _tipsBg:eui.Image;
	private _closeBtn:Button;
	private _curLevel:Label;
	private _curStatus:Label;
	private _curValue:Label;
	private _nextLevel:Label;
	private _nextStatus:Label;
	private _nextValue:Label;

	public constructor()
	{
		super();

		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("equip", "GemAttrTipsSkin");
		this.visible = false;
	}

	protected configUI():void
	{
		super.configUI();
		this.visible = true;

		this.onResizeHandler(null);
	}

	protected addEvent():void
	{
		super.addEvent();
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
	}

	protected removeEvent():void
	{
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		if(this._closeBtn) this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);

		super.removeEvent();
	}

	private onResizeHandler(e:GlobalEvent):void
	{
		this.width = Manager.global.gameMain.stage.stageWidth;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		Manager.view.hide(ViewID.GemAttrTips);
	}

	public setInfo(level:number):void
	{
		let curInfo:EquipStoneSuitInfo;
		let curLevel:number = 0;
		for(let i:number = level; i>=1; i--)
		{
			curInfo = EquipStoneCVO.getGemSuitInfo(i);
			if(curInfo)
			{
				curLevel = i;
				break;
			}
		}
		let nextInfo:EquipStoneSuitInfo;
		let nextLevel:number = 0;
		for(let i:number = level + 1; i<=10; i++)
		{
			nextInfo = EquipStoneCVO.getGemSuitInfo(i);
			if(nextInfo)
			{
				nextLevel = i;
				break;
			}
		}

		if(curInfo)
		{
			this._curLevel.text = LangCVO.getContent("equip11", curLevel);
			let curAttr:string = "";
			this._curStatus.text = LangCVO.getContent("equip12");
			// HtmlUtil.setTextFlow(this._curStatus, HtmlUtil.addColorTag(this._curStatus.text, "#38B800"));
			for(let i:number=0; i<curInfo.attr.length; i++)
			{
				curAttr += AttrDescTypeEx.getAttrName(curInfo.attr[i][0]) + "+" + curInfo.attr[i][1] + "      ";
			}
			this._curValue.text = curAttr;
			// HtmlUtil.setTextFlow(this._curValue, HtmlUtil.addColorTag(this._curValue.text, "#38B800"));
			if(curInfo.level < 10)
				this._tipsBg.height = 229;
			else
				this._tipsBg.height = 135;
		}
		else
		{
			this._curLevel.text = "";
			this._curStatus.text = "";
			this._curValue.text = "";
			this._tipsBg.height = 135;
		}
		
		if(nextInfo)
		{
			this._nextLevel.text = LangCVO.getContent("equip11", nextLevel);
			this._nextStatus.text = LangCVO.getContent("equip13");
			let nextAttr:string = "";
			for(let i:number=0; i<nextInfo.attr.length; i++)
			{
				nextAttr += AttrDescTypeEx.getAttrName(nextInfo.attr[i][0]) + "+" + nextInfo.attr[i][1] + "      ";
			}
			this._nextValue.text = nextAttr;
		}
		else
		{
			this._nextLevel.text = "";
			this._nextStatus.text = "";
			this._nextValue.text = "";
		}

		if(!curInfo)
		{
			this._curLevel.text = this._nextLevel.text;
			this._curStatus.text = this._nextStatus.text;
			HtmlUtil.setTextFlow(this._curStatus, HtmlUtil.addColorTag(this._curStatus.text, "#7C6E62"));
			this._curValue.text = this._nextValue.text;
			// HtmlUtil.setTextFlow(this._curValue, HtmlUtil.addColorTag(this._curValue.text, "#7C6E62"));

			this._nextLevel.text = "";
			this._nextStatus.text = "";
			this._nextValue.text = "";
		}
	}

	public show():void
	{
		Manager.layer.tipsLayer.addChild(this);
	}

	public hide():void
	{
		this.dispose();
	}

	public dispose():void
	{
		super.dispose();

		if(this._closeBtn)
			this._closeBtn.dispose();
		this._closeBtn = null;
		if(this._curLevel)
			this._curLevel.dispose();
		this._curLevel = null;
		if(this._curStatus)
			this._curStatus.dispose();
		this._curStatus = null;
		if(this._curValue)
			this._curValue.dispose();
		this._curValue = null;
		if(this._nextLevel)
			this._nextLevel.dispose();
		this._nextLevel = null;
		if(this._nextStatus)
			this._nextStatus.dispose();
		this._nextStatus = null;
		if(this._nextValue)
			this._nextValue.dispose();
		this._nextValue = null;
	}
}