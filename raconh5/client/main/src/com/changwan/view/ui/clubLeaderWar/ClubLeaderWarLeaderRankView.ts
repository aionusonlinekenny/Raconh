/**
 * 盟主战三大盟主排名
 */
class ClubLeaderWarLeaderRankView extends UIComponent
{
	private _content:eui.Group;
	private _item0:ClubLeaderWarLeaderRankItem1;
	private _list:BaseVScrollerList;

	private _model:ClubLeaderWarModel;
	private _index:number;

	public constructor()
	{
		super();
		this._model = Manager.model.getClubLeaderWar();
		this.skinName = Manager.path.getSkinName("clubLeaderWar", "ClubLeaderWarLeaderRankViewSkin");
		this.touchChildren = true;
	}

	protected initData():void
	{
		super.initData();
		Manager.control.getClubLeaderWar().leaderRankQuery();
	}

	protected addEvent():void
	{
		super.addEvent();
		this._model.addEventListener(ClubLeaderWarEvent.CLUB_LEADER_WAR_LEADER_INFO, this.updateList, this);
	}

	protected removeEvent():void
	{
		this._model.removeEventListener(ClubLeaderWarEvent.CLUB_LEADER_WAR_LEADER_INFO, this.updateList, this);
		super.removeEvent();
	}

	// private reqRankData():void
	// {
	// 	Manager.control.getClubLeaderWar().leaderRankQuery();

	// 	// let list:Array<ClubLeaderWarLeaderInfo> = [];
	// 	// for(let i:number=0; i<3; i++)
	// 	// {
	// 	// 	let info:ClubLeaderWarLeaderInfo = new ClubLeaderWarLeaderInfo();
	// 	// 	info.rank = i + 1;
	// 	// 	info.roleId = i + 1;
	// 	// 	info.career = 1;
	// 	// 	info.nickName = "专打高富帅";
	// 	// 	info.fight = 50000 - i * 234;
	// 	// 	list.push(info);
	// 	// }
	// 	// this.updateList(list);
	// }

	private updateList(e:ClubLeaderWarEvent):void
	// private updateList(l:Array<ClubLeaderWarLeaderInfo>):void
	{
		let data:any = e.params;

        let list:Array<ClubLeaderWarLeaderInfo> = data;
		let len:number = list.length;
		this._item0.info = len > 0 ? list[0] : null;

		this._list.itemList.itemRendererFunction = (info:ClubLeaderWarLeaderInfo):any => {
				return ClubLeaderWarLeaderRankItem2;
		};
		this._list.itemList.dataProvider = new eui.ArrayCollection(list.slice(1));
		this._list.itemList.allowMultipleSelection = false;
		this._list.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
		this._list.scroller.scrollPolicyV = eui.ScrollPolicy.ON;
	}

    public dispose():void
    {
        super.dispose();
		this._model = null;
		this._content.parent.removeChild(this._content);
		this._content = null;
		this._item0.dispose();
		this._item0 = null;
		this._list.dispose();
		this._list = null;
    }
}