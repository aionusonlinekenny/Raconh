/**
 * 排行榜面板
 * luzhihong
 * create 2017-11-02
 */
 class RankPanel extends Panel
{
	private _model:RankModel;
	private _index:number;

	private _content:eui.Group;
	private _item0:RankItem0;
	// private _item1:RankItem1;
	// private _item2:RankItem1;
	private _list:BaseVScrollerList;
	private _txtMyRank:Label;
	private _txtMyValue:Label;

	private _clubLeaderWarRank:ClubLeaderWarLeaderRankView;

    public constructor()
    {
        super();
		this._model = Manager.model.getRank();
        this.skinName = Manager.path.getSkinName("rank", "RankSkin");
    }
    
    protected configUI():void
    {
		super.configUI();
		this.basePanel.setBottomBackTop(1056);
		this.basePanel.addChildAt(this._content, 3);

		let btnDatas = [
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rank_btn_0_png", imgClick: "rank_btn_0_png"},
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rank_btn_7_png", imgClick: "rank_btn_7_png"},
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rank_btn_1_png", imgClick: "rank_btn_1_png"},
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rank_btn_2_png", imgClick: "rank_btn_2_png"},
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rank_btn_3_png", imgClick: "rank_btn_3_png"},
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rank_btn_4_png", imgClick: "rank_btn_4_png"},
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rank_btn_5_png", imgClick: "rank_btn_5_png"},
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rank_btn_6_png", imgClick: "rank_btn_6_png"}
		];
		
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas, true);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = -10;
		
		(<eui.VerticalLayout>this._list.itemList.layout).gap = -5;
		
    }

	protected addEvent():void
	{
		super.addEvent();

		this._model.addEventListener(RankEvent.UPDATE_RANK_LIST, this.updateList, this);
		this.onFuncBtnChangeHandler(null);
	}

	protected removeEvent():void
	{
		this._model.removeEventListener(RankEvent.UPDATE_RANK_LIST, this.updateList, this);

		super.removeEvent();
	}

	protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.RankPanel);
				break;
		}
	}

	protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		super.onFuncBtnChangeHandler(e);

		let index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1) return;
		this._index = index;

		// this._list.itemList.removeChildren();
		if(this._index == 1)
		{
			this._content.visible = false;
			this.basePanel.title = "rank_title_7_png";
			if(!this._clubLeaderWarRank)
				this._clubLeaderWarRank = new ClubLeaderWarLeaderRankView();
			this.basePanel.addChildAt(this._clubLeaderWarRank, 3);
		}
		else
		{
			this._content.visible = true;
			if(this._clubLeaderWarRank && this._clubLeaderWarRank.parent)
				this._clubLeaderWarRank.parent.removeChild(this._clubLeaderWarRank);

			let tmpIndex:number;
			if(this._index < 1)
				tmpIndex = this._index;
			else
				tmpIndex = this._index - 1;
			this._item0.type = tmpIndex;
			this.basePanel.title = "rank_title_" + tmpIndex + "_png";
			this._list.initBtnListData(RankItem2, null);
			this.reqRankData();
		}
	}

	private reqRankData():void
	{
		if(this._index != 1)
		{
			if(this._index < 1)
				Manager.control.getRank().reqRankData(this._index);
			else
				Manager.control.getRank().reqRankData(this._index - 1);
		}
		else
			Manager.control.getClubLeaderWar().leaderRankQuery();
	}

	private updateList(e:RankEvent):void
	{
		let data:any = e.params;
		let tmpIndex:number;
		if(this._index != 1)
		{
			if(this._index < 1)
				tmpIndex = this._index;
			else
				tmpIndex = this._index - 1;
		}
		if(data.type != tmpIndex) return;
// 		3	我的排行：
// 4	未入榜
		this._txtMyRank.text = LangCVO.getContent("rank3") + (data.myRank > 0 ? data.myRank : LangCVO.getContent("rank4"));
		this._txtMyValue.text = this.getValueName(data.myValue);

        let list:Array<RankInfo> = data.list;
		let len:number = list.length;
		this._item0.info = len > 0 ? list[0] : null;
		// this._item1.info = len > 1 ? list[1] : null;
		// this._item2.info = len > 2 ? list[2] : null;
		// this._list.itemList.removeChildren();
		// this._list.initBtnListData(RankItem1, list.length > 1 ? list.slice(1) : null, true);

		this._list.itemList.itemRendererFunction = this.itemRendererFunction;
		this._list.itemList.dataProvider = new eui.ArrayCollection(list.slice(1));
		this._list.itemList.allowMultipleSelection = false;
		this._list.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
		this._list.scroller.scrollPolicyV = eui.ScrollPolicy.ON;
	}

	private itemRendererFunction(info:RankInfo):any
	{
		if(info.rank>3) return RankItem2;
		return RankItem1;
	}

	private getValueName(value:number):string
	{
		let tmpIndex:number;
		if(this._index != 1)
		{
			if(this._index < 1)
				tmpIndex = this._index;
			else
				tmpIndex = this._index - 1;
		}
		switch(tmpIndex)
		{
			case RankConst.TYPE_POWER:
			case RankConst.TYPE_PET:
			case RankConst.TYPE_MING_GE:
				return LangCVO.getContent("rank5") + value;//5	我的战力：
			case RankConst.TYPE_LEVEL:
				// let str:string = value + LangCVO.getContent("common15");//15	级
				// if(Manager.model.getGame().self.attrInfo.zhuanshu > 0) str = Manager.model.getGame().self.attrInfo.zhuanshu + LangCVO.getContent("common14") + str;//14	转
				// return LangCVO.getContent("rank7") + str;//7	我的等级：
				return LangCVO.getContent("rank7") + value;//7	我的等级：
			case RankConst.TYPE_JIE_XUE:
				return LangCVO.getContent("rank9") + value;//9	我的境界
			case RankConst.TYPE_GEM:
			case RankConst.TYPE_SOUL:
				return LangCVO.getContent("rank8") + value;//8	我的总等级：
		}
		return "";
	}

    public dispose():void
    {
        super.dispose();
		if(this._clubLeaderWarRank && this._clubLeaderWarRank.parent)
		{
			this._clubLeaderWarRank.parent.removeChild(this._clubLeaderWarRank);
			this._clubLeaderWarRank.dispose();
		}
		this._clubLeaderWarRank = null;
		this._model = null;
		ObjectUtil.remove(this._content);
		ObjectUtil.disposes(this._item0, this._list, this._txtMyRank, this._txtMyValue);
		this._content = null;
		this._item0 = null;
		this._list = null;
		this._txtMyRank = null;
		this._txtMyValue = null;
    }
}