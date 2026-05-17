/**
 * 冲榜竞技
 * pzx
 * 2018-3-20
 */
class SrvRankPanel extends Panel{
	private _view:UIComponent;
	private _bitimg:BitmapRemote;
	private _bitimg2:BitmapRemote;
	public constructor()
    {
        super(false);
    }
    protected configUI():void
    {
        super.configUI();
		this.basePanel.downFrameImg.visible  = false;
		this.basePanel.backBtn.visible = false;
		this.basePanel.scrollerList.visible = false;
		this.basePanel.showBottomBack = false;
		this.basePanel.title = "srvRank_title0_png";
		
		if(this._bitimg == null)
		{
			this._bitimg = Manager.pool.create(BitmapRemote);
			this._bitimg.x = 5;
			this._bitimg.y = 116;
			this.basePanel.addChildAt(this._bitimg,3);
			this._bitimg.load(Manager.path.getPanelSysPrivilegePath("sysprivilege_beijing"));
		}
		if(this._bitimg2 == null)
		{
			this._bitimg2 = Manager.pool.create(BitmapRemote);
			this._bitimg2.x = 5;
			this._bitimg2.y = 431;
			this.basePanel.addChildAt(this._bitimg2,3);
			this._bitimg2.load(Manager.path.getPanelSrvRankPath("srvRankdi",Extension.JPG));
		}
    }

    protected addEvent():void
    {
        super.addEvent();
    }

    protected removeEvent():void
    {
        super.removeEvent();
    }
	protected initData():void
    {
        super.initData();
		this.drawData()
    }

	private drawData():void
	{
		if(!this._view)
		{
			this._view = new SrvRankView;
			this.addChild(this._view);
		}
	}

    protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.SrvRankPanel);
				break;
		}
	}
	public dispose():void
    {
        super.dispose();
        ObjectUtil.remove(this._view);
        if(this._view) this._view.dispose();
        this._view = null;

		if(this._bitimg)
		{
			Manager.pool.push(this._bitimg);
			this._bitimg = null;
			Manager.pool.push(this._bitimg2);
			this._bitimg2 = null;
		}
    }
}