class ClubLeaderWarFightInfoItem extends ItemRenderer
{
	public txt1:Label;
	public txt2:Label;
	public nickName:Label;
	public count:Label;
	public btn:Button;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("clubLeaderWar/item", "ClubLeaderWarFightInfoItemSkin");
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this.txt1, this.txt2, this.nickName, this.count, this.btn);
		if(this.nickName)
			this.nickName.dispose();
		this.nickName = null;
		if(this.count)
			this.count.dispose();
		this.count = null;
		if(this.btn)
			this.btn.dispose();
		this.btn = null;
	}
}