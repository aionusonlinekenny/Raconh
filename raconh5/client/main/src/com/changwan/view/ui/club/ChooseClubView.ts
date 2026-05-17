/**
 * 选择宗门
 * Simon
 * 2017.12.14
 */
class ChooseClubView extends UIComponent
{
	private _thisParent:ClubPanel;
	private _club1:Button;
	private _club2:Button;
	private _club3:Button;
	private _tui1:eui.Image;
	private _tui2:eui.Image;
	private _tui3:eui.Image;
	private _btnList:Array<Button>;
	private _tuiImgList:Array<eui.Image>;

	private _clubType:number = -1;
	private _tipsView:ClubJoinTipsView;

	private _back0:BitmapRemote;
	private _back1:BitmapRemote;

	public constructor()
	{
		super();

		this.skinName = Manager.path.getSkinName("club", "ChooseClubViewSkin");
		this.touchChildren = true;
	}

	protected configUI():void
	{
		super.configUI();

		this.touchEnabled = true;

		this._back0.load(PathInfo.getPath("res/club/club_bg0.jpg", LoaderType.IMAGE));
		this._back1.load(PathInfo.getPath("res/club/club_bg1.jpg", LoaderType.IMAGE));

		this._btnList = [this._club1, this._club2, this._club3];
		this._tuiImgList = [this._tui1, this._tui2, this._tui3];

		Manager.control.getClub().clubRecommendQuery();
	}

	protected addEvent():void
	{
		super.addEvent();

		this._club1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._club2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._club3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getClub().addEventListener(ClubEvent.UPDATE_CLUB_RECOMMEND, this.onClubRecommendUpdateHandler, this);
	}
	
	protected removeEvent():void
	{
		this._club1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._club2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._club3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getClub().removeEventListener(ClubEvent.UPDATE_CLUB_RECOMMEND, this.onClubRecommendUpdateHandler, this);

		super.removeEvent();
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		let index:number = this._btnList.indexOf(e.currentTarget);
		let clubId:number = Manager.model.getClub().clubRecommendInfo[index].clubId;
		this._tipsView = Manager.view.show(ViewID.ClubJoinTipsView, clubId, (index + 1 == this._clubType ? 1 : 0) );
	}

	private onClubRecommendUpdateHandler(e:ClubEvent):void
	{
		let minCount:number = -1;
		let list:Array<ClubRecommendInfo> = Manager.model.getClub().clubRecommendInfo;
		list.sort(this.clubTypeSortOn);
		if(list)
		{
			for(let i:number=0; i<list.length; i++)
			{
				if(i == 0 || minCount > list[i].playerCount)
				{
					this._clubType = list[i].clubType;
					minCount = list[i].playerCount;
				}
			}
		}
		if(this._clubType != -1)
		{
			for(let i:number=0; i<this._tuiImgList.length; i++)
			{
				this._tuiImgList[i].visible = (i + 1 == this._clubType ? true : false);
			}
		}
	}

	private clubTypeSortOn(value1:ClubRecommendInfo, value2:ClubRecommendInfo):number
	{
		if(value1.clubType > value2.clubType)
			return 1;
		else if(value1.clubType < value2.clubType)
			return -1;
		else
			return 0;
	}

	public reuse(thisParent:ClubPanel):void
	{
		super.reuse();

		this._thisParent = thisParent;
	}

	public dispose():void
	{
		// if(Manager.model.getGuide().curID == GuideID.CLUB_JOIN) Manager.control.getTask().hideGuide();
		super.dispose();

		ObjectUtil.removes(this._back0, this._back1, this._club1, this._club2, this._club3, this._tui1, this._tui2, this._tui3);
		this._thisParent = null;
		if(this._back0)
			this._back0.dispose();
		this._back0 = null;
		if(this._back1)
			this._back1.dispose();
		this._back1 = null;
		if(this._club1)
			this._club1.dispose();
		this._club1 = null;
		if(this._club2)
			this._club2.dispose();
		this._club2 = null;
		if(this._club3)
			this._club3.dispose();
		this._club3 = null;
		this._tui1 = null;
		this._tui2 = null;
		this._tui3 = null;
		this._btnList = null;
		this._tuiImgList = null;
		if(this._tipsView)
			Manager.pool.push(this._tipsView);
		this._tipsView = null;
	}
}