class ClubLeaderWarLeaderRankItem1 extends UIComponent
{
	private _back:BitmapRemote;
    private _headImg:BitmapRemote;
    private _titleImg:BitmapRemote;
	private _powerBack:eui.Image;
	private _txtName:Label;

	private _power:NumImgView2;

	private _model:ClubLeaderWarModel;
	private _info:ClubLeaderWarLeaderInfo;

	public constructor()
	{
		super();
		this._model = Manager.model.getClubLeaderWar();
		this.skinName = Manager.path.getSkinName("clubLeaderWar/item", "ClubLeaderWarLeaderRankItem1Skin");
	}

    protected configUI():void
    {
		super.configUI();
		this._back.load(Manager.path.rankPath("rank_back.png"));
		
		this._power = Manager.pool.create(NumImgView2);
		this._power.x = this._powerBack.x + 150;
		this._power.y = this._powerBack.y + 15;
		this.addChild(this._power);
	}

	public set info(value:ClubLeaderWarLeaderInfo)
	{
		if(this._info == value) return;
		this._info = value;

		this.invalidate("drawByInfo");
	}

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawByInfo")) this.drawByInfo();
	}

    protected drawAll():void
    {
        super.drawAll();
		this.drawByInfo();
    }
	
	private drawByInfo():void
	{
		if(this._info != null)
		{
			// this._headImg.load(Manager.path.rankPath("role"+ (this._info.career == 0 ? 2 : 1) +".png"));
			this._headImg.load(Manager.path.rankPath("role"+ this._info.career +".png"));
			this._txtName.text = this._info.nickName;
			this._power.setValue(this._info.fight, "nums_fighting_", 25);
		}
		else
		{
			this._headImg.load(null);
			this._txtName.text = LangCVO.getContent("rank6");//虚位以待
			this._power.setValue(0, "nums_fighting_", 25);
		}
	}

    public dispose():void
    {
        super.dispose();
		ObjectUtil.disposes(this._back, this._headImg, this._titleImg, this._txtName);
		ObjectUtil.removes(this._powerBack);
		this._model = null;
		this._info = null;
		this._back = null;
		this._headImg = null;
		this._titleImg = null;
		this._txtName = null;
		if(this._power)
			Manager.pool.push(this._power);
		this._power = null;
    	this._powerBack = null;
    }
}