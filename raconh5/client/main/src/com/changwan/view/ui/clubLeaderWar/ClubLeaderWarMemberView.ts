/**
 * 盟会精英
 * Simon
 * 2018.2.2
 */
class ClubLeaderWarMemberView extends UIComponent
{
	private _basePopView:BasePopUpView;
	private _scrollerList:BaseVScrollerList;
	private _tips:Label;

	private _model:ClubLeaderWarModel;
	private _cvo:ClubDataCVO;
	private _memberInited:boolean = false;

	public constructor()
	{
		super();

		this.skinName = Manager.path.getSkinName("clubLeaderWar", "ClubLeaderWarMemberViewSkin");
		this.visible = false;
		this.touchChildren = true;
	}

	protected configUI():void
	{
		super.configUI();
		this.visible = true;

		this._model = Manager.model.getClubLeaderWar();

		this._basePopView.titleImg.source = "clubLeaderWar_jinyin_png";
        this._basePopView.bgHeight = 700;

		this.onResizeHandler();
	}

	protected initData():void
	{
		super.initData();

		this._cvo = ClubDataCVO.getClubLeaderWarInfo(8);

		Manager.control.getClub().memberListQuery();
	}

	protected addEvent():void
	{
		super.addEvent();
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._basePopView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getClub().addEventListener(ClubEvent.UPDATE_CLUB_MEMBERINFO_LIST, this.onMemberListUpdateHandler, this);
	}

	protected removeEvent():void
	{
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._basePopView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getClub().removeEventListener(ClubEvent.UPDATE_CLUB_MEMBERINFO_LIST, this.onMemberListUpdateHandler, this);
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
			case this._basePopView.closeBtn:
				Manager.view.hide(ViewID.ClubLeaderWarMemberView);
				break;
		}
	}

	private onMemberListUpdateHandler(e:ClubEvent):void
	{
		let clubMemberList:Array<ClubMemberInfo> = Manager.model.getClub().clubMemberList;
		let list:Array<ClubMemberInfo> = [];
		let count:number = 0;
		for(let i:number=0; i<clubMemberList.length-1; i++)
		{
			if(clubMemberList[i].type != 1)
				list.push(clubMemberList[i]);
			if(clubMemberList[i].type == 2)
				count += 1;
		}
		list.sort((value1:ClubMemberInfo, value2:ClubMemberInfo)=>{ if(value1.fighting < value2.fighting) {return 1} else {return -1;} });
		if(!this._memberInited)
		{
			this._scrollerList.initBtnListData(ClubLeaderWarMemberItem, list, true);
			(<eui.HorizontalLayout>this._scrollerList.itemList.layout).gap = -2;
			this._memberInited = true;
		}
		else
		{
			this._scrollerList.dataProvider(list);
		}

		let maxCount:number = 0;
		if(this._cvo)
			maxCount = Number(this._cvo.clubLeaderWarInfoValue);

		this._tips.text = LangCVO.getContent("clubLeaderWar20", maxCount - count);
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
		ObjectUtil.removes(this._basePopView, this._scrollerList, this._tips);
		if(this._basePopView)
			this._basePopView.dispose();
		this._basePopView = null;
		if(this._scrollerList)
			this._scrollerList.dispose();
		this._scrollerList = null;
		if(this._tips)
			this._tips.dispose();
		this._tips = null;
	}
}