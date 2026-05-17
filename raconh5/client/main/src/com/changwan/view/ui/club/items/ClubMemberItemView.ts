class ClubMemberItemView extends ItemRenderer
{
	private _careerId:number;
	private _career:Label;
	private _nickName:Label;
	private _fighting:Label;

	public constructor()
	{
		super();

		this.skinName = Manager.path.getSkinName("club", "ClubMemberItemViewSkin");
	}

	protected dataChanged():void
    {
		this._careerId = this.data.careerId;
		// let colorStr:string = "";
		// if(this._careerId <= 10)
		// 	colorStr = "#0000ff";
		// else if(this._careerId > 10 && this._careerId <= 30)
		// 	colorStr = Color.PURPLE_STR;
		// else if(this._careerId > 30 && this._careerId <= 40)
		// 	colorStr = Color.ORANGE_STR;
		// else if(this._careerId > 40)
		// 	colorStr = Color.RED_STR;
		// HtmlUtil.setTextFlow(this._career, "<font color='"+ colorStr +"'>"+ this.data.career +"</font>");
		this._career.text = this.data.career;
		this._nickName.text = this.data.nickName;
		this._fighting.text = this.data.fighting;
	}

	public dispose():void
	{
		super.dispose();

		ObjectUtil.removes(this._career, this._nickName, this._fighting);
		if(this._career)
			this._career.dispose();
		this._career = null;
		if(this._nickName)
			this._nickName.dispose();
		this._nickName = null;
		if(this._fighting)
			this._fighting.dispose();
		this._fighting = null;
	}
}