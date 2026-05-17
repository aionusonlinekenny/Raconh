/**
 * 选择宗门提示
 * Simon
 * 2017.12.14
 */
class ClubJoinTipsView extends UIComponent
{
	private _group:eui.Group;
	private _tipsView:BasePopUpView;
	private _tips1:Label;
	private _tips2:Label;
	private _okBtnImg:eui.Image;
	private _okBtn:Button;
	private _cancelBtnImg:eui.Image;
	private _cancelBtn:Button;

	private _clubId:number;
	private _joinType:number;
	private _itemInfoList:Array<any>;
	private _itemList:Array<BaseGoods>;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("club", "ClubJoinTipsViewSkin");
		this.visible = false;
		this.touchChildren = true;
	}

	protected configUI():void
	{
		super.configUI();

		this._okBtnImg.touchEnabled = false;
		this._cancelBtnImg.touchEnabled = false;

		this._tipsView.titleImg.source = "club_joinClub_png";

		let clubName:string = ClubDataCVO.getClubName(this._clubId);

		this._tips1.text = LangCVO.getContent("club1", clubName);
		if(this._joinType == 0)
		{
			this._tips1.y = 440;
			this._tips2.y = 515;

			this._tips2.text = LangCVO.getContent("club2");
		}
		else if(this._joinType == 1)
		{
			this._tips1.y = 400;
			this._tips2.y = 475;
			this._tips2.text = LangCVO.getContent("club3");

			let gainInfo:ClubDataCVO = ClubDataCVO.getClubGainById(1);
			if(gainInfo)
				this._itemInfoList = gainInfo.gainList;

			if(this._itemInfoList && this._itemInfoList.length > 0)
			{
				this._itemList = [];
				let startX:number = Math.round((720 - this._itemInfoList.length * 150) / 2);
				for(let i:number=0; i<this._itemInfoList.length; i++)
				{
					let info:ItemsCVO = ItemsCVO.getCvo(this._itemInfoList[i].baseId);
					if(info)
					{
						let item:BaseGoods = new BaseGoods();
						item.baseId = this._itemInfoList[i].baseId;
						item.count = this._itemInfoList[i].num;
						item.bind = this._itemInfoList[i].bind;
						item.x = startX + i * 150;
						item.y = 520;
						this._group.addChild(item);
						this._itemList.push(item);
					}
				}
			}
		}

		this.onResizeHandler(null);
		this.visible = true;
	}

	protected addEvent():void
	{
		super.addEvent();
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._tipsView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
	}

	protected removeEvent():void
	{
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._tipsView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		super.removeEvent();
	}

	private onResizeHandler(e:GlobalEvent):void
	{
		this.width = Manager.global.gameMain.stage.stageWidth;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._tipsView.closeBtn:
			case this._cancelBtn:
				Manager.view.hide(ViewID.ClubJoinTipsView);
				break;
			case this._okBtn:
				Manager.control.getClub().clubJoin(this._clubId, this._joinType);
				Manager.view.hide(ViewID.ClubJoinTipsView);
				break;
		}
	}

	public show(clubId:number, type:number):void
	{
		this._clubId = clubId;
		this._joinType = type;
		Manager.layer.tipsLayer.addChild(this);
	}

	public hide():void
	{
		Manager.layer.tipsLayer.removeChild(this);
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this._group, this._tipsView, this._tips1, this._tips2, this._okBtnImg, this._okBtn, this._cancelBtnImg, this._cancelBtn);
		this._group = null;
		if(this._tipsView)
			this._tipsView.dispose();
		this._tipsView = null;
		if(this._tips1)
			this._tips1.dispose();
		this._tips1 = null;
		if(this._tips2)
			this._tips2.dispose();
		this._tips2 = null;
		this._okBtnImg = null;
		if(this._okBtn)
			this._okBtn.dispose();
		this._okBtn = null;
		this._cancelBtnImg = null;
		if(this._cancelBtn)
			this._cancelBtn.dispose();
		this._cancelBtn = null;
		this._itemInfoList = null;
		if(this._itemList)
		{
			for(let i:number=0; i<this._itemList.length; i++)
			{
				if(this._itemList[i])
					this._itemList[i].dispose();
				this._itemList[i] = null;
			}
		}
		this._itemList = null;
	}
}