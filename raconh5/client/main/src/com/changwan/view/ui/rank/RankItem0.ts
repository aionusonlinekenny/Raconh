/**
 * 排行榜第1名信息视图
 * luzhihong
 * create 2017-11-03
 */
class RankItem0 extends UIComponent
{
	private _model:RankModel;
	private _info:RankInfo;
	private _type:number = -1;
	private _back:BitmapRemote;
    private _headImg:BitmapRemote;
    private _titleImg:BitmapRemote;
	private _txtName:Label;
	private _btnWorship:Button;
	private _bubbleIcon:eui.Image;
	// private _roleAni:RoleAnimation;
	private _powerBack:eui.Image;
	private _imgValueName:eui.Image;
	private _power:NumImgView2;

	public constructor()
	{
		super();
		this.touchChildren = true;
		this._model = Manager.model.getRank();
		this.skinName = Manager.path.getSkinName("rank", "RankItemSkin0");
	}

    protected configUI():void
    {
		super.configUI();
		this._bubbleIcon.visible = false;
		this._back.load(Manager.path.rankPath("rank_back.png"));
		
		this._power = Manager.pool.create(NumImgView2);
		this._power.x = this._powerBack.x + 155;
		this._power.y = this._powerBack.y + 15;
		this.addChild(this._power);
	}
	
	protected addEvent():void
	{
		super.addEvent();

		this._btnWorship.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._model.addEventListener(RankEvent.UPDATE_WORSHIP_LIST, this.updateWorship, this);
	}

	protected removeEvent():void
	{
		this._btnWorship.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._model.removeEventListener(RankEvent.UPDATE_WORSHIP_LIST, this.updateWorship, this);

		super.removeEvent();
	}

	public set type(value:number)
	{
		if(this._type == value) return;
		this._type = value;

		this.setValueName();
		
		let titleID:number = [5001,5002,5003,5004,5005,5006,5007][this._type];
		let titleCVO:TitleCVO = TitleCVO.getCVO(titleID);
        this._titleImg.load(titleCVO ? Manager.path.getTitlePath(titleCVO.resID) : null);

		if(this._type == RankConst.TYPE_POWER)
		{
			ObjectUtil.adds(this, this._btnWorship, this._bubbleIcon);
			this.invalidate("drawWorship");
		}
		else 
		{
			ObjectUtil.removes(this._btnWorship, this._bubbleIcon);
		}
		// this.invalidate("drawWorship");
	}

	private setValueName():void
	{
		let tempX:number = 385;
		switch(this._type)
		{
			case RankConst.TYPE_POWER:
			case RankConst.TYPE_PET:
			case RankConst.TYPE_MING_GE:
				this._imgValueName.source = "rank_zhanli_png";
				break;
			case RankConst.TYPE_LEVEL:
				this._imgValueName.source = "rank_level_png";
				break;
			case RankConst.TYPE_JIE_XUE:
				this._imgValueName.source = "rank_jingjie_png";
				break;
			case RankConst.TYPE_GEM:
			case RankConst.TYPE_SOUL:
				this._imgValueName.source = "rank_total_level_png";
				tempX = 351;
				break;
		}
		this._imgValueName.x = tempX;
	}
	
	public set info(value:RankInfo)
	{
		if(this._info == value) return;
		this._info = value;

		this.invalidate("drawByInfo");
	}

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawWorship")) this.drawWorship();
		if(this.isInvalid("drawByInfo")) this.drawByInfo();
	}

    protected drawAll():void
    {
        super.drawAll();
		this.drawByInfo();
		this.drawWorship();
    }

	private onClickHandler(e:RankEvent = null):void
	{
		if(this._info) Manager.control.getRank().worship(this._type, this._info.id);
	}

	private updateWorship(e:RankEvent):void
	{
		this.invalidate("drawWorship");
	}
	
	private drawByInfo():void
	{
		if(this._info != null)
		{
			// this.showAnimation(this._info.career);
			this._headImg.load(Manager.path.rankPath("role"+this._info.career+".png"));
			this._txtName.text = this._info.name;
			this._power.setValue(this._info.value, "nums_fighting_", 25);
			this._btnWorship.visible = true;
		}
		else
		{
			// if(this._roleAni) Manager.pool.push(this._roleAni);
			this._headImg.load(null);
			this._txtName.text = LangCVO.getContent("rank6");//虚位以待
			this._power.setValue(0, "nums_fighting_", 25);
			this._btnWorship.visible = false;
			this._bubbleIcon.visible = false;
		}
	}
	
	private drawWorship():void
	{
		let hasWorship:boolean = this._model.hasWorship(this._type);
		this._btnWorship.enabled = !hasWorship;
		this._bubbleIcon.visible = !hasWorship;
	}
	
	// private showAnimation(career:number):void
	// {
	// 	if(this._roleAni) Manager.pool.push(this._roleAni);
	// 	this._roleAni = Manager.pool.create(RoleAnimation, this._info.fashion, this._info.weapon, this._info.cloak);
	// 	this.addChild(this._roleAni);
	// 	this._roleAni.scaleX = this._roleAni.scaleY = 0.65;
	// 	this._roleAni.x = -240;
	// 	this._roleAni.y = -60;
	// }

    public dispose():void
    {
        super.dispose();
		// if(this._roleAni) Manager.pool.push(this._roleAni);
		ObjectUtil.disposes(this._back, this._txtName, this._btnWorship, this._power, this._titleImg);
		ObjectUtil.removes(this._bubbleIcon, this._powerBack);
		this._model = null;
		this._info = null;
		this._back = null;
		this._txtName = null;
		this._btnWorship = null;
		this._bubbleIcon = null;
		this._powerBack = null;
		this._power = null;
    	this._titleImg = null;
    }
}