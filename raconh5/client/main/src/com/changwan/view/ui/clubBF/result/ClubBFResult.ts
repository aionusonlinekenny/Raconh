/**
 * 盟会战结算界面
 * luzhihong
 * create 2017-12-1
 */
class ClubBFResult extends UIComponent implements IViewManager
{
    private _txtClubWin:Label;
    private _txt0:Label;
    private _txtClubScore0:Label;
    private _txtClubScore1:Label;
    private _txt1:Label;
    private _txtResult:Label;
    private _txtScore:Label;
    private _txtRank:Label;
    private _txtTime:Label;
	private _gItems:eui.Group;
    private _btn:Button;
    private _btnClose:eui.Image;
	private _goodItems:Array<Goods> = [];
    
	private _defClubType:number;
	private _winClubType:number;
	private _winCount:number;
	private _score:number;
	private _rank:number;
	private _infos:Array<ItemsModelInfo>;
	private _clubScores:Object;
	// private _leftTime:number;
    
    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("clubBF", "ClubBFResultSkin");
		this.touchChildren = true;
    }

    /** 
	 * @param isBoss 是否为boss结算
	 * @param data 数据
    */
    public show(defClub:number, winClub:number, winCount:number, score:number, rank:number, infos:Array<ItemsModelInfo>, clubScores:Object):void
    {
		this._defClubType = defClub;
        this._winClubType = winClub;
        this._winCount = winCount;
        this._score = score;
        this._rank = rank;
        this._infos = infos;
        this._clubScores = clubScores;
		// this._leftTime = 10;
        
        if(this.parent == null)
        {
            this.y = 213;
            Manager.layer.tipsLayer.addChild(this);
        }
    }

    protected configUI():void
    {
		super.configUI();

		let isDefWin:boolean = (this._defClubType == this._winClubType);
		let attackClutTypes:Array<number> = this.getAttackClubTypes();
		let attackClubName0:string = ClubDataCVO.getClubName(attackClutTypes[0]);
		let attackClubName1:string = ClubDataCVO.getClubName(attackClutTypes[1]);
		this._txtClubScore0.text = attackClubName0 + LangCVO.getContent("clubBF5") + this._clubScores[attackClutTypes[0]];//积分：
		this._txtClubScore1.text = attackClubName1 + LangCVO.getContent("clubBF5") + this._clubScores[attackClutTypes[1]];//积分：
		if(isDefWin)
		{
			let defClubName:string = ClubDataCVO.getClubName(this._defClubType);
			HtmlUtil.setTextFlow(this._txtClubWin, defClubName + "\n" + this._winCount + LangCVO.getContent("clubBF14"));//连胜
			HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("clubBF15"));//城门未被击破，守方获得胜利。
			HtmlUtil.setTextFlow(this._txt1, LangCVO.getContent("clubBF16", defClubName));//{0}继续占领王城。
		}
		else 
		{
			HtmlUtil.setTextFlow(this._txtClubWin, attackClubName0 + "\n" + attackClubName1);//
			HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("clubBF17"));//城门被击破，攻方获得胜利。
			HtmlUtil.setTextFlow(this._txt1, LangCVO.getContent("clubBF18", attackClubName0));//{0}占领王城。
		}

		let myClubType:number = Manager.model.self.attrInfo.guildType;
		let isWin:boolean = (isDefWin && myClubType == this._defClubType) || (!isDefWin && myClubType != this._defClubType);
		let str:string = isWin ? HtmlUtil.addColorTag(LangCVO.getContent("clubBF20"),Color.RED_STR) : HtmlUtil.addColorTag(LangCVO.getContent("clubBF21"),Color.BLUE_STR);
		HtmlUtil.setTextFlow(this._txtResult, LangCVO.getContent("clubBF19")+str);//我的盟会：
		this._txtScore.text = LangCVO.getContent("clubBF22")+this._score;//我的积分：
		this._txtRank.text = LangCVO.getContent("clubBF23")+this._rank;//盟内排名：

		let item:Goods;
		for(let i:number=0, len:number=this._infos.length; i<len; i++)
		{
			item = Manager.pool.create(Goods);
			item.x = i*128;
			item.data = this._infos[i];
			this._gItems.addChild(item);
			this._goodItems.push(item);
		}

		this._txtTime.text = "";
		// Manager.render.add(this.countDown, this, 1000);
		// this.countDown();
		this.onResizeHandler(null);
    }

	private getAttackClubTypes():Array<number>
	{
		let clubTypes:Array<number> = [];
		for(let i=1; i<=3; i++)
		{
			if(i != this._defClubType) clubTypes.push(i);
		}
		if(this._clubScores[clubTypes[0]] < this._clubScores[clubTypes[1]]) clubTypes.reverse();
		return clubTypes;
	}

	// private countDown():void
	// {
	// 	if(this._leftTime <= 0)
	// 	{
	// 		Manager.view.hide(ViewID.ClubBFResult);
	// 		return;
	// 	}
	// 	this._txtTime.text = LangCVO.getContent("activity2", this._leftTime);
	// 	this._leftTime--;
	// }

    public hide():void
    {
        this.dispose();
    }

    protected addEvent():void
    {
        super.addEvent();

        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();

        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
        // if(this._callback && e.currentTarget != this._btnClose) this._callback();
		Manager.view.hide(ViewID.ClubBFResult);
	}

	public dispose():void
	{
		// Manager.render.remove(this.countDown, this);
		super.dispose();
		for(let i:number=this._goodItems.length-1; i>=0; i--)
        {
            Manager.pool.push(this._goodItems[i]); 
        }
		ObjectUtil.disposes(this._txtClubWin, this._txt0, this._txtClubScore0, this._txtClubScore1, this._txt1, this._txtResult, this._txtScore, this._txtRank, this._txtTime, this._btn);
		ObjectUtil.removes(this._gItems, this._btnClose);
    	this._txtClubWin = null;
    	this._txt0 = null;
    	this._txtClubScore0 = null;
    	this._txtClubScore1 = null;
    	this._txt1 = null;
    	this._txtResult = null;
    	this._txtScore = null;
    	this._txtRank = null;
    	this._txtTime = null;
		this._gItems = null;
    	this._btn = null;
    	this._btnClose = null;
		this._goodItems = null;
		this._infos = null;
		this._clubScores = null;
	}
}