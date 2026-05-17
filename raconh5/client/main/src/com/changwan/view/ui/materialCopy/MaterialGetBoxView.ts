/**
 * 缥缈录领取宝箱物品
 */
class MaterialGetBoxView extends UIComponent
{
	private _group:eui.Group;
	private _base:BasePopUpView;
	private _txt:Label;
	private _btn:Button;

	private _itemList:Array<BaseGoods>;
	private _awardSp:Sprite;

	private _model:MaterialCopyModel;
	private _nextInfo:MaterialCopyDataCVO

	public constructor()
	{
		super();
		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("material", "MaterialGetBoxViewSkin");
		this.visible = false;
	}

	protected configUI():void
	{
		super.configUI();
		this.visible = true;

		this._base.titleImg.source = "common_jiangli_png";

		if(!this._awardSp)
		{
			this._awardSp = new Sprite();
			this._group.addChild(this._awardSp);
		}

		this.onResizeHandler();
	}

	protected initData():void
	{
		super.initData();
		this._model = Manager.model.getMaterialCopy();

		this._nextInfo = MaterialCopyDataCVO.getInfo(this._model.getAwardId + 1);
		let color:string;
		if(this._model.curStar >= this._nextInfo.star)
			color = Color.GREEN_STR;
		else
			color = Color.RED_STR;
		let str:string = LangCVO.getContent("material1", this._nextInfo.star, "<font color='"+ color +"'>("+ this._model.curStar + "/" + this._nextInfo.star +")</font>");
		HtmlUtil.setTextFlow(this._txt, str);

		this._itemList = [];
		for(let i:number=0; i<this._nextInfo.showAward.length; i++)
		{
			let item:BaseGoods = Manager.pool.create(BaseGoods);
			item.setGainLossVO(this._nextInfo.showAward[i]);
            item.x = i * 120;
			item.y = 480;
			this._awardSp.addChild(item);
        	this._itemList.push(item);
		}
		this._awardSp.width = 120 * this._nextInfo.showAward.length;
		this._awardSp.height = 141;
		this._awardSp.x = Math.round((this._group.width - this._awardSp.width) / 2) - 10;
	}

	public addEvent():void
	{
		super.addEvent();
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._base.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
	}

	public removeEvent():void
	{
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._base.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		super.removeEvent();
	}

	private onResizeHandler(e?:GlobalEvent):void
	{
		this.width = Manager.global.gameMain.stage.stageWidth;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._base.closeBtn:
				Manager.view.hide(ViewID.MaterialGetBoxView);
				break;
			case this._btn:
				if(this._model.curStar >= this._nextInfo.star)
				{
					Manager.control.getMaterialCopy().getAward(this._nextInfo.id);
					Manager.view.hide(ViewID.MaterialGetBoxView);
				}
				break;
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
		ObjectUtil.removes(this._group, this._base, this._txt, this._btn, this._awardSp);
		this._group = null;
		if(this._base)
			this._base.dispose();
		this._base = null;
		if(this._txt)
			this._txt.dispose();
		this._txt = null;
		if(this._btn)
			this._btn.dispose();
		this._btn = null;
		if(this._itemList)
		{
			for(let i:number=0; i<this._itemList.length; i++)
			{
				Manager.pool.push(this._itemList[i]);
				this._itemList[i] = null;
			}
			this._itemList = null;
		}
		if(this._awardSp)
			this._awardSp.dispose();
		this._awardSp = null;
		this._model = null;
		this._nextInfo = null;
	}
}