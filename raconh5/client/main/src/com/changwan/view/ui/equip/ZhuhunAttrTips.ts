/**
 * 铸魂属性TIPS
 * Simon 2017.11.20
 */
class ZhuhunAttrTips extends UIComponent implements IViewManager
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
		this.skinName = Manager.path.getSkinName("equip", "ZhuhunAttrTipsSkin");
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
		this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		Manager.view.hide(ViewID.ZhuhunAttrTips);
	}

	public setInfo(career:number, level:number):void
	{
		let curInfo:EquipZhuhunCVO = EquipZhuhunCVO.getInfo(career, 1, level);
		let nextInfo:EquipZhuhunCVO = EquipZhuhunCVO.getInfo(career, 1, level + 1);

		this._curLevel.text = LangCVO.getContent("equip18") + level;
		let curAttr:string = "";
		if(curInfo)
		{
			if(curInfo.levelAttrList.length > 0)
				this._curStatus.text = LangCVO.getContent("equip12");
			else
				HtmlUtil.setTextFlow(this._curStatus, "<font color='#ff0000'>（"+ LangCVO.getContent("equip17") +"）</font>");
			for(let i:number=0; i<curInfo.levelAttrList.length; i++)
			{
				curAttr += AttrDescTypeEx.getAttrName(curInfo.levelAttrList[i][0]) + "+" + curInfo.levelAttrList[i][1] + "    ";
			}
		}
		else
		{
			HtmlUtil.setTextFlow(this._curStatus, "<font color='#ff0000'>（"+ LangCVO.getContent("equip17") +"）</font>");
		}
		this._curValue.text = curAttr;

		if(nextInfo)
		{
			this._nextLevel.text = LangCVO.getContent("equip18") + (level + 1);
			this._nextStatus.text = LangCVO.getContent("equip13");
			let nextAttr:string = "";
			for(let i:number=0; i<nextInfo.levelAttrList.length; i++)
			{
				nextAttr += AttrDescTypeEx.getAttrName(nextInfo.levelAttrList[i][0]) + "+" + nextInfo.levelAttrList[i][1] + "    ";
			}
			this._nextValue.text = nextAttr;
		}
		else
		{
			this._nextLevel.text = "";
			this._nextStatus.text = "";
			this._nextValue.text = "";
		}

		if(!curInfo || level == 0)
		{
			this._curLevel.text = this._nextLevel.text;
			this._curStatus.text = this._nextStatus.text;
			HtmlUtil.setTextFlow(this._curStatus, HtmlUtil.addColorTag(this._curStatus.text, "#7C6E62"));
			this._curValue.text = this._nextValue.text;
			// HtmlUtil.setTextFlow(this._curValue, HtmlUtil.addColorTag(this._curValue.text, "#7C6E62"));

			this._nextLevel.text = "";
			this._nextStatus.text = "";
			this._nextValue.text = "";

			this._tipsBg.height = 135;
		}
		else
		{
			if(curInfo && curInfo.level == EquipModel.ZHUHUAN_MAX_LEVEL)
				this._tipsBg.height = 135;
			else
				this._tipsBg.height = 229;
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