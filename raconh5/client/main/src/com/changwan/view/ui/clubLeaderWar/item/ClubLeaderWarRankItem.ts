class ClubLeaderWarRankItem extends ItemRenderer
{
	private _rank:Label;
	private _nickName:Label;
	private _countWin:Label;
	private _title:BitmapRemote;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("clubLeaderWar/item", "ClubLeaderWarRankItemSkin");
	}

	protected dataChanged():void
	{
		let info:ClubLeaderWarRankInfo = this.data as ClubLeaderWarRankInfo;
		if(info)
		{
			this._rank.text = info.rank + "";
			this._nickName.text = info.nickName + "";
			if(Manager.model.getClubLeaderWar().status == 0)
				this._countWin.text = info.rankWinCount + "";
			else if(Manager.model.getClubLeaderWar().status == 1)
				this._countWin.text = info.winCount + "";
			let clubType:number = Number(String(Manager.model.self.attrInfo.guildID).substr(-1, 1));
			let titleId:number = ClubDataCVO.getClubLeaderWarTitle(clubType, info.rank);
			if(titleId)
			{
				this._title = Manager.pool.create(BitmapRemote);
				this._title.x = 403;
				this._title.y = 22;
				this.addChild(this._title);
				this._title.load(Manager.path.getTitlePath(titleId));
			}
		}
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this._rank, this._nickName, this._countWin, this._title);
		if(this._rank)
			this._rank.dispose();
		this._rank = null;
		if(this._nickName)
			this._nickName.dispose();
		this._nickName = null;
		if(this._countWin)
			this._countWin.dispose();
		this._countWin = null;
		if(this._title)
			Manager.pool.push(this._title);
		this._title = null;
	}
}