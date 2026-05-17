class ClubLeaderWarLeaderRankItem2 extends ItemRenderer
{
	private _back:eui.Image;
	private _headBackImg:eui.Image;
	private _iconRank:eui.Image;
	private _txtName:Label;
	private _txtValue:Label;
	private _imageHead:BitmapRemote;

	private _info:ClubLeaderWarLeaderInfo;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("clubLeaderWar/item", "ClubLeaderWarLeaderRankItem2Skin");
	}

    protected dataChanged():void
	{
        let info:ClubLeaderWarLeaderInfo = this.data as ClubLeaderWarLeaderInfo;
		if(this._info == info) return;
		this._info = info;

		if(this._info != null)
		{
			this.visible = true;
			this._iconRank.source = "rank_" + this._info.rank + "_png";
			this._txtName.text = this._info.nickName;
			this._txtValue.text = LangCVO.getContent("clubLeaderWar7", this._info.fight);
		}
		else
		{
			this.visible = false;
		}

		if(!this._imageHead)
			this._imageHead = Manager.pool.create(BitmapRemote);
		// this._imageHead.load(Manager.path.getRoleHeadPath(2, this._info.career == 0 ? 2 : 1), 74, 74);
		this._imageHead.load(Manager.path.getRoleHeadPath(2, this._info.career), 74, 74);
		this._imageHead.x = this._headBackImg.x + 13;
		this._imageHead.y = this._headBackImg.y + 13;
		this.addChildAt(this._imageHead, this.getChildIndex(this._headBackImg) + 1);
	}
	
    public dispose():void
    {
        super.dispose();
		ObjectUtil.removes(this._back, this._headBackImg, this._iconRank, this._txtName, this._txtValue);
		this._info = null;
		this._back = null;
		this._headBackImg = null;
		this._iconRank = null;
		this._txtName.dispose();
		this._txtName = null;
		this._txtValue.dispose();
		this._txtValue = null;
		if(this._imageHead)
			Manager.pool.push(this._imageHead);
		this._imageHead = null;
    }
}