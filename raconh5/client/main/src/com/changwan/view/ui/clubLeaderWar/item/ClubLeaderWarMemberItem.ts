class ClubLeaderWarMemberItem extends ItemRenderer
{
	private _name:Label;
	private _titleImg:BitmapRemote;
	private _btn:Button;

	private _info:ClubMemberInfo;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("clubLeaderWar/item", "ClubLeaderWarMemberItemSkin");
	}

	protected createChildren():void
    {
        super.createChildren();

		this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

	private onClickHandler(e:egret.TouchEvent):void
	{
		Manager.control.getClubLeaderWar().designateQuery(this._info.roleId);
	}

	protected dataChanged():void
	{
		this._info = this.data as ClubMemberInfo;
		if(this._info)
		{
			let careerInfo:ClubDataCVO = ClubDataCVO.getClubCareerById(this._info.clubCareer);
			if(careerInfo)
			{
				this._name.text = "[" + careerInfo.careerName + "]" + this._info.nickName;
			}

			this._btn.visible = !(this._info.type == 2);
			// this._titleImg.visible = this._info.type == 2;

			if(this._info.type == 2)
			{
				let clubType:number = Number(String(Manager.model.self.attrInfo.guildID).substr(-1, 1));
				let rankList:Array<ClubLeaderWarRankInfo> = Manager.model.getClubLeaderWar().info.rankList;
				let rank:number = 0;
				for(let i:number=0; i<rankList.length; i++)
				{
					if(rankList[i].id == this._info.roleId)
					{
						rank = rankList[i].rank;
						break;
					}
				}
				let titleId:number = ClubDataCVO.getClubLeaderWarTitle(clubType, rank);
				if(titleId)
				{
					this._titleImg = Manager.pool.create(BitmapRemote);
					this._titleImg.x = 403;
					this._titleImg.y = 22;
					this.addChild(this._titleImg);
					this._titleImg.load(Manager.path.getTitlePath(titleId));
				}
			}
		}
	}

	public dispose():void
	{
		if(this._btn) this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		super.dispose();
		ObjectUtil.removes(this._name, this._titleImg, this._btn);
		if(this._name)
			this._name.dispose();
		this._name = null;
		if(this._btn)
			this._btn.dispose();
		this._btn = null;
		if(this._titleImg)
			Manager.pool.push(this._titleImg);
		this._titleImg = null;
	}
}