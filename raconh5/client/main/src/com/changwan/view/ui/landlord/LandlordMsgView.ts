/**
 * 斗地主信息界面
 */
class LandlordMsgView extends UIComponent
{
	private _status:Label;
	private _label1:Label;
	private _saveTime:Label;
	private _playerList:BaseVScrollerList;

	private _itemContent:Array<any>;

	private _model:LairdModel;
	private _thisParent:LandlordView;

	public constructor(thisParent:LandlordView)
	{
		super();
		this.touchChildren = true;
		this._thisParent = thisParent;
		this.skinName = Manager.path.getSkinName("landlord", "LandlordMsgViewSkin");
	}

	protected configUI():void
	{
		super.configUI();

		this._model = Manager.model.getLaird();
	}

	protected initData():void
	{
		this._status.text = LangCVO.getContent("laird" + (this._model.curStatus + 4));
		if(this._model.curStatus == 2)
		{
			this._label1.text = LangCVO.getContent("laird20");
			this._saveTime.text = (this._model.lairdRoleInfo ? this._thisParent.seekHelpInfo.value - this._model.lairdRoleInfo.seekHelpCount : this._thisParent.seekHelpInfo.value) + "/" + this._thisParent.seekHelpInfo.value;
		}
		else
		{
			this._label1.text = LangCVO.getContent("laird19");
			this._saveTime.text = (this._model.lairdRoleInfo ? this._thisParent.rescueInfo.value - this._model.lairdRoleInfo.rescueCount : this._thisParent.rescueInfo.value) + "/" + this._thisParent.rescueInfo.value;
		}
		Manager.control.getLaird().lairdGuildInfo();
	}

	protected addEvent():void
	{
		super.addEvent();
		this._model.addEventListener(LairdEvent.LAIRD_CLUB_MEMBER_INFO_UPDATE, this.onClubMemberUpdateHandler, this);
		this._model.addEventListener(LairdEvent.LAIRD_SEEK_HELP_UPDATE, this.onUpdateSeekHelpHandler, this);
	}

	protected removeEvent():void
	{
		this._model.removeEventListener(LairdEvent.LAIRD_CLUB_MEMBER_INFO_UPDATE, this.onClubMemberUpdateHandler, this);
		this._model.removeEventListener(LairdEvent.LAIRD_SEEK_HELP_UPDATE, this.onUpdateSeekHelpHandler, this);
		super.removeEvent();
	}

	private onClubMemberUpdateHandler(e:LairdEvent):void
	{
		let coolyInfoList:Array<CoolyInfo> = this._model.coolyInfoList;
		let list:Array<LairdClubMemberInfo> = e.params;
		if(!list || list.length == 0) return;
		let tmpList:Array<LairdClubMemberInfo> = [];
		for(let i:number=0; i<list.length; i++)
		{
			// if(list[i].status == 2)
			// {
				let has:boolean = false;
				for(let j:number=0; j<coolyInfoList.length; j++)
				{
					if(coolyInfoList[j].name == list[i].nickName)
					{
						has = true;
						break;
					}
				}
				if(!has) tmpList.push(list[i]);
			// }
		}
		tmpList.sort(this.sortByTime);
		this._playerList.initBtnListData(LandlordMsgItem, tmpList, true);
	}

	private sortByTime(value1:LairdClubMemberInfo, value2:LairdClubMemberInfo):number
	{
		if(value1.catchTime < value2.catchTime)
			return 1;
		else if(value1.catchTime > value2.catchTime)
			return -1;
		else
			return 0;
	}

	private onUpdateSeekHelpHandler(e:LairdEvent):void
	{
		if(this._model.curStatus == 2)
			this._saveTime.text = (this._model.lairdRoleInfo ? this._thisParent.seekHelpInfo.value - this._model.lairdRoleInfo.seekHelpCount : this._thisParent.seekHelpInfo.value) + "/" + this._thisParent.seekHelpInfo.value;
		else
			this._saveTime.text = (this._model.lairdRoleInfo ? this._thisParent.rescueInfo.value - this._model.lairdRoleInfo.rescueCount : this._thisParent.rescueInfo.value) + "/" + this._thisParent.rescueInfo.value;
	}

	public reuse(thisParent:LandlordView):void
	{
		super.reuse();
		this._thisParent = thisParent;
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this._status, this._label1, this._saveTime, this._playerList);
		if(this._status)
			this._status.dispose();
		this._status = null;
		if(this._label1)
			this._label1.dispose();
		this._label1 = null;
		if(this._saveTime)
			this._saveTime.dispose();
		this._saveTime = null;
		if(this._playerList)
			this._playerList.dispose();
		this._playerList = null;
		this._itemContent = null;
		this._model = null;
		this._thisParent = null;
	}
}